"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UserPoints from "@/components/UserPoints"; // Import the new component

export default function FarmDetailPage() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const userPoints = {
    exp: 150, // Example EXP value
    coins: 25, // Example coins value
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-24 min-h-screen ">
      {/* User Points Section */}
      <UserPoints exp={userPoints.exp} coins={userPoints.coins} />

      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <Link href="/farms" className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-all">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
        <div className="ml-auto">
          <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-all">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Plant Image Section - Improved with image carousel */}
      <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-6 shadow-md">
        <Image
          src="https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Akhil's Thootam"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-3 bg-gradient-to-t from-black/50 to-transparent">
          <span className="w-2 h-2 bg-white rounded-full opacity-100"></span>
          <span className="w-2 h-2 bg-white rounded-full opacity-50"></span>
          <span className="w-2 h-2 bg-white rounded-full opacity-50"></span>
        </div>
      </div>

      {/* Plant Details Card - Simplified */}
      <div className="bg-white rounded-2xl p-6 shadow-sm -mt-16 relative z-10 mx-2 md:mx-auto md:max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Akhil&apos;s Thootam</h1>
        <p className="text-gray-600 mb-4 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Thrissur, Kerala
        </p>
        
        <p className="text-gray-700 mb-4">
          {showFullDescription 
            ? "The banana tree (Musa spp.) is a fast-growing, herbaceous plant belonging to the Musaceae family. Despite its tree-like appearance, it's actually a perennial herb with a pseudostem made of tightly packed leaf sheaths. Native to Southeast Asia, bananas are now cultivated throughout tropical regions worldwide for their nutritious fruits."
            : "The banana tree (Musa spp.) is a fast-growing, herbaceous plant belonging to the Musaceae family. Despite its tree-like appearance..."}
          <button 
            className="text-green-600 font-medium ml-1"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Show less" : "Read more"}
          </button>
        </p>

        {/* Quick Stats - New Section */}
        <div className="grid grid-cols-3 gap-4 my-6 border-y border-gray-100 py-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">85%</p>
            <p className="text-xs text-gray-500">Health</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">120</p>
            <p className="text-xs text-gray-500">Days Old</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">Jun 15</p>
            <p className="text-xs text-gray-500">Harvest Date</p>
          </div>
        </div>

        {/* Growth Status Section - Simplified */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M12 2v8" />
              <path d="m4.93 10.93 1.41 1.41" />
              <path d="M2 18h2" />
              <path d="M20 18h2" />
              <path d="m19.07 10.93-1.41 1.41" />
              <path d="M22 22H2" />
              <path d="M16 6 8 14" />
              <path d="M16 14H8" />
            </svg>
            Growth Status
          </h2>

          {/* Growth Status Card - Simplified */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                src="https://images.unsplash.com/photo-1596636478939-59fed7a083f2?q=80&w=200&auto=format&fit=crop" 
                alt="Plant Growth" 
                width={80} 
                height={80} 
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-gray-800 text-sm">
                Currently in <span className="font-medium">Vegetative Growth</span> phase. The plant is developing its stem, leaves, and root system.
              </p>
              <button className="text-green-600 text-xs font-medium mt-2 flex items-center">
                See Details
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Related News Section - Simplified */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6Z" />
            </svg>
            Related News
          </h2>
          
          {/* News Card - Simplified */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=200&auto=format&fit=crop" 
                alt="Banana Disease Prevention" 
                width={80} 
                height={80} 
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-gray-800 text-sm">
                <span className="font-medium">Preventing Banana Diseases:</span> Learn about common banana plant diseases and how to prevent them.
              </p>
              <button className="text-green-600 text-xs font-medium mt-2 flex items-center">
                Read Article
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Additional Information - Simplified and Improved */}
      <div className="hidden md:grid grid-cols-3 gap-6 mt-8 mb-16">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            Planting Details
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-600">Planted on:</span>
              <span className="font-medium">March 10, 2023</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Expected harvest:</span>
              <span className="font-medium">June 15, 2023</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Soil type:</span>
              <span className="font-medium">Loamy</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
            </svg>
            Care Instructions
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mt-1">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>Water regularly, keeping soil moist but not soggy</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mt-1">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>Provide at least 6 hours of direct sunlight daily</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mt-1">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>Fertilize every 2 weeks with balanced fertilizer</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Growth Timeline
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 h-1 bg-green-100 rounded-full">
                <div className="w-2/3 h-full bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Germination</span>
              <span>Vegetative</span>
              <span>Flowering</span>
              <span>Fruiting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Desktop */}
      <div className="hidden md:flex justify-center gap-4 mt-8 mb-16">
        <Link href={'/progress'} className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M12 2v8" />
            <path d="m4.93 10.93 1.41 1.41" />
            <path d="M2 18h2" />
            <path d="M20 18h2" />
            <path d="m19.07 10.93-1.41 1.41" />
            <path d="M22 22H2" />
            <path d="M16 6 8 14" />
            <path d="M16 14H8" />
          </svg>
          Track Growth
        </Link>
        <button className="bg-white text-green-600 border border-green-600 px-6 py-2.5 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
          </svg>
          Share Farm
        </button>
      </div>

      {/* Mobile Action Buttons - Fixed at bottom */}
      <div className=" bottom-0 left-0 right-0 bg-white p-4 shadow-lg md:hidden flex justify-between">
        <button className="bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg font-medium flex-1 mr-2 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
          </svg>
          Share
        </button>
        <Link href={'/progress'} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex-1 ml-2 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M12 2v8" />
            <path d="m4.93 10.93 1.41 1.41" />
            <path d="M2 18h2" />
            <path d="M20 18h2" />
            <path d="m19.07 10.93-1.41 1.41" />
            <path d="M22 22H2" />
            <path d="M16 6 8 14" />
            <path d="M16 14H8" />
          </svg>
          Track Growth
        </Link>
      </div>
    </div>
  );
}
