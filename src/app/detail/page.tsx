"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Sun, Droplets } from "lucide-react";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";

export default function PlantDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white md:bg-transparent md:py-10 relative">
      {/* Background Grid - only visible on desktop */}
      <div className="hidden md:block absolute inset-0">
        <BackgroundGrid isClient={isClient} />
      </div>
      
      <div className="w-full max-w-md md:max-w-4xl bg-white md:rounded-xl md:shadow-xl overflow-hidden relative z-10">
        {/* Mobile layout (default) and Desktop layout with md: breakpoint */}
        <div className="relative md:hidden">
          {/* Mobile Layout */}
          {/* Header with back button and favorite */}
          <div className="flex justify-between items-center p-4 sticky top-0 bg-white z-10">
            <Link href="/dashboard" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
              <ArrowLeft className="text-gray-700" size={20} />
            </Link>
            <h1 className="text-xl font-semibold">Details</h1>
            <button 
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? 
                <Heart className="text-red-500 fill-red-500" size={20} /> : 
                <Heart className="text-gray-700" size={20} />
              }
            </button>
          </div>
          
          <div className="p-4">
            {/* Plant Image */}
            <div className="flex justify-center mb-6">
              <Image 
                src="/images/plant-1.png" 
                alt="Tomato Plant" 
                width={250} 
                height={250} 
                className="object-contain w-auto h-auto max-h-[200px] sm:max-h-[250px]"
              />
            </div>

            {/* Plant Details */}
            <div className="px-2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Tomato</h2>
                <div className="flex items-center">
                  <span className="text-[#77AD3F] text-base sm:text-lg">★ 4.8</span>
                  <span className="text-gray-500 text-xs sm:text-sm ml-1">(200 Reviews)</span>
                </div>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                The banana tree (Musa spp.) is a fast-growing, herbaceous 
                plant belonging to the Musaceae family. Despite its tree-
                like appearance...
                <span className="text-[#0F6435] ml-1">Read more</span>
              </p>

              {/* Basic Needs */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-gray-700 text-sm sm:text-base font-medium mb-2 sm:mb-3">Basic Needs</h3>
                <div className="flex gap-2 sm:gap-3">
                  <div className="flex items-center bg-gray-100 rounded-lg p-2 sm:p-3 flex-1">
                    <div className="bg-gradient-to-r from-[#77AD3F] to-[#0F6435] p-1.5 sm:p-2 rounded-md mr-2">
                      <Droplets className="text-white" size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Need 400ml</p>
                      <p className="text-xs text-gray-500">Of Water</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-lg p-2 sm:p-3 flex-1">
                    <div className="bg-yellow-400 p-1.5 sm:p-2 rounded-md mr-2">
                      <Sun className="text-white" size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Need Direct</p>
                      <p className="text-xs text-gray-500">Sunlight</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price and Button */}
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Price</p>
                  <p className="text-xl sm:text-2xl font-bold">$123.99</p>
                </div>
                <Link href="/growth-status" className="bg-gradient-to-r from-[#77AD3F] to-[#0F6435] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base font-medium hover:shadow-md active:scale-[0.99] transition-all">
                  Start Farming
                </Link>
              </div>

              {/* Bottom Indicator - removed for mobile */}
              <div className="hidden md:flex justify-center pb-2">
                <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-2 min-h-[600px]">
          {/* Left side - Image */}
          <div className="bg-gray-50 flex items-center justify-center p-8 relative">
            <Link href="/dashboard" 
              className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md z-10"
            >
              <ArrowLeft className="text-gray-700" size={20} />
            </Link>
            <Image 
              src="/images/plant-1.png" 
              alt="Tomato Plant" 
              width={400} 
              height={400} 
              className="object-contain"
            />
          </div>
          
          {/* Right side - Details */}
          <div className="p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Tomato</h2>
              <button 
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-sm hover:bg-gray-200 transition-colors"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? 
                  <Heart className="text-red-500 fill-red-500" size={24} /> : 
                  <Heart className="text-gray-700" size={24} />
                }
              </button>
            </div>
            
            <div className="flex items-center mb-4">
              <span className="text-[#77AD3F] text-xl font-medium">★ 4.8</span>
              <span className="text-gray-500 text-sm ml-2">(200 Reviews)</span>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                The banana tree (Musa spp.) is a fast-growing, herbaceous 
                plant belonging to the Musaceae family. Despite its tree-
                like appearance...
              </p>
              <button className="text-[#0F6435] font-medium mt-2 hover:text-[#77AD3F]">Read more</button>
            </div>
            
            <h3 className="text-gray-800 font-semibold text-lg mb-4">Basic Needs</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="bg-gradient-to-r from-[#77AD3F] to-[#0F6435] p-3 rounded-md mr-3">
                  <Droplets className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Water</p>
                  <p className="text-sm text-gray-600">Need 400ml daily</p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="bg-yellow-400 p-3 rounded-md mr-3">
                  <Sun className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Sunlight</p>
                  <p className="text-sm text-gray-600">Need direct exposure</p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Price</p>
                  <p className="text-3xl font-bold text-gray-800">$123.99</p>
                </div>
                <Link  href="/growth-status" className="bg-gradient-to-r from-[#77AD3F] to-[#0F6435] text-white py-3 px-8 rounded-lg font-medium hover:shadow-md active:scale-[0.99] transition-all">
                  Start Farming
                </Link>
              </div>
            </div>

            {/* You Might Also Like Section */}
            <div className="mt-8 md:mt-12">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {Array(4).fill(0).map((_, index) => (
                  <Link key={index} href={`/detail`} className="bg-gray-50 rounded-xl p-3 md:p-4 transition-all hover:shadow-md">
                    <div className="relative h-24 md:h-40 w-full mb-2 md:mb-4">
                      <Image
                        src={`/images/plant-${(index % 5) + 1 || 1}.png`}
                        alt="Related Plant"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base">Related Plant {index + 1}</h3>
                    <p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">Indoor</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm md:text-base">${(99 + index * 20).toFixed(2)}</span>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="text-xs md:text-sm ml-1">4</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
