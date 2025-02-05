import React from 'react';
import { PostWizard } from '@/components/PostWizard';

const CaptionGenerator = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Caption Generator</h1>
      <PostWizard onComplete={() => {
        // Handle completion
      }} />
    </div>
  );
};

export default CaptionGenerator;