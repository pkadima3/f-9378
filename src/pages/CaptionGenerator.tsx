
import React, { useState } from 'react';
import { PostWizard } from '@/components/PostWizard';
import { WizardProvider } from '@/components/wizard/WizardContext';
import { PostProvider } from '@/components/post/PostContext';
import { CaptionCard } from '@/components/caption/CaptionCard';

const CaptionGenerator = () => {
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);

  const handleComplete = (captions: string[]) => {
    setGeneratedCaptions(captions);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Caption Generator</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <div className="space-y-4 mt-4">
            {generatedCaptions.map((caption, index) => (
              <CaptionCard
                key={index}
                caption={caption}
                index={index}
                onEdit={(index, newCaption) => {
                  const newCaptions = [...generatedCaptions];
                  newCaptions[index] = newCaption;
                  setGeneratedCaptions(newCaptions);
                }}
                onSelect={(caption) => {
                  // Handle caption selection
                  console.log('Selected caption:', caption);
                }}
                isSelected={false}
              />
            ))}
            {generatedCaptions.length === 0 && (
              <p className="text-center text-muted-foreground p-4">
                No captions generated yet. Complete the wizard to generate captions.
              </p>
            )}
          </div>
        </div>
        <div className="lg:col-span-8">
          <WizardProvider>
            <PostProvider>
              <PostWizard onComplete={handleComplete} />
            </PostProvider>
          </WizardProvider>
        </div>
      </div>
    </div>
  );
};

export default CaptionGenerator;
