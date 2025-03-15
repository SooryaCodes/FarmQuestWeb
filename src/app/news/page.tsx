"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Define the NewsItem interface
interface NewsItem {
  id: number;
  title: string;
  image: string;
  slug: string;
  category?: string;
  date?: string;
  excerpt?: string;
}

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
  }
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const categories = ["All", "Technology", "Sustainability", "Organic Farming", "Climate Change"];
  
  const filteredNews = activeCategory === "All" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-green-50">
      <div className="max-w-7xl mx-auto w-full px-4 py-12 md:px-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/40 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Agricultural News"
            width={2000}
            height={600}
            className="object-cover h-[300px] md:h-[400px] w-full"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
            <div className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4 w-fit">
              Latest Updates
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-2xl">Agricultural Insights & Innovations</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">Stay informed with cutting-edge farming techniques and sustainable practices</p>
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
        
        {/* Featured Article */}
        {filteredNews.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <span className="inline-block w-1.5 h-6 bg-green-600 rounded-full"></span>
                Featured Article
              </h2>
            </div>
            
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={filteredNews[0].image}
                    alt={filteredNews[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {filteredNews[0].category}
                      </span>
                      <span className="text-gray-500 text-sm">{filteredNews[0].date}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{filteredNews[0].title}</h3>
                    <p className="text-gray-600 mb-6">{filteredNews[0].excerpt}</p>
                  </div>
                  <Link 
                    href={`/news/${filteredNews[0].slug}`} 
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                  >
                    Read Full Article
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {/* Latest News Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-green-600 rounded-full"></span>
              Latest News
            </h2>
            <Link 
              href="/news/archive" 
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredNews.slice(0, 3).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        
        {/* Farming Tips Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-green-600 rounded-full"></span>
              Farming Tips
            </h2>
            <Link 
              href="/tips" 
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNews.map((item) => (
              <TipCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// Enhanced News Card Component
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow group h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            {item.category}
          </span>
        </div>
      </div>
      <CardContent className="p-5 flex-grow">
        <div className="text-gray-500 text-sm mb-2">{item.date}</div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{item.excerpt}</p>
      </CardContent>
      <CardFooter className="p-5 pt-0 border-t border-gray-100">
        <Link 
          href={`/news/${item.slug}`} 
          className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
        >
          Read Article
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </CardFooter>
    </Card>
  );
}

// Enhanced Tip Card Component
function TipCard({ item }: { item: NewsItem }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow bg-gradient-to-br from-green-50 to-white h-full">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
              <path d="M12 22c6.5-3 10-8 10-14a10 10 0 0 0-20 0c0 6 3.5 11 10 14z"></path>
            </svg>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">{item.category}</div>
            <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.excerpt}</p>
            <Link 
              href={`/news/${item.slug}`} 
              className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1 w-fit"
            >
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
