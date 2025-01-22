import React from 'react';
import { Button } from '@/components/ui/button';
import { ChartBarIcon, PlayCircle } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="pt-20 lg:pt-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 animate-fade-up">
            AI-Powered Social Media Engagement & Content Creation
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-up">
            Generate powerful posts for multiple platforms and measure engagement instantly
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <ChartBarIcon className="mr-2 h-5 w-5" />
              Try 5 Days Free
            </Button>
            
            <Button variant="outline" size="lg">
              <PlayCircle className="mr-2 h-5 w-5" />
              See How It Works
            </Button>
          </div>
        </div>
        
        <div className="relative animate-fade-up">
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-2xl transform rotate-2"></div>
            
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="space-y-4">
                <div className="h-48 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-lg animate-pulse"></div>
                
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                      <div className="h-2 w-16 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                      <div className="h-4 w-12 bg-purple-200 dark:bg-purple-800 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};