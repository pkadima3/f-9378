import React from 'react';
import { CaptionEditor } from '../../CaptionEditor';
import { CaptionSettings } from '../../post/CaptionSettings';
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
      <CaptionEditor
        captions={captions}
        onSelect={setSelectedCaption}
        onEdit={(index, newCaption) => {
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