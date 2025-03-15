"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Clock, ArrowRight, Check, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import UserPoints from "@/components/UserPoints"; // Import the new component

// Define a type for card styles
type CardStyle = {
  bg: string;
  text: string;
  secondaryText: string;
  timeText: string;
  buttonBg: string;
  completeBg: string;
  completeText: string;
};

export default function TasksPage() {
  // Add router
  const router = useRouter();

  // Responsive state
  const [isMobile, setIsMobile] = useState(true);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Sample data for tasks
  const tasks = [
    { id: 1, title: "Add Fertilizer Details", subtitle: "And Upload An Image", timeSlot: "10:00 - 12:00", coins: 8, completed: true },
    { id: 2, title: "Add Fertilizer Details", subtitle: "And Upload An Image", timeSlot: "10:00 - 12:00", coins: 8, completed: true },
    { id: 3, title: "Add Fertilizer Details", subtitle: "And Upload An Image", timeSlot: "10:00 - 12:00", coins: 8, completed: true },
    { id: 4, title: "Monitor Plant Growth", subtitle: "And Record Observations", timeSlot: "14:00 - 16:00", coins: 12, completed: false },
    { id: 5, title: "Water Garden Beds", subtitle: "And Check Soil Moisture", timeSlot: "08:00 - 09:00", coins: 5, completed: false },
  ];

  // Card colors based on index
  const getCardStyles = (index: number): CardStyle => {
    const styles: CardStyle[] = [
      { bg: "bg-zinc-900", text: "text-white", secondaryText: "text-gray-300", timeText: "text-gray-400", buttonBg: "bg-zinc-700", completeBg: "bg-zinc-700", completeText: "text-white" },
      { bg: "bg-lime-200", text: "text-gray-800", secondaryText: "text-gray-700", timeText: "text-gray-600", buttonBg: "bg-white/70", completeBg: "bg-zinc-700", completeText: "text-white" },
      { bg: "bg-violet-300", text: "text-gray-800", secondaryText: "text-gray-700", timeText: "text-gray-600", buttonBg: "bg-white/70", completeBg: "bg-zinc-700", completeText: "text-white" }
    ];
    return styles[index % styles.length];
  };

  // Function to handle task click
  const handleTaskClick = (taskId: number) => {
    router.push(`/dashboard/task/${taskId}`);
  };

  // Function to handle back button click
  const handleBackClick = () => {
    router.push('/dashboard');
  };

  const userPoints = {
    exp: 150, // Example EXP value
    coins: 25, // Example coins value
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* User Points Section */}
      <UserPoints exp={userPoints.exp} coins={userPoints.coins} />

      {/* Mobile view */}
      {isMobile ? (
        <>
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 py-3 border-b border-gray-100">
            <div className="text-gray-600 flex items-center">
              <div 
                className="mr-2 cursor-pointer"
                onClick={handleBackClick}
              >
                <ArrowLeft className="w-5 h-5" />
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            </div>
            <div className="flex items-center text-sky-500 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span className="ml-1">25/30</span>
            </div>
          </div>

          {/* Header with coin count */}
          <div className="relative flex flex-col items-center justify-center pt-8 pb-10 bg-gradient-to-b from-blue-50 to-white">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                <Image 
                  src="/images/coin.png" 
                  alt="Coin" 
                  width={80} 
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-800 animate-fadeIn">
              25,982
            </h1>
            
            <div className="flex items-center mt-2 text-gray-600">
              <div className="flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                <Image 
                  src="/images/coin.png" 
                  alt="Coin" 
                  width={16} 
                  height={16}
                  className="object-contain"
                />
                <span>Quest Coins Collected</span>
              </div>
            </div>
          </div>

          {/* Task cards container with exact styling from image */}
          <div className="flex-1 px-5 pb-8 pt-2">
            <div className="flex flex-col gap-4">
              {tasks.slice(0, 3).map((task, index) => {
                const style = getCardStyles(index);
                return (
                  <Card key={task.id} className="p-0 rounded-3xl overflow-hidden shadow-md border-0">
                    <div className={`${style.bg} ${style.text} p-5 min-h-48 pb-12 relative`}>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-medium">{task.title}</h3>
                          <p className={style.secondaryText}>{task.subtitle}</p>
                          <div className={`flex items-center text-sm ${style.timeText} mt-2`}>
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{task.timeSlot}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <span className="font-semibold text-sm">{task.coins} Coins</span>
                          </div>
                          <div 
                            className={`w-10 h-10 rounded-full ${style.buttonBg} flex items-center justify-center cursor-pointer`}
                            onClick={() => handleTaskClick(task.id)}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                      {task.completed && (
                        <div className="absolute bottom-6 right-6 transform translate-y-1/2 z-10">
                          <button className={`${style.completeBg} ${style.completeText} text-sm px-5 py-2 rounded-full flex items-center shadow-md`}>
                            <Check className="w-3 h-3 mr-1" />
                            Complete
                          </button>
                        </div>
                      )}
                      {/* Bottom curve cutout - EXACT match to image */}
                      <div className="absolute bottom-0 left-0 right-0 h-14 bg-white rounded-t-full"></div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* iPhone home indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </>
      ) : (
        /* Desktop view - Professional SaaS UI */
        <div className="container mx-auto py-8 px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button 
                onClick={handleBackClick}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Image 
                  src="/images/coin.png" 
                  alt="Coin" 
                  width={24} 
                  height={24}
                  className="object-contain"
                />
                <span className="font-semibold text-gray-800">25,982 Coins</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-800">25/30 Daily Tasks</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Left sidebar with stats */}
            <div className="col-span-12 lg:col-span-4 xl:col-span-3">
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-yellow-300 to-yellow-500 p-1">
                      <Image 
                        src="/images/coin.png" 
                        alt="Coin" 
                        width={96} 
                        height={96}
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-6xl font-bold text-gray-800 mb-2">
                    25,982
                  </h2>
                  
                  <div className="flex items-center mt-2 text-gray-600 text-lg">
                    <div className="flex items-center gap-2">
                      <Image 
                        src="/images/coin.png" 
                        alt="Coin" 
                        width={20} 
                        height={20}
                        className="object-contain"
                      />
                      <span>Quest Coins Collected</span>
                    </div>
                  </div>

                  <div className="w-full mt-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Daily Progress</span>
                      <span className="text-sky-500 font-medium">25/30</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: '83%' }}></div>
                    </div>
                  </div>

                  <div className="w-full mt-8 space-y-4">
                    <h3 className="font-semibold text-gray-800">Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500">Tasks Completed</div>
                        <div className="text-2xl font-bold text-gray-800">42</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500">Streak</div>
                        <div className="text-2xl font-bold text-gray-800">7 days</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500">This Week</div>
                        <div className="text-2xl font-bold text-gray-800">12 tasks</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500">Rank</div>
                        <div className="text-2xl font-bold text-gray-800">#3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right content with tasks */}
            <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-8">
              {/* Today's Tasks */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Today&apos;s Tasks</h2>
                    <p className="text-gray-600">Complete these tasks to earn Quest Coins</p>
                  </div>
                  <div className="bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium text-blue-600">
                    3 of 5 completed
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {tasks.slice(0, 3).map((task, index) => {
                    const style = getCardStyles(index);
                    return (
                      <Card key={task.id} className="p-0 rounded-2xl overflow-hidden shadow-md border-0 transition-all hover:shadow-lg hover:translate-y-[-2px]">
                        <div className={`${style.bg} ${style.text} p-5 pb-12 relative`}>
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h3 className="font-medium text-lg">{task.title}</h3>
                              <p className={style.secondaryText}>{task.subtitle}</p>
                              <div className={`flex items-center text-sm ${style.timeText} mt-2`}>
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{task.timeSlot}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <span className="font-semibold">{task.coins} Coins</span>
                              </div>
                              <div 
                                className={`w-10 h-10 rounded-full ${style.buttonBg} flex items-center justify-center group-hover:bg-opacity-90 transition-all cursor-pointer`}
                                onClick={() => handleTaskClick(task.id)}
                              >
                                <ArrowRight className="w-5 h-5" />
                              </div>
                            </div>
                          </div>
                          {task.completed && (
                            <div className="absolute bottom-0 right-16 transform translate-y-1/2 z-10">
                              <div className={`${style.completeBg} ${style.completeText} px-4 py-1 rounded-full flex items-center shadow-md`}>
                                <Check className="w-3 h-3 mr-1" />
                                Complete
                              </div>
                            </div>
                          )}
                          {/* Bottom curve cutout - EXACT match to image */}
                          <div className="absolute bottom-0 left-0 right-0 h-4 bg-white rounded-t-full"></div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Upcoming Tasks</h2>
                    <p className="text-gray-600">Plan ahead with these upcoming tasks</p>
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    View All
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {tasks.slice(3, 5).map((task, index) => {
                    const style = getCardStyles(index + 3);
                    return (
                      <Card key={task.id} className="p-0 rounded-2xl overflow-hidden shadow-md border-0 transition-all hover:shadow-lg hover:translate-y-[-2px]">
                        <div className={`${style.bg} ${style.text} p-5 pb-6 relative`}>
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h3 className="font-medium text-lg">{task.title}</h3>
                              <p className={style.secondaryText}>{task.subtitle}</p>
                              <div className={`flex items-center text-sm ${style.timeText} mt-2`}>
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{task.timeSlot}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <span className="font-semibold">{task.coins} Coins</span>
                              </div>
                              <div 
                                className={`w-10 h-10 rounded-full ${style.buttonBg} flex items-center justify-center group-hover:bg-opacity-90 transition-all cursor-pointer`}
                                onClick={() => handleTaskClick(task.id)}
                              >
                                <ArrowRight className="w-5 h-5" />
                              </div>
                            </div>
                          </div>
                          {/* Bottom curve cutout - EXACT match to image */}
                          <div className="absolute bottom-0 left-0 right-0 h-4 bg-white rounded-t-full"></div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Achievements section */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Achievements</h2>
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex-shrink-0 w-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                        <Image 
                          src="/images/coin.png" 
                          alt="Achievement" 
                          width={32} 
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-800">Achievement {item}</h3>
                      <p className="text-sm text-gray-600 mt-1">Completed 5 consecutive daily tasks</p>
                      <div className="mt-3 text-xs font-medium text-blue-600">+50 coins earned</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
