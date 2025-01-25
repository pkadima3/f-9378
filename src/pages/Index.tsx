import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { SocialProof } from '@/components/home/SocialProof';
import { PricingPreview } from '@/components/home/PricingPreview';
import { FinalCTA } from '@/components/home/FinalCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4 overflow-hidden">
        <HeroSection />
        <div className="relative">
          {/* Background gradient orbs */}
          <div className="absolute top-1/4 -left-1/2 w-96 h-96 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 -right-1/2 w-96 h-96 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          
          <FeaturesGrid />
          <HowItWorks />
          <PricingPreview />
          <SocialProof />
          <FinalCTA />
        </div>
      </div>
    </div>
  );
};

export default Index;