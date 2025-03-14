import Link from 'next/link';

export default function AccountLink() {
  return (
    <div className="text-center w-full">
      <Link href="/login" className="text-gray-600 hover:text-green-800 hover:underline">
        Already Have An Account?
      </Link>
    </div>
  );
} 