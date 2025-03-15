"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

// Define the TipItem interface
interface TipItem {
  id: number;
  title: string;
  image: string;
  slug: string;
  category?: string;
  content?: string;
}

// Sample tips data
const tipsData = [
  {
    id: 1,
    title: "Early Detection of Tomato Plant Diseases Using AI Technology",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "tomato-plant-diseases",
    category: "Technology",
    content: "Learn how to use modern AI tools to detect plant diseases before they become visible to the naked eye."
  },
  {
    id: 2,
    title: "Sustainable Irrigation Methods for Water Conservation",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "sustainable-irrigation",
    category: "Sustainability",
    content: "Implement water-saving irrigation techniques that reduce consumption while improving plant health."
  },
  {
    id: 3,
    title: "Organic Pest Control Strategies for Chemical-Free Farming",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "organic-pest-control",
    category: "Organic Farming",
    content: "Control pests naturally without harmful chemicals using these proven organic methods."
  },
  {
    id: 4,
    title: "Climate-Resilient Crop Varieties for Changing Weather Patterns",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "climate-resilient-crops",
    category: "Climate Change",
    content: "Select and grow crop varieties that can withstand extreme weather conditions and changing climate patterns."
  },
  {
    id: 5,
    title: "Soil Health Management for Improved Crop Yields",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "soil-health-management",
    category: "Soil Science",
    content: "Build and maintain healthy soil through proper management practices for sustainable productivity."
  },
  {
    id: 6,
    title: "Precision Farming with Drone Technology",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "precision-farming-drones",
    category: "Technology",
    content: "Leverage drone technology for field mapping, crop monitoring, and targeted interventions."
  },
  {
    id: 7,
    title: "Companion Planting for Natural Pest Management",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "companion-planting",
    category: "Organic Farming",
    content: "Strategically combine plant species to deter pests and enhance growth naturally."
  },
  {
    id: 8,
    title: "Efficient Greenhouse Management Techniques",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "greenhouse-management",
    category: "Controlled Environment",
    content: "Optimize greenhouse conditions for year-round production and resource efficiency."
  }
];

export default function TipsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const categories = ["All", "Technology", "Sustainability", "Organic Farming", "Climate Change", "Soil Science", "Controlled Environment"];
  
  const filteredTips = activeCategory === "All" 
    ? tipsData 
    : tipsData.filter(item => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-green-50">
      <div className="max-w-7xl mx-auto w-full px-4 py-12 md:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href={"/dashboard"} 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Back to Home
          </Link>
        </div>
        
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/40 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Farming Tips"
            width={2000}
            height={600}
            className="object-cover h-[300px] md:h-[400px] w-full"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
            <div className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4 w-fit">
              Expert Advice
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-2xl">Farming Tips & Techniques</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">Practical guides to improve your agricultural practices and boost productivity</p>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-green-50 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTips.map((tip) => (
            <Card key={tip.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow group h-full flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={tip.image}
                  alt={tip.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {tip.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">{tip.content}</p>
                <Link 
                  href={`/tips/${tip.slug}`} 
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1 w-fit mt-auto"
                >
                  View Detailed Guide
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="bg-green-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Get Weekly Farming Tips</h2>
            <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest agricultural insights and techniques delivered straight to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow"
              />
              <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 