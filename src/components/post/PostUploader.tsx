import React, { useState } from 'react';
import { usePost } from './PostContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '../ui/use-toast';
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
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

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

      // Process the file (handle crop, rotation if needed)
      const { finalBlob, metadata } = await processMediaFile(
        file,
        undefined,
        0,
        imageRef.current
      );

      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, finalBlob, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Save post data to the database
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

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      if (post) {
        setPostId(post.id);
        toast({
          title: "Upload successful",
          description: "Your media has been uploaded successfully.",
        });
      }

      setUploadProgress(100);
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