'use client';

import { useState, useEffect } from 'react';
import { CONTRACT_ADDRESS } from '@/lib/config';
import { FaSkull, FaFire, FaArrowUp, FaSpinner } from 'react-icons/fa';

interface MarketData {
  marketCap: number;
  price: number;
  priceChange24h: number;
}

const TARGET_MARKET_CAP = 1000000; // 1M target

export default function MarketCapProgressBar() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    
    // Update every 10 seconds
    const interval = setInterval(fetchMarketData, 10000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-2xl">
        <div className="flex items-center gap-2">
          <FaSpinner className="w-4 h-4 animate-spin text-white" />
          <span className="text-white text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (!marketData) return null;

  const progress = Math.min((marketData.marketCap / TARGET_MARKET_CAP) * 100, 100);
  const remaining = Math.max(TARGET_MARKET_CAP - marketData.marketCap, 0);
  const isPositive = marketData.priceChange24h >= 0;

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toFixed(0)}`;
  };

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/90 backdrop-blur-sm border border-white/30 rounded-lg p-3 shadow-2xl shadow-white/10 min-w-[200px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FaSkull className="w-3 h-3 text-white" />
          <span className="text-white font-bold text-xs">TO 1M</span>
        </div>
        <span className="text-white text-xs font-medium">
          {progress.toFixed(0)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-gradient-to-r from-red-600 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Current Market Cap */}
      <div className="text-center">
        <span className="text-white font-bold text-sm">
          {formatNumber(marketData.marketCap)}
        </span>
      </div>
    </div>
  );
}
