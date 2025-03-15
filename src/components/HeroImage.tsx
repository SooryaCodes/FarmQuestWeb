import Image from 'next/image';

export default function HeroImage() {
  return (
    <div className="relative w-full aspect-square max-w-xl">
      <Image 
        src="/images/globe.png" 
        alt="Global reforestation network" 
        fill
        className="object-contain"
        priority
      />
    </div>
  );
} 