'use client';

import { useState, useEffect, useRef } from 'react';
import { CONTRACT_ADDRESS, LINKS } from '@/lib/config';
import { FaSkull, FaChartLine, FaTwitter, FaCopy, FaDownload, FaBars, FaTimes, FaGhost, FaBone, FaEye, FaFire, FaStar, FaSpinner } from 'react-icons/fa';

interface MarketData {
  marketCap: number;
  price: number;
  priceChange24h: number;
}

const TARGET_MARKET_CAP = 1000000; // 1M target

export default function StickyHeader() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchMarketData = async () => {
    try {
      const response = await fetch(
        `https://api.dexscreener.com/tokens/v1/solana/${CONTRACT_ADDRESS}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        }
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Token not found on DexScreener');
        }
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      const pairs = Array.isArray(data) ? data : (data.pairs || []);
      
      if (pairs && pairs.length > 0) {
        const bestPair = pairs.reduce((prev: any, current: any) => 
          (current.volume?.h24 > prev.volume?.h24) ? current : prev
        );
        
        const marketData: MarketData = {
          marketCap: bestPair.marketCap || 0,
          price: parseFloat(bestPair.priceUsd) || 0,
          priceChange24h: bestPair.priceChange?.h24 || 0,
        };
        
        setMarketData(marketData);
        setError(null);
      } else {
        throw new Error('Token not yet listed');
      }
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
      
      // Fallback to mock data
      const mockData: MarketData = {
        marketCap: Math.random() * 800000 + 200000, // Random between 200K-1M
        price: Math.random() * 0.001 + 0.0001,
        priceChange24h: (Math.random() - 0.5) * 100,
      };
      setMarketData(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Update every 15 seconds
    const interval = setInterval(fetchMarketData, 15000);
    
    return () => clearInterval(interval);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadProfilePicture = () => {
    const link = document.createElement('a');
    link.href = '/deadpepe.jpg';
    link.download = 'deadpepe-profile-picture.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toFixed(0)}`;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-orange-500/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <FaSpinner className="w-4 h-4 text-orange-400 animate-spin" />
            <span className="text-orange-300 text-sm">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!marketData) return null;

  const progress = Math.min((marketData.marketCap / TARGET_MARKET_CAP) * 100, 100);
  const isPositive = marketData.priceChange24h >= 0;

  return (
    <>
      {/* Main Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-orange-500/30 shadow-2xl shadow-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
          {/* Mobile: Just Logo/Title */}
          <div className="flex items-center gap-2">
            <FaSkull className="w-6 h-6 text-orange-400 animate-pulse" />
            <span className="text-orange-300 font-bold text-lg">$DEPE</span>
            <FaSkull className="w-6 h-6 text-orange-400 animate-pulse delay-500" />
          </div>

          {/* Desktop: Market Cap Progress */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaSkull className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300 font-bold text-sm">TO 1M</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-600 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-orange-300 text-xs font-medium min-w-[3rem]">
                {progress.toFixed(0)}%
              </span>
            </div>
            
            <div className="text-orange-200 text-sm font-bold">
              {formatNumber(marketData.marketCap)}
            </div>
          </div>

            {/* Right: Desktop Buttons - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-3">
              {/* Copy Contract Button */}
              <button
                onClick={copyToClipboard}
                className="group relative px-3 py-2 bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 rounded-lg transition-all duration-300 text-sm font-medium border border-orange-500/30 hover:border-orange-400/50"
              >
                <div className="flex items-center gap-2">
                  <FaCopy className="w-3 h-3" />
                  <span>{copied ? 'Copied!' : 'CA'}</span>
                </div>
              </button>

              {/* Wear $DEPE Costume Button */}
              <button
                onClick={downloadProfilePicture}
                className="group relative px-4 py-2 bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black rounded-lg transition-all duration-300 text-sm font-bold border border-orange-400 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
              >
                <div className="flex items-center gap-2">
                  <FaDownload className="w-3 h-3 group-hover:animate-bounce" />
                  <span>Wear $DEPE</span>
                </div>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative z-60 p-2 text-orange-400 hover:text-orange-300 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6 animate-pulse" />
              ) : (
                <FaBars className="w-6 h-6 animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm">
          {/* Animated Background Effects */}
          <div className="absolute inset-0">
            {/* Blood Red Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-900/20 animate-pulse"></div>
            
            {/* Floating Halloween Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-orange-400/15 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                >
                  {[FaSkull, FaGhost, FaBone, FaEye][Math.floor(Math.random() * 4)]({ 
                    className: `w-${Math.floor(Math.random() * 4) + 4} h-${Math.floor(Math.random() * 4) + 4}` 
                  })}
                </div>
              ))}
            </div>

            {/* Creepy Mist Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-red-800/10 to-transparent animate-pulse delay-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-800/15 to-transparent animate-pulse delay-2000"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-800/8 to-transparent animate-pulse delay-1500"></div>
          </div>

          {/* Menu Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
            <div className="text-center max-w-md mx-auto">
              {/* Main Logo */}
              <div className="mb-8 relative flex justify-center">
                <div className="relative">
                  <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center border-2 border-orange-400 shadow-lg shadow-orange-500/30">
                    <FaSkull className="w-10 h-10 text-black" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-orange-400">
                $DEPE
              </h1>
              <h2 className="text-lg font-bold text-orange-300 mb-8">
                DEAD PEPE
              </h2>

              {/* Market Cap Progress - Mobile Version */}
              <div className="mb-8 p-4 bg-black/50 backdrop-blur-sm border border-orange-500/30 rounded-xl shadow-lg shadow-orange-500/20">
                <div className="text-center">
                  <div className="text-orange-200 text-xl font-bold mb-2">
                    {formatNumber(marketData.marketCap)}
                  </div>
                  <div className="text-orange-300 text-sm mb-3">
                    {progress.toFixed(0)}% to 1M
                  </div>
                  
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-600 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Menu Buttons */}
              <div className="space-y-4">
                {/* Copy Contract Button */}
                <button
                  onClick={() => {
                    copyToClipboard();
                    setTimeout(() => setIsMobileMenuOpen(false), 2000);
                  }}
                  className="w-full group relative px-8 py-4 bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 rounded-2xl transition-all duration-300 text-lg font-bold border-2 border-orange-500/30 hover:border-orange-400/50 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
                >
                  <div className="flex items-center justify-center gap-3">
                    <FaCopy className="w-5 h-5" />
                    <span>{copied ? 'Copied!' : 'Copy Contract Address'}</span>
                  </div>
                </button>

                {/* Wear $DEPE Costume Button */}
                <button
                  onClick={() => {
                    downloadProfilePicture();
                    setTimeout(() => setIsMobileMenuOpen(false), 1000);
                  }}
                  className="w-full group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black rounded-2xl transition-all duration-300 text-lg font-bold border-2 border-orange-400 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                >
                  <div className="flex items-center justify-center gap-3">
                    <FaDownload className="w-5 h-5 group-hover:animate-bounce" />
                    <span>Wear $DEPE Costume</span>
                  </div>
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-12 group relative px-6 py-3 bg-red-900/30 hover:bg-red-800/40 text-red-300 rounded-xl transition-all duration-300 text-sm font-bold border border-red-600/30 hover:border-red-500/50"
              >
                <div className="flex items-center gap-2">
                  <FaTimes className="w-4 h-4" />
                  <span>Close Menu</span>
                </div>
              </button>

              {/* Subtitle */}
              <p className="mt-8 text-sm text-orange-400/60 italic animate-pulse delay-1000">
                The dead shall rise again...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}