import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="h-10 w-auto relative">
        <Image 
          src="/images/Farm-quest-logo.svg" 
          alt="Farm Quest Logo" 
          width={120}
          height={40}
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
} 