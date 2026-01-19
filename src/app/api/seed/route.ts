import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const delhiCenter = { lat: 28.6139, lng: 77.2090 };

export async function POST() {
    const stations = Array.from({ length: 25 }).map((_, i) => ({
        id: `st-${i}-${Date.now()}`,
        name: `NeonHub ${i + 1}`,
        lat: delhiCenter.lat + (Math.random() - 0.5) * 0.15,
        lng: delhiCenter.lng + (Math.random() - 0.5) * 0.15,
        status: Math.random() > 0.4 ? 'available' : 'busy',
        price: Math.floor(Math.random() * 5) + 8,
        power: Math.random() > 0.4 ? 120 : 50,
        connector_type: Math.random() > 0.5 ? 'CCS' : 'Type 2'
    }));

    const { error } = await supabase.from('stations').insert(stations);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: stations.length });
}
