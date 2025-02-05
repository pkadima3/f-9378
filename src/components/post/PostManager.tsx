
import { usePost } from './PostContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Platform } from '@/types/post';

interface PostManagerProps {
  onComplete: (captions: string[]) => void;
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
    setCaptions,
    setSelectedCaption,
  } = usePost();

  const generateCaptions = async (imageMetadata: ImageMetadata) => {
    if (!platform || !niche || !goal || !tone) {
      throw new Error("Missing required fields for caption generation");
    }

    try {
      console.log('Generating captions with metadata:', imageMetadata);
      
      const { data, error } = await supabase.functions.invoke('generate-captions', {
        body: { platform, niche, goal, tone, imageMetadata },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data?.captions || !Array.isArray(data.captions)) {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format from caption generation');
      }

      console.log('Generated captions:', data.captions);
      setCaptions(data.captions);
      setSelectedCaption(data.captions[0]);
      
      return data.captions;
    } catch (error) {
      console.error('Caption generation error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate captions",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleComplete = async () => {
    try {
      if (!postId || !selectedCaption) {
        throw new Error("Missing required information to complete the post");
      }

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

      onComplete([selectedCaption]); // Pass the selected caption back to the callback
      
      toast({
        title: "Post Created",
        description: "Your post has been created successfully.",
      });
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save post",
        variant: "destructive",
      });
      throw error;
    }
  };

  return { generateCaptions, handleComplete };
};
