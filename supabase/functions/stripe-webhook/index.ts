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
      throw new Error('No Stripe signature found')
    }

    const body = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    if (!webhookSecret) {
      throw new Error('Webhook secret not configured')
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    console.log(`Processing Stripe webhook event: ${event.type}`)

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        
        if (!customer.email) {
          throw new Error('No customer email found')
        }

        // Get user profile by email
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', customer.email)
          .limit(1)

        if (!profiles || profiles.length === 0) {
          throw new Error('No matching user profile found')
        }

        const userId = profiles[0].id

        // Update subscription status
        await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            stripe_subscription_id: subscription.id,
            plan_name: (subscription.items.data[0].price.nickname || 'Unknown Plan'),
            status: subscription.status,
            trial_end_date: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
            billing_cycle_end_date: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
            next_billing_date: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
          })

        // Update user profile
        await supabase
          .from('profiles')
          .update({
            subscription_status: subscription.status,
            requests_remaining: subscription.items.data[0].price.metadata.request_limit || 0,
          })
          .eq('id', userId)

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        
        // Update subscription record
        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            billing_cycle_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        // Update user profile
        const { data: subscriptionData } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (subscriptionData) {
          await supabase
            .from('profiles')
            .update({
              subscription_status: 'canceled',
              requests_remaining: 0,
            })
            .eq('id', subscriptionData.user_id)
        }

        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        if (!invoice.subscription) break

        // Update subscription payment status
        await supabase
          .from('subscriptions')
          .update({
            status: 'active',
          })
          .eq('stripe_subscription_id', invoice.subscription)

        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        if (!invoice.subscription) break

        // Update subscription payment status
        await supabase
          .from('subscriptions')
          .update({
            status: 'past_due',
          })
          .eq('stripe_subscription_id', invoice.subscription)

        // Optionally, you could also update the user's profile to reflect the payment failure
        const { data: subscriptionData } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', invoice.subscription)
          .single()

        if (subscriptionData) {
          await supabase
            .from('profiles')
            .update({
              subscription_status: 'past_due',
            })
            .eq('id', subscriptionData.user_id)
        }

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