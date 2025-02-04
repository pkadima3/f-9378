
import React, { useRef } from 'react';
import { Card } from './ui/card';
import { PostSteps } from './post/PostSteps';
import { PostPreview } from './preview/PostPreview';
import { usePost } from './post/PostContext';
import { PostUploader } from './post/PostUploader';
import { PostManager } from './post/PostManager';
import { WizardStepManager } from './wizard/WizardStepManager';
import { toast } from './ui/use-toast';

interface PostWizardProps {
  onComplete: () => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

export const PostWizard: React.FC<PostWizardProps> = ({ 
  onComplete, 
  isGenerating, 
  setIsGenerating 
}) => {
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
    file,
    setFile,
    setPreview,
    setFileType,
  } = usePost();

  const imageRef = useRef<HTMLImageElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const { uploadMedia } = PostUploader();
  const { generateCaptions, handleComplete } = PostManager({ onComplete });

  const handleBack = () => {
    setStep(Math.max(1, step - 1));
  };

  const handleNext = async () => {
    try {
      if (step === 1 && file && preview) {
        setIsUploading(true);
        await uploadMedia();
        toast({
          title: "Upload successful",
          description: "Your media has been uploaded successfully.",
        });
        setStep(2);
        return;
      }
      
      if (step === 5 && platform && niche && goal && tone) {
        setIsGenerating(true);
        await generateCaptions({
          imageUrl: preview,
          fileType: fileType,
          platform,
          niche,
          goal,
          tone
        });
        setStep(6);
        return;
      }
      
      // For other steps, just move forward if validation passes
      if (!isNextDisabled()) {
        setStep(Math.min(6, step + 1));
      }
    } catch (error) {
      console.error('Error in handleNext:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setIsGenerating(false);
    }
  };

  const isNextDisabled = () => {
    if (isUploading || isGenerating) return true;
    
    switch (step) {
      case 1:
        return !file || !preview;
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

  const handleFileUpload = (file: File) => {
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setFileType(file.type);
    };
    reader.readAsDataURL(file);
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
          isLoading={isUploading || isGenerating}
        >
          <WizardStepManager
            step={step}
            isGeneratingCaptions={isGenerating}
            onUpload={handleFileUpload}
          />
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
