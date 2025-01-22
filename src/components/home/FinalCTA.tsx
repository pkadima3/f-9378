import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-3xl"></div>
      
      <div className="max-w-4xl mx-auto text-center space-y-8 relative">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text animate-fade-up">
          Start Creating and Tracking Better Content Today
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 animate-fade-up">
          Try free for 5 days, cancel anytime. Save up to 50% with our yearly plan.
        </p>
        
        <div className="animate-fade-up">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Rocket className="mr-2 h-5 w-5 animate-float" />
            Get Started with AI‐Driven Engagement
          </Button>
        </div>
      </div>
    </section>
  );
};