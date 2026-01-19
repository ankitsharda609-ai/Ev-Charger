'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Station } from '@/lib/simulation';
import L from 'leaflet';

// Fix for default marker icons in Next.js/Leaflet
import styles from './MapClient.module.css';

import { useMap } from 'react-leaflet';

interface MapProps {
    stations: Station[];
    center: { lat: number; lng: number } | null;
    onSelectStation?: (station: Station) => void;
}

const createCustomIcon = (status: 'available' | 'busy') => {
    return L.divIcon({
        className: styles.marker,
        html: `<div class="${styles.markerPin} ${status === 'busy' ? styles.markerPinBusy : ''}"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

function MapUpdater({ center }: { center: { lat: number; lng: number } | null }) {
    const map = useMap();
    const [hasFlown, setHasFlown] = useState(false);

    useEffect(() => {
        if (center && !hasFlown) {
            // Initial State: Start from high up "Satellite View"
            map.setView([center.lat + 0.1, center.lng + 0.1], 10, { animate: false });

            // Trigger Fly-in animation after a brief delay
            const timer = setTimeout(() => {
                map.flyTo([center.lat, center.lng], 13, {
                    duration: 3.5,
                    easeLinearity: 0.25
                });
                setHasFlown(true);
            }, 800);

            return () => clearTimeout(timer);
        } else if (center && hasFlown) {
            // Normal follow behavior
            map.setView([center.lat, center.lng], map.getZoom());
        }
    }, [center, map, hasFlown]);

    return null;
}

export default function MapComponent({ stations, center }: MapProps) {
    // Default fallback if no center provided yet
    const defaultCenter = { lat: 28.6139, lng: 77.2090 };
    const activeCenter = center || defaultCenter;

    return (
        <div className="w-full h-full bg-[#0a0a1a] relative z-0">
            <MapContainer
                center={[activeCenter.lat, activeCenter.lng]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
                zoomControl={false} // We can add custom controls later if needed
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <MapUpdater center={center} />

                {stations.map((station) => (
                    <Marker
                        key={station.id}
                        position={[station.lat, station.lng]}
                        icon={createCustomIcon(station.status as 'available' | 'busy')}
                    >
                        <Popup className="dark-popup">
                            <div className="p-1 min-w-[180px] bg-[#0a0a1a] text-white rounded-lg border border-white/10">
                                <h3 className="font-bold text-lg mb-1 text-primary">{station.name}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${station.status === 'available' ? 'bg-secondary' : 'bg-red-500'}`}></span>
                                    <span className="capitalize text-sm font-medium text-gray-300">{station.status}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary border-t border-white/10 pt-2">
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Power</p>
                                        <p className="font-bold text-white text-sm">{station.power}kW</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Price</p>
                                        <p className="font-bold text-white text-sm">₹{station.price}</p>
                                    </div>
                                </div>
                                <button className="w-full mt-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-bold rounded uppercase tracking-wide transition-colors border border-primary/30">
                                    Navigate
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
