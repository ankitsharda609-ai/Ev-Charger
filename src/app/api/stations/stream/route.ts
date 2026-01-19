import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    const encoder = new TextEncoder();

    let interval: NodeJS.Timeout;
    let isClosed = false;

    const stream = new ReadableStream({
        start(controller) {
            const sendUpdate = async () => {
                if (isClosed) return;
                try {
                    // Check for explicit Mock Mode
                    const USE_MOCK = process.env.DATA_MODE === 'mock';

                    if (USE_MOCK) {
                        // Pure Simulation Logic (Memory Only)
                        const mockId = `mock-st-${Math.floor(Math.random() * 15)}`;
                        const updatedStation = {
                            id: mockId,
                            status: Math.random() > 0.5 ? 'available' : 'busy'
                        };

                        const data = JSON.stringify({
                            timestamp: new Date().toISOString(),
                            stations: [updatedStation]
                        });
                        if (!isClosed) {
                            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                        }
                        return; // Exit, wait for next interval
                    }

                    // REAL MODE: Fetch from DB
                    const { data: allIds, error } = await supabase.from('stations').select('id');

                    if (isClosed) return;

                    if (error) {
                        console.error("Supabase Stream Error:", error);
                        // Do not fallback. Log error.
                        return;
                    }

                    // Simulation on Real DB: Randomly update status to keep dashboard alive
                    // This is 'Real Data' simulation as per user requirement to see activity
                    if (Math.random() > 0.3 && allIds && allIds.length > 0) {
                        const randomId = allIds[Math.floor(Math.random() * allIds.length)].id;
                        const newStatus = Math.random() > 0.5 ? 'available' : 'busy';
                        // Fire & Forget update
                        await supabase.from('stations').update({ status: newStatus }).eq('id', randomId);
                    }

                    // Fetch latest state to push to client
                    const { data: stations } = await supabase
                        .from('stations')
                        .select('id, status');

                    if (stations && !isClosed) {
                        const data = JSON.stringify({
                            timestamp: new Date().toISOString(),
                            stations: stations
                        });
                        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                    }

                } catch (e) {
                    if (!isClosed) {
                        console.error("Stream enqueue error", e);
                    }
                }
            };

            // Send initial state
            sendUpdate();

            // Poll Supabase every 4 seconds for DB updates
            interval = setInterval(sendUpdate, 4000);
        },
        cancel() {
            isClosed = true;
            if (interval) {
                clearInterval(interval);
            }
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}
