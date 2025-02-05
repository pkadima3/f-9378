// This is the main part of our app that creates and shows caption cards
import React, { useState } from 'react';

// These are special helper components we need
import { PostWizard } from '@/components/PostWizard';
import { WizardProvider } from '@/components/wizard/WizardContext';
import { PostProvider } from '@/components/post/PostContext';

// This is our main magic box (component) that does all the caption generation
const CaptionGenerator = () => {
  // Think of these like special storage boxes for our captions
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<string | null>(null);

  // This is like a special helper function that happens when we finish making captions
  const handleComplete = (captions: string[]) => {
    // Put all the new captions in our first storage box
    setGeneratedCaptions(captions);
  };

  // This is what our page will actually look like
  return (
    <div className="container mx-auto px-4 py-8">
      {/* The big title at the top */}
      <h1 className="text-3xl font-bold mb-4">AI Caption Generator</h1>
     
      {/* This is our container for the side-by-side layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column with wizard form */}
        <WizardProvider>
          <PostProvider>
            <PostWizard 
              onComplete={handleComplete} 
            />
          </PostProvider>
        </WizardProvider>

        {/* Right column for preview */}
        <div className="sticky top-6">
          {/* The preview will be rendered here by PostWizard */}
        </div>
      </div>
    </div>
  );
};

// Tell everyone else this is our main component
export default CaptionGenerator;
