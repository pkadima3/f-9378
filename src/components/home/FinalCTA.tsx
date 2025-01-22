import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 animate-fade-up">
          Start Creating and Tracking Better Content Today
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-up">
          Try free for 5 days, cancel anytime. Save up to 50% with our yearly plan.
        </p>
        
        <div className="animate-fade-up">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Rocket className="mr-2 h-5 w-5" />
            Get Started with AI‐Driven Engagement
          </Button>
        </div>
      </div>
    </section>
  );
};