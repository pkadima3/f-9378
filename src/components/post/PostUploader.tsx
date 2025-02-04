import { usePost } from './PostContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const PostUploader = () => {
  const { file, setPostId } = usePost();

  const uploadMedia = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload media",
        variant: "destructive",
      });
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const { data: post, error: dbError } = await supabase
        .from('posts')
        .insert({
          user_id: session.user.id,
          image_url: publicUrl,
          platform: '',
          niche: '',
          goal: '',
          tone: ''
        })
        .select()
        .single();

      if (dbError) {
        throw dbError;
      }

      if (post) {
        setPostId(post.id);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  return {
    uploadMedia
  };
};