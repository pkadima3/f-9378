import React from 'react';
import { UploadStep } from './steps/UploadStep';
import { PlatformStep } from './steps/PlatformStep';
import { NicheStep } from './steps/NicheStep';
import { GoalStep } from './steps/GoalStep';
import { ToneStep } from './steps/ToneStep';
import { CaptionsStep } from './steps/CaptionsStep';
import { usePost } from '../post/PostContext';

interface WizardStepManagerProps {
  step: number;
  isGeneratingCaptions: boolean;
  onUpload: (file: File) => void;
}

export const WizardStepManager: React.FC<WizardStepManagerProps> = ({
  step,
  isGeneratingCaptions,
  onUpload
}) => {
  switch (step) {
    case 1:
      return <UploadStep onUpload={onUpload} />;
    case 2:
      return <PlatformStep />;
    case 3:
      return <NicheStep />;
    case 4:
      return <GoalStep />;
    case 5:
      return <ToneStep />;
    case 6:
      return <CaptionsStep isGeneratingCaptions={isGeneratingCaptions} />;
    default:
      return null;
  }
};