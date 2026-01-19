"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Wind, Sun, BatteryCharging, Leaf, Trees } from "lucide-react";
import styles from "./EnergySourceModal.module.css";
import React, { useState, useEffect } from "react";

interface EnergySourceModalProps {
    onClose: () => void;
}

const EnergySourceModal: React.FC<EnergySourceModalProps> = ({ onClose }) => {
    const [co2Saved, setCo2Saved] = useState(12500);

    useEffect(() => {
        const interval = setInterval(() => {
            setCo2Saved(prev => prev + 1);
        }, 1000); // Simulate live CO2 saving
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
                        <h2 className={styles.title}>100% Renewable Energy with NeonEV</h2>
                        <span className={styles.subtitle}>Our Green Promise</span>
                    </header>

                    <div className={styles.grid}>
                        {/* Chart Section */}
                        <div className={styles.chartContainer}>
                            <motion.div
                                className={styles.pieChart}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ duration: 1, type: "spring" }}
                            />

                            <div className={styles.legend}>
                                <div className={styles.legendItem}>
                                    <span className={styles.legendDot} style={{ background: 'var(--secondary)' }}></span>
                                    <span>Wind (60%)</span>
                                </div>
                                <div className={styles.legendItem}>
                                    <span className={styles.legendDot} style={{ background: '#00aaff' }}></span>
                                    <span>Hydro (30%)</span>
                                </div>
                                <div className={styles.legendItem}>
                                    <span className={styles.legendDot} style={{ background: '#ffaa00' }}></span>
                                    <span>Solar (10%)</span>
                                </div>
                            </div>
                        </div>

                        {/* Impact Section */}
                        <div className={styles.impactContainer}>
                            <div className={styles.statCard}>
                                <Leaf className={styles.statIcon} size={40} />
                                <div className={styles.statInfo}>
                                    <span className={styles.statValue}>{co2Saved.toLocaleString()} kg</span>
                                    <span className={styles.statLabel}>CO2 Emissions Prevented</span>
                                </div>
                            </div>

                            <div className={styles.statCard}>
                                <Trees className={styles.statIcon} size={40} />
                                <div className={styles.statInfo}>
                                    <span className={styles.statValue}>450+</span>
                                    <span className={styles.statLabel}>Trees Equivalent Planted</span>
                                </div>
                            </div>

                            <p className="text-text-secondary leading-relaxed mt-4">
                                Every electron flowing into your vehicle is matched with renewable energy certificates.
                                We prioritize local wind farms and solar arrays to ensure your drive is as clean as it gets.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EnergySourceModal;
