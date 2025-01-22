import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PostWizard } from '@/components/PostWizard';

const Index = () => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleComplete = () => {
    toast({
      title: "Post Created",
      description: "Your post has been created successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
  
      
      <main className="container max-w-4xl py-12 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">EngagePerfect</h1>
          <p className="text-muted-foreground">
            Create engaging social media content with AI
          </p>
        </div>
        
        <PostWizard onComplete={handleComplete} />
      </main>
    </div>
  );
};

export default Index;