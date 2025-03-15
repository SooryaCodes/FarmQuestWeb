"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import AddFarmModal from "@/components/farms/AddFarmModal";
import UserPoints from "@/components/UserPoints";
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

// Updated dummy plants data to match plants page schema
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

// Update FarmType definition to match farms page
type FarmType = {
  id: number;
  name: string;
  location: string;
  image: string;
  status: "Active" | "Inactive";
  area?: number; // Change to number to match farms page
  type: string;
  description?: string;
};

// Define dummy farms data
const dummyFarms: FarmType[] = [
  {
    id: 1,
    name: "Kochi Terrace Garden",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    status: "Active",
    location: "Ernakulam, Kerala",
    area: 120,
    type: "Terrace",
    description: "A beautiful terrace garden with a variety of vegetables and herbs. Perfect for urban farming in limited space."
  },
  {
    id: 2,
    name: "Trivandrum Vertical Setup",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    status: "Active",
    location: "Thiruvananthapuram, Kerala",
    area: 80,
    type: "Vertical",
    description: "An innovative vertical farming setup that maximizes growing space using stacked layers. Great for leafy greens and herbs."
  },
  {
    id: 3,
    name: "Kozhikode Portable Farm",
    image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    status: "Inactive",
    location: "Kozhikode, Kerala",
    area: 50,
    type: "Portable",
    description: "A mobile farming solution that can be relocated as needed. Perfect for seasonal crops and experimental farming."
  },
  {
    id: 4,
    name: "Munnar Hydroponic Setup",
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    status: "Active",
    location: "Idukki, Kerala",
    area: 65,
    type: "Hydroponic",
    description: "A soil-less farming system using nutrient-rich water solutions. Ideal for growing plants faster with less water and space."
  },
];

type FilterType = "All" | "Indoor" | "Outdoor" | "Popular";

export default function PlantShopPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Indoor");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [isAddFarmModalOpen, setIsAddFarmModalOpen] = useState<boolean>(false);
  const [farms, setFarms] = useState<FarmType[]>(dummyFarms);
  const [plants, setPlants] = useState<PlantType[]>(dummyPlants);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
console.log(loading,setSearchQuery)
  // Add user information
  const userInfo = {
    name: "Alex Johnson",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    lastActive: "Today at 2:30 PM"
  };

  const userPoints = {
    exp: 150,
    coins: 25,
  };

  // Add useEffect to fetch farms data from API
  useEffect(() => {
    const fetchFarms = async () => {
      setLoading(true);
      try {
        // Try to fetch from API first
        const response = await axios.get('/farms', {
          params: {
            page: 1,
            size: 100,
            search: '',
          },
        });
        setFarms(response.data.length > 0 ? response.data : dummyFarms); // Use dummy data if API returns nothing
      } catch (error) {
        console.error("Error fetching farms:", error);
        setFarms(dummyFarms); // Use dummy data on error
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  // Add useEffect to fetch plants data from API
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

  // Add handleFarmClick function to store farm data in localStorage
  const handleFarmClick = (farm: FarmType) => {
    // Store the farm data in localStorage
    localStorage.setItem('selectedFarm', JSON.stringify(farm));
  };

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

  const handleAddFarm = (farmData: {
    name: string;
    location: string;
    type: string;
    description: string;
    area: string;
    plants: string[];
  }) => {
    // Here you would typically send this data to your backend
    // For now, we'll just add it to the local state
    const newFarm: FarmType = {
      id: farms.length + 1,
      name: farmData.name,
      location: farmData.location,
      image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      status: "Active",
      area: parseFloat(farmData.area),
      type: farmData.type,
      description: farmData.description,
    };
    
    // Update farms state
    setFarms([...farms, newFarm]);
    
    // Close the modal
    setIsAddFarmModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-20 min-h-screen bg-white">
      {/* User Points Section */}
      <UserPoints exp={userPoints.exp} coins={userPoints.coins} />
      {/* User Profile Section */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <Image
              src={userInfo.avatar}
              alt="User Avatar"
              fill
              className="rounded-full object-cover border-2 border-green-500"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold">Welcome back, {userInfo.name}!</h2>
            <div className="flex items-center text-sm text-gray-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {userInfo.location} • <span className="ml-1 text-green-600">{userInfo.lastActive}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-600"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-600"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </div>

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
            <PlantCard plant={plant} handlePlantClick={handlePlantClick} />
          </div>
        ))}
      </div>
      
      {/* Farms Section - New addition */}
      <div className="mt-16 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Your Farms</h2>
            <p className="text-gray-500 text-sm md:text-base">Manage your farming locations</p>
          </div>
          <Link href="/farms" className="flex items-center gap-2 text-sm font-medium hover:text-green-700 transition-colors">
            View all
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-gray-500 text-sm">Total Setups</p>
            <h4 className="text-2xl font-bold">{farms.length}</h4>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-gray-500 text-sm">Active Setups</p>
            <h4 className="text-2xl font-bold">{farms.filter(f => f.status === "Active").length}</h4>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-gray-500 text-sm">Total Space</p>
            <h4 className="text-2xl font-bold">{farms.reduce((total, farm) => total + (farm.area || 0), 0)} sq.ft</h4>
          </div>
        </div>
        
        {/* Farms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm, index) => (
            <motion.div 
              key={farm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={`/farm/${farm.id}`} 
                className="block h-full"
                onClick={() => handleFarmClick(farm)}
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 border border-gray-100 rounded-xl">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={farm.image}
                      alt={farm.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                        farm.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      )}>
                        <span className={cn(
                          "mr-1.5 h-2 w-2 rounded-full",
                          farm.status === "Active" ? "bg-green-500" : "bg-gray-500"
                        )}></span>
                        {farm.status}
                      </span>
                      {farm.area && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-gray-800">
                          {farm.area} sq.ft
                        </span>
                      )}
                    </div>
                  </div>
                  <CardContent className="pt-4 pb-2 bg-white">
                    <h3 className="text-xl font-semibold text-gray-900">{farm.name}</h3>
                    <div className="flex items-center mt-1">
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
                        className="text-gray-400 mr-1"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <p className="text-sm text-gray-600">{farm.location}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 pb-4 bg-white flex justify-between items-center">
                    <div className="flex items-center">
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
                        className="text-gray-400 mr-1"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span className="text-sm text-gray-600">{farm.type} Setup</span>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-black text-white rounded-full p-1.5 flex items-center justify-center w-8 h-8 hover:bg-green-800 transition-colors shadow-sm"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </motion.button>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
          
          {/* Add Farm Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div 
              onClick={() => setIsAddFarmModalOpen(true)} 
              className="block h-full cursor-pointer"
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Add New Farm</h3>
                  <p className="text-gray-500 text-sm">Create a new farming setup to track and manage</p>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Quick Actions Section */}
      <div className="mt-12 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/farms" className="bg-green-50 rounded-xl p-6 hover:bg-green-100 transition-colors border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-700">
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Manage Farms</h3>
            <p className="text-sm text-gray-600">View and edit your farms</p>
          </Link>
          
          <Link href="/detail" className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-colors border border-blue-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                <path d="M12 2v8" />
                <path d="M5 5.3 7.1 7" />
                <path d="M2 12h8" />
                <path d="M5 18.7 7.1 17" />
                <path d="M12 22v-8" />
                <path d="m19 18.7-2.1-1.7" />
                <path d="M22 12h-8" />
                <path d="m19 5.3-2.1 1.7" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Monitor Plants</h3>
            <p className="text-sm text-gray-600">Check plant health</p>
          </Link>
          
          <div 
            onClick={() => setIsAddFarmModalOpen(true)}
            className="bg-purple-50 rounded-xl p-6 hover:bg-purple-100 transition-colors border border-purple-100 cursor-pointer"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-700">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Add Farm</h3>
            <p className="text-sm text-gray-600">Create new setup</p>
          </div>
          
          <Link href="/dashboard" className="bg-amber-50 rounded-xl p-6 hover:bg-amber-100 transition-colors border border-amber-100">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Shop Plants</h3>
            <p className="text-sm text-gray-600">Browse catalog</p>
          </Link>
        </div>
      </div>
      
      <AddFarmModal 
        isOpen={isAddFarmModalOpen}
        onClose={() => setIsAddFarmModalOpen(false)}
        onSubmit={handleAddFarm}
      />
    </div>
  );
}

function PlantCard({ plant, handlePlantClick }: { plant: PlantType; handlePlantClick: (plant: PlantType) => void }) {
  return (
    <Link 
      href={`/plant/${plant.id}`} 
      onClick={() => handlePlantClick(plant)}
      className="relative pt-24 md:pt-0"
    >
      {/* Mobile: Image positioned outside card */}
      <div className="md:hidden absolute scale-150 top-6 left-1/2 transform -translate-x-1/2 z-10">
        <Image
          src={plant.image || plant.cropped_image_url || "/images/plant-1.png"}
          alt={plant.name}
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
      
      {/* Card content */}
      <div className="bg-gray-100 rounded-3xl p-4 pt-28 md:p-6 relative z-0">
        {/* Desktop: Image positioned inside card at the top */}
        <div className="hidden md:block mb-4 ml-4">
          <Image
            src={plant.image || plant.cropped_image_url || "/images/plant-1.png"}
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
        </div>
      </div>
    </Link>
  );
}
