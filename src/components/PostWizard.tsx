import React, { useRef } from 'react';
import { Card } from './ui/card';
import { PostSteps } from './post/PostSteps';
import { PostPreview } from './preview/PostPreview';
import { useWizard } from './wizard/WizardContext';
import { PostUploader } from './post/PostUploader';
import { PostManager } from './post/PostManager';
import { UploadStep } from './wizard/steps/UploadStep';
import { PlatformStep } from './wizard/steps/PlatformStep';
import { NicheStep } from './wizard/steps/NicheStep';
import { GoalStep } from './wizard/steps/GoalStep';
import { ToneStep } from './wizard/steps/ToneStep';
import { CaptionsStep } from './wizard/steps/CaptionsStep';

export type Platform = 'Instagram' | 'LinkedIn' | 'Facebook' | 'Twitter';

interface PostWizardProps {
  onComplete: () => void;
}

export const PostWizard: React.FC<PostWizardProps> = ({ onComplete }) => {
  const {
    step,
    setStep,
    platform,
    niche,
    goal,
    tone,
    preview,
    fileType,
    selectedCaption,
    overlayEnabled,
  } = useWizard();

  const imageRef = useRef<HTMLImageElement>(null);
  const [isGeneratingCaptions, setIsGeneratingCaptions] = React.useState(false);
  const { uploadMedia, isUploading, uploadProgress } = PostUploader({ imageRef });
  const { generateCaptions, handleComplete } = PostManager({ onComplete });

  const handleBack = () => {
    setStep(Math.max(1, step - 1));
  };

  const handleNext = async () => {
    if (step === 1 && preview) {
      await uploadMedia();
    } else if (step === 5) {
      setIsGeneratingCaptions(true);
      // Pass the image metadata object with the required information
      await generateCaptions({
        imageUrl: preview,
        fileType: fileType,
        platform,
        niche,
        goal,
        tone
      });
      setIsGeneratingCaptions(false);
      setStep(6);
    } else {
      setStep(Math.min(6, step + 1));
    }
  };

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !preview;
      case 2:
        return !platform;
      case 3:
        return !niche;
      case 4:
        return !goal;
      case 5:
        return !tone;
      case 6:
        return !selectedCaption;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <UploadStep
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            onUpload={uploadMedia}
          />
        );
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <PostSteps
          step={step}
          onBack={handleBack}
          onNext={handleNext}
          onComplete={handleComplete}
          isNextDisabled={isNextDisabled()}
        >
          {renderStep()}
        </PostSteps>
      </Card>

      <div className="sticky top-6">
        <PostPreview 
          imageUrl={preview}
          caption={selectedCaption || ''}
          overlayEnabled={overlayEnabled}
          platform={platform}
          fileType={fileType}
        />
      </div>
    </div>
  );
};

export default PostWizard;