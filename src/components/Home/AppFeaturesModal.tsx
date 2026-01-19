"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Battery, Clock, Zap, ShieldCheck } from "lucide-react";
import styles from "./AppFeaturesModal.module.css";
import React, { useState, useEffect } from "react";

interface AppFeaturesModalProps {
    onClose: () => void;
}

const AppFeaturesModal: React.FC<AppFeaturesModalProps> = ({ onClose }) => {
    const [battery, setBattery] = useState(65);
    const [timeLeft, setTimeLeft] = useState(25);

    useEffect(() => {
        const interval = setInterval(() => {
            setBattery((prev) => (prev < 100 ? prev + 1 : 100));
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className={styles.modal}
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className={styles.backBtn} onClick={onClose}>
                        ← Back to Home
                    </button>

                    <header className={styles.header}>
                        <h2 className={styles.title}>Your Charging Command Center</h2>
                        <span className={styles.subtitle}>Real-Time Control & Insights</span>
                    </header>

                    <div className={styles.grid}>
                        {/* Phone Mockup - Active Session */}
                        <div className={styles.phoneContainer}>
                            <motion.div
                                className={styles.phone}
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, type: "spring" }}
                            >
                                <div className={styles.screen}>
                                    <div className="absolute top-0 w-full bg-blue-600/20 p-4 border-b border-blue-500/30">
                                        <div className="flex justify-between items-center text-xs text-blue-200 uppercase tracking-widest font-bold">
                                            <span>Active Session</span>
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                Live
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center flex-1 w-full relative">
                                        {/* Battery Circle */}
                                        <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle
                                                    cx="80"
                                                    cy="80"
                                                    r="70"
                                                    fill="none"
                                                    stroke="#1e3a5f"
                                                    strokeWidth="12"
                                                />
                                                <circle
                                                    cx="80"
                                                    cy="80"
                                                    r="70"
                                                    fill="none"
                                                    stroke="#00aaff"
                                                    strokeWidth="12"
                                                    strokeDasharray="440"
                                                    strokeDashoffset={440 - (440 * battery) / 100}
                                                    className="transition-all duration-1000 ease-out"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute flex flex-col items-center">
                                                <span className="text-4xl font-bold text-white">{battery}%</span>
                                                <span className="text-xs text-blue-300 uppercase tracking-wide">SOC</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 w-full px-4">
                                            <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                                                <div className="text-blue-400 mb-1"><Zap size={20} className="mx-auto" /></div>
                                                <div className="text-lg font-bold text-white">150 kW</div>
                                                <div className="text-[10px] text-gray-400 uppercase">Power</div>
                                            </div>
                                            <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                                                <div className="text-green-400 mb-1"><Clock size={20} className="mx-auto" /></div>
                                                <div className="text-lg font-bold text-white">{timeLeft} min</div>
                                                <div className="text-[10px] text-gray-400 uppercase">Remaining</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full p-4 mt-auto">
                                        <button className="w-full py-3 bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl font-bold hover:bg-red-500/30 transition-colors">
                                            Stop Charging
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Feature List */}
                        <div className={styles.featuresList}>
                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>
                                    <Battery size={24} />
                                </div>
                                <div className={styles.featureText}>
                                    <h4>Live Monitoring</h4>
                                    <p>Watch your state of charge, power delivery, and estimated range in real-time.</p>
                                </div>
                            </div>

                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>
                                    <Clock size={24} />
                                </div>
                                <div className={styles.featureText}>
                                    <h4>Session History</h4>
                                    <p>Access detailed logs of every charge, costs involved, and CO2 saved.</p>
                                </div>
                            </div>

                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>
                                    <ShieldCheck size={24} />
                                </div>
                                <div className={styles.featureText}>
                                    <h4>Secure Payments</h4>
                                    <p>Manage cards, view receipts, and handle billing automatically.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AppFeaturesModal;
