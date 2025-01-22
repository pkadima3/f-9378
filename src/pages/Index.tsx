import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { SocialProof } from '@/components/home/SocialProof';
import { PricingPreview } from '@/components/home/PricingPreview';
import { FinalCTA } from '@/components/home/FinalCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <HeroSection />
        <FeaturesGrid />
        <HowItWorks />
        <PricingPreview />
        <SocialProof />
        <FinalCTA />
      </div>
    </div>
  );
};

export default Index;