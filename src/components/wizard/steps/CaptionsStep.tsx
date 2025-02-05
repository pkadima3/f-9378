
import React, { useEffect } from 'react';
import { CaptionEditor } from '../../CaptionEditor';
import { CaptionSettings } from '../../post/CaptionSettings';
import { useWizard } from '../WizardContext';
import { Card } from '../../ui/card';

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

  console.log('CaptionsStep - Current captions:', captions);
  console.log('CaptionsStep - Is generating:', isGeneratingCaptions);
  console.log('CaptionsStep - Selected caption:', selectedCaption);

  useEffect(() => {
    console.log('CaptionsStep mounted/updated with captions:', captions);
  }, [captions]);

  if (!captions || captions.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">
            6
          </div>
          <h2 className="text-xl font-semibold">Generated Captions</h2>
        </div>
        <p className="text-center text-muted-foreground">
          No captions generated yet. Please complete the previous steps.
        </p>
      </Card>
    );
  }

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
      <CaptionEditor
        captions={captions}
        onSelect={(caption) => {
          console.log('Selecting caption:', caption);
          setSelectedCaption(caption);
        }}
        onEdit={(index, newCaption) => {
          console.log('Editing caption at index:', index, 'New caption:', newCaption);
          const newCaptions = [...captions];
          newCaptions[index] = newCaption;
          setCaptions(newCaptions);
        }}
        selectedCaption={selectedCaption}
        isLoading={isGeneratingCaptions}
      />
    </div>
  );
};
