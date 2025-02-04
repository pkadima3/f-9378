import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthForm from "@/components/auth/AuthForm";
import SocialAuth from "@/components/auth/SocialAuth";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isSignUp, setIsSignUp] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('mode') === 'signup';
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setIsSignUp(searchParams.get('mode') === 'signup');
  }, [location.search]);

  const toggleMode = () => {
    const newMode = !isSignUp;
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('mode', newMode ? 'signup' : 'signin');
    navigate({ search: searchParams.toString() });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[20px] shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="text-[#4461F2] text-3xl">✧</div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">
            {isSignUp ? "Create account" : "Welcome back"}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            {isSignUp ? "Sign up for your account" : "Sign in to your account"}
          </p>

          <AuthForm isSignUp={isSignUp} onToggleMode={toggleMode} />
          <SocialAuth />
        </div>
      </div>
    </div>
  );
};

export default Auth;