import React from 'react';
import { Button } from '@/components/ui/button';
import { ChartBarIcon, PlayCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 pt-20 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 animate-fade-up">
              AI-Powered Social Media Engagement & Content Creation
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Generate powerful posts for multiple platforms and measure engagement instantly
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '0.2s' }}>
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
          
          {/* Right Column - Dashboard Mockup */}
          <div className="relative animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Glass morphism effect for the dashboard container */}
              <div className="absolute inset-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-2xl transform rotate-2"></div>
              
              {/* Dashboard mockup */}
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
                <div className="space-y-4">
                  {/* Mock Analytics Graph */}
                  <div className="h-48 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-lg animate-pulse"></div>
                  
                  {/* Mock Metrics */}
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
            
            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;