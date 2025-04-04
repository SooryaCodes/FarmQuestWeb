"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

// Define the TipItem interface
interface TipItem {
  id: number;
  title: string;
  image: string;
  slug: string;
  category?: string;
  content?: string;
  date?: string;
  excerpt?: string;
  steps?: {
    title: string;
    description: string;
    image?: string;
  }[];
}

// Sample tips data
const tipsData = [
  {
    id: 1,
    title: "Early Detection of Tomato Plant Diseases Using AI Technology",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "tomato-plant-diseases",
    category: "Technology",
    content: "Learn how to use modern AI tools to detect plant diseases before they become visible to the naked eye.",
    steps: [
      {
        title: "Download the AI Scanner App",
        description: "Start by downloading a specialized plant disease detection app on your smartphone. We recommend PlantDoctor or LeafScan, which are available on both iOS and Android.",
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Scan Your Plants Regularly",
        description: "Hold your phone camera 8-12 inches from the plant leaves, ensuring good lighting. The app will analyze leaf coloration, spots, and texture patterns that might indicate early disease.",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Interpret Results and Take Action",
        description: "The app will provide disease probability ratings. For any detection above 70%, begin treatment with appropriate organic or chemical solutions as recommended by the app.",
        image: "https://images.unsplash.com/photo-1598512199776-e0aa7b3d86bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Track Progress Over Time",
        description: "Create a monitoring schedule and track the health of your plants over time. This historical data will help you identify patterns and improve your disease management strategy.",
        image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: 2,
    title: "Sustainable Irrigation Methods for Water Conservation",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "sustainable-irrigation",
    category: "Sustainability",
    content: "Implement water-saving irrigation techniques that reduce consumption while improving plant health.",
    steps: [
      {
        title: "Install Drip Irrigation System",
        description: "Purchase a drip irrigation kit appropriate for your garden size. These systems deliver water directly to plant roots, minimizing evaporation and runoff.",
        image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Add Smart Controllers",
        description: "Connect your irrigation system to a smart controller that adjusts watering schedules based on weather forecasts and soil moisture readings.",
        image: "https://images.unsplash.com/photo-1558383817-b016a93f4dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Implement Rainwater Harvesting",
        description: "Install rain barrels or cisterns to collect rainwater from roof runoff. This water can then be used during dry periods to supplement your irrigation needs.",
        image: "https://images.unsplash.com/photo-1620335900541-21b97f43c0af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Apply Mulch to Retain Moisture",
        description: "Add a 2-3 inch layer of organic mulch around plants to reduce evaporation, suppress weeds, and gradually improve soil structure as it decomposes.",
        image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: 3,
    title: "Organic Pest Control Strategies for Chemical-Free Farming",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "organic-pest-control",
    category: "Organic Farming",
    content: "Control pests naturally without harmful chemicals using these proven organic methods.",
    steps: [
      {
        title: "Introduce Beneficial Insects",
        description: "Purchase and release beneficial insects like ladybugs, lacewings, and predatory mites that feed on common garden pests. Create habitat features to help them establish.",
        image: "https://images.unsplash.com/photo-1579187707643-35646d22b596?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Plant Companion Crops",
        description: "Interplant your main crops with pest-repelling plants such as marigolds, nasturtiums, basil, and garlic to naturally deter common insect pests.",
        image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Make Homemade Organic Sprays",
        description: "Create effective pest deterrents using ingredients like neem oil, garlic, hot peppers, and soap. Apply these to affected plants during early morning or evening hours.",
        image: "https://images.unsplash.com/photo-1580856451046-4c030a12b28d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Implement Crop Rotation",
        description: "Plan a 3-4 year rotation schedule for your crops to prevent pest populations from becoming established in the soil and to break disease cycles.",
        image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: 4,
    title: "Climate-Resilient Crop Varieties for Changing Weather Patterns",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "climate-resilient-crops",
    category: "Climate Change",
    content: "Select and grow crop varieties that can withstand extreme weather conditions and changing climate patterns.",
    steps: [
      {
        title: "Research Adapted Varieties",
        description: "Identify crop varieties specifically bred for drought tolerance, heat resistance, or shorter growing seasons depending on your local climate challenges.",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Test Multiple Varieties",
        description: "Plant small test plots with different varieties to determine which perform best in your specific microclimate before scaling up production.",
        image: "https://images.unsplash.com/photo-1620558138198-cfb9b4f3c294?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Implement Season Extension Techniques",
        description: "Use row covers, high tunnels, or greenhouses to protect climate-sensitive crops from extreme weather conditions.",
        image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ]
  }
];

export default function TipsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [tip, setTip] = useState<TipItem | null>(null);
  const [relatedTips, setRelatedTips] = useState<TipItem[]>([]);

  useEffect(() => {
    const slug = params.slug as string;
    const foundTip = tipsData.find(item => item.slug === slug);
    
    if (foundTip) {
      setTip(foundTip);
      // Find related tips in the same category
      const related = tipsData
        .filter(item => item.category === foundTip.category && item.id !== foundTip.id)
        .slice(0, 3);
      setRelatedTips(related);
    } else {
      // Redirect to tips page if tip not found
      router.push('/tips');
    }
  }, [params.slug, router]);

  if (!tip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-green-50">
      <div className="max-w-5xl mx-auto w-full px-4 py-12 md:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/tips" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Back to Tips
          </Link>
        </div>
        
        {/* Tip Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {tip.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">{tip.title}</h1>
        </div>
        
        {/* Featured Image */}
        <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden mb-10 shadow-xl">
          <Image
            src={tip.image}
            alt={tip.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Tip Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <div dangerouslySetInnerHTML={{ __html: tip.content || '' }} />
        </div>
        
        {/* Share and Actions */}
        <div className="flex flex-wrap items-center justify-between p-6 bg-green-50 rounded-xl mb-16">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Share this tip</h3>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download PDF
            </button>
          </div>
        </div>
        
        {/* Related Tips */}
        {relatedTips.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-green-600 rounded-full"></span>
              Related Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTips.map((item) => (
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
                  <CardContent className="p-5 flex-grow">
                    <div className="text-gray-500 text-sm mb-2">{item.date || ''}</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.excerpt || item.content}</p>
                    <Link 
                      href={`/tips/${item.slug}`} 
                      className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                    >
                      Read Tip
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 