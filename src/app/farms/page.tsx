"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import AddFarmModal from "@/components/farms/AddFarmModal";

type FarmType = {
  id: number;
  name: string;
  location: string;
  image: string;
  status: "Active" | "Inactive";
  area?: string;
  crops?: number;
};

export default function FarmsPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  
  const [farms] = useState<FarmType[]>([
    {
      id: 1,
      name: "Akhil's Farm",
      location: "Thrissur, Kerala",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      status: "Active",
      area: "120 sq.ft",
    },
    {
      id: 2,
      name: "Green Valley Farm",
      location: "Kochi, Kerala",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      status: "Active",
      area: "150 sq.ft",
    },
    {
      id: 3,
      name: "Riverside Plantation",
      location: "Alappuzha, Kerala",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      status: "Inactive",
      area: "80 sq.ft",
    },
  ]);

  const filteredFarms = farms.filter((farm) => {
    if (activeFilter === "All") return true;
    return farm.status === activeFilter;
  });

  const handleAddFarm = (farmData: {
    name: string;
    location: string;
    type: string;
    description: string;
    area: string;
  }) => {
    // Here you would typically send this data to your backend
    // For now, we'll just add it to the local state
    const newFarm: FarmType = {
      id: farms.length + 1,
      name: farmData.name,
      location: farmData.location,
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      status: "Active",
      area: farmData.area,
    };
    
    // Update farms state (you would need to modify this to use setFarms)
    // setFarms([...farms, newFarm]);
    
    // Close the modal
    setIsAddModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-20 min-h-screen bg-white">
      {/* Add Farm Modal */}
      <AddFarmModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSubmit={handleAddFarm} 
      />
      
      {/* Header with search - Responsive layout */}
      <div className="mb-6 md:mb-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold">Your Farms</h1>
              <p className="text-gray-500 text-sm md:text-base">Manage your farming locations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div 
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors" 
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
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
              </motion.div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center hover:bg-green-800 transition-colors cursor-pointer"
              onClick={() => setIsAddModalOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </motion.div>
          </div>
        </div>
        
        {isSearchVisible && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2"
          >
            <div className="relative">
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
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search farms..." 
                className="w-full border border-gray-300 rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              />
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Promo banner - Responsive layout */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-100 to-green-50 min-h-28 md:min-h-40 rounded-2xl relative p-6 md:p-8 mb-8 flex justify-between items-center overflow-hidden shadow-sm"
      >
        <div className="z-10 max-w-lg">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Indoor Farming</h3>
          <p className="text-sm md:text-base text-gray-700 mb-4">Optimize your home farming with smart monitoring and sustainable practices</p>
          <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-800 transition-colors">
            Get Growing Tips
          </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 md:w-2/5">
          <div className="relative h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Indoor farming"
              className="object-cover rounded-r-2xl absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-green-100/90"></div>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {["All", "Active", "Inactive"].map((filter) => (
          <motion.button
            key={filter}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(filter as "All" | "Active" | "Inactive")}
            className={cn(
              "px-6 py-2.5 rounded-full border transition-all whitespace-nowrap font-medium",
              activeFilter === filter 
                ? "bg-black text-white border-black shadow-md" 
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            )}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {/* Stats Overview - Updated for home farming */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
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
          <h4 className="text-2xl font-bold">350 sq.ft</h4>
        </div>
      </div>

      {/* Farms Grid - Responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarms.map((farm, index) => (
          <motion.div 
            key={farm.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/farms/${farm.id}`} className="block h-full">
              <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 border border-gray-100 rounded-xl">
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={farm.image}
                    alt={farm.name}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
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
                        {farm.area}
                      </span>
                    )}
                  </div>
                </div>
                <CardContent className="pt-5 pb-2 bg-white">
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
                <CardFooter className="pt-2 pb-5 bg-white flex justify-between items-center">
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
                    <span className="text-sm text-gray-600">Indoor Setup</span>
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
      </div>
    </div>
  );
}
