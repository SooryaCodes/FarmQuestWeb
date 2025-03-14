"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type PlantType = {
  id: number;
  name: string;
  type: "Indoor" | "Outdoor";
  image: string;
  isPopular?: boolean;
};

const plants: PlantType[] = [
  {
    id: 1,
    name: "Lettuce",
    type: "Indoor",
    image: "/images/plant.png",
    isPopular: true,
  },
  {
    id: 2,
    name: "Lettuce",
    type: "Indoor",
    image: "/images/plant.png",
    isPopular: true,
  },
  // Add more plants as needed
];

type FilterType = "All" | "Indoor" | "Outdoor" | "Popular";

export default function PlantShopPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Indoor");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const filteredPlants = plants.filter((plant) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Indoor") return plant.type === "Indoor";
    if (activeFilter === "Outdoor") return plant.type === "Outdoor";
    if (activeFilter === "Popular") return plant.isPopular;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-6 md:py-20 min-h-screen bg-white">
      {/* Header with search - Responsive layout */}
      <div className="mb-6 md:mb-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">Find Your </h1>
            <h2 className="text-2xl md:text-4xl font-bold">favorite Plants</h2>
          </div>
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer" onClick={() => setIsSearchVisible(!isSearchVisible)}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>
        
        {isSearchVisible && (
          <div className="mt-2">
            <input 
              type="text" 
              placeholder="Search plants..." 
              className="w-full border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
          </div>
        )}
      </div>
      
      {/* Promo banner - Responsive layout */}
      <div className="bg-green-100 min-h-28 md:min-h-32 rounded-xl relative p-4 md:p-6 mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold">40% off</h3>
          <p className="text-sm md:text-base text-gray-600">2 Jul - 20 July</p>
        </div>
        <div className="absolute right-0 h-40 w-40 md:h-48 md:w-48">
          <Image
            src="/images/plant.png"
            alt="Promo plant"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 md:mb-8 overflow-x-auto">
        {["All", "Indoor", "Outdoor", "Popular"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter as FilterType)}
            className={cn(
              "px-6 py-2 rounded-full border transition-all whitespace-nowrap",
              activeFilter === filter 
                ? "bg-black text-white border-black" 
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Plant Grid - Responsive layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredPlants.map((plant, index) => (
          <div key={plant.id} className={cn(
            "relative",
            // Only apply staggered layout on mobile, not on desktop
            (index % 4 === 1 || index % 4 === 2) ? "md:mt-0 mt-12" : ""
          )}>
            <PlantCard plant={plant} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlantCard({ plant }: { plant: PlantType }) {
  return (
    <div className="relative pt-24 md:pt-0">
      {/* Mobile: Image positioned outside card */}
      <div className="md:hidden absolute scale-150 top-6 left-1/2 transform -translate-x-1/2 z-10">
        <Image
          src={plant.image || "/images/lettuce.png"}
          alt={plant.name}
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
      
      {/* Card content */}
      <div className="bg-gray-100 rounded-3xl p-4 pt-16 md:p-6 relative z-0">
        {/* Desktop: Image positioned inside card at the top */}
        <div className="hidden md:block mb-4">
          <Image
            src={plant.image || "/images/lettuce.png"}
            alt={plant.name}
            width={150}
            height={150}
            className="object-contain mx-auto"
          />
        </div>
        
        <div className="mt-auto">
          <h3 className="text-xl font-bold">{plant.name}</h3>
          <p className="text-gray-500 text-sm mb-4">{plant.type}</p>
          
          <div className="flex justify-between items-center">
            <button className="bg-white text-black text-sm py-1.5 px-4 rounded-full border border-gray-200 shadow-sm hover:bg-green-50 transition-colors">
              Add to cart
            </button>
            <button className="bg-black text-white rounded-full p-2 flex items-center justify-center w-8 h-8 hover:bg-green-800 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
