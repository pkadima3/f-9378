import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSignUp, setIsSignUp] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('mode') === 'signup';
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.username,
            },
          },
        });
        if (error) throw error;
        
        toast({
          title: "Success!",
          description: "Please check your email to confirm your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
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

  const handleSocialAuth = async (provider: 'google' | 'facebook' | 'linkedin') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
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

          {errorMessage && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  name="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={isSignUp ? "Create a password" : "Enter your password"}
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {isSignUp && (
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#4461F2] hover:bg-[#4461F2]/90"
              disabled={loading}
            >
              {loading ? "Loading..." : (isSignUp ? "Sign up" : "Sign in")}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <span>Or continue with</span>
            <div className="mt-4 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialAuth('google')}
              >
                <img src="/lovable-uploads/59be58ba-79a6-4620-a359-319fb8d3f7e9.png" alt="Google" className="w-5 h-5 mr-2" />
                Continue with Google
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            {isSignUp ? (
              <span>
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="text-[#4461F2] p-0 h-auto font-normal"
                  onClick={() => navigate("/auth?mode=signin")}
                >
                  Sign in
                </Button>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="text-[#4461F2] p-0 h-auto font-normal"
                  onClick={() => navigate("/auth?mode=signup")}
                >
                  Sign up
                </Button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;