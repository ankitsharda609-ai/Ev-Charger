'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSimulation } from '@/hooks/useSimulation';
import StationCard from '@/components/Dashboard/StationCard';
import { Activity, RefreshCw } from 'lucide-react';

// Dynamic import for Map to avoid SSR window error
const MapComponent = dynamic(() => import('@/components/Map/MapClient'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-background-card animate-pulse rounded-xl flex items-center justify-center text-text-muted">Initializing Map Interface...</div>
});

import HeroSection from '@/components/Home/HeroSection';
import Features from '@/components/Home/Features';
import Link from 'next/link';

export default function Home() {
  const { stations, lastUpdate, isUpdating } = useSimulation();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate Stats
  const availableCount = stations.filter(s => s.status === 'available').length;

  return (
    <div className="flex flex-col">
      <HeroSection />
      <Features />

      {/* Live Preview Snippet */}
      <section className="bg-bg-dark py-20 border-t border-white/5">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-white mb-4">Live Network Status</h2>
              <p className="text-text-secondary text-lg">
                Experience our network updates in real-time. Our intelligent grid balances power load and station availability every second.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/map" className="px-6 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all font-semibold">
                View Full Map
              </Link>
              <Link href="/dashboard" className="px-6 py-3 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/15 transition-all font-semibold">
                Analytics
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Live Stat Cards */}
            <div className="glass p-8 rounded-3xl relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-text-muted text-sm font-medium uppercase tracking-widest mb-2">Connectivity</p>
                <h3 className="text-5xl font-bold text-primary flex items-center gap-3">
                  99.9%
                  <Activity className="w-8 h-8 animate-pulse text-primary/50" />
                </h3>
                <p className="text-text-secondary mt-4 text-sm font-mono flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full bg-primary ${isUpdating ? 'animate-ping' : ''}`}></span>
                  Pulse: STABLE
                </p>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl relative overflow-hidden group border-secondary/20">
              <div className="relative z-10">
                <p className="text-text-muted text-sm font-medium uppercase tracking-widest mb-2">Real-time Availability</p>
                <h3 className="text-5xl font-bold text-secondary">{availableCount}</h3>
                <p className="text-text-secondary mt-4 text-sm font-mono">
                  Stations Ready for Charging
                </p>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-text-muted text-sm font-medium uppercase tracking-widest mb-2">Last Sync</p>
                <h3 className="text-3xl font-mono text-white">
                  {mounted ? lastUpdate.toLocaleTimeString() : '--:--:--'}
                </h3>
                <div className="flex items-center gap-2 mt-4 text-text-muted text-sm">
                  <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
                  <span>Syncing with Global Hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
