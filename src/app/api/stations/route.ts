import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    let { data: stations, error } = await supabase
        .from('stations')
        .select('*');

    if (error) {
        console.error("Supabase Error in /api/stations (Handled by Mock Fallback):", error);
    }


    // Initialize dummyStations for fallback or seeding
    const dummyStations = Array.from({ length: 15 }).map((_, i) => ({
        id: `mock-st-${i}`,
        name: `NeonHub ${Math.floor(Math.random() * 1000)}`,
        lat: 28.6139 + (Math.random() - 0.5) * 0.15,
        lng: 77.2090 + (Math.random() - 0.5) * 0.15,
        status: Math.random() > 0.4 ? 'available' : 'busy',
        price: Math.floor(Math.random() * 5) + 8,
        power: Math.random() > 0.4 ? 120 : 50,
        connector_type: Math.random() > 0.5 ? 'CCS' : 'Type 2'
    }));

    // Check for explicit Mock Mode
    const USE_MOCK = process.env.DATA_MODE === 'mock';

    // If Mock Mode is requested, return mock data immediately
    if (USE_MOCK) {
        const formattedMock = dummyStations.map(s => ({
            id: s.id,
            name: s.name,
            lat: s.lat,
            lng: s.lng,
            status: s.status,
            price: s.price,
            power: s.power,
            connectorType: s.connector_type
        }));
        return NextResponse.json(formattedMock);
    }

    // Otherwise, try Real DB
    if (error) {
        console.error("Supabase Error:", error);
        // If we are NOT in mock mode, we should fail or return empty, NOT fallback silently
        // But for robust UX, if the table is empty we might want to seed.
        // If the error is connection error, return 500.
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }

    if (!stations || stations.length === 0) {
        console.warn("Supabase Empty. Seeding...");
        // Auto-Seeding is allowed in real mode if table is empty
        await supabase.from('stations').insert(dummyStations);
        const { data: refreshed } = await supabase.from('stations').select('*');
        stations = refreshed || [];
    }


    // Auto-Seeding: If DB works but has few stations, try to insert more
    if (stations.length < 5) {
        await supabase.from('stations').insert(dummyStations);
        // re-fetch
        const { data: refreshed } = await supabase.from('stations').select('*');
        if (refreshed) stations = refreshed;
    }

    // Map DB snake_case to frontend camelCase
    const formattedStations = stations?.map(s => ({
        id: s.id,
        name: s.name,
        lat: s.lat,
        lng: s.lng,
        status: s.status,
        price: s.price,
        power: s.power,
        connectorType: s.connector_type
    }));

    return NextResponse.json(formattedStations || []);
}
