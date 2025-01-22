import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const PricingPreview = () => {
  const navigate = useNavigate();

  const plans = [
    {
      title: "Lite Plan",
      price: "€9.99/mo",
      description: "Perfect for casual users managing a single social media platform.",
      features: [
        "75 requests/month",
        "Single platform support",
        "Basic analytics"
      ]
    },
    {
      title: "Pro Plan",
      price: "€29.99/mo",
      description: "Ideal for small businesses managing multiple platforms.",
      features: [
        "250 requests/month",
        "Multi-platform support",
        "Advanced analytics"
      ]
    },
    {
      title: "Flex Add-On",
      price: "€1.99",
      description: "Pay-as-you-go option for additional content generations.",
      features: [
        "No monthly commitment",
        "Works with any plan",
        "Usage analytics included"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-purple-50/50 to-white dark:from-gray-900/50 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className="relative flex flex-col">
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
                <ul className="space-y-2.5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigate('/pricing')}
            className="animate-fade-up"
          >
            Compare All Plans
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;