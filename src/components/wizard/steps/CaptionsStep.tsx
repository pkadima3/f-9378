
import React from 'react';
import { Card } from '@/components/ui/card';
import { CaptionCard } from '@/components/caption/CaptionCard';
import { CaptionSettings } from '@/components/post/CaptionSettings';
import { useWizard } from '../WizardContext';

interface CaptionsStepProps {
  isGeneratingCaptions: boolean;
}

export const CaptionsStep: React.FC<CaptionsStepProps> = ({ isGeneratingCaptions }) => {
  const { 
    captions, 
    setCaptions, 
    selectedCaption, 
    setSelectedCaption,
    overlayEnabled,
    setOverlayEnabled
  } = useWizard();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">
          6
        </div>
        <h2 className="text-xl font-semibold">Generated Captions</h2>
      </div>
      <CaptionSettings
        overlayEnabled={overlayEnabled}
        onOverlayChange={setOverlayEnabled}
      />
      <div className="space-y-4">
        {/* If no captions have been generated, show the placeholder */}
        {captions.length === 0 && (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">
              No captions generated yet. Please complete the previous steps.
            </p>
          </Card>
        )}

        {/* When captions are generated, show them */}
        {captions.length > 0 && (
          <div className="space-y-4">
            {captions.map((caption, index) => (
              <CaptionCard
                key={index}
                caption={caption}
                index={index}
                onEdit={(index, newCaption) => {
                  const newCaptions = [...captions];
                  newCaptions[index] = newCaption;
                  setCaptions(newCaptions);
                }}
                onSelect={(caption) => {
                  setSelectedCaption(caption);
                }}
                isSelected={selectedCaption === caption}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
