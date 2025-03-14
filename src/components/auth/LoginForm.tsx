"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { toast } from "sonner";
import {  Check, X } from "lucide-react";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    email: "",
    password: ""
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors(prev => ({ ...prev, password: validatePassword(value) }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({
      email: emailError,
      password: passwordError
    });
    
    return !emailError && !passwordError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        onLoginSuccess();
      }, 1500);
    } else {
      // Error toast with sonner
      toast.error('Login Failed', {
        description: 'Please check your email and password and try again.',
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
    <form onSubmit={handleSubmit} className="space-y-6">
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
          placeholder="Enter your password"
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
      
      <div className="text-right">
        <Link href="/forgot-password" className="text-gray-400 text-sm hover:text-[#0F6435] transition-colors">
          forgot password?
        </Link>
      </div>

      <div className="pt-3">
        <AuthButton
          text={isSubmitting ? "Logging in..." : "Login"}
          type="submit"
          disabled={isSubmitting || !!errors.email || !!errors.password}
        />
      </div>
    </form>
  );
};