"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Leaf, Warehouse, Newspaper, User } from "lucide-react";

export default function BottomNavigation() {
  const pathname = usePathname();
  
  // Don't show navigation on these pages
  const hiddenPaths = ['/', '/login', '/register'];
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  const navItems = [
    {
      label: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      label: "Plants",
      href: "/plants",
      icon: Leaf,
    },
    {
      label: "Farms",
      href: "/farms",
      icon: Warehouse,
    },
    {
      label: "News",
      href: "/news",
      icon: Newspaper,
    },
    {
      label: "Tasks",
      href: "/tasks",
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200 transition-all duration-300 ease-in-out
                    md:bottom-6 md:w-auto md:px-6 md:py-2 md:hover:scale-105">
      <div className="flex justify-between items-center px-4 py-2 md:gap-8">
        {navItems.map((item) => {
          const isActive = 
            (item.href === "/dashboard" && pathname === "/dashboard") ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
            
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-3 rounded-full transition-all duration-200 
                ${isActive 
                  ? "text-[#0F6435] md:bg-[#0F6435]/10 md:scale-110" 
                  : "text-gray-500 hover:text-[#77AD3F]"
                } md:hover:scale-110 md:flex-row md:gap-2`}
            >
              <item.icon 
                size={24} 
                className={`${isActive ? "text-[#0F6435]" : ""} transition-all`} 
              />
              <span className={`text-xs mt-1 md:text-sm md:mt-0 ${!isActive && "md:opacity-80"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 