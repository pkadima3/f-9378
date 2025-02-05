
import React, { useState } from 'react';
import { PostWizard } from '@/components/PostWizard';
import { WizardProvider } from '@/components/wizard/WizardContext';
import { PostProvider } from '@/components/post/PostContext';
import { CaptionCard } from '@/components/caption/CaptionCard';

const CaptionGenerator = () => {
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<string | null>(null);

  const handleComplete = (captions: string[]) => {
    setGeneratedCaptions(captions);
    if (captions.length > 0) {
      setSelectedCaption(captions[0]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Caption Generator</h1>
      <div className="flex flex-col gap-6">
        <WizardProvider>
          <PostProvider>
            <PostWizard onComplete={handleComplete} />
          </PostProvider>
        </WizardProvider>

        <div className="space-y-4">
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
                setSelectedCaption(caption);
              }}
              isSelected={selectedCaption === caption}
            />
          ))}
          {generatedCaptions.length === 0 && (
            <p className="text-center text-muted-foreground p-4">
              No captions generated yet. Complete the wizard to generate captions.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptionGenerator;
