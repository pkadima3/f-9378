// This is the main part of our app that creates and shows caption cards
import React, { useState } from 'react';

// These are special helper components we need
import { PostWizard } from '@/components/PostWizard';
import { WizardProvider } from '@/components/wizard/WizardContext';
import { PostProvider } from '@/components/post/PostContext';
import { CaptionCard } from '@/components/caption/CaptionCard';

// This is our main magic box (component) that does all the caption generation
const CaptionGenerator = () => {
  // Think of these like special storage boxes for our captions
  // The first box (generatedCaptions) stores ALL the captions we make
  // The second box (selectedCaption) remembers which caption we've picked
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<string | null>(null);

  // This is like a special helper function that happens when we finish making captions
  // It does three important things:
  // 1. Saves all the new captions
  // 2. Automatically selects the first caption
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
      
      {/* This section shows our generated caption cards */}
      <div className="space-y-4 mb-6">
        {/* Magic trick: For each caption we generate, create a card */}
        {generatedCaptions.map((caption, index) => (
          <CaptionCard
            // Each card needs a unique "name tag" (key)
            key={index}
            
            // Pass the actual caption text
            caption={caption}
            
            // Tell each card which number it is
            index={index}
            
            // This helps us change a caption if we want to edit it
            onEdit={(index, newCaption) => {
              // Make a copy of all captions
              const newCaptions = [...generatedCaptions];
              
              // Replace the old caption with the new one
              newCaptions[index] = newCaption;
              
              // Update our storage box with the new list of captions
              setGeneratedCaptions(newCaptions);
            }}
            
            // What happens when we click on a caption
            onSelect={(caption) => {
              // Remember which caption we selected
              setSelectedCaption(caption);
            }}
            
            // Highlight the card if it's the currently selected one
            isSelected={selectedCaption === caption}
          />
        ))}

        {/* If no captions have been made yet, show a friendly message */}
        {generatedCaptions.length === 0 && (
          <p className="text-center text-muted-foreground p-4">
            No captions generated yet. Complete the wizard to generate captions.
          </p>
        )}
      </div>

      {/* This is our wizard form where we create captions */}
      <div className="space-y-6">
        {/* These providers are like special helper robots that make things work smoothly */}
        <WizardProvider>
          <PostProvider>
            {/* The actual wizard that helps generate captions */}
            <PostWizard 
              // When the wizard is done, run our special helper function
              onComplete={handleComplete} 
            />
          </PostProvider>
        </WizardProvider>
      </div>
    </div>
  );
};

// Tell everyone else this is our main component
export default CaptionGenerator;