import React, { useState } from 'react';
import { Card } from './ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { processMediaFile } from '@/utils/mediaUtils';
import { PostSteps } from './post/PostSteps';
import { PostPreview } from './preview/PostPreview';
import { useNavigate } from 'react-router-dom';
import { WizardProvider, useWizard } from './wizard/WizardContext';
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

const WizardContent = ({ onComplete }: PostWizardProps) => {
  const navigate = useNavigate();
  const {
    step,
    setStep,
    platform,
    niche,
    goal,
    tone,
    file,
    preview,
    fileType,
    postId,
    setPostId,
    captions,
    setCaptions,
    selectedCaption,
    setSelectedCaption,
    overlayEnabled,
  } = useWizard();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingCaptions, setIsGeneratingCaptions] = useState(false);
  const [imageMetadata, setImageMetadata] = useState<any>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const generateCaptions = async () => {
    if (!platform || !niche || !goal || !tone || !imageMetadata) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before generating captions.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingCaptions(true);
    setCaptions([]); // Clear existing captions

    try {
      const { data, error } = await supabase.functions.invoke('generate-captions', {
        body: { platform, niche, goal, tone, imageMetadata },
      });

      if (error) throw error;

      if (!data?.captions || !Array.isArray(data.captions)) {
        throw new Error('Invalid response format from caption generation');
      }

      setCaptions(data.captions);
      setSelectedCaption(data.captions[0]);
      
      toast({
        title: "Captions Generated",
        description: "Your captions have been generated successfully.",
      });
    } catch (error) {
      console.error('Caption generation error:', error);
      toast({
        title: "Caption Generation Failed",
        description: error instanceof Error ? error.message : "There was an error generating captions.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingCaptions(false);
    }
  };

  const uploadMedia = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to upload media.",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      const { finalBlob, metadata } = await processMediaFile(
        file,
        undefined,
        0,
        imageRef.current
      );

      setImageMetadata(metadata);

      const fileExt = metadata.originalName.split('.').pop();
      const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, finalBlob, {
          contentType: metadata.contentType,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const { data: post, error: dbError } = await supabase
        .from('posts')
        .insert({
          image_url: publicUrl,
          platform: platform || 'default',
          user_id: user.id
        })
        .select()
        .single();

      if (dbError) throw dbError;

      setPostId(post.id);
      setStep(2);
      toast({
        title: "Upload successful",
        description: "Your media has been uploaded successfully.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "There was an error uploading your media.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleNext = async () => {
    if (step === 1 && file && !postId) {
      await uploadMedia();
    } else if (step === 5) {
      await generateCaptions();
      setStep(prev => prev + 1);
    } else {
      setStep(prev => Math.min(6, prev + 1));
    }
  };

  const handleComplete = async () => {
    if (!postId || !selectedCaption) return;
    
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          platform,
          niche,
          goal,
          tone,
          selected_caption: selectedCaption
        })
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Post Created",
        description: "Your post has been created successfully.",
      });
      
      onComplete();
    } catch (error) {
      toast({
        title: "Error saving post",
        description: error instanceof Error ? error.message : "Failed to save post settings",
        variant: "destructive",
      });
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

export const PostWizard: React.FC<PostWizardProps> = (props) => {
  return (
    <WizardProvider>
      <WizardContent {...props} />
    </WizardProvider>
  );
};