import { useState } from "react"
import { PlanToggle } from "@/components/pricing/PlanToggle"
import { PlanCard } from "@/components/pricing/PlanCard"

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true)

  const handlePlanSelect = (plan: string) => {
    console.log(`Selected plan: ${plan}`)
  }

  return (
    <div className="container max-w-7xl py-12 animate-fade-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
        <p className="text-muted-foreground">
          Choose the plan that best fits your needs. All plans include a 5-day free trial.
        </p>
      </div>

      <PlanToggle isYearly={isYearly} onToggle={setIsYearly} />

      <div className="grid gap-8 md:grid-cols-3">
        <PlanCard
          title="Lite Plan"
          price={isYearly ? "€59.99/year" : "€9.99/month"}
          description="Perfect for casual users managing a single social media platform."
          features={[
            "5 free requests during trial",
            "75 requests/month or 900/year",
            "Single platform support",
            "Post ideas and captions (Image only support)",
            "Basic analytics"
          ]}
          savings={isYearly ? "Save €59.99/year (~50%)" : undefined}
          buttonText="Start Free Trial"
          note="Start your 5-day trial with 5 free requests. Cancel anytime during the trial to avoid charges."
          onSelect={() => handlePlanSelect("lite")}
        />

        <PlanCard
          title="Pro Plan"
          price={isYearly ? "€199.99/year" : "€29.99/month"}
          description="Ideal for small businesses managing multiple platforms."
          features={[
            "250 requests/month or 3000/year",
            "Multi-platform support",
            "Advanced Post ideas and captions",
            "Multi media support (Image/video)",
            "Priority support",
            "Advanced analytics",
            "Custom templates"
          ]}
          savings={isYearly ? "Save €159.99/year (~44%)" : undefined}
          buttonText="Choose Pro"
          onSelect={() => handlePlanSelect("pro")}
        />

        <PlanCard
          title="Flex Add-On"
          price="€1.99"
          description="Pay-as-you-go option for additional content generations."
          features={[
            "No monthly commitment",
            "Works with Lite or Pro plan",
            "Same features as your base plan",
            "Usage analytics included"
          ]}
          buttonText="Add Flex"
          buttonVariant="secondary"
          onSelect={() => handlePlanSelect("flex")}
        />
      </div>
    </div>
  )
}