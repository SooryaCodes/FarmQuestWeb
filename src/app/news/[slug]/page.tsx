"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

// Define the NewsItem interface
interface NewsItem {
  id: number;
  title: string;
  image: string;
  slug: string;
  category?: string;
  date?: string;
  excerpt?: string;
  content?: string;
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
    excerpt: "New AI tools help farmers identify early signs of blight and bacterial wilt before visible symptoms appear.",
    content: `
      <p>Agricultural researchers have developed a groundbreaking AI-powered system that can detect tomato plant diseases up to two weeks before visible symptoms appear. This early detection system uses a combination of hyperspectral imaging and machine learning algorithms to identify subtle changes in plant tissue that indicate the onset of common diseases like early blight, late blight, and bacterial wilt.</p>
      
      <p>The technology, developed by a team at the Agricultural Innovation Institute, works by capturing images of tomato plants using specialized cameras that can detect light wavelengths invisible to the human eye. These images are then analyzed by AI algorithms trained on thousands of examples of both healthy and diseased plants.</p>
      
      <h3>Key Benefits for Farmers</h3>
      <ul>
        <li>Detection of diseases up to 14 days before visible symptoms</li>
        <li>Reduction in pesticide use by up to 30% through targeted early intervention</li>
        <li>Increased crop yields by preventing widespread infection</li>
        <li>Mobile application interface for easy field use</li>
      </ul>
      
      <p>Field trials conducted across different climate zones have shown that farms implementing this technology have reduced crop losses by an average of 24% compared to traditional visual inspection methods.</p>
      
      <p>"This technology represents a paradigm shift in how we approach plant disease management," says Dr. Maria Chen, lead researcher on the project. "Instead of reacting to visible outbreaks, farmers can now take preventative action before the disease has a chance to spread."</p>
      
      <p>The system is currently being adapted for other high-value crops including peppers, cucumbers, and various berries, with commercial availability expected by next growing season.</p>
    `
  },
  {
    id: 2,
    title: "Sustainable Irrigation Methods for Water Conservation",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "sustainable-irrigation",
    category: "Sustainability",
    date: "May 28, 2023",
    excerpt: "Innovative drip irrigation systems reduce water usage by up to 60% while improving crop yields.",
    content: `
      <p>As water scarcity becomes an increasingly pressing issue for agricultural communities worldwide, innovative irrigation technologies are emerging as critical solutions. Recent advancements in drip irrigation systems have demonstrated remarkable efficiency, reducing water consumption by up to 60% while simultaneously improving crop yields.</p>
      
      <p>These next-generation systems utilize soil moisture sensors, weather data integration, and precision emitters to deliver water directly to plant root zones in precisely calibrated amounts. By eliminating runoff and evaporation, these systems ensure that nearly every drop of water serves its intended purpose.</p>
      
      <h3>System Components</h3>
      <ul>
        <li>Soil moisture sensors placed at various depths</li>
        <li>Weather station integration for evapotranspiration calculations</li>
        <li>Pressure-compensating emitters for uniform water distribution</li>
        <li>Solar-powered pumps for off-grid operation</li>
        <li>Smartphone control and monitoring capabilities</li>
      </ul>
      
      <p>A three-year study conducted across arid regions in California and Arizona found that farms implementing these systems increased their water use efficiency by an average of 47%, while also reporting yield increases between 8% and 22% depending on crop type.</p>
      
      <p>"The return on investment is compelling," explains irrigation specialist James Rodriguez. "Most farmers see complete payback within two growing seasons through water savings alone, not counting the additional revenue from improved yields."</p>
      
      <p>Government rebate programs in several states now offer subsidies covering up to 50% of installation costs, making these systems increasingly accessible to small and medium-sized farming operations.</p>
    `
  },
  {
    id: 3,
    title: "Organic Pest Control Strategies for Chemical-Free Farming",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "organic-pest-control",
    category: "Organic Farming",
    date: "April 12, 2023",
    excerpt: "Natural predators and companion planting prove effective in managing pest populations without chemicals.",
    content: `
      <p>Organic farmers are increasingly turning to integrated pest management strategies that leverage ecosystem dynamics rather than chemical interventions. Recent field studies have demonstrated that carefully designed combinations of companion planting and beneficial insect introduction can effectively control pest populations while promoting overall ecosystem health.</p>
      
      <p>These biological control methods work by creating balanced agricultural ecosystems where natural predators keep pest species in check, eliminating the need for synthetic pesticides that can harm beneficial insects, soil microorganisms, and water systems.</p>
      
      <h3>Effective Strategies</h3>
      <ul>
        <li>Strategic intercropping with pest-repelling plants like marigolds, nasturtiums, and aromatic herbs</li>
        <li>Scheduled releases of beneficial insects such as ladybugs, lacewings, and parasitic wasps</li>
        <li>Habitat creation for natural predators including birds, bats, and beneficial insects</li>
        <li>Trap cropping to concentrate pests away from main production areas</li>
        <li>Microbial inoculants that strengthen plant immune responses</li>
      </ul>
      
      <p>A comprehensive five-year study across diverse growing regions found that farms implementing these integrated approaches reduced crop damage from insect pests by an average of 35% compared to conventional organic methods relying primarily on approved organic sprays.</p>
      
      <p>"The key insight is that we're working with nature's existing mechanisms rather than trying to override them," explains Dr. Sophia Williams, an agroecologist specializing in biological control. "These systems become more effective over time as beneficial populations establish themselves and soil health improves."</p>
      
      <p>While these methods typically require more planning and ecological knowledge than conventional approaches, they offer significant long-term benefits including reduced input costs, improved worker safety, and premium pricing for chemical-free produce.</p>
    `
  },
  {
    id: 4,
    title: "Climate-Resilient Crop Varieties for Changing Weather Patterns",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "climate-resilient-crops",
    category: "Climate Change",
    date: "March 5, 2023",
    excerpt: "Drought-resistant seed varieties show promising results in regions affected by increasing temperatures.",
    content: `
      <p>As climate change continues to disrupt traditional growing seasons and increase weather volatility, agricultural researchers have accelerated the development of climate-resilient crop varieties. These new cultivars, developed through a combination of traditional breeding techniques and modern genomic tools, demonstrate remarkable ability to thrive under challenging conditions including drought, heat stress, and irregular rainfall patterns.</p>
      
      <p>Recent field trials across regions experiencing climate stress have shown that these adapted varieties can maintain yields even when subjected to conditions that would significantly damage conventional cultivars.</p>
      
      <h3>Key Adaptations</h3>
      <ul>
        <li>Enhanced root systems that access deeper soil moisture during drought periods</li>
        <li>Modified leaf structures that reduce water loss through transpiration</li>
        <li>Adjusted flowering times to avoid seasonal temperature extremes</li>
        <li>Improved heat tolerance during critical reproductive stages</li>
        <li>Faster maturation to complete growth cycles during shorter favorable periods</li>
      </ul>
      
      <p>Particularly promising results have been observed with drought-resistant maize varieties that maintained 78% of optimal yields under severe water restriction, compared to just 30% yield retention in conventional varieties under identical conditions.</p>
      
      <p>"These aren't just incremental improvements," notes plant geneticist Dr. Robert Kim. "We're seeing fundamental adaptations that allow these crops to thrive in conditions that would have been considered unsuitable for agriculture just a decade ago."</p>
      
      <p>Importantly, many of these new varieties have been developed with attention to local food preferences and farming practices, ensuring they meet both agricultural and cultural requirements. Seed sharing networks and subsidized distribution programs are helping to make these varieties accessible to small-scale farmers in vulnerable regions.</p>
    `
  }
];

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);

  useEffect(() => {
    const slug = params.slug as string;
    const foundArticle = newsItems.find(item => item.slug === slug);
    
    if (foundArticle) {
      setArticle(foundArticle);
      // Find related articles in the same category
      const related = newsItems
        .filter(item => item.category === foundArticle.category && item.id !== foundArticle.id)
        .slice(0, 3);
      setRelatedArticles(related);
    } else {
      // Redirect to news page if article not found
      router.push('/news');
    }
  }, [params.slug, router]);

  if (!article) {
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
            href="/news" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Back to News
          </Link>
        </div>
        
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {article.category}
            </span>
            <span className="text-gray-500">{article.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">{article.title}</h1>
        </div>
        
        {/* Featured Image */}
        <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden mb-10 shadow-xl">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <div dangerouslySetInnerHTML={{ __html: article.content || '' }} />
        </div>
        
        {/* Share and Actions */}
        <div className="flex flex-wrap items-center justify-between p-6 bg-green-50 rounded-xl mb-16">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Share this article</h3>
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
        
        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-green-600 rounded-full"></span>
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((item) => (
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
                    <div className="text-gray-500 text-sm mb-2">{item.date}</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.excerpt}</p>
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