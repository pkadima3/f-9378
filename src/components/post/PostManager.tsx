import React from 'react';
import { usePost } from './PostContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Platform } from '@/types/post';

interface PostManagerProps {
  onComplete: () => void;
}

interface ImageMetadata {
  imageUrl: string;
  fileType: string;
  platform: Platform;
  niche: string;
  goal: string;
  tone: string;
}

export const PostManager = ({ onComplete }: PostManagerProps) => {
  const {
    postId,
    platform,
    niche,
    goal,
    tone,
    selectedCaption,
    captions,
    setCaptions,
    setSelectedCaption,
  } = usePost();

  const generateCaptions = async (imageMetadata: ImageMetadata) => {
    if (!platform || !niche || !goal || !tone || !imageMetadata) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before generating captions.",
        variant: "destructive",
      });
      return;
    }

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

  return { generateCaptions, handleComplete };
};
