'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CONTRACT_ADDRESS, LINKS } from '@/lib/config';
import MarketCapTracker from '@/components/MarketCapTracker';
import { 
  FaSkull, 
  FaGhost, 
  FaCopy, 
  FaExternalLinkAlt, 
  FaChartLine, 
  FaTwitter,
  FaBone,
  FaEye,
  FaHeart,
  FaFire,
  FaArrowDown,
  FaStar,
  FaPlus,
  FaTimes
} from 'react-icons/fa';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Auto-scroll through sections
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % 4);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Cinematic Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Animated Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <FaStar
            key={i}
            className="absolute text-white opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating Death Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <FaSkull className="absolute top-1/5 left-1/6 w-6 h-6 text-white animate-bounce delay-300" />
        <FaBone className="absolute top-2/3 right-1/6 w-8 h-8 text-gray-400 animate-pulse delay-700" />
        <FaSkull className="absolute bottom-1/3 left-2/5 w-7 h-7 text-gray-300 animate-pulse delay-1000" />
        <FaPlus className="absolute top-1/2 right-1/4 w-5 h-5 text-gray-500 animate-pulse delay-500" />
        <FaStar className="absolute top-1/4 right-1/3 w-10 h-10 text-gray-600 animate-pulse delay-2000" />
      </div>

      {/* Ghostly Mist Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-gray-800/10 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-gray-800/10 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-0 w-full h-full bg-gradient-to-r from-transparent via-gray-700/5 to-transparent animate-pulse delay-2000"></div>
      </div>

      {/* Section 1: Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 p-8">
        <div className="text-center max-w-6xl mx-auto">
          {/* Dramatic Entrance Animation */}
          <div className="mb-16 relative flex justify-center">
            <div className="relative">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl animate-pulse scale-110"></div>
              {/* Inner Glow Ring */}
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse delay-500 scale-105"></div>
              
              {/* Floating Skull Top Right */}
              <div className="absolute -top-6 -right-6 z-20">
                <FaSkull className="w-10 h-10 text-white animate-pulse drop-shadow-lg" />
              </div>
              
              {/* Main Dead Pepe Image */}
              <Image
                src="/deadpepe.jpg"
                alt="Dead Pepe"
                width={350}
                height={350}
                className="relative z-10 rounded-full border-4 border-white/50 shadow-2xl shadow-white/40 hover:shadow-white/80 transition-all duration-700 hover:scale-105 grayscale hover:grayscale-0 drop-shadow-2xl"
                priority
              />
              
              {/* Floating Bone Bottom Left */}
              <div className="absolute -bottom-6 -left-6 z-20">
                <FaBone className="w-8 h-8 text-gray-400 animate-pulse delay-300 drop-shadow-lg" />
              </div>
              
              {/* Floating Elements Around Image */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                <FaStar className="w-4 h-4 text-white animate-pulse delay-700" />
              </div>
              <div className="absolute -bottom-2 right-1/4 z-20">
                <FaStar className="w-3 h-3 text-gray-300 animate-pulse delay-1000" />
              </div>
            </div>
          </div>

          {/* Main Title with Enhanced Effects */}
          <div className="mb-12">
            <h1 className="text-9xl md:text-[12rem] font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white animate-pulse drop-shadow-2xl">
              $DEPE
            </h1>
            
            {/* Subtitle with Better Spacing */}
            <div className="flex items-center justify-center gap-8 mb-12">
              <FaSkull className="w-16 h-16 text-white animate-pulse drop-shadow-lg" />
              <h2 className="text-5xl md:text-6xl font-bold text-gray-100 drop-shadow-lg">
                DEAD PEPE
              </h2>
              <FaSkull className="w-16 h-16 text-white animate-pulse delay-500 drop-shadow-lg" />
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="flex flex-col items-center gap-4 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <FaArrowDown className="w-8 h-8 text-white drop-shadow-lg" />
              <span className="text-lg text-gray-300 font-medium">Enter the crypt</span>
            </div>
            <div className="w-1 h-16 bg-gradient-to-b from-white to-transparent opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Section 2: Legend Section - BIG DESIGNER MODE */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 p-8 overflow-hidden">
        {/* Cinematic Background Layers */}
        <div className="absolute inset-0">
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
              {[...Array(96)].map((_, i) => (
                <div key={i} className="border border-white/10 animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
              ))}
            </div>
          </div>
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-8xl mx-auto w-full">
          {/* Revolutionary Header Design */}
          <div className="mb-24 relative">
            {/* Typography as Art */}
            <div className="text-center relative">
              {/* Main Title with Split Design */}
              <div className="relative mb-8">
                <h3 className="text-8xl md:text-[10rem] font-black leading-none">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-transparent via-white to-transparent animate-pulse">
                    THE
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white animate-pulse delay-500">
                    LEGEND
                  </span>
                </h3>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                  <div className="flex gap-4">
                    <FaSkull className="w-8 h-8 text-white/60 animate-pulse" />
                    <FaBone className="w-6 h-6 text-white/40 animate-pulse delay-300" />
                    <FaSkull className="w-8 h-8 text-white/60 animate-pulse delay-600" />
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
                  <div className="flex gap-4">
                    <FaBone className="w-6 h-6 text-white/40 animate-pulse delay-900" />
                    <FaSkull className="w-8 h-8 text-white/60 animate-pulse delay-1200" />
                    <FaBone className="w-6 h-6 text-white/40 animate-pulse delay-1500" />
                  </div>
                </div>
              </div>
              
              {/* Subtitle with Creative Layout */}
              <div className="relative">
                <p className="text-2xl md:text-3xl text-gray-300 italic font-light tracking-wider">
                  <span className="inline-block transform -rotate-2">The</span>
                  <span className="inline-block mx-4 transform rotate-1">tale</span>
                  <span className="inline-block transform -rotate-1">of</span>
                  <span className="inline-block mx-4 transform rotate-2">the</span>
                  <span className="inline-block transform -rotate-1">undead</span>
                  <span className="inline-block mx-4 transform rotate-1">meme</span>
                  <span className="inline-block transform -rotate-2">that</span>
                  <span className="inline-block mx-4 transform rotate-1">refuses</span>
                  <span className="inline-block transform -rotate-1">to</span>
                  <span className="inline-block mx-4 transform rotate-2">die</span>
                </p>
              </div>
            </div>
          </div>

          {/* Revolutionary Lore Layout */}
          <div className="space-y-32">
            {/* Lore 1: Asymmetric Design */}
            <div className="relative">
              <div className="grid grid-cols-12 gap-8 items-center">
                {/* Left Side - Icon */}
                <div className="col-span-3 flex justify-end">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <FaGhost className="w-16 h-16 text-white animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-white/5 blur-xl animate-pulse"></div>
                  </div>
                </div>
                
                {/* Right Side - Text */}
                <div className="col-span-9">
                  <p className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    Pepe is gone…
                    <br />
                    <span className="text-3xl md:text-5xl text-gray-300 font-light">
                      but the spirit lives on.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Lore 2: Centered with Flanking Elements */}
            <div className="relative">
              <div className="text-center">
                {/* Flanking Skulls */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800/20 to-transparent flex items-center justify-center backdrop-blur-sm border border-gray-600/30">
                    <FaEye className="w-12 h-12 text-gray-400 animate-pulse" />
                  </div>
                </div>
                
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800/20 to-transparent flex items-center justify-center backdrop-blur-sm border border-gray-600/30">
                    <FaEye className="w-12 h-12 text-gray-400 animate-pulse delay-500" />
                  </div>
                </div>
                
                {/* Main Text */}
                <p className="text-5xl md:text-7xl font-black text-gray-200 italic leading-none">
                  You can&apos;t kill
                  <br />
                  <span className="text-4xl md:text-6xl text-white">
                    what is already dead.
                  </span>
                </p>
              </div>
            </div>

            {/* Lore 3: Diagonal Layout */}
            <div className="relative">
              <div className="grid grid-cols-12 gap-8 items-center">
                {/* Left Side - Text */}
                <div className="col-span-8">
                  <p className="text-5xl md:text-7xl font-black text-white leading-tight">
                    Dead pepe.
                    <br />
                    <span className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                      Still pumping.
                    </span>
                  </p>
                </div>
                
                {/* Right Side - Fire Icon */}
                <div className="col-span-4 flex justify-start">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <FaFire className="w-20 h-20 text-white animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-white/5 blur-xl animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Bottom Element */}
          <div className="mt-24 text-center">
            <div className="inline-flex items-center gap-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/50"></div>
              <FaSkull className="w-6 h-6 text-white/60 animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The Graveyard - Comprehensive Market Data */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 p-8">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Data Elements */}
          <FaChartLine className="absolute top-1/4 left-1/6 w-8 h-8 text-white/20 animate-pulse delay-200" />
          <FaStar className="absolute top-1/3 right-1/5 w-6 h-6 text-gray-400/30 animate-pulse delay-400" />
          <FaBone className="absolute bottom-1/4 left-1/4 w-7 h-7 text-white/25 animate-pulse delay-600" />
          <FaChartLine className="absolute bottom-1/3 right-1/6 w-5 h-5 text-gray-300/30 animate-pulse delay-800" />
        </div>

        <div className="w-full max-w-7xl">
          {/* Revolutionary Header */}
          <div className="text-center mb-16">
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-white/5 rounded-3xl blur-2xl scale-125 animate-pulse"></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <FaChartLine className="w-12 h-12 text-white animate-pulse drop-shadow-2xl" />
                  <h3 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white animate-pulse drop-shadow-2xl">
                    THE GRAVEYARD
                  </h3>
                  <FaChartLine className="w-12 h-12 text-white animate-pulse delay-500 drop-shadow-2xl" />
                </div>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-300 italic font-light">
                  Where the dead tokens come to rest... or rise again
                </p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Market Data Display */}
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-black/20 rounded-3xl blur-3xl scale-105"></div>
            
            <div className="relative z-10 p-8 bg-black/40 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl shadow-white/10">
              <MarketCapTracker />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Contract & Links Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 p-8">
        <div className="w-full max-w-4xl text-center">
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <FaSkull className="w-8 h-8 text-white" />
              <h3 className="text-3xl md:text-4xl font-bold text-white">JOIN THE DEAD</h3>
              <FaSkull className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Contract Address */}
          <div className="mb-12 p-8 bg-black/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-2xl shadow-white/20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaSkull className="w-6 h-6 text-white" />
              <p className="text-lg text-gray-400">Contract Address:</p>
              <FaSkull className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <code className="text-white font-mono text-sm md:text-lg break-all bg-black/50 px-4 py-3 rounded-lg border border-white/30">
                {CONTRACT_ADDRESS}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-8 py-3 bg-gradient-to-r from-white to-gray-300 hover:from-gray-300 hover:to-white text-black rounded-lg transition-all duration-300 transform hover:scale-105 text-lg font-medium shadow-lg shadow-white/25 flex items-center gap-3"
              >
                <FaCopy className="w-5 h-5" />
                {copied ? 'Copied!' : 'COPY CA'}
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a
              href={LINKS.DEXSCREENER}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-white to-gray-300 hover:from-gray-300 hover:to-white text-black rounded-lg transition-all duration-300 transform hover:scale-105 text-lg font-medium flex items-center justify-center gap-3"
            >
              <FaChartLine className="w-5 h-5" />
              DexScreener
              <FaExternalLinkAlt className="w-4 h-4" />
            </a>
            <a
              href={LINKS.X_COMMUNITY}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 text-white border border-white/30 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg font-medium flex items-center justify-center gap-3"
            >
              <FaTwitter className="w-5 h-5" />
              X Community
              <FaExternalLinkAlt className="w-4 h-4" />
            </a>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaSkull className="w-5 h-5" />
              <p className="text-gray-400">Launched on pumpfun</p>
              <FaSkull className="w-5 h-5" />
            </div>
            <p className="text-sm text-gray-500">The dead shall rise again</p>
          </div>
        </div>
      </section>

      {/* Sticky Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
        {/* DexScreener Button */}
        <a
          href={LINKS.DEXSCREENER}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          
          {/* Button */}
          <div className="relative w-16 h-16 bg-gradient-to-r from-white to-gray-300 hover:from-gray-300 hover:to-white text-black rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl shadow-white/25 group-hover:shadow-white/40">
            <FaChartLine className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
          </div>
          
          {/* Tooltip */}
          <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            View on DexScreener
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-black/80"></div>
          </div>
        </a>

        {/* X Community Button */}
        <a
          href={LINKS.X_COMMUNITY}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          
          {/* Button */}
          <div className="relative w-16 h-16 bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 text-white border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl shadow-white/25 group-hover:shadow-white/40">
            <FaTwitter className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
          </div>
          
          {/* Tooltip */}
          <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Join X Community
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-black/80"></div>
          </div>
        </a>
      </div>
    </div>
  );
}
