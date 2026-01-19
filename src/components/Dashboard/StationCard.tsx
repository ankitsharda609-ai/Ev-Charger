import { Station } from '@/lib/simulation';
import Link from 'next/link';
import { BatteryCharging, Zap, MapPin } from 'lucide-react';

interface StationCardProps {
    station: Station;
}

export default function StationCard({ station }: StationCardProps) {
    const isAvailable = station.status === 'available';

    return (
        <Link href={`/stations/${station.id}`} className={`block p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] bg-background-card backdrop-blur-sm group
      ${isAvailable ? 'border-secondary/50 shadow-[0_0_15px_rgba(57,255,20,0.1)]' : 'border-accent/50 shadow-[0_0_15px_rgba(255,0,85,0.1)]'}
    `}>
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-text-primary">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-lg">{station.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider
          ${isAvailable ? 'bg-secondary/20 text-secondary border border-secondary/50' : 'bg-accent/20 text-accent border border-accent/50'}
        `}>
                    {station.status}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>{station.power} kW</span>
                </div>
                <div className="flex items-center gap-2">
                    <BatteryCharging className="w-4 h-4 text-primary" />
                    <span>{station.connectorType}</span>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center group-hover:border-white/20 transition-colors">
                <span className="text-text-muted text-xs">Price/kWh</span>
                <span className="font-mono text-xl text-white">₹{station.price}</span>
            </div>
        </Link>
    );
}
