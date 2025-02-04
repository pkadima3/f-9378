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
    setCaptions,
    setSelectedCaption,
  } = usePost();

  const generateCaptions = async (imageMetadata: ImageMetadata) => {
    if (!platform || !niche || !goal || !tone) {
      throw new Error("Missing required fields for caption generation");
    }

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
      throw error;
    }
  };

  const handleComplete = async () => {
    if (!postId || !selectedCaption) {
      toast({
        title: "Error",
        description: "Missing required information to complete the post",
        variant: "destructive",
      });
      return;
    }
    
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
      console.error('Error saving post:', error);
      throw error;
    }
  };

  return { generateCaptions, handleComplete };
};