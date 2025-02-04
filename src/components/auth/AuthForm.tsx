import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  isSignUp: boolean;
  onToggleMode: () => void;
}

const AuthForm = ({ isSignUp, onToggleMode }: AuthFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  return (
    <form onSubmit={handleAuth} className="space-y-4">
      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

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

      <div className="text-center text-sm">
        {isSignUp ? (
          <span>
            Already have an account?{" "}
            <Button
              variant="link"
              className="text-[#4461F2] p-0 h-auto font-normal"
              onClick={onToggleMode}
              type="button"
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
              onClick={onToggleMode}
              type="button"
            >
              Sign up
            </Button>
          </span>
        )}
      </div>
    </form>
  );
};

export default AuthForm;