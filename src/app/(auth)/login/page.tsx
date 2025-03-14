"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { CurvedImageGallery } from "@/components/auth/CurvedImageGallery";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { CheckCircle, Leaf, BarChart2, Shield, Clock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Generate random grid items once on component mount
  const [gridItems] = useState(() => {
    return Array(144).fill(0).map(() => ({
      shouldShowOverlay: Math.random() > 0.5,
      pulseAnimation: `pulse ${2 + Math.random() * 4}s infinite ${Math.random() * 3}s ease-in-out`,
      overlayOpacity: 0.1 + Math.random() * 0.3,
      overlayScale: 0.6 + Math.random() * 0.4,
      fadeAnimation: `fadeInOut ${4 + Math.random() * 5}s infinite ${Math.random() * 2}s ease-in-out`,
      bgColor: Math.random() > 0.7 ? 'bg-[#77AD3F]/20' : '',
    }));
  });

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateForm = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email) || !password || password.length < 6) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        // Success toast with sonner
        toast.success('Login Successful!', {
          description: 'Welcome back to FarmQuest. Redirecting to your dashboard...',
          position: 'bottom-center',
          duration: 4000,
        });
        setIsSubmitting(false);
        // Handle actual login logic here
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

  return (
    <>
      <Toaster position="bottom-center" richColors expand={true} />
      <div className="min-h-screen flex flex-col md:flex-row bg-white">
        {/* Left section with background for desktop */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#77AD3F] to-[#0F6435] p-8 relative overflow-hidden">
          {/* Grid background pattern - improved visibility */}
          <div className="absolute inset-0 bg-[#0F6435]">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-[1px]">
              {isClient && gridItems.map((item, i) => (
                <div 
                  key={i} 
                  className={`border-[1px] border-[#77AD3F]/40 relative overflow-hidden ${item.bgColor}`}
                  style={{
                    animation: item.pulseAnimation,
                  }}
                >
                  {item.shouldShowOverlay && (
                    <div 
                      className="absolute inset-0 bg-white/20 rounded-sm"
                      style={{
                        opacity: item.overlayOpacity,
                        transform: `scale(${item.overlayScale})`,
                        animation: item.fadeAnimation,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#77AD3F]/70 to-[#0F6435]/80"></div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-between text-white h-full w-full py-6">
            {/* Header section */}
       
            {/* Main content - better spacing */}
            <div className="flex-grow flex flex-col justify-center items-center my-8">
              <div className="mb-8 relative w-[280px] h-[180px]">
                <Image 
                  src="/images/Farm-quest-logo-white.svg" 
                  alt="FarmQuest Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              
              <h1 className="text-3xl font-bold mb-5 text-center">Elegance in Focus</h1>
              <p className="text-xl mb-12 max-w-md text-center leading-relaxed">
                Your complete farm management solution designed for modern agriculture
              </p>
              
              {/* Feature highlights with improved spacing and styling */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-8 w-full max-w-lg mb-12">
                <div className="flex items-start space-x-3 group">
                  <div className="bg-white/20 p-2.5 rounded-full group-hover:bg-white/40 transition-all shadow-sm">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Crop Management</h3>
                    <p className="text-sm text-white/90 leading-relaxed">Track growth cycles and optimize planting schedules</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 group">
                  <div className="bg-white/20 p-2.5 rounded-full group-hover:bg-white/40 transition-all shadow-sm">
                    <BarChart2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Yield Analytics</h3>
                    <p className="text-sm text-white/90 leading-relaxed">Data-driven insights to maximize your farm&apos;s productivity</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 group">
                  <div className="bg-white/20 p-2.5 rounded-full group-hover:bg-white/40 transition-all shadow-sm">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Secure Platform</h3>
                    <p className="text-sm text-white/90 leading-relaxed">Enterprise-grade security for your farm&apos;s valuable data</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 group">
                  <div className="bg-white/20 p-2.5 rounded-full group-hover:bg-white/40 transition-all shadow-sm">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Real-time Updates</h3>
                    <p className="text-sm text-white/90 leading-relaxed">Instant notifications and live monitoring capabilities</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial or highlight section - improved styling */}
            <div className="mt-auto bg-white/15 p-6 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg">
              <div className="flex items-center space-x-4 mb-3">
                <div className="bg-white/30 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-lg">FarmQuest Flagship Event</h3>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                Join our annual conference where agricultural experts share insights on sustainable farming practices and the latest in agritech innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Right section with login form - improved styling */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-gray-50">
          <div className="w-full max-w-md  rounded-3xl p-8 relative  border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold">
                Welcome Back
                <br />
                To <span className="text-[#77AD3F]">Farm</span><span className="text-[#0F6435]">Quest</span>
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AuthInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@example.com"
                error={email && !/\S+@\S+\.\S+/.test(email) ? "Please enter a valid email address" : ""}
              />
              
              <AuthInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
                error={password && password.length < 6 ? "Password must be at least 6 characters" : ""}
              />
             
              <div className="text-right">
                <Link href="/forgot-password" className="text-gray-400 text-sm hover:text-[#0F6435] transition-colors">
                  forgot password?
                </Link>
              </div>

              <div className="pt-3">
                <AuthButton 
                  type="submit" 
                  text={isSubmitting ? "Logging in..." : "Login"} 
                  disabled={isSubmitting || !email || !/\S+@\S+\.\S+/.test(email) || !password || password.length < 6} 
                />
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                New to FarmQuest? <Link href="/signup" className="text-[#0F6435] font-medium hover:underline">Sign up</Link>
              </p>
            </div>

            {/* Only show the curved gallery on mobile */}
            <div className="md:hidden">
              <CurvedImageGallery />
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframes for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.1; transform: scale(0.7); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}
