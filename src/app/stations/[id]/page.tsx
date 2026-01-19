'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BatteryCharging, Zap, MapPin, Clock, CreditCard, ShieldCheck } from 'lucide-react';
import { Station } from '@/lib/simulation';
import ChargingSession from '@/components/Station/ChargingSession';

export default function StationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [station, setStation] = useState<Station | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCharging, setIsCharging] = useState(false);

    useEffect(() => {
        const fetchStation = async () => {
            try {
                const res = await fetch(`/api/stations/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setStation(data);
                }
            } catch (error) {
                console.error('Failed to fetch station:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStation();
    }, [id]);

    if (loading) {
        return (
            <div className="container min-h-screen flex items-center justify-center">
                <div className="text-primary animate-pulse flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    <span className="text-xl font-mono">CONNECTING TO STATION...</span>
                </div>
            </div>
        );
    }

    if (!station) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Station Not Found</h1>
                <Link href="/dashboard" className="text-primary hover:underline flex items-center justify-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
            </div>
        );
    }

    const isAvailable = station.status === 'available';

    return (
        <div className="container py-8 animate-in fade-in zoom-in duration-500">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Visual Section */}
                <div className="relative group">
                    <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src="/station-detail.png"
                            alt="Station Charging Unit"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>

                        {/* Overlay data on image */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <h1 className="text-4xl font-bold text-white mb-2">{station.name}</h1>
                            <div className="flex items-center gap-2 text-text-secondary">
                                <MapPin className="w-5 h-5 text-primary" />
                                <span>Station ID: {station.id}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2
                                ${isAvailable ? 'bg-secondary/20 text-secondary border border-secondary/50 shadow-[0_0_15px_rgba(57,255,20,0.2)]' : 'bg-accent/20 text-accent border border-accent/50 shadow-[0_0_15px_rgba(255,0,85,0.2)]'}
                            `}>
                                <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-secondary' : 'bg-accent'} animate-pulse`}></span>
                                {station.status}
                            </span>
                        </div>

                        <p className="text-text-secondary text-lg leading-relaxed">
                            High-speed CCS2 and Type 2 compatible charging station equipped with advanced load balancing and real-time monitoring.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DetailCard
                            icon={<Zap className="w-5 h-5" />}
                            label="Max Power"
                            value={`${station.power} kW`}
                            subtext="Ultra Fast Charging"
                        />
                        <DetailCard
                            icon={<BatteryCharging className="w-5 h-5" />}
                            label="Connector"
                            value={station.connectorType}
                            subtext="Universal Compatibility"
                        />
                        <DetailCard
                            icon={<CreditCard className="w-5 h-5" />}
                            label="Price"
                            value={`₹${station.price}/kWh`}
                            subtext="Standard Rate"
                        />
                        <DetailCard
                            icon={<ShieldCheck className="w-5 h-5" />}
                            label="Reliability"
                            value="99.9%"
                            subtext="Uptime Guarantee"
                        />
                    </div>

                    <button
                        onClick={() => setIsCharging(true)}
                        disabled={!isAvailable}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]
                            ${isAvailable
                                ? 'bg-primary text-background hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]'
                                : 'bg-white/5 text-text-muted cursor-not-allowed border border-white/10'}
                        `}
                    >
                        {isAvailable ? 'Start Charging Session' : 'Station Occupied'}
                    </button>
                </div>
            </div>

            {isCharging && station && (
                <ChargingSession
                    stationName={station.name}
                    price={station.price}
                    onClose={() => setIsCharging(false)}
                />
            )}
        </div>
    );
}

function DetailCard({ icon, label, value, subtext }: { icon: any, label: string, value: string, subtext: string }) {
    return (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-2">
                <span className="text-text-muted text-sm">{label}</span>
                <div className="text-primary">{icon}</div>
            </div>
            <div className="text-xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-text-secondary">{subtext}</div>
        </div>
    );
}
