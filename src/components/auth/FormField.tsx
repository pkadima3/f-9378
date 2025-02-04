import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

interface FormFieldProps {
  Icon: LucideIcon;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormField = ({ 
  Icon, 
  name, 
  type = "text", 
  placeholder, 
  value, 
  onChange,
  required = true 
}: FormFieldProps) => {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10"
        required={required}
      />
    </div>
  );
};

export default FormField;