'use client';

import { MapPin, BatteryCharging, Zap, Clock } from 'lucide-react';
import { useSimulation } from '@/hooks/useSimulation';
import StationCard from '@/components/Dashboard/StationCard';

export default function DashboardPage() {
    const { stations, isUpdating } = useSimulation();

    const availableCount = stations.filter(s => s.status === 'available').length;
    const busyCount = stations.filter(s => s.status === 'busy').length;
    const avgPrice = Math.round(stations.reduce((acc, s) => acc + s.price, 0) / stations.length);

    return (
        <div className="container py-8 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Live Dashboard</h1>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    <span className={`w-2 h-2 rounded-full bg-primary ${isUpdating ? 'animate-pulse' : ''}`}></span>
                    <span className="text-sm font-mono">LIVE FEED</span>
                </div>
            </div>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Stations"
                    value={stations.length}
                    icon={<MapPin className="w-6 h-6" />}
                    color="text-white"
                />
                <StatCard
                    title="Available"
                    value={availableCount}
                    icon={<Zap className="w-6 h-6" />}
                    color="text-secondary"
                    glow="shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                />
                <StatCard
                    title="Occupied"
                    value={busyCount}
                    icon={<Clock className="w-6 h-6" />}
                    color="text-accent"
                    glow="shadow-[0_0_15px_rgba(255,0,85,0.3)]"
                />
                <StatCard
                    title="Avg. Price"
                    value={`₹${avgPrice}/kWh`}
                    icon={<BatteryCharging className="w-6 h-6" />}
                    color="text-primary"
                />
            </section>

            {/* Detailed List */}
            <section>
                <h2 className="text-xl font-bold mb-4 text-text-secondary">Station Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stations.map(station => (
                        <StationCard key={station.id} station={station} />
                    ))}
                </div>
            </section>
        </div>
    );
}

function StatCard({ title, value, icon, color, glow = '' }: { title: string, value: string | number, icon: any, color: string, glow?: string }) {
    return (
        <div className={`glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors ${glow}`}>
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-text-muted text-sm font-medium mb-1">{title}</p>
                    <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
                </div>
                <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
                    {icon}
                </div>
            </div>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
    );
}

