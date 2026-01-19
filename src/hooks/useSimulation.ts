"use client";

import { useState, useEffect, useCallback } from 'react';
import { Station } from '@/lib/simulation';

export function useSimulation() {
    const [stations, setStations] = useState<Station[]>([]);
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
    const [isUpdating, setIsUpdating] = useState(false);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'live' | 'error'>('connecting');

    // 1. Geolocation Logic (Once on mount)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            // Default to Delhi immediately for the "Cinematic" start
            // We can still try to get real location in background, but for now let's enforce Delhi
            // to ensure the simulation matches the requested "unique" Delhi experience.
            const DELHI = { lat: 28.6139, lng: 77.2090 };

            // Optional: Uncomment this to try real geolocation, but for the "Delhi Demo" we stick to Delhi
            /* 
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                    () => setUserLocation(DELHI)
                );
            } else {
                setUserLocation(DELHI);
            }
            */

            // FORCE DELHI for the demo experience
            setUserLocation(DELHI);
        } catch (e) {
            setUserLocation({ lat: 28.6139, lng: 77.2090 });
        }
    }, []); // Explicitly empty array

    // 2. Initial Data Fetch (When userLocation is available)
    useEffect(() => {
        if (!userLocation) return;

        const fetchInitial = async () => {
            setConnectionStatus('connecting');
            try {
                const res = await fetch(`/api/stations?lat=${userLocation.lat}&lng=${userLocation.lng}`);

                if (!res.ok) {
                    const text = await res.text();
                    console.error(`API Error (${res.status}):`, text);
                    setStations([]);
                    setConnectionStatus('error');
                    return;
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    setStations(data);
                    setConnectionStatus('live');
                } else {
                    console.error("API returned non-array:", data);
                    setStations([]); // Fallback to empty array
                    setConnectionStatus('error');
                }
            } catch (error) {
                console.error("Failed to fetch stations:", error);
                setStations([]);
                setConnectionStatus('error');
            }
        };
        fetchInitial();
    }, [userLocation]); // Explicitly [userLocation]

    // 3. Real-time SSE Stream (Once on mount)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const eventSource = new EventSource('/api/stations/stream');

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setIsUpdating(true);

                setStations(currentStations => {
                    if (currentStations.length === 0) return currentStations;
                    return currentStations.map(station => {
                        const update = data.stations.find((s: any) => s.id === station.id);
                        return update ? { ...station, status: update.status } : station;
                    });
                });

                setLastUpdate(new Date());
                setTimeout(() => setIsUpdating(false), 800);
            } catch (e) {
                console.error("SSE Message parse error", e);
            }
        };

        eventSource.onerror = (err) => {
            console.warn("SSE Stream encountered an error. Attempting to reconnect...", err);
            // Browser automatically retries EventSource, so we don't close it here.
            // We set status to connecting to show activity on UI
            setConnectionStatus('connecting');
        };

        return () => {
            eventSource.close();
        };
    }, []); // Explicitly empty array

    const setManualLocation = useCallback((lat: number, lng: number) => {
        setUserLocation({ lat, lng });
    }, []);

    return {
        stations,
        lastUpdate,
        isUpdating,
        userLocation,
        setManualLocation,
        connectionStatus
    };
}
