import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SocialAuth = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSocialAuth = async (provider: 'google' | 'facebook' | 'linkedin') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 text-center">
      <span className="text-sm text-gray-500">Or continue with</span>
      <div className="mt-4 space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleSocialAuth('google')}
          disabled={loading}
        >
          <img src="/lovable-uploads/59be58ba-79a6-4620-a359-319fb8d3f7e9.png" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default SocialAuth;