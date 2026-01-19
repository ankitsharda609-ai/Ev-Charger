"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { RefreshCw } from 'lucide-react';
import { useSimulation } from '@/hooks/useSimulation';
import LocationSearch from '@/components/Map/LocationSearch';
import ScanningOverlay from '@/components/Map/ScanningOverlay';

// Dynamic import for Map to avoid SSR window error
const MapComponent = dynamic(() => import('@/components/Map/MapClient'), {
    ssr: false,
    loading: () => <div className="w-full h-[80vh] bg-background-card animate-pulse rounded-xl flex items-center justify-center text-text-muted">Loading Map...</div>
});

export default function MapPage() {
    const { stations, lastUpdate, isUpdating, userLocation, setManualLocation } = useSimulation();

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] relative">
            {/* Header Overlay */}
            <div className="absolute top-4 left-4 right-4 z-[400] flex flex-col md:flex-row items-start md:items-center justify-between pointer-events-none">
                <div className="glass p-4 rounded-xl pointer-events-auto backdrop-blur-md bg-opacity-80 border border-white/10">
                    <h1 className="text-2xl font-bold text-gradient">Station Finder</h1>
                    <div className="flex items-center gap-2 text-text-muted text-xs mt-1">
                        <RefreshCw className={`w-3 h-3 ${isUpdating ? 'animate-spin text-primary' : ''}`} />
                        <span>Live Feed: {mounted ? lastUpdate.toLocaleTimeString() : '--:--:--'}</span>
                    </div>
                </div>

                <div className="w-full md:w-auto min-w-[300px] mt-4 md:mt-0 pointer-events-auto">
                    <LocationSearch onLocationSelect={setManualLocation} />
                </div>
            </div>

            <div className="flex-1 w-full bg-black relative">
                <ScanningOverlay />
                <MapComponent stations={stations} center={userLocation} />

                {/* Floating Overlay for Legend */}
                <div className="absolute bottom-6 right-6 glass p-4 rounded-xl z-[400] text-sm hidden md:block border border-white/10">
                    <h4 className="font-semibold mb-2 text-xs uppercase tracking-wider text-text-secondary">Network Status</h4>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
                            <span className="text-white font-medium">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
                            <span className="text-white font-medium">Occupied</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
