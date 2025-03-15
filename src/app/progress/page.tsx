import React from 'react';
import { ArrowLeft, MoreHorizontal, X, Bell } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProgressPage() {
  // Sample data for task progress
  const progressData = [
    { day: 'Mon', progress: 68 },
    { day: 'Tue', progress: 85 },
    { day: 'Wed', progress: 78 },
    { day: 'Thu', progress: 82 },
    { day: 'Fri', progress: 92 },
  ];

  // Current task data
  const currentTask = {
    title: "Complete Your Task",
    description: "Complete your task to earn more farm coins and reap the rewards of your hard work!",
    progress: 65
  };

  // Number of tasks today
  const tasksToday = 5;

  return (
    <div className="max-w-7xl mx-auto bg-white min-h-screen relative pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Header and Progress Chart */}
        <div className="lg:col-span-2 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Link href="/" className="p-2 rounded-full hover:bg-gray-100">
              <ArrowLeft size={24} />
            </Link>
            <div className="bg-amber-400 p-2 rounded-full">
              <Bell size={20} color="white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-1">Start Your Day</h1>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            & Be Productive
            <span className="ml-2">🌾</span>
          </h1>

          {/* Task Progress Chart - Enhanced for web */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Task Progress</h2>
              <MoreHorizontal size={20} className="text-gray-500" />
            </div>
            
            <div className="relative h-64 flex items-end justify-between">
              {progressData.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-1/5">
                  <div className="relative w-full flex justify-center mb-2">
                    <div className="absolute -top-8 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      +{item.progress}%
                    </div>
                    <div 
                      className={`w-6 md:w-8 rounded-full bg-${index === progressData.length - 1 ? 'black' : 'emerald-500'}`}
                      style={{ 
                        height: `${item.progress * 1.5}px`,
                        backgroundImage: index !== progressData.length - 1 ? 'linear-gradient(135deg, rgba(255,255,255,0.3) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.3) 75%, transparent 75%, transparent)' : 'none',
                        backgroundSize: '10px 10px'
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tasks Today Notification */}
          <div className="mt-8 relative">
            <div className="bg-black text-white py-3 px-6 rounded-full flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-emerald-500 p-1 rounded mr-3">
                  <MoreHorizontal size={16} color="white" />
                </div>
                <p className="text-base">You have {tasksToday} tasks today</p>
              </div>
              <button className="p-1">
                <X size={18} />
              </button>
            </div>
            
            {/* User Avatar */}
            <div className="absolute -bottom-6 left-6">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                <Image 
                  src="/avatar-placeholder.jpg" 
                  alt="User avatar" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tasks */}
        <div className="lg:col-span-1 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-xl">Today Tasks</h2>
            <Link href="/tasks" className="text-sm text-gray-500 flex items-center">
              See All <span className="ml-1">&gt;</span>
            </Link>
          </div>

          {/* Task In Progress */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-700 font-medium text-lg">Task In Progress</h3>
              <MoreHorizontal size={18} className="text-gray-500" />
            </div>
            <p className="text-sm text-gray-500 mb-6">{currentTask.description}</p>
            
            <button className="text-emerald-600 font-medium text-lg mb-4">
              {currentTask.title}
            </button>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-emerald-500 h-3 rounded-full" 
                style={{ width: `${currentTask.progress}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-500">{currentTask.progress}%</div>
          </div>
          
          {/* Additional Tasks List - Web Only */}
          <div className="hidden lg:block">
            <h3 className="font-medium text-lg mb-4">Upcoming Tasks</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((task) => (
                <div key={task} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Task #{task}</h4>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Pending</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Complete this task to earn rewards</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
