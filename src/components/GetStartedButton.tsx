import Link from 'next/link';

export default function GetStartedButton() {
  return (
    <Link href="/get-started" className="w-full block">
      <button className="w-full py-4 px-6 bg-green-100 hover:bg-green-200 text-green-800 font-semibold rounded-md transition duration-300 shadow-sm">
        Get Started
      </button>
    </Link>
  );
} 