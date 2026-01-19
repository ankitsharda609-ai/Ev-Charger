import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    // 1. Try fetching from Supabase
    const { data: station, error } = await supabase
        .from('stations')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Supabase Error fetching station ${id}:`, error);
        // Fallback or 404
        return new NextResponse('Station not found or DB error', { status: 404 });
    }

    if (!station) {
        return new NextResponse('Station not found', { status: 404 });
    }

    // 2. Format to camelCase for frontend
    const formattedStation = {
        id: station.id,
        name: station.name,
        lat: station.lat,
        lng: station.lng,
        status: station.status,
        price: station.price,
        power: station.power,
        connectorType: station.connector_type // Map snake_case to camelCase
    };

    return NextResponse.json(formattedStation);
}
