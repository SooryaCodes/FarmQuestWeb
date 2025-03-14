import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
  error?: string;
}

export const AuthInput = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  showPassword,
  toggleShowPassword,
  error,
}: AuthInputProps) => {
  return (
    <div className="mb-2">
      <label className="block text-gray-600 mb-1 text-sm">{label}</label>
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-full border ${error ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-primary-medium'} focus:outline-none focus:ring-1 text-sm`}
        />
        {type === "password" && toggleShowPassword && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}; 