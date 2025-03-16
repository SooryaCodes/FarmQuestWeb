"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CurvedImageGallery } from "@/components/auth/CurvedImageGallery";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { FarmingScaleSelection } from "@/components/auth/FarmingScaleSelection";
import { FeatureHighlights } from "@/components/auth/FeatureHighlights";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedScale, setSelectedScale] = useState("");
  const [user, setUser] = useState(null);

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    toast.success('Login Successful!', {
      description: 'Welcome back to FarmQuest. Please select your preferred scale of farming.',
      position: 'bottom-center',
      duration: 4000,
    });
    console.log(email,password)
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

    router.push('/dashboard');
    // Here you would typically make an API call to save the preference
  };

  return (
    <>
      <Toaster position="bottom-center" richColors expand={true} />
      <div className="min-h-screen flex flex-col md:flex-row bg-white">
        {/* Left section with background for desktop */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#77AD3F] to-[#0F6435] p-8 relative overflow-hidden">
          {/* Grid background pattern */}
          <BackgroundGrid isClient={isClient} />
          
          <div className="relative z-10 flex flex-col justify-between text-white h-full w-full py-6">
            {/* Main content */}
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
              
              {/* Feature highlights */}
              <FeatureHighlights />
            </div>
            
            {/* Testimonial section */}
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

                <LoginForm onLoginSuccess={handleLogin} />

                <div className="mt-8 text-center">
                  <p className="text-gray-500 text-sm">
                    New to FarmQuest? <Link href="/register" className="text-[#0F6435] font-medium hover:underline">Sign up</Link>
                  </p>
                </div>
                
                {/* Only show the curved gallery on mobile when not logged in */}
                <div className="md:hidden mt-16 mb-8">
                  <CurvedImageGallery />
                </div>
              </>
            ) : (
              <FarmingScaleSelection 
                selectedScale={selectedScale} 
                onScaleSelect={handleScaleSelection} 
              />
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
