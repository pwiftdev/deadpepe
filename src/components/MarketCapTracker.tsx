'use client';

import { useState, useEffect, useRef } from 'react';
import { CONTRACT_ADDRESS } from '@/lib/config';
import { FaSpinner, FaSkull, FaArrowUp, FaArrowDown, FaFire, FaEye, FaBone, FaStar } from 'react-icons/fa';

interface DexScreenerResponse {
  pairs: Array<{
    priceUsd: string;
    priceNative: string;
    priceChange: {
      m5: number;
      h1: number;
      h6: number;
      h24: number;
    };
    volume: {
      m5: number;
      h1: number;
      h6: number;
      h24: number;
    };
    txns: {
      m5: {
        buys: number;
        sells: number;
      };
      h1: {
        buys: number;
        sells: number;
      };
      h6: {
        buys: number;
        sells: number;
      };
      h24: {
        buys: number;
        sells: number;
      };
    };
    marketCap: number;
    fdv: number;
    pairAddress: string;
    baseToken: {
      symbol: string;
      name: string;
    };
    quoteToken: {
      symbol: string;
      name: string;
    };
    dexId: string;
    chainId: string;
    pairCreatedAt: number;
    boosts: {
      active: number;
    };
  }>;
}

interface MarketData {
  marketCap: number;
  fdv: number;
  price: number;
  priceNative: number;
  volume24h: number;
  volume1h: number;
  volume6h: number;
  priceChange24h: number;
  priceChange1h: number;
  priceChange6h: number;
  priceChange5m: number;
  buys24h: number;
  sells24h: number;
  buys1h: number;
  sells1h: number;
  pairAddress: string;
  symbol: string;
  name: string;
  dexId: string;
  chainId: string;
  pairCreatedAt: number;
  activeBoosts: number;
}

export default function MarketCapTracker() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestCountRef = useRef(0);
  const lastResetRef = useRef(Date.now());

  const fetchMarketData = async () => {
    try {
      // Rate limiting: 290 requests per minute = ~1 request every 207ms
      const now = Date.now();
      const timeSinceReset = now - lastResetRef.current;
      
      // Reset counter every minute
      if (timeSinceReset >= 60000) {
        requestCountRef.current = 0;
        lastResetRef.current = now;
      }
      
      // Check if we've hit the rate limit
      if (requestCountRef.current >= 290) {
        console.log('Rate limit reached, waiting for reset...');
        return;
      }

      requestCountRef.current++;
      
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
          throw new Error(`Token not found on DexScreener (${response.status}). Token may not be listed yet.`);
        }
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data); // Debug log
      
      // Handle both array and object responses
      const pairs = Array.isArray(data) ? data : (data.pairs || []);
      
      if (pairs && pairs.length > 0) {
        // Get the pair with the highest liquidity/volume
        const bestPair = pairs.reduce((prev: any, current: any) => 
          (current.volume?.h24 > prev.volume?.h24) ? current : prev
        );
        
        const marketData: MarketData = {
          marketCap: bestPair.marketCap || 0,
          fdv: bestPair.fdv || 0,
          price: parseFloat(bestPair.priceUsd) || 0,
          priceNative: parseFloat(bestPair.priceNative) || 0,
          volume24h: bestPair.volume?.h24 || 0,
          volume1h: bestPair.volume?.h1 || 0,
          volume6h: bestPair.volume?.h6 || 0,
          priceChange24h: bestPair.priceChange?.h24 || 0,
          priceChange1h: bestPair.priceChange?.h1 || 0,
          priceChange6h: bestPair.priceChange?.h6 || 0,
          priceChange5m: bestPair.priceChange?.m5 || 0,
          buys24h: bestPair.txns?.h24?.buys || 0,
          sells24h: bestPair.txns?.h24?.sells || 0,
          buys1h: bestPair.txns?.h1?.buys || 0,
          sells1h: bestPair.txns?.h1?.sells || 0,
          pairAddress: bestPair.pairAddress,
          symbol: bestPair.baseToken?.symbol || 'DEPE',
          name: bestPair.baseToken?.name || 'Dead Pepe',
          dexId: bestPair.dexId || '',
          chainId: bestPair.chainId || '',
          pairCreatedAt: bestPair.pairCreatedAt || 0,
          activeBoosts: bestPair.boosts?.active || 0,
        };
        
        setMarketData(marketData);
        setError(null);
      } else {
        throw new Error('Token not yet listed on DexScreener. This is normal for newly launched tokens.');
      }
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
      
      // Fallback to mock data if API fails
      const mockData: MarketData = {
        marketCap: Math.random() * 1000000 + 500000,
        fdv: Math.random() * 2000000 + 1000000,
        price: Math.random() * 0.001 + 0.0001,
        priceNative: Math.random() * 0.0001 + 0.00001,
        volume24h: Math.random() * 100000 + 50000,
        volume1h: Math.random() * 10000 + 5000,
        volume6h: Math.random() * 50000 + 25000,
        priceChange24h: (Math.random() - 0.5) * 100,
        priceChange1h: (Math.random() - 0.5) * 20,
        priceChange6h: (Math.random() - 0.5) * 50,
        priceChange5m: (Math.random() - 0.5) * 5,
        buys24h: Math.floor(Math.random() * 1000) + 500,
        sells24h: Math.floor(Math.random() * 800) + 400,
        buys1h: Math.floor(Math.random() * 100) + 50,
        sells1h: Math.floor(Math.random() * 80) + 40,
        pairAddress: '',
        symbol: 'DEPE',
        name: 'Dead Pepe',
        dexId: 'pumpfun',
        chainId: 'solana',
        pairCreatedAt: Date.now() - Math.random() * 86400000,
        activeBoosts: 0,
      };
      setMarketData(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Update every 5 seconds for real-time data (12 requests per minute)
    // Well under the 290/minute limit
    const interval = setInterval(fetchMarketData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-400">
        <FaSpinner className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading market data...</span>
      </div>
    );
  }

  if (!marketData) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toFixed(4)}`;
    } else if (price >= 0.01) {
      return `$${price.toFixed(6)}`;
    } else {
      return `$${price.toFixed(8)}`;
    }
  };

  const isPositive = marketData.priceChange24h >= 0;

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <FaArrowUp className="w-4 h-4" /> : <FaArrowDown className="w-4 h-4" />;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-white' : 'text-gray-400';
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-6 p-4 bg-black/50 border border-white/30 rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <FaSkull className="w-5 h-5 text-white" />
            <p className="text-white text-sm text-center">
              {error} (Showing fallback data)
            </p>
            <FaSkull className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
      
      {/* Main Market Cap Display */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaSkull className="w-6 h-6 text-white" />
          <p className="text-gray-300 text-lg italic">Let&apos;s see how dead we actually are?</p>
          <FaSkull className="w-6 h-6 text-white" />
        </div>
        <p className="text-5xl md:text-6xl font-black text-white mb-2">{formatNumber(marketData.marketCap)}</p>
        <p className="text-sm text-gray-500">
          {marketData.pairAddress ? 'Live from the grave' : 'Resting in peace'}
        </p>
      </div>

      {/* Comprehensive Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Price Section */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaStar className="w-5 h-5 text-white" />
            <h4 className="text-white font-bold">PRICE</h4>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-white">${marketData.price.toFixed(8)}</p>
              <p className="text-sm text-gray-400">USD</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-300">{marketData.priceNative.toFixed(8)} SOL</p>
              <p className="text-sm text-gray-400">Native</p>
            </div>
          </div>
        </div>

        {/* Market Cap & FDV */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaEye className="w-5 h-5 text-white" />
            <h4 className="text-white font-bold">VALUATION</h4>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xl font-bold text-white">{formatNumber(marketData.marketCap)}</p>
              <p className="text-sm text-gray-400">Market Cap</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-300">{formatNumber(marketData.fdv)}</p>
              <p className="text-sm text-gray-400">FDV</p>
            </div>
          </div>
        </div>

        {/* Volume Section */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaFire className="w-5 h-5 text-white" />
            <h4 className="text-white font-bold">VOLUME</h4>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xl font-bold text-white">{formatNumber(marketData.volume24h)}</p>
              <p className="text-sm text-gray-400">24h</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-300">{formatNumber(marketData.volume1h)}</p>
              <p className="text-sm text-gray-400">1h</p>
            </div>
          </div>
        </div>

        {/* Price Changes */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaArrowUp className="w-5 h-5 text-white" />
            <h4 className="text-white font-bold">CHANGES</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">24h</span>
              <div className={`flex items-center gap-1 ${getChangeColor(marketData.priceChange24h)}`}>
                {getChangeIcon(marketData.priceChange24h)}
                <span className="font-bold">{marketData.priceChange24h.toFixed(2)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">1h</span>
              <div className={`flex items-center gap-1 ${getChangeColor(marketData.priceChange1h)}`}>
                {getChangeIcon(marketData.priceChange1h)}
                <span className="font-semibold">{marketData.priceChange1h.toFixed(2)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">5m</span>
              <div className={`flex items-center gap-1 ${getChangeColor(marketData.priceChange5m)}`}>
                {getChangeIcon(marketData.priceChange5m)}
                <span className="font-semibold">{marketData.priceChange5m.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Activity */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaBone className="w-5 h-5 text-white" />
            <h4 className="text-white font-bold">ACTIVITY</h4>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-lg font-bold text-white">{marketData.buys24h.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Buys (24h)</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-300">{marketData.sells24h.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Sells (24h)</p>
            </div>
            <div className="pt-2 border-t border-white/10">
              <p className="text-sm text-gray-400">Buy/Sell Ratio</p>
              <p className="text-lg font-bold text-white">
                {(marketData.buys24h / (marketData.sells24h || 1)).toFixed(2)}:1
              </p>
            </div>
          </div>
        </div>

        {/* Token Info */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaSkull className="w-5 h-5 text-white" />
            <h4 className="text-white font-bold">INFO</h4>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-lg font-bold text-white">{marketData.name}</p>
              <p className="text-sm text-gray-400">Token Name</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-300">{marketData.dexId.toUpperCase()}</p>
              <p className="text-sm text-gray-400">DEX</p>
            </div>
            {marketData.activeBoosts > 0 && (
              <div>
                <p className="text-lg font-bold text-white">{marketData.activeBoosts}</p>
                <p className="text-sm text-gray-400">Active Boosts</p>
              </div>
            )}
            <div className="pt-2 border-t border-white/10">
              <p className="text-sm text-gray-400">Created</p>
              <p className="text-sm text-gray-300">{formatTimeAgo(marketData.pairCreatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
