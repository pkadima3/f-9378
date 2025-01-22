import React from 'react';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    avatar: "/lovable-uploads/",
    quote: "EngagePerfect's AI suggestions helped us increase engagement by 3x while cutting content creation time in half.",
    name: "Sarah Chen",
    role: "Digital Marketing Lead"
  },
  {
    avatar: "/lovable-uploads/",
    quote: "The analytics dashboard gives us insights we never had before. Our content strategy is now data-driven and much more effective.",
    name: "Marcus Rodriguez",
    role: "Content Creator"
  },
  {
    avatar: "/lovable-uploads/",
    quote: "The multi-platform support is a game-changer. What used to take hours now takes minutes.",
    name: "Alex Thompson",
    role: "Social Media Manager"
  }
];

const companyLogos = [
  { 
    name: "GA-M2M", 
    logo: "/lovable-uploads/3aba6ead-1832-42e8-ab9b-82cb0c536bc2.png",
    className: "h-20 object-contain" 
  },
  { 
    name: "LollaBakes", 
    logo: "/lovable-uploads/8c6fdbcf-5b45-4299-8263-f652c13d1da4.png",
    className: "h-20 object-contain" 
  },
  { 
    name: "Insighter", 
    logo: "/lovable-uploads/e67ab41a-0247-4bf9-b72a-993aac78208b.png",
    className: "h-16 object-contain bg-white rounded-lg p-2" 
  },
  { 
    name: "NodeMatics", 
    logo: "/lovable-uploads/cb61cf47-3944-44e5-9e26-5f01266a4a65.png",
    className: "h-20 object-contain"
  },
  { 
    name: "Merci", 
    logo: "/lovable-uploads/fb78ae45-9400-4f34-a432-4b87d39c34b3.png",
    className: "h-14 object-contain"
  }
];

export const SocialProof = () => {
  return (
    <div className="py-24 animate-fade-up">
      <div className="text-center mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-16">
          Trusted by content creators, businesses, and marketers worldwide
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-12 mb-20">
          {companyLogos.map((company, index) => (
            <div 
              key={index}
              className="w-56 h-32 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-center p-6 hover:shadow-md transition-all duration-300"
            >
              <img 
                src={company.logo} 
                alt={company.name} 
                className={company.className}
              />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};