
import React, { useState } from 'react';
import { PostWizard } from '@/components/PostWizard';
import { WizardProvider } from '@/components/wizard/WizardContext';
import { PostProvider } from '@/components/post/PostContext';

const CaptionGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  console.log('CaptionGenerator - isGenerating:', isGenerating);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Caption Generator</h1>
      <WizardProvider>
        <PostProvider>
          <PostWizard 
            onComplete={() => {
              console.log('PostWizard completed');
              setIsGenerating(false);
            }}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        </PostProvider>
      </WizardProvider>
    </div>
  );
};

export default CaptionGenerator;
