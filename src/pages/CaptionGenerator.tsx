
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
      <h1 className="text-3xl font-bold mb-6">AI Caption Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Wizard Form */}
        <div className="space-y-6">
          <WizardProvider>
            <PostProvider>
              <PostWizard onComplete={handleComplete} />
            </PostProvider>
          </WizardProvider>
        </div>

        {/* Right Column - Generated Captions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Generated Captions</h2>
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
            <p className="text-center text-muted-foreground p-4 border rounded-lg">
              No captions generated yet. Complete the wizard to generate captions.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptionGenerator;
