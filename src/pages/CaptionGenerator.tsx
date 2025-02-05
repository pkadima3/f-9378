
// This is the main part of our app that creates and shows caption cards
import React, { useState } from 'react';

// ADD THIS IMPORT
import { Card } from '@/components/ui/card';

// These are special helper components we need
import { PostWizard } from '@/components/PostWizard';
import { WizardProvider } from '@/components/wizard/WizardContext';
import { PostProvider } from '@/components/post/PostContext';
import { CaptionCard } from '@/components/caption/CaptionCard';

// This is our main magic box (component) that does all the caption generation
const CaptionGenerator = () => {
  // Think of these like special storage boxes for our captions
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<string | null>(null);

  // This is like a special helper function that happens when we finish making captions
  const handleComplete = (captions: string[]) => {
    // Put all the new captions in our first storage box
    setGeneratedCaptions(captions);
    
    // If we have at least one caption, automatically select the first one
    if (captions.length > 0) {
      setSelectedCaption(captions[0]);
    }
  };

  // This is what our page will actually look like
  return (
    <div className="container mx-auto px-4 py-8">
      {/* The big title at the top */}
      <h1 className="text-3xl font-bold mb-4">AI Caption Generator</h1>
     
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Caption Generation & Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wizard Form */}
          <WizardProvider>
            <PostProvider>
              <PostWizard 
                onComplete={handleComplete} 
              />
            </PostProvider>
          </WizardProvider>

          {/* Caption Generation Section */}
          <div className="space-y-4">
            {/* If no captions have been generated, show the placeholder */}
            {generatedCaptions.length === 0 && (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">
                  No captions generated yet. Please complete the previous steps.
                </p>
              </Card>
            )}

            {/* When captions are generated, show them */}
            {generatedCaptions.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Generated Captions</h3>
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
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tell everyone else this is our main component
export default CaptionGenerator;
