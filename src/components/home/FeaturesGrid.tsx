import React from 'react';
import { Globe, Bot, LayoutTemplate, BarChart3, HeadsetIcon, Calendar } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: "Multi-Platform Support",
    description: "Reach all major networks in one place, saving hours of cross-posting time"
  },
  {
    icon: Bot,
    title: "AI Content Generation",
    description: "Create on-brand copy for every platform with our advanced AI assistant"
  },
  {
    icon: LayoutTemplate,
    title: "Custom Templates",
    description: "Design once, reuse effortlessly with your branded content templates"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track likes, comments, and conversions in real-time with detailed insights"
  },
  {
    icon: HeadsetIcon,
    title: "Priority Support",
    description: "Get dedicated help whenever you need it from our expert support team"
  },
  {
    icon: Calendar,
    title: "Post Scheduling",
    description: "Plan your week and set it on autopilot with smart scheduling"
  }
];

export const FeaturesGrid = () => {
  return (
    <div className="py-24 animate-fade-up">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Everything You Need to Succeed
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Powerful features to boost your social media presence
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                <feature.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};