import React from "react";
import Image from "next/image";

// Unsplash farm/agriculture related images
const farmImages = [
  "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // planting seeds
  "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80", // farmer with plants
  "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80", // oranges harvest
  "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80", // oranges harvest
  "https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // vegetables basket
  "https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // vegetables basket
];

export const FarmImagesCarousel = () => {
  return (
    <div className="w-full mt-8">
      <div className="flex justify-center">
        <div className="relative" style={{ width: '300px', height: '100px' }}>
          {farmImages.map((image, i) => {
            // Calculate position on an arc
            const angle = (i / (farmImages.length - 1)) * Math.PI;
            const radius = 200;
            const x = 150 - (radius * Math.cos(angle));
            const y = radius * Math.sin(angle);
            
            return (
              <div 
                key={i} 
                className="absolute w-24 h-28 rounded-md overflow-hidden"
                style={{
                  left: `${x - 40}px`,
                  top: `${y}px`,
                  zIndex: farmImages.length - i
                }}
              >
                <div className="w-full h-full relative">
                  <Image 
                    src={image} 
                    alt="Farm image" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 