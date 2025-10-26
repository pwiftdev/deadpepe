'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaSkull, FaGhost, FaBone, FaEye, FaStar, FaFire } from 'react-icons/fa';

interface SpookyLoaderProps {
  onEnter: () => void;
}

export default function SpookyLoader({ onEnter }: SpookyLoaderProps) {
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleEnterGrave = () => {
    setButtonPressed(true);
    
    // Enter the main site after a short delay
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white overflow-hidden">

      {/* Spooky Background Effects */}
      <div className="absolute inset-0">
        {/* Animated fog layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/10 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-gray-700/15 to-transparent animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating Spooky Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FaSkull className="absolute top-1/4 left-1/6 w-8 h-8 text-white/40 animate-bounce delay-300" />
        <FaGhost className="absolute top-1/3 right-1/5 w-10 h-10 text-gray-400/50 animate-pulse delay-700" />
        <FaBone className="absolute bottom-1/3 left-1/4 w-6 h-6 text-gray-300/40 animate-pulse delay-1000" />
        <FaEye className="absolute top-1/2 right-1/3 w-7 h-7 text-white/30 animate-pulse delay-500" />
        <FaSkull className="absolute bottom-1/4 right-1/6 w-9 h-9 text-gray-400/40 animate-bounce delay-1200" />
        <FaStar className="absolute top-1/6 left-1/2 w-5 h-5 text-white/20 animate-pulse delay-1500" />
        <FaFire className="absolute bottom-1/6 left-1/3 w-6 h-6 text-orange-400/30 animate-pulse delay-800" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Dead Pepe Image */}
          <div className="mb-12 relative flex justify-center">
            <div className="relative">
              {/* Glow effects */}
              <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl animate-pulse scale-110"></div>
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse delay-500 scale-105"></div>
              
              <Image
                src="/deadpepe.jpg"
                alt="Dead Pepe"
                width={200}
                height={200}
                className="relative z-10 rounded-full border-4 border-white/50 shadow-2xl shadow-white/40 hover:shadow-white/80 transition-all duration-700 hover:scale-105 grayscale hover:grayscale-0 drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white animate-pulse">
            $DEPE
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-12 animate-pulse delay-500">
            DEAD PEPE
          </h2>

          {/* Enter Button */}
          <button
            onClick={handleEnterGrave}
            disabled={buttonPressed}
            className={`group relative px-12 py-6 bg-gradient-to-r from-red-900 to-black hover:from-red-800 hover:to-gray-900 text-white rounded-2xl transition-all duration-500 transform hover:scale-105 text-2xl font-bold border-2 border-red-600 shadow-2xl shadow-red-900/50 hover:shadow-red-900/80 ${
              buttonPressed ? 'opacity-50 cursor-not-allowed' : 'hover:animate-pulse'
            }`}
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            
            {/* Button content */}
            <div className="relative z-10 flex items-center gap-4">
              <FaSkull className="w-8 h-8 group-hover:animate-spin" />
              <span className="tracking-wider">
                {buttonPressed ? 'ENTERING...' : 'ENTER THE GRAVE'}
              </span>
              <FaSkull className="w-8 h-8 group-hover:animate-spin" />
            </div>
          </button>

          {/* Subtitle */}
          <p className="mt-8 text-lg text-gray-400 italic animate-pulse delay-1000">
            The dead shall rise again...
          </p>
        </div>
      </div>

      {/* Bottom floating elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <FaBone className="w-4 h-4 text-gray-500 animate-pulse" />
        <span className="text-gray-500 text-sm">Loading the crypt...</span>
        <FaBone className="w-4 h-4 text-gray-500 animate-pulse delay-500" />
      </div>
    </div>
  );
}
