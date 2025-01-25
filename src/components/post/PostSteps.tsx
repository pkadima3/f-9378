import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface PostStepsProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const PostSteps = ({ 
  currentStep,
  onStepClick
}: PostStepsProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex gap-2">
        {[1, 2, 3].map((number) => (
          <div
            key={number}
            onClick={() => {
              if (number < currentStep) {
                onStepClick(number);
              }
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
              currentStep === number
                ? 'bg-primary text-primary-foreground'
                : currentStep > number
                ? 'bg-primary/20 text-primary hover:bg-primary/30'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};