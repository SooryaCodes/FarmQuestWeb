"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

// Define the NewsItem interface

// Enhanced news data with Unsplash images and more realistic content
const newsItems = [
  {
    id: 1,
    title: "Early Detection of Tomato Plant Diseases Using AI Technology",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "tomato-plant-diseases",
    category: "Technology",
    date: "June 15, 2023",
    excerpt: "New AI tools help farmers identify early signs of blight and bacterial wilt before visible symptoms appear."
  },
  {
    id: 2,
    title: "Sustainable Irrigation Methods for Water Conservation",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "sustainable-irrigation",
    category: "Sustainability",
    date: "May 28, 2023",
    excerpt: "Innovative drip irrigation systems reduce water usage by up to 60% while improving crop yields."
  },
  {
    id: 3,
    title: "Organic Pest Control Strategies for Chemical-Free Farming",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "organic-pest-control",
    category: "Organic Farming",
    date: "April 12, 2023",
    excerpt: "Natural predators and companion planting prove effective in managing pest populations without chemicals."
  },
  {
    id: 4,
    title: "Climate-Resilient Crop Varieties for Changing Weather Patterns",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "climate-resilient-crops",
    category: "Climate Change",
    date: "March 5, 2023",
    excerpt: "Drought-resistant seed varieties show promising results in regions affected by increasing temperatures."
  },
  {
    id: 5,
    title: "Vertical Farming Innovations for Urban Agriculture",
    image: "https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "vertical-farming-innovations",
    category: "Urban Agriculture",
    date: "February 18, 2023",
    excerpt: "New vertical farming technologies enable efficient food production in limited urban spaces."
  },
  {
    id: 6,
    title: "Regenerative Agriculture Practices Gaining Momentum",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "regenerative-agriculture",
    category: "Sustainability",
    date: "January 30, 2023",
    excerpt: "Farmers report improved soil health and biodiversity after adopting regenerative practices."
  },
  {
    id: 7,
    title: "Blockchain Technology for Agricultural Supply Chain Transparency",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "blockchain-agriculture",
    category: "Technology",
    date: "December 12, 2022",
    excerpt: "Blockchain implementations provide farm-to-table traceability and reduce fraud in agricultural products."
  },
  {
    id: 8,
    title: "Agroforestry Systems Show Promise for Climate Mitigation",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "agroforestry-climate-mitigation",
    category: "Climate Change",
    date: "November 5, 2022",
    excerpt: "Research demonstrates that integrated tree-crop systems sequester more carbon while maintaining productivity."
  }
];

export default function NewsArchivePage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const categories = ["All", "Technology", "Sustainability", "Organic Farming", "Climate Change", "Urban Agriculture"];
  
  const filteredNews = newsItems
    .filter(item => activeCategory === "All" || item.category === activeCategory)
    .filter(item => 
      searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-green-50">
      <div className="max-w-7xl mx-auto w-full px-4 py-12 md:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Back to News
          </Link>
        </div>
        
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/40 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Farming News"
            width={2000}
            height={600}
            className="object-cover h-[300px] md:h-[400px] w-full"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
            <div className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4 w-fit">
              Latest News
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-2xl">Farming News & Updates</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">Stay informed about the latest developments in the farming industry</p>
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
        
        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search news"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow"
          />
          <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
            Search
          </button>
        </div>
        
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredNews.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow group h-full flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">{item.excerpt}</p>
                <Link 
                  href={`/news/${item.slug}`} 
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1 w-fit mt-auto"
                >
                  Read More
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Get Weekly Farming News</h2>
            <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest agricultural insights and updates delivered straight to your inbox.</p>
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