"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlantType = {
  id: number;
  name: string;
  type: "Outdoor" | "Indoor" | "Outdoor & Indoor";
  image: string;
};

const plants: PlantType[] = [
  {
    id: 1,
    name: "Tomato Plant",
    type: "Outdoor",
    image: "/images/plant.png",
  },
  {
    id: 2,
    name: "Banana Tree",
    type: "Outdoor",
    image: "/images/plant.png",
  },
  {
    id: 3,
    name: "Spinach Plant",
    type: "Outdoor & Indoor",
    image: "/images/plant.png",
  },
  {
    id: 4,
    name: "Carrot Plant",
    type: "Indoor",
    image: "/images/plant.png",
  },
  {
    id: 5,
    name: "Pepper Plant",
    type: "Indoor",
    image: "/images/plant.png",
  },
];

type FilterType = "All" | "Indoor" | "Outdoor" | "Popular";

export default function PlantsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Indoor");

  const filteredPlants = plants.filter((plant) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Indoor") return plant.type.includes("Indoor");
    if (activeFilter === "Outdoor") return plant.type.includes("Outdoor");
    if (activeFilter === "Popular") return true; // For demo, all plants are popular
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Our Plants</h1>
      
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {["All", "Indoor", "Outdoor", "Popular"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter as FilterType)}
            className={cn(
              "px-6 py-2 rounded-full border transition-all",
              activeFilter === filter 
                ? "bg-black text-white border-black" 
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            )}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* Plant Grid - Normal layout on desktop, current layout on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPlants.map((plant, index) => (
          <div key={plant.id} className={cn(
            "relative",
            // Only apply staggered layout on mobile, not on desktop (md and above)
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
          src={plant.image}
          alt={plant.name}
          width={250}
          height={250}
          className="object-contain"
        />
      </div>
      
      {/* Card content */}
      <div className="bg-gray-100 rounded-3xl p-4 pt-16 md:p-6 relative z-0">
        {/* Desktop: Image positioned inside card at the top */}
        <div className="hidden md:block mb-4">
          <Image
            src={plant.image}
            alt={plant.name}
            width={200}
            height={200}
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