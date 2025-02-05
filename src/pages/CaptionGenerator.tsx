import React from 'react';
import { PostWizard } from '@/components/PostWizard';
import { WizardProvider } from '@/components/wizard/WizardContext';
import { PostProvider } from '@/components/post/PostContext';

const CaptionGenerator = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Caption Generator</h1>
      <WizardProvider>
        <PostProvider>
          <PostWizard onComplete={() => {
            // Handle completion
          }} />
        </PostProvider>
      </WizardProvider>
    </div>
  );
};

export default CaptionGenerator;