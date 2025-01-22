import React from 'react';
import { Upload, Smartphone, Target, Edit, Share, ChartBar } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: "Upload/Capture Media",
    description: "Start by uploading your photos or videos, or capture them directly through our platform"
  },
  {
    icon: Smartphone,
    title: "Select Your Platforms",
    description: "Choose from Instagram, LinkedIn, TikTok, and other major social networks"
  },
  {
    icon: Target,
    title: "Define Your Niche",
    description: "Specify your industry focus - fitness, travel, technology, or any other sector"
  },
  {
    icon: Edit,
    title: "Set Content Parameters",
    description: "Define your goals, preferred tone, and style for maximum impact"
  },
  {
    icon: Share,
    title: "Review & Share",
    description: "Get AI-generated posts tailored to each platform's unique requirements"
  },
  {
    icon: ChartBar,
    title: "Track Performance",
    description: "Monitor engagement and optimize your content strategy with detailed analytics"
  }
];

export const HowItWorks = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Simple steps to transform your social media presence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute -top-4 left-8 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                  <step.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};