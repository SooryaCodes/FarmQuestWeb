import Link from 'next/link';
import { Sprout } from 'lucide-react';

export default function GetStartedButton() {
  return (
    <Link href="/login" className="w-full block">
      <button className="w-full py-3 px-6 cursor-pointer bg-gradient-to-r from-[#77AD3F] to-[#0F6435] hover:from-[#6A9D35] hover:to-[#0A5A2F] text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center">
        <Sprout className="mr-2 h-5 w-5" /> Get Started
      </button>
    </Link>
  );
} 