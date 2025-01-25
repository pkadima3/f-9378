import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MediaUpload } from './MediaUpload';
import { CaptionSettings } from './post/CaptionSettings';
import { PostSteps } from './post/PostSteps';
import { PostPreview } from './preview/PostPreview';
import { CaptionEditor } from './CaptionEditor';

export type Platform = 'Instagram' | 'Twitter' | 'Facebook' | 'LinkedIn';

export const PostWizard = ({ onComplete }: { onComplete?: () => void }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [platform, setPlatform] = useState<Platform>('Instagram');
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState('');
  const [tone, setTone] = useState('');
  const [captions, setCaptions] = useState<string[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<string>('');
  const [overlayEnabled, setOverlayEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMediaUpload = async (url: string, type: string) => {
    setImageUrl(url);
    setFileType(type);
    setStep(2);
  };

  const handleCaptionSettings = async (settings: {
    platform: Platform;
    niche: string;
    goal: string;
    tone: string;
  }) => {
    setPlatform(settings.platform);
    setNiche(settings.niche);
    setGoal(settings.goal);
    setTone(settings.tone);
    setStep(3);

    try {
      setIsLoading(true);
      const { data: generatedCaptions, error } = await supabase.functions.invoke('generate-captions', {
        body: {
          platform: settings.platform,
          niche: settings.niche,
          goal: settings.goal,
          tone: settings.tone,
          imageMetadata: {
            originalName: imageUrl.split('/').pop(),
            contentType: fileType,
          },
        },
      });

      if (error) throw error;
      console.log('Generated captions:', generatedCaptions);
      setCaptions(generatedCaptions.captions || []);
    } catch (error) {
      console.error('Error generating captions:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate captions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaptionSelect = (caption: string) => {
    setSelectedCaption(caption);
  };

  const handleCaptionEdit = (index: number, newCaption: string) => {
    const newCaptions = [...captions];
    newCaptions[index] = newCaption;
    setCaptions(newCaptions);
  };

  const handleComplete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Error',
          description: 'Please log in to save your post.',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase.from('posts').insert({
        user_id: user.id,
        image_url: imageUrl,
        platform,
        niche,
        goal,
        tone,
        selected_caption: selectedCaption,
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your post has been saved successfully!',
      });

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your post. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-8">
      <PostSteps
        currentStep={step}
        onStepClick={(newStep) => {
          if (newStep < step) {
            setStep(newStep);
          }
        }}
      />

      {step === 1 && (
        <MediaUpload onUpload={handleMediaUpload} />
      )}

      {step === 2 && (
        <CaptionSettings
          onSubmit={handleCaptionSettings}
          initialValues={{ platform, niche, goal, tone }}
        />
      )}

      {step === 3 && (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <CaptionEditor
              captions={captions}
              onSelect={handleCaptionSelect}
              onEdit={handleCaptionEdit}
              selectedCaption={selectedCaption}
              isLoading={isLoading}
            />
          </div>
          <div>
            <PostPreview
              imageUrl={imageUrl}
              caption={selectedCaption}
              overlayEnabled={overlayEnabled}
              platform={platform}
              fileType={fileType}
            />
          </div>
        </div>
      )}

      {step === 3 && selectedCaption && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Save Post
          </button>
        </div>
      )}
    </div>
  );
};