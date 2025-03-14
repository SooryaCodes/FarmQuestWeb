"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

export const RegisterForm = ({ onRegisterSuccess }: RegisterFormProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Calculate password strength whenever password changes
  useEffect(() => {
    calculatePasswordStrength(password);
  }, [password]);

  const calculatePasswordStrength = (password: string) => {
    // Update criteria checks
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
    
    setPasswordCriteria(criteria);
    
    // Calculate strength (0-4)
    const metCriteria = Object.values(criteria).filter(Boolean).length;
    setPasswordStrength(metCriteria);
  };

  const validateFullName = (name: string) => {
    if (!name) return "Full name is required";
    if (name.length < 2) return "Full name must be at least 2 characters";
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (passwordStrength < 3) return "Password is too weak";
    return "";
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);
    setErrors(prev => ({ ...prev, fullName: validateFullName(value) }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors(prev => ({ 
      ...prev, 
      password: validatePassword(value),
      confirmPassword: confirmPassword ? validateConfirmPassword(confirmPassword) : ""
    }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);
    
    setErrors({
      fullName: fullNameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });
    
    return !fullNameError && !emailError && !passwordError && !confirmPasswordError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        onRegisterSuccess();
      }, 1500);
    } else {
      // Error toast with sonner
      toast.error('Registration Failed', {
        description: 'Please check the form for errors and try again.',
        position: 'bottom-center',
        duration: 4000,
      });
    }
  };

  // Get color for strength indicator
  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-orange-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    return "bg-gradient-to-r from-[#77AD3F] to-[#0F6435]";
  };

  // Get text for strength indicator
  const getStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AuthInput
        label="Full Name"
        type="text"
        value={fullName}
        onChange={handleFullNameChange}
        placeholder="Enter your full name"
        error={errors.fullName}
      />
      
      <AuthInput
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="youremail@example.com"
        error={errors.email}
      />
      
      <div className="space-y-2">
        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Create a password"
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          error={errors.password}
        />
        
        {/* Password strength indicator */}
        {password.length > 0 && (
          <div className="space-y-2 mt-2">
            <div className="flex items-center space-x-2">
              <div className="h-2 flex-grow rounded-full bg-gray-200 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${getStrengthColor()}`} 
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                ></div>
              </div>
              <span className={`text-xs font-medium ${getStrengthColor().replace('bg-', 'text-')}`}>
                {getStrengthText()}
              </span>
            </div>
            
            {/* Password criteria checklist */}
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div className="flex items-center space-x-1">
                {passwordCriteria.length ? 
                  <Check size={12} className="text-[#0F6435]" /> : 
                  <X size={12} className="text-gray-400" />}
                <span className={passwordCriteria.length ? "text-[#0F6435]" : "text-gray-500"}>
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {passwordCriteria.uppercase ? 
                  <Check size={12} className="text-[#0F6435]" /> : 
                  <X size={12} className="text-gray-400" />}
                <span className={passwordCriteria.uppercase ? "text-[#0F6435]" : "text-gray-500"}>
                  Uppercase letter
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {passwordCriteria.lowercase ? 
                  <Check size={12} className="text-[#0F6435]" /> : 
                  <X size={12} className="text-gray-400" />}
                <span className={passwordCriteria.lowercase ? "text-[#0F6435]" : "text-gray-500"}>
                  Lowercase letter
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {passwordCriteria.number ? 
                  <Check size={12} className="text-[#0F6435]" /> : 
                  <X size={12} className="text-gray-400" />}
                <span className={passwordCriteria.number ? "text-[#0F6435]" : "text-gray-500"}>
                  Number
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {passwordCriteria.special ? 
                  <Check size={12} className="text-[#0F6435]" /> : 
                  <X size={12} className="text-gray-400" />}
                <span className={passwordCriteria.special ? "text-[#0F6435]" : "text-gray-500"}>
                  Special character
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <AuthInput
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder="Confirm your password"
        showPassword={showConfirmPassword}
        toggleShowPassword={toggleShowConfirmPassword}
        error={errors.confirmPassword}
      />

      <div className="pt-3">
        <AuthButton
          text={isSubmitting ? "Creating Account..." : "Create Account"}
          type="submit"
          disabled={isSubmitting || !!errors.fullName || !!errors.email || !!errors.password || !!errors.confirmPassword}
        />
      </div>
    </form>
  );
}; 