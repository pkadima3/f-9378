
import React from 'react';
import { CaptionEditor } from '../../CaptionEditor';
import { CaptionSettings } from '../../post/CaptionSettings';
import { useWizard } from '../WizardContext';
import { Card } from '../../ui/card';
import { CaptionCard } from '../../caption/CaptionCard';

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

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Generated Captions</h3>
        <div className="space-y-4">
          {isGeneratingCaptions ? (
            <p className="text-center text-muted-foreground">Generating captions...</p>
          ) : captions.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No captions generated yet. Please complete the previous steps.
            </p>
          ) : (
            captions.map((caption, index) => (
              <CaptionCard
                key={index}
                caption={caption}
                index={index}
                onEdit={(index, newCaption) => {
                  const newCaptions = [...captions];
                  newCaptions[index] = newCaption;
                  setCaptions(newCaptions);
                }}
                onSelect={() => setSelectedCaption(caption)}
                isSelected={selectedCaption === caption}
              />
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
