import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { SocialProof } from '@/components/home/SocialProof';
import { PricingPreview } from '@/components/home/PricingPreview';
import { FinalCTA } from '@/components/home/FinalCTA';

const Index = () => {
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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