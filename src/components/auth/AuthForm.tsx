import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";

interface AuthFormProps {
  isSignUp: boolean;
  onToggleMode: () => void;
}

const AuthForm = ({ isSignUp, onToggleMode }: AuthFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
        <FormField
          Icon={User}
          name="username"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleInputChange}
        />
      )}
      
      <FormField
        Icon={Mail}
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
      />

      <PasswordInput
        name="password"
        placeholder={isSignUp ? "Create a password" : "Enter your password"}
        value={formData.password}
        onChange={handleInputChange}
      />

      {isSignUp && (
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
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