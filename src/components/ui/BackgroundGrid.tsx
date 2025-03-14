import { useState } from "react";

interface BackgroundGridProps {
  isClient: boolean;
}

export const BackgroundGrid = ({ isClient }: BackgroundGridProps) => {
  // Generate random grid items once on component mount
  const [gridItems] = useState(() => {
    return Array(144).fill(0).map(() => ({
      shouldShowOverlay: Math.random() > 0.5,
      pulseAnimation: `pulse ${2 + Math.random() * 4}s infinite ${Math.random() * 3}s ease-in-out`,
      overlayOpacity: 0.1 + Math.random() * 0.3,
      overlayScale: 0.6 + Math.random() * 0.4,
      fadeAnimation: `fadeInOut ${4 + Math.random() * 5}s infinite ${Math.random() * 2}s ease-in-out`,
      bgColor: Math.random() > 0.7 ? 'bg-[#77AD3F]/20' : '',
    }));
  });

  return (
    <div className="absolute inset-0 bg-[#0F6435]">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-[1px]">
        {isClient && gridItems.map((item, i) => (
          <div 
            key={i} 
            className={`border-[1px] border-[#77AD3F]/40 relative overflow-hidden ${item.bgColor}`}
            style={{
              animation: item.pulseAnimation,
            }}
          >
            {item.shouldShowOverlay && (
              <div 
                className="absolute inset-0 bg-white/20 rounded-sm"
                style={{
                  opacity: item.overlayOpacity,
                  transform: `scale(${item.overlayScale})`,
                  animation: item.fadeAnimation,
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#77AD3F]/70 to-[#0F6435]/80"></div>
    </div>
  );
}; 