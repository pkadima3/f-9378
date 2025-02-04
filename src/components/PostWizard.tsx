import React, { useRef } from 'react';
import { Card } from './ui/card';
import { PostSteps } from './post/PostSteps';
import { PostPreview } from './preview/PostPreview';
import { useWizard } from './wizard/WizardContext';
import { usePost } from './post/PostContext';
import { PostUploader } from './post/PostUploader';
import { PostManager } from './post/PostManager';
import { WizardStepManager } from './wizard/WizardStepManager';
import { toast } from '@/hooks/use-toast';

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

  const {
    file,
    setFile,
    setPreview,
    setFileType
  } = usePost();

  const imageRef = useRef<HTMLImageElement>(null);
  const [isGeneratingCaptions, setIsGeneratingCaptions] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const { uploadMedia } = PostUploader();
  const { generateCaptions, handleComplete } = PostManager({ onComplete });

  const handleBack = () => {
    setStep(Math.max(1, step - 1));
  };

  const handleNext = async () => {
    if (step === 1 && file && preview) {
      setIsUploading(true);
      try {
        await uploadMedia();
        setStep(2);
        toast({
          title: "Upload successful",
          description: "Your media has been uploaded successfully.",
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload failed",
          description: "There was an error uploading your media. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
      return;
    }
    
    if (step === 5) {
      setIsGeneratingCaptions(true);
      try {
        await generateCaptions({
          imageUrl: preview,
          fileType: fileType,
          platform,
          niche,
          goal,
          tone
        });
        setStep(6);
      } catch (error) {
        console.error('Caption generation error:', error);
        toast({
          title: "Caption Generation Failed",
          description: "There was an error generating captions. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsGeneratingCaptions(false);
      }
      return;
    }
    
    setStep(Math.min(6, step + 1));
  };

  const isNextDisabled = () => {
    if (isUploading || isGeneratingCaptions) return true;
    
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
          isLoading={isUploading || isGeneratingCaptions}
        >
          <WizardStepManager
            step={step}
            isGeneratingCaptions={isGeneratingCaptions}
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

export default PostWizard;