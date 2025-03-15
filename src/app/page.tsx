'use client'
import Link from 'next/link';
import Logo from '@/components/Logo';
import HeroImage from '@/components/HeroImage';
import GetStartedButton from '@/components/GetStartedButton';
import AccountLink from '@/components/AccountLink';
import { CheckCircle, Leaf, Sprout, Users, BarChart3, ShieldCheck, Globe, Award, Zap, ArrowRight, ChevronUp, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Import BackgroundGrid with SSR disabled
const BackgroundGrid = dynamic(
  () => import('@/components/ui/BackgroundGrid').then((mod) => mod.BackgroundGrid),
  { ssr: false }
);

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);



  return (
    <main className="min-h-screen bg-gradient-to-br from-[#77AD3F]/10 to-white overflow-x-hidden relative">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative h-screen flex flex-col">
          <div className="absolute inset-0 bg-white z-0"></div>
          
          <div className="z-10 p-6 flex justify-between items-center">
            <Logo />
            <button className="text-[#0F6435] font-medium">Skip</button>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center px-6 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 w-full max-w-xs"
            >
              <HeroImage />
            </motion.div>
            
            
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                <span className="text-[#0F6435]">Farm</span>Quest
              </h2>
              <p className="text-xl text-gray-700">
                Turn Your Thumb Green, No Experience Needed!
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full space-y-4"
            >
              <GetStartedButton />
              <AccountLink />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Desktop View */}
      <div className="hidden md:block">
        {/* Navigation Bar */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-[#77AD3F]/20"
        >
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <Logo />
            <div className="flex items-center gap-8">
              <Link href="/about" className="text-gray-700 hover:text-[#0F6435] transition-colors font-medium">About</Link>
              <Link href="/features" className="text-gray-700 hover:text-[#0F6435] transition-colors font-medium">Features</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-[#0F6435] transition-colors font-medium">Pricing</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#0F6435] transition-colors font-medium">Contact</Link>
              <Link 
                href="/login" 
                className="bg-gradient-to-br from-[#77AD3F] to-[#0F6435] text-white px-5 py-2 rounded-full font-medium transition-all hover:shadow-lg"
              >
                Log in
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-8 pt-24 pb-16">
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* Left Content Section */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="col-span-6 flex flex-col items-start"
            >
              <div className="inline-block px-4 py-1 bg-[#77AD3F]/20 text-[#0F6435] rounded-full text-sm font-medium mb-6">
                Sustainable Farming
              </div>
              
              <h1 className="text-6xl font-bold mb-6 text-gray-900 leading-tight">
                <span className="text-[#0F6435]">Farm</span>Quest: 
                <span className="block mt-2">Farming Made Simple</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Turn Your Thumb Green, No Experience Needed! Start your farming journey in minutes — grow crops, 
                earn rewards, and turn your passion into profit.
              </p>
              
              <div className="flex items-center gap-6 mb-12">
                <div className="w-48">
                  <GetStartedButton />
                </div>
                <Link href="/learn-more" className="text-[#0F6435] font-medium hover:text-[#77AD3F] transition-colors flex items-center gap-2 group">
                  Learn more
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#77AD3F] to-[#0F6435] border-2 border-white flex items-center justify-center text-white font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-gray-600">
                  <span className="font-semibold">1,000+</span> farmers joined this month
                </p>
              </div>
            </motion.div>
            
            {/* Right Content Section - Updated with better globe image and card visibility */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="col-span-6 relative"
            >
              <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl border border-[#77AD3F]/20 overflow-hidden">
                <Image src="/images/globe.png" alt="Globe" width={500} height={300} className="w-full h-auto" />
              </div>
              
              {/* Improved floating stats cards with better visibility */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute top-10 -left-10 bg-white p-4 rounded-lg shadow-xl flex items-center gap-3 border-l-4 border-[#77AD3F] z-20"
              >
                <div className="bg-gradient-to-br from-[#77AD3F]/20 to-[#0F6435]/20 p-2 rounded-full">
                  <Globe className="text-[#0F6435] h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Crops Grown</p>
                  <p className="text-lg font-bold text-gray-900">10M+</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute bottom-10 -right-10 bg-white p-4 rounded-lg shadow-xl flex items-center gap-3 border-l-4 border-[#77AD3F] z-20"
              >
                <div className="bg-gradient-to-br from-[#77AD3F]/20 to-[#0F6435]/20 p-2 rounded-full">
                  <Users className="text-[#0F6435] h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Happy Farmers</p>
                  <p className="text-lg font-bold text-gray-900">500+</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Why FarmQuest Section - Updated with variety and better UI */}
        <div className="py-24 bg-gradient-to-br from-[#77AD3F]/10 to-white">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-[#77AD3F]/20 text-[#0F6435] rounded-full text-sm font-medium mb-4">
                Our Benefits
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FarmQuest?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We&apos;ve reimagined farming for everyone - whether you&apos;re a beginner or a pro.
              </p>
            </motion.div>
            
            {/* Updated feature cards with more variety and professional design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Leaf className="h-8 w-8 text-white" />,
                  title: "No Experience Needed",
                  description: "We guide you step-by-step from seed to harvest.",
                  bgClass: "from-[#77AD3F] to-[#0F6435]"
                },
                {
                  icon: <BarChart3 className="h-8 w-8 text-white" />,
                  title: "Earn While You Grow",
                  description: "Sell your crops back to us and make a steady side income.",
                  bgClass: "from-[#0F6435] to-[#77AD3F]"
                },
                {
                  icon: <Award className="h-8 w-8 text-white" />,
                  title: "Gamified Experience",
                  description: "Complete challenges, hit milestones, and earn QuestCoins.",
                  bgClass: "from-[#77AD3F] to-[#0F6435]"
                },
                {
                  icon: <ShieldCheck className="h-8 w-8 text-white" />,
                  title: "Complete Farming Kits",
                  description: "High-quality seeds, fertilizers, and tools shipped to your doorstep.",
                  bgClass: "from-[#0F6435] to-[#77AD3F]"
                },
                {
                  icon: <Users className="h-8 w-8 text-white" />,
                  title: "Expert Support",
                  description: "Our expert team is available 24/7 to help you grow with confidence.",
                  bgClass: "from-[#77AD3F] to-[#0F6435]"
                },
                {
                  icon: <Zap className="h-8 w-8 text-white" />,
                  title: "Eco-Friendly & Sustainable",
                  description: "Support sustainable agriculture and reduce your carbon footprint.",
                  bgClass: "from-[#0F6435] to-[#77AD3F]"
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  <div className="h-full flex flex-col">
                    <div className={`bg-gradient-to-br ${feature.bgClass} p-6`}>
                      <div className="bg-white/20 p-3 rounded-full w-fit mb-4">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-[#0F6435] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* How It Works Section - Updated with more variety */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-[#77AD3F]/20 text-[#0F6435] rounded-full text-sm font-medium mb-4">
                Simple Process
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get started in minutes with our simple 4-step process
              </p>
            </motion.div>
            
            {/* Updated process steps with more variety and professional design */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#77AD3F] to-[#0F6435] -translate-y-1/2 hidden md:block"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {[
                  {
                    step: "1",
                    icon: <Users className="h-6 w-6" />,
                    title: "Sign Up",
                    description: "Create your FarmQuest profile in under 2 minutes — no complicated forms or hidden fees!"
                  },
                  {
                    step: "2",
                    icon: <Sprout className="h-6 w-6" />,
                    title: "Customize Your Farm",
                    description: "Choose what kind of farm you want: Indoor/Outdoor, Small/Large, Vegetables, fruits, or herbs."
                  },
                  {
                    step: "3",
                    icon: <ShieldCheck className="h-6 w-6" />,
                    title: "Get Your Kit",
                    description: "We deliver everything you need: High-quality seeds, organic fertilizers, essential tools, and step-by-step instructions."
                  },
                  {
                    step: "4",
                    icon: <Award className="h-6 w-6" />,
                    title: "Grow & Earn",
                    description: "Upload weekly progress photos, complete challenges and milestones, earn QuestCoins for extra rewards."
                  }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative"
                  >
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-[#77AD3F]/20 h-full z-10 relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#77AD3F] to-[#0F6435] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-20">
                        {step.step}
                      </div>
                      <div className="pt-6">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 rounded-full bg-[#77AD3F]/20 text-[#0F6435]">
                            {step.icon}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800 text-center">{step.title}</h3>
                        <p className="text-gray-600 text-center">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials Section - Updated with better design */}
        <div className="py-24 bg-gradient-to-br from-[#77AD3F]/10 to-white">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-[#77AD3F]/20 text-[#0F6435] rounded-full text-sm font-medium mb-4">
                Success Stories
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why People Love FarmQuest</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of happy farmers who are growing crops and earning rewards
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "It&apos;s fun, easy, and actually makes me money!",
                  author: "Sarah K.",
                  role: "Urban Farmer",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                },
                {
                  quote: "I&apos;ve never farmed before, but now I have fresh veggies AND extra cash!",
                  author: "Michael T.",
                  role: "Beginner Farmer",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                },
                {
                  quote: "FarmQuest turned my hobby into a side hustle. The gamification makes it addictive!",
                  author: "Jessica L.",
                  role: "Weekend Farmer",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                }
              ].map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#77AD3F]/20"
                >
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 text-lg">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex items-center">
                    <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <p className="font-semibold text-gray-800">{testimonial.author}</p>
                      <p className="text-[#0F6435] text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Trust indicators - Updated with better design */}
        <div className="py-16 bg-gradient-to-br from-[#77AD3F]/10 to-white">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="text-center text-gray-500 mb-10 font-medium">Trusted by leading organizations worldwide</p>
              <div className="flex flex-wrap justify-between items-center gap-8">
                {['Agri-Tech', 'EcoFarms', 'GreenGrow', 'SustainCrop', 'FarmFuture'].map((name, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center"
                  >
                    <div className="h-16 px-8 bg-white rounded-lg shadow-md flex items-center justify-center text-[#0F6435] font-semibold border border-[#77AD3F]/20">
                      {name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Carbon Credits Impact Section - NEW */}
        <div className="py-24 bg-black relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#77AD3F" strokeWidth="1" />
                </pattern>
                <pattern id="circles" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="20" fill="none" stroke="#0F6435" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <rect width="100%" height="100%" fill="url(#circles)" />
            </svg>
          </div>
          
          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#77AD3F] filter blur-[100px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#0F6435] filter blur-[120px] opacity-15"></div>
          
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-[#77AD3F]/30 text-[#77AD3F] rounded-full text-sm font-medium mb-4">
                Environmental Impact
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">Our Carbon Credit Ecosystem</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Together, we're making a measurable difference in the fight against climate change
              </p>
            </motion.div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {[
                {
                  value: "2.7M",
                  label: "Trees Planted",
                  icon: <Leaf className="h-6 w-6" />,
                  trend: "+12% this month"
                },
                {
                  value: "45K",
                  label: "Active Farmers",
                  icon: <Users className="h-6 w-6" />,
                  trend: "+8% this month"
                },
                {
                  value: "186K",
                  label: "Carbon Credits",
                  icon: <Globe className="h-6 w-6" />,
                  trend: "+15% this month"
                },
                {
                  value: "97%",
                  label: "Sustainability Score",
                  icon: <Award className="h-6 w-6" />,
                  trend: "+3% this month"
                }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-gray-900 border border-[#77AD3F]/30 rounded-xl p-6 hover:bg-gray-800 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-[#77AD3F]/20 p-3 rounded-full">
                      <div className="text-[#77AD3F]">{stat.icon}</div>
                    </div>
                    <span className="text-[#77AD3F] text-sm font-medium">{stat.trend}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Graph and Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left side - Graph */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gray-900 border border-[#77AD3F]/30 rounded-xl p-6 relative overflow-hidden"
              >
                <h3 className="text-xl font-semibold text-white mb-6">Carbon Credits Generated (2023-2024)</h3>
                
                {/* SVG Graph */}
                <div className="relative h-64">
                  <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                    {/* Grid lines */}
                    <g className="grid-lines">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <line 
                          key={i} 
                          x1="0" 
                          y1={i * 50} 
                          x2="400" 
                          y2={i * 50} 
                          stroke="#333" 
                          strokeWidth="1" 
                          strokeDasharray="5,5" 
                        />
                      ))}
                    </g>
                    
                    {/* X-axis labels */}
                    <g className="x-labels text-xs" textAnchor="middle">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                        <text key={i} x={i * 33 + 16} y="220" fill="#999">{month}</text>
                      ))}
                    </g>
                    
                    {/* Area chart */}
                    <defs>
                      <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#77AD3F" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#0F6435" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    
                    {/* Line chart */}
                    <path 
                      d="M0,180 C20,160 40,150 60,140 C80,130 100,120 120,100 C140,80 160,70 180,60 C200,50 220,45 240,40 C260,35 280,30 300,25 C320,20 340,15 360,10 C380,5 400,0 400,0" 
                      fill="none" 
                      stroke="#77AD3F" 
                      strokeWidth="3" 
                    />
                    
                    {/* Area under the line */}
                    <path 
                      d="M0,180 C20,160 40,150 60,140 C80,130 100,120 120,100 C140,80 160,70 180,60 C200,50 220,45 240,40 C260,35 280,30 300,25 C320,20 340,15 360,10 C380,5 400,0 400,0 V200 H0 Z" 
                      fill="url(#greenGradient)" 
                    />
                    
                    {/* Data points */}
                    {[
                      {x: 0, y: 180}, {x: 33, y: 150}, {x: 66, y: 140}, 
                      {x: 99, y: 100}, {x: 132, y: 60}, {x: 165, y: 40}, 
                      {x: 198, y: 30}, {x: 231, y: 25}, {x: 264, y: 20}, 
                      {x: 297, y: 15}, {x: 330, y: 10}, {x: 363, y: 5}
                    ].map((point, i) => (
                      <circle 
                        key={i} 
                        cx={point.x} 
                        cy={point.y} 
                        r="4" 
                        fill="#77AD3F" 
                        stroke="#0F6435" 
                        strokeWidth="2" 
                      />
                    ))}
                  </svg>
                  
                  {/* Y-axis labels */}
                  <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                    <span>200K</span>
                    <span>150K</span>
                    <span>100K</span>
                    <span>50K</span>
                    <span>0</span>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#77AD3F]"></div>
                    <span className="text-gray-400 text-sm">Carbon Credits</span>
                  </div>
                  <span className="text-[#77AD3F] font-medium">+186% YoY Growth</span>
                </div>
              </motion.div>
              
              {/* Right side - Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white">How Our Carbon Credit System Works</h3>
                <p className="text-gray-300">
                  FarmQuest&apos;s innovative carbon credit system rewards sustainable farming practices while making a measurable impact on climate change.
                </p>
                
                <div className="space-y-6 mt-8">
                  {[
                    {
                      title: "Plant & Earn",
                      description: "Each plant you grow generates carbon credits based on its CO2 absorption capacity.",
                      icon: <Sprout className="h-6 w-6" />
                    },
                    {
                      title: "Verified Impact",
                      description: "Our blockchain technology ensures transparent tracking of every credit generated.",
                      icon: <ShieldCheck className="h-6 w-6" />
                    },
                    {
                      title: "Marketplace",
                      description: "Sell your carbon credits to businesses looking to offset their emissions.",
                      icon: <BarChart3 className="h-6 w-6" />
                    }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex gap-4"
                    >
                      <div className="bg-[#77AD3F]/20 p-3 rounded-full h-fit">
                        <div className="text-[#77AD3F]">{item.icon}</div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-gray-900 border border-[#77AD3F]/30 rounded-xl p-6 mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-semibold">Total Environmental Impact</h4>
                    <span className="text-[#77AD3F]">Last updated: Today</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">CO₂ Offset</p>
                      <p className="text-2xl font-bold text-white">12,450 tons</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Water Saved</p>
                      <p className="text-2xl font-bold text-white">8.3M gallons</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mt-16 text-center"
            >
              <button className="bg-gradient-to-r from-[#77AD3F] to-[#0F6435] text-white hover:from-[#6A9D35] hover:to-[#0A5A2F] transition-colors duration-300 font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform flex items-center justify-center mx-auto">
                <Globe className="mr-2 h-5 w-5" /> Join Our Carbon Credit Program
              </button>
              <p className="text-gray-400 mt-4">
                Start making a difference today while earning rewards for your sustainable practices.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Big CTA with Background Grid */}
        <div className="py-32 relative overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0">
            {isClient && <BackgroundGrid isClient={true} />}
          </div>
          
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 md:p-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block px-4 py-1 bg-[#77AD3F]/20 text-[#0F6435] rounded-full text-sm font-medium mb-6">
                    Limited Time Offer
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Start Your Farming Journey Today
                  </h2>
                  <p className="text-xl text-gray-700 mb-8">
                    Get 20% off your first farming kit and free access to our premium growing guides.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-gradient-to-r from-[#77AD3F] to-[#0F6435] text-white hover:from-[#6A9D35] hover:to-[#0A5A2F] transition-colors duration-300 font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform flex items-center justify-center">
                      <Sprout className="mr-2 h-5 w-5" /> Get Started Now
                    </button>
                    <button className="bg-white text-[#0F6435] border-2 border-[#0F6435] hover:bg-[#0F6435]/10 transition-colors duration-300 font-semibold py-4 px-8 rounded-full text-lg flex items-center justify-center">
                      <MessageSquare className="mr-2 h-5 w-5" /> Talk to an Expert
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#77AD3F]/30 rounded-full filter blur-xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#0F6435]/30 rounded-full filter blur-xl"></div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 relative">
                    <div className="absolute top-0 right-0 bg-[#77AD3F] text-white px-4 py-2 rounded-bl-lg rounded-tr-lg font-bold">
                      20% OFF
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Starter Farming Kit</h3>
                    <ul className="space-y-3 mb-6">
                      {[
                        "Premium quality seeds",
                        "Organic soil and fertilizer",
                        "Essential farming tools",
                        "Step-by-step growing guide",
                        "24/7 expert support"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-[#77AD3F] mr-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-end">
                        <span className="text-3xl font-bold text-gray-900">$79</span>
                        <span className="text-lg text-gray-500 line-through ml-2">$99</span>
                      </div>
                      <span className="text-sm text-gray-600">Free shipping</span>
                    </div>
                    <div className="bg-[#77AD3F]/10 p-3 rounded-lg text-sm text-[#0F6435] mb-4">
                      <span className="font-medium">Limited offer:</span> First 100 customers get a free herb garden expansion pack!
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* FAQ Section - Updated with better design */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-[#77AD3F]/20 text-[#0F6435] rounded-full text-sm font-medium mb-4">
                Common Questions
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about FarmQuest
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "Do I need farming experience?",
                  answer: "Nope! FarmQuest guides you every step of the way."
                },
                {
                  question: "How do I earn QuestCoins?",
                  answer: "Complete challenges, hit growth milestones, and engage with the platform."
                },
                {
                  question: "What if my crops fail?",
                  answer: "We&apos;ve got you covered! Our expert support team is here to help you troubleshoot."
                },
                {
                  question: "How long does it take to grow crops?",
                  answer: "It depends on the crop type, but most crops take 4–8 weeks to reach harvest."
                },
                {
                  question: "What if I don&apos;t have outdoor space?",
                  answer: "No worries! We offer indoor farming kits with everything you need."
                },
                {
                  question: "Can I farm during the winter?",
                  answer: "Yes! Our indoor kits are designed for year-round farming."
                }
              ].map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#77AD3F]/20 group"
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-[#0F6435] transition-colors flex items-center">
                    <span className="bg-[#77AD3F]/20 text-[#0F6435] w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">Q</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-11">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-1">
                <Logo />
                <p className="mt-6 text-gray-400 leading-relaxed">
                  FarmQuest is revolutionizing farming with our innovative platform that makes growing crops accessible, profitable, and fun for everyone.
                </p>
                <div className="mt-8 flex space-x-4">
                  {[
                    { name: 'facebook', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> },
                    { name: 'twitter', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg> },
                    { name: 'instagram', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
                    { name: 'linkedin', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> }
                  ].map((social) => (
                    <a 
                      key={social.name} 
                      href={`#${social.name}`} 
                      className="bg-gray-800 hover:bg-[#77AD3F] transition-colors duration-300 w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      <span className="sr-only">{social.name}</span>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-6 text-[#77AD3F]">Company</h3>
                <ul className="space-y-4">
                  {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-6 text-[#77AD3F]">Resources</h3>
                <ul className="space-y-4">
                  {['Farming Guide', 'Community', 'Help Center', 'Partners', 'Privacy Policy'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-6 text-[#77AD3F]">Subscribe</h3>
                <p className="text-gray-400 mb-4">
                  Get the latest news and updates from FarmQuest.
                </p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#77AD3F] w-full"
                  />
                  <button className="bg-[#77AD3F] hover:bg-[#0F6435] transition-colors duration-300 px-4 py-2 rounded-r-md">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} FarmQuest. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
        
        {/* Floating Chat Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <button 
            className="bg-gradient-to-r from-[#77AD3F] to-[#0F6435] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            aria-label="Chat with us"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
              <span className="pl-2">Chat with us</span>
            </span>
          </button>
        </motion.div>
        
        {/* Scroll to top button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 z-50 bg-white text-[#0F6435] p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-[#77AD3F]/10 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
        
        {/* Cookie consent banner */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-[#77AD3F]/20 shadow-lg p-4"
        >
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-4">
              <p className="text-gray-700">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                Privacy Policy
              </button>
              <button className="bg-gradient-to-br from-[#77AD3F] to-[#0F6435] text-white px-4 py-2 rounded-md transition-colors">
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      </div>

     
    </main>
  );
}