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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedScale, setSelectedScale] = useState("");

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
          description: 'Welcome back to FarmQuest. Please select your preferred scale of farming.',
          position: 'bottom-center',
          duration: 4000,
        });
        setIsSubmitting(false);
        setIsLoggedIn(true);
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

  const handleScaleSelection = (scale: string) => {
    setSelectedScale(scale);
    // Send selection to backend
    console.log("Selected farming scale:", scale);
    toast.success('Preference Saved!', {
      description: `Your preferred farming scale "${scale}" has been saved.`,
      position: 'bottom-center',
      duration: 3000,
    });
    // Here you would typically make an API call to save the preference
  };

  // Farming scale selection UI component
  const FarmingScaleSelection = () => (
    <div className="w-full max-w-md rounded-3xl p-6 md:p-8 relative border border-gray-100">
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">
          What's your preferred scale of farming?
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Please let us know your preferred scale of framing.
        </p>
      </div>

      <div className="space-y-3 md:space-y-4 mt-4 md:mt-6">
        {["Never Leave Home", "Backyard Boys", "Tiny Farmer", "The Real Deal!"].map((scale) => (
          <button
            key={scale}
            onClick={() => handleScaleSelection(scale)}
            className={`w-full p-3 md:p-4 text-left rounded-lg border border-gray-200 flex justify-between items-center hover:border-[#77AD3F] transition-all ${
              selectedScale === scale ? "border-[#77AD3F] bg-[#77AD3F]/5" : ""
            }`}
          >
            <span className="text-sm md:text-base">{scale}</span>
            <span className="text-gray-400">›</span>
          </button>
        ))}
      </div>
    </div>
  );

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

        {/* Right section - conditionally show login form or farming scale selection */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-white min-h-screen md:min-h-0">
          <div className="w-full max-w-md px-4 py-8 md:p-8 relative">
            {!isLoggedIn ? (
              <>
                <div className="text-center mb-10">
                  {/* Logo for mobile - centered at top */}
                  <div className="md:hidden flex justify-center mb-8">
                    <div className="relative w-[60px] h-[60px]">
                      <Image 
                        src="/images/Farm-quest-logo.svg" 
                        alt="FarmQuest Logo" 
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-semibold">
                    Welcome Back
                    <br />
                    To <span className="text-[#77AD3F]">Farm</span><span className="text-[#0F6435]">Quest</span>
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="youremail@example.com"
                      className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#77AD3F] focus:border-transparent"
                    />
                    {email && !/\S+@\S+\.\S+/.test(email) && (
                      <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#77AD3F] focus:border-transparent pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {password && password.length < 6 && (
                      <p className="mt-1 text-sm text-red-600">Password must be at least 6 characters</p>
                    )}
                  </div>
                 
                  <div className="text-right">
                    <Link href="/forgot-password" className="text-gray-400 text-sm hover:text-[#0F6435] transition-colors">
                      forgot password?
                    </Link>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || !email || !/\S+@\S+\.\S+/.test(email) || !password || password.length < 6}
                      className="w-full py-3 px-4 bg-gradient-to-r from-[#77AD3F] to-[#0F6435] text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#77AD3F] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-500 text-sm">
                    New to FarmQuest? <Link href="/signup" className="text-[#0F6435] font-medium hover:underline">Sign up</Link>
                  </p>
                </div>
                
                {/* Only show the curved gallery on mobile when not logged in - moved here */}
                <div className="md:hidden mt-16 mb-8">
                  <CurvedImageGallery />
                </div>
              </>
            ) : (
              <div className="w-full">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-semibold">
                    What's your preferred scale of farming?
                  </h1>
                  <p className="text-gray-500 mt-2">
                    Please let us know your preferred scale of framing.
                  </p>
                </div>

                <div className="space-y-3 mt-8">
                  {["Never Leave Home", "Backyard Boys", "Tiny Farmer", "The Real Deal!"].map((scale) => (
                    <button
                      key={scale}
                      onClick={() => handleScaleSelection(scale)}
                      className={`w-full p-4 text-left rounded-lg border border-gray-200 flex justify-between items-center hover:border-[#77AD3F] transition-all ${
                        selectedScale === scale ? "border-[#77AD3F] bg-[#77AD3F]/5" : ""
                      }`}
                    >
                      <span>{scale}</span>
                      <span className="text-gray-400">›</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
