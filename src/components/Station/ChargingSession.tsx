'use client';

import { useState, useEffect } from 'react';
import { BatteryCharging, Zap, X, Clock, CheckCircle } from 'lucide-react';

interface ChargingSessionProps {
    stationName: string;
    price: number;
    onClose: () => void;
}

export default function ChargingSession({ stationName, price, onClose }: ChargingSessionProps) {
    const [progress, setProgress] = useState(0);
    const [kwh, setKwh] = useState(0);
    const [duration, setDuration] = useState(0);
    const [status, setStatus] = useState<'charging' | 'completed'>('charging');

    // Simulation logic
    useEffect(() => {
        if (status === 'completed') return;

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    setStatus('completed');
                    return 100;
                }
                // Random increments for realism
                return prev + (Math.random() * 0.8);
            });

            setKwh(prev => prev + (Math.random() * 0.05));
            setDuration(prev => prev + 1);
        }, 100);

        return () => clearInterval(interval);
    }, [status]);

    const currentCost = (kwh * price).toFixed(2);
    const formattedTime = new Date(duration * 1000).toISOString().substr(14, 5);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-background-card border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl">

                {/* Background Glow effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/20 blur-[100px] rounded-full"></div>

                <div className="relative z-10 text-center">
                    <div className="flex justify-end mb-4">
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <X className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">{stationName}</h2>
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <span className={`w-2 h-2 rounded-full ${status === 'charging' ? 'bg-primary animate-pulse' : 'bg-green-500'}`}></span>
                        <span className="text-text-secondary uppercase tracking-widest text-xs font-bold">
                            {status === 'charging' ? 'Charging in progress' : 'Session Completed'}
                        </span>
                    </div>

                    {/* Main Progress Circle */}
                    <div className="relative w-48 h-48 mx-auto mb-10 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/10" />
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                className={`${status === 'completed' ? 'text-green-500' : 'text-primary'} transition-all duration-300`}
                                strokeDasharray="283"
                                strokeDashoffset={283 - (283 * progress) / 100}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-4xl font-bold text-white mb-1">{Math.floor(progress)}%</span>
                            <BatteryCharging className={`w-6 h-6 ${status === 'completed' ? 'text-green-500' : 'text-primary'}`} />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                            <Zap className="w-4 h-4 text-primary mx-auto mb-2" />
                            <div className="text-lg font-bold text-white">{kwh.toFixed(1)}</div>
                            <div className="text-xs text-text-muted">kWh</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                            <Clock className="w-4 h-4 text-accent mx-auto mb-2" />
                            <div className="text-lg font-bold text-white">{formattedTime}</div>
                            <div className="text-xs text-text-muted">Time</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-primary font-mono font-bold mb-2">₹</div>
                            <div className="text-lg font-bold text-white">{currentCost}</div>
                            <div className="text-xs text-text-muted">Cost</div>
                        </div>
                    </div>

                    {status === 'charging' ? (
                        <button
                            onClick={() => setStatus('completed')}
                            className="w-full py-3 rounded-xl border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors font-medium"
                        >
                            Stop Charging
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl bg-green-500 text-black hover:bg-green-400 transition-colors font-bold flex items-center justify-center gap-2"
                        >
                            <CheckCircle className="w-5 h-5" />
                            Done
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
