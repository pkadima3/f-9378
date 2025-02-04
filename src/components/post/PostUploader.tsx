import React, { useState } from 'react';
import { usePost } from './PostContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { processMediaFile } from '@/utils/mediaUtils';

interface PostUploaderProps {
  imageRef: React.RefObject<HTMLImageElement>;
}

export const PostUploader = ({ imageRef }: PostUploaderProps) => {
  const {
    file,
    platform,
    niche,
    goal,
    tone,
    selectedCaption,
    setPostId,
    setStep
  } = usePost();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
        return;
      }

      const { finalBlob, metadata } = await processMediaFile(
        file,
        undefined,
        0,
        imageRef.current
      );

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
          user_id: user.id,
          image_url: publicUrl,
          platform: platform || 'Instagram',
          niche: niche || '',
          goal: goal || '',
          tone: tone || '',
          selected_caption: selectedCaption || ''
        })
        .select()
        .single();

      if (dbError) throw dbError;

      if (post) {
        setPostId(post.id);
        setStep(2);
        toast({
          title: "Upload successful",
          description: "Your media has been uploaded successfully.",
        });
      }
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

  return { uploadMedia, isUploading, uploadProgress };
};