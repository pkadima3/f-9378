import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
    apiVersion: '2023-10-16',
  })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  try {
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      console.error('No Stripe signature found')
      throw new Error('No Stripe signature found')
    }

    const body = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    if (!webhookSecret) {
      console.error('Webhook secret not configured')
      throw new Error('Webhook secret not configured')
    }

    console.log('Constructing Stripe event...')
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    console.log(`Processing Stripe webhook event: ${event.type}`)

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('Processing subscription:', subscription.id)
        
        // Retrieve customer details
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        console.log('Retrieved customer:', customer.id)
        
        if (!customer.email) {
          console.error('No customer email found')
          throw new Error('No customer email found')
        }

        // Get user profile by email
        const { data: profiles, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', customer.email)
          .limit(1)

        if (profileError) {
          console.error('Error fetching profile:', profileError)
          throw profileError
        }

        if (!profiles || profiles.length === 0) {
          console.error('No matching user profile found for email:', customer.email)
          throw new Error('No matching user profile found')
        }

        const userId = profiles[0].id
        console.log('Found user profile:', userId)

        // Get subscription plan details
        const { data: subscriptionPlan } = await supabase
          .from('subscription_plans')
          .select('*')
          .eq('stripe_price_id', subscription.items.data[0].price.id)
          .single()

        console.log('Found subscription plan:', subscriptionPlan)

        // Update subscription status
        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            stripe_subscription_id: subscription.id,
            plan_name: subscriptionPlan?.name || 'Unknown Plan',
            status: subscription.status,
            trial_end_date: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
            billing_cycle_end_date: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
            next_billing_date: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
          })

        if (subscriptionError) {
          console.error('Error updating subscription:', subscriptionError)
          throw subscriptionError
        }

        // Update user profile
        const { error: profileUpdateError } = await supabase
          .from('profiles')
          .update({
            stripe_customer_id: customer.id,
            subscription_status: subscription.status,
            current_plan_id: subscriptionPlan?.id,
            requests_remaining: subscriptionPlan?.request_limit || 0,
          })
          .eq('id', userId)

        if (profileUpdateError) {
          console.error('Error updating profile:', profileUpdateError)
          throw profileUpdateError
        }

        console.log('Successfully processed subscription event')
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('Processing subscription deletion:', subscription.id)
        
        // Update subscription record
        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            billing_cycle_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        if (subscriptionError) {
          console.error('Error updating subscription:', subscriptionError)
          throw subscriptionError
        }

        // Get user ID from subscription
        const { data: subscriptionData, error: fetchError } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (fetchError) {
          console.error('Error fetching subscription:', fetchError)
          throw fetchError
        }

        if (subscriptionData) {
          // Update user profile
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              subscription_status: 'canceled',
              requests_remaining: 0,
              current_plan_id: null
            })
            .eq('id', subscriptionData.user_id)

          if (profileError) {
            console.error('Error updating profile:', profileError)
            throw profileError
          }
        }

        console.log('Successfully processed subscription deletion')
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        if (!invoice.subscription) break

        console.log('Processing successful payment for subscription:', invoice.subscription)

        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'active',
          })
          .eq('stripe_subscription_id', invoice.subscription)

        if (error) {
          console.error('Error updating subscription status:', error)
          throw error
        }

        console.log('Successfully processed payment success')
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        if (!invoice.subscription) break

        console.log('Processing failed payment for subscription:', invoice.subscription)

        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .update({
            status: 'past_due',
          })
          .eq('stripe_subscription_id', invoice.subscription)

        if (subscriptionError) {
          console.error('Error updating subscription status:', subscriptionError)
          throw subscriptionError
        }

        // Update user's profile
        const { data: subscriptionData, error: fetchError } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', invoice.subscription)
          .single()

        if (fetchError) {
          console.error('Error fetching subscription:', fetchError)
          throw fetchError
        }

        if (subscriptionData) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              subscription_status: 'past_due',
            })
            .eq('id', subscriptionData.user_id)

          if (profileError) {
            console.error('Error updating profile:', profileError)
            throw profileError
          }
        }

        console.log('Successfully processed payment failure')
        break
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})