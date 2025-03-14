"use client";

import Image from "next/image";

const images = [
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // planting seeds
    "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80", // farmer with plants
    "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80", // oranges harvest
    "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80", // oranges harvest
    "https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // vegetables basket
    "https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // vegetables basket
];

const rotations = ["-10deg", "-5deg", "0deg", "5deg", "10deg"];

const CurvedImageGallery = () => {
  return (
    <div className="flex justify-center items-center my-10">
      <div className="flex gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-24 h-24   bg-white shadow-lg rounded-2xl overflow-hidden"
            style={{ 
              transform: `rotate(${rotations[index]}) translateY(${Math.pow(index - 2, 2) * 5}px)` 
            }}
          >
            <Image
              src={src}
              alt={`Farm Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurvedImageGallery;
