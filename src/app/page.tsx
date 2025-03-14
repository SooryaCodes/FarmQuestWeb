import Link from 'next/link';
import Logo from '@/components/Logo';
import HeroImage from '@/components/HeroImage';
import GetStartedButton from '@/components/GetStartedButton';
import AccountLink from '@/components/AccountLink';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-green-50">
      <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
        {/* Mobile View - Improved to match design */}
        <div className="flex flex-col md:hidden">
          <div className="mb-4 flex justify-between items-center">
            <Logo />
            <button className="text-gray-500">Skip</button>
          </div>
          
          <div className="mb-6 flex justify-center">
            <HeroImage />
          </div>
          
          <div className="flex flex-col items-start text-left px-4">
            <h2 className="text-4xl font-semibold mb-3 text-gray-900">Planting Green, Growing Life</h2>
            <p className="text-base text-gray-600 mb-10">
              Your Vision, Framed With Purpose, Has The Power To Transform The World.
            </p>
            
            <div className="w-full space-y-4">
              <GetStartedButton />
              <AccountLink />
            </div>
          </div>
        </div>
        
        {/* Desktop View - Enhanced Professional Design without globe */}
        <div className="hidden md:block">
          {/* Navigation Bar */}
          <div className="flex justify-between items-center mb-16">
            <Logo />
            <div className="flex items-center gap-8">
              <Link href="/about" className="text-gray-700 hover:text-green-800 font-medium">About</Link>
              <Link href="/features" className="text-gray-700 hover:text-green-800 font-medium">Features</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-green-800 font-medium">Pricing</Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-800 font-medium">Contact</Link>
              <Link href="/login" className="text-green-800 hover:text-green-900 font-semibold">Log in</Link>
            </div>
          </div>
          
          {/* Hero Section - Redesigned for better professional look */}
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* Left Content Section */}
            <div className="col-span-6 flex flex-col items-start">
              <div className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                Sustainable Agriculture
              </div>
              
              <h1 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Planting Green, <span className="text-green-700">Growing Life</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your Vision, Framed With Purpose, Has The Power To Transform The World. 
                Join our global community of environmental changemakers.
              </p>
              
              <div className="flex items-center gap-6 mb-12">
                <div className="w-48">
                  <GetStartedButton />
                </div>
                <Link href="/learn-more" className="text-green-800 font-medium hover:underline flex items-center gap-2">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-green-200 border-2 border-white flex items-center justify-center text-green-800 font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-gray-600">
                  <span className="font-semibold">1,000+</span> farmers joined this month
                </p>
              </div>
            </div>
            
            {/* Right Content Section - Professional imagery and stats */}
            <div className="col-span-6 relative">
              <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl">
                {/* <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image 
                      src="/images/farm-1.jpg" 
                      alt="Sustainable farming" 
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image 
                      src="/images/farm-2.jpg" 
                      alt="Agricultural innovation" 
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image 
                      src="/images/farm-3.jpg" 
                      alt="Community farming" 
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image 
                      src="/images/farm-4.jpg" 
                      alt="Eco-friendly agriculture" 
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div> */}
                <HeroImage />
              </div>
              
              {/* Floating stats cards */}
              <div className="absolute top-10 -left-10 bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-800">
                    <path d="M12 22c6.5-3 10-8 10-14a10 10 0 0 0-20 0c0 6 3.5 11 10 14z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trees Planted</p>
                  <p className="text-lg font-bold text-gray-900">10M+</p>
                </div>
              </div>
              
              <div className="absolute bottom-10 -right-10 bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-800">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Global Partners</p>
                  <p className="text-lg font-bold text-gray-900">500+</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-24 border-t border-gray-200 pt-12">
            <p className="text-center text-gray-500 mb-8">Trusted by leading organizations worldwide</p>
            <div className="flex justify-between items-center">
              {['Agri-Tech', 'EcoFarms', 'GreenGrow', 'SustainCrop', 'FarmFuture'].map((name, i) => (
                <div key={i} className="flex items-center justify-center">
                  <div className="h-12 w-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-700 font-semibold">
                    {name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
