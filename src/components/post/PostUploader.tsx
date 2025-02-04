import React, { useState } from 'react';
import { usePost } from './PostContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { processMediaFile } from '@/utils/mediaUtils';

interface PostUploaderProps {
  file: File | null;
  imageRef: React.RefObject<HTMLImageElement>;
  setPostId: (id: string) => void;
  setStep: (step: number) => void;
}

export const PostUploader = ({
  file,
  imageRef,
  setPostId,
  setStep,
}: PostUploaderProps) => {
  const { platform, niche, goal, tone } = usePost();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadMedia = async () => {
    // Check if file exists
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload media",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Process the file (handle crop, rotation if needed)
      const { finalBlob, metadata } = await processMediaFile(
        file,
        undefined,
        undefined,
        imageRef.current
      );

      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;

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
          user_id: session.user.id,
          image_url: publicUrl,
          platform,
          niche,
          goal,
          tone
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      setUploadProgress(100);
      
      if (post) {
        setPostId(post.id);
        setStep(2); // Move to next step
        toast({
          title: "Upload successful",
          description: "Your media has been uploaded successfully.",
        });
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your media",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <button
      onClick={uploadMedia}
      disabled={isUploading || !file}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isUploading ? 'Uploading...' : 'Upload Media'}
    </button>
  );
};