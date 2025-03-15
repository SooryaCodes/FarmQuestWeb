"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "@/lib/axios";

type PlantType = {
  id: number;
  name: string;
  type: string;
  image?: string;
  full_image_url?: string;
  cropped_image_url?: string;
  description?: string;
  basic_needs?: string[];
  tags?: string[];
  price?: number;
  rating?: number;
  isPopular?: boolean;
};

// Updated dummy plants data to match API schema
const dummyPlants: PlantType[] = [
  {
    id: 1,
    name: "Tomato Plant",
    type: "Outdoor",
    image: "/images/plant-1.png",
    full_image_url: "/images/plant-1.png",
    cropped_image_url: "/images/plant-1.png",
    description: "A versatile plant that produces juicy red fruits. Perfect for salads and cooking.",
    basic_needs: ["Sunlight", "Regular watering", "Well-drained soil"],
    tags: ["Vegetable", "Easy to grow", "Popular"],
    price: 299,
    rating: 4,
    isPopular: true,
  },
  {
    id: 2,
    name: "Banana Tree",
    type: "Outdoor",
    image: "/images/plant-2.png",
    full_image_url: "/images/plant-2.png",
    cropped_image_url: "/images/plant-2.png",
    description: "Tropical fruit tree that grows quickly and produces sweet, nutritious fruits.",
    basic_needs: ["Full sun", "Rich soil", "Regular watering"],
    tags: ["Fruit", "Tropical", "Tall"],
    price: 499,
    rating: 4,
    isPopular: false,
  },
  {
    id: 3,
    name: "Spinach Plant",
    type: "Outdoor & Indoor",
    image: "/images/plant-3.png",
    full_image_url: "/images/plant-3.png",
    cropped_image_url: "/images/plant-3.png",
    description: "Leafy green vegetable rich in iron and vitamins. Quick growing and easy to maintain.",
    basic_needs: ["Partial shade", "Moist soil", "Cool weather"],
    tags: ["Leafy green", "Nutritious", "Quick harvest"],
    price: 199,
    rating: 5,
    isPopular: true,
  },
  {
    id: 4,
    name: "Carrot Plant",
    type: "Indoor",
    image: "/images/plant-4.png",
    full_image_url: "/images/plant-4.png",
    cropped_image_url: "/images/plant-4.png",
    description: "Root vegetable that's easy to grow and packed with nutrients.",
    basic_needs: ["Full sun", "Loose soil", "Regular watering"],
    tags: ["Root vegetable", "Beginner-friendly", "Compact"],
    price: 249,
    rating: 4,
    isPopular: false,
  },
  {
    id: 5,
    name: "Pepper Plant",
    type: "Indoor",
    image: "/images/plant-5.png",
    full_image_url: "/images/plant-5.png",
    cropped_image_url: "/images/plant-5.png",
    description: "Versatile plant that produces spicy or sweet peppers depending on variety.",
    basic_needs: ["Full sun", "Well-drained soil", "Warm temperature"],
    tags: ["Vegetable", "Container-friendly", "Colorful"],
    price: 349,
    rating: 4,
    isPopular: true,
  },
];

type FilterType = "All" | "Indoor" | "Outdoor" | "Popular";

export default function PlantsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [plants, setPlants] = useState<PlantType[]>(dummyPlants);
  const [loading, setLoading] = useState(true);
  console.log(setSearchQuery)
  // Add useEffect to fetch plants/crops data from API
  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      try {
        // Try to fetch from API first
        const response = await axios.get('/crops', {
          params: {
            page: 1,
            size: 100,
            search: searchQuery,
          },
        });
        setPlants(response.data.length > 0 ? response.data : dummyPlants); // Use dummy data if API returns nothing
      } catch (error) {
        console.error("Error fetching plants:", error);
        setPlants(dummyPlants); // Use dummy data on error
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, [searchQuery]);

  // Add handlePlantClick function to store plant data in localStorage
  const handlePlantClick = (plant: PlantType) => {
    // Store the plant data in localStorage
    localStorage.setItem('selectedPlant', JSON.stringify(plant));
  };

  const filteredPlants = plants.filter((plant) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Indoor") return plant.type.includes("Indoor");
    if (activeFilter === "Outdoor") return plant.type.includes("Outdoor");
    if (activeFilter === "Popular") return plant.isPopular;
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
      
      {/* Plants Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {loading ? (
          // Loading skeleton
          Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-3xl p-4 animate-pulse h-64"></div>
          ))
        ) : filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <Link 
              key={plant.id} 
              href={`/plant/${plant.id}`}
              onClick={() => handlePlantClick(plant)}
              className="bg-gray-100 rounded-3xl p-4 transition-all hover:shadow-md"
            >
              <div className="relative h-40 w-full mb-4">
                <Image
                  src={plant.image || plant.cropped_image_url || "/images/plant-1.png"}
                  alt={plant.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg">{plant.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{plant.type}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">{plant.price ? `₹${plant.price}` : ""}</span>
                <div className="flex items-center">
                  {plant.rating && (
                    <div className="flex items-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="text-sm ml-1">{plant.rating}</span>
                    </div>
                  )}
                  <button className="bg-green-600 text-white rounded-full p-1.5 flex items-center justify-center w-7 h-7 hover:bg-green-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No plants found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 