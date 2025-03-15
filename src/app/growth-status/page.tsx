"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StatusItem {
  time: string;
  status: string;
  state:
    | "completed"
    | "not-planted"
    | "not-updated"
    | "in-progress"
    | "delayed";
  icon?: string;
  warning?: boolean;
  details?: string;
}

export default function GrowthStatusPage() {
  const router = useRouter();

  // This would come from your backend in a real implementation
  const statusItems: StatusItem[] = [
    {
      time: "08:00",
      status: "Delivery Completed On 26 July",
      state: "completed",
      icon: "/images/delivery-icon.svg",
      details: "Your plant was delivered successfully and signed for.",
    },
    {
      time: "10:30",
      status: "Plant Is Being Prepared",
      state: "in-progress",
      icon: "/images/plant-icon.svg",
      details: "Your plant is being prepared for planting by our experts.",
    },
    {
      time: "12:15",
      status: "Plant Is Not Planted",
      state: "not-planted",
      icon: "/images/plant-icon.svg",
      warning: true,
      details: "Please plant your delivery within 48 hours for best results.",
    },
    {
      time: "14:45",
      status: "Watering Scheduled",
      state: "delayed",
      icon: "/images/water-icon.svg",
      warning: true,
      details: "First watering delayed due to pending planting.",
    },
    {
      time: "16:00",
      status: "Not Updated",
      state: "not-updated",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 md:bg-white">
      {/* Header - Modernized with better responsive design */}
      <header className="sticky top-0 z-50 flex items-center p-3 md:p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-3 text-gray-700 hover:bg-gray-100 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#0F6435]"
              onClick={() => router.back()}
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="sr-only">Go back</span>
            </Button>
            <h1 className="text-lg md:text-xl font-semibold tracking-tight text-[#0F6435]">
              Growth Status
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:bg-gray-100 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#0F6435]"
            aria-label="Add new plant"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9Z" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
            <span className="sr-only">Add new plant</span>
          </Button>
        </div>
      </header>

      {/* Status Timeline - Enhanced with animations and improved UI */}
      <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        <div className="relative">
          {statusItems.map((item, index) => (
            <div key={index} className="flex mb-12 md:mb-16 group">
              {/* Timeline dot and line - Enhanced with animations */}
              <div className="flex flex-col items-center mr-5 md:mr-8">
                <div
                  className={cn(
                    "w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center z-10 border-3 shadow-md transition-all duration-500 group-hover:scale-110",
                    item.state === "completed"
                      ? "bg-emerald-50 border-[#77AD3F]"
                      : item.state === "in-progress"
                      ? "bg-blue-50 border-blue-400 animate-pulse"
                      : item.state === "delayed"
                      ? "bg-amber-50 border-amber-400"
                      : "bg-gray-50 border-gray-200"
                  )}
                >
                  {item.state === "completed" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#77AD3F] animate-in fade-in-50 duration-300"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                  {item.state === "in-progress" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-500 animate-spin-slow"
                    >
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
                    </svg>
                  )}
                  {item.state === "delayed" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-amber-500 animate-pulse"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  )}
                  {(item.state === "not-planted" ||
                    item.state === "not-updated") && (
                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                  )}
                </div>
                {index < statusItems.length - 1 && (
                  <div
                    className={cn(
                      "w-1 md:w-1.5 h-24 md:h-28 -mt-1 transition-all duration-300 group-hover:w-2",
                      item.state === "completed"
                        ? "bg-gradient-to-b from-[#77AD3F] to-[#77AD3F]/30"
                        : item.state === "in-progress"
                        ? "bg-gradient-to-b from-blue-400 to-blue-400/30"
                        : item.state === "delayed"
                        ? "bg-gradient-to-b from-amber-400 to-amber-400/30"
                        : "bg-gray-200"
                    )}
                  />
                )}
              </div>

              {/* Status content - Enhanced with animations and better styling */}
              <div className="flex-1 bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:translate-x-1">
                <div className="flex items-center mb-3">
                  <span className="text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full text-sm group-hover:bg-gray-200 transition-colors duration-300">
                    {item.time}
                  </span>
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full ml-3 group-hover:w-3 group-hover:h-3 transition-all duration-300",
                      item.state === "completed"
                        ? "bg-[#77AD3F]"
                        : item.state === "in-progress"
                        ? "bg-blue-400"
                        : item.state === "delayed"
                        ? "bg-amber-400"
                        : "bg-gray-400"
                    )}
                  />
                </div>
                <div className="flex items-center mb-4">
                  <span
                    className={cn(
                      "font-semibold text-lg md:text-xl transition-all duration-300 group-hover:translate-x-0.5",
                      item.state === "completed"
                        ? "text-[#0F6435]"
                        : item.state === "in-progress"
                        ? "text-blue-700"
                        : item.state === "delayed"
                        ? "text-amber-700"
                        : "text-gray-800"
                    )}
                  >
                    {item.status}
                  </span>
                  {item.warning && (
                    <span className="ml-2 text-amber-500 animate-pulse">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Details section with animation */}
                {item.details && (
                  <p className="text-gray-600 mb-4 text-sm md:text-base group-hover:text-gray-800 transition-colors duration-300">
                    {item.details}
                  </p>
                )}

                {/* Status badge - Enhanced with animations */}
                <div className="flex items-center">
                  {item.icon && (
                    <div className="w-12 h-12 mr-4 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-gray-100 transition-colors duration-300 group-hover:scale-110">
                      {item.state === "completed" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#77AD3F] group-hover:rotate-6 transition-transform duration-300"
                        >
                          <path d="M5 12h4l2-8 2 8h4" />
                          <path d="M3 20h18" />
                          <path d="M12 15v5" />
                        </svg>
                      ) : item.state === "in-progress" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-500 group-hover:rotate-6 transition-transform duration-300"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : item.state === "delayed" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-amber-500 group-hover:rotate-6 transition-transform duration-300"
                        >
                          <path d="M19 4H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
                          <path d="M12 14v-4" />
                          <path d="M12 14h.01" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400 group-hover:rotate-6 transition-transform duration-300"
                        >
                          <path d="M12 10V5a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v5" />
                          <path d="M6 10V5a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v5" />
                          <path d="M18 10H6" />
                          <path d="M3 10v6a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6v-6" />
                        </svg>
                      )}
                    </div>
                  )}
                  <div
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-medium shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:translate-x-1",
                      item.state === "completed"
                        ? "bg-gradient-to-r from-[#77AD3F]/20 to-[#0F6435]/20 text-[#0F6435] group-hover:from-[#77AD3F]/30 group-hover:to-[#0F6435]/30"
                        : item.state === "in-progress"
                        ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 group-hover:from-blue-200 group-hover:to-blue-300"
                        : item.state === "delayed"
                        ? "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 group-hover:from-amber-200 group-hover:to-amber-300"
                        : "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
                    )}
                  >
                    {item.state === "completed"
                      ? "Completed"
                      : item.state === "in-progress"
                      ? "In Progress"
                      : item.state === "delayed"
                      ? "Delayed"
                      : item.state === "not-planted"
                      ? "Not Planted"
                      : "Not Updated"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Card - Redesigned to match the image with better positioning */}
      <div className="p-4 md:p-6 max-w-5xl mx-auto w-full mb-8">
        <Card className="bg-gradient-to-r from-[#77AD3F] to-[#0F6435] text-white p-6 md:p-8 rounded-xl overflow-hidden relative shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 animate-pulse-slow"></div>
          <div className="absolute top-0 right-1/4 w-16 h-16 bg-white/10 rounded-full -mt-8 animate-pulse-slow"></div>

          {/* Main content area with image */}
          <div className="flex flex-col items-center text-center">
            {/* Image positioned like in the screenshot */}
            <div className="relative w-full h-40 md:h-48 mb-4">
              <Image
                src="/images/growth-status.png"
                alt="Person watering plants"
                fill
                className="object-contain animate-float"
                priority
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Keep Nourishing!
            </h2>
            <p className="text-sm md:text-base opacity-90 leading-relaxed max-w-md mb-6">
              Keep Growing Healthy, Thriving Plants With Us And Enjoy Lush
              Greenery, Vibrant Blooms, And A Flourishing Garden Every Season!
            </p>

            {/* CTA button with animation */}
            <Link href="/news">
              <Button className="bg-white text-[#0F6435] hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg group">
                <span>View Plant Care Tips</span>
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
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
