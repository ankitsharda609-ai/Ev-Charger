"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Battery, Timer, Cpu } from "lucide-react";
import styles from "./TechSpecsModal.module.css";
import React from "react";

interface TechSpecsModalProps {
    onClose: () => void;
}

const TechSpecsModal: React.FC<TechSpecsModalProps> = ({ onClose }) => {
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
                        <h2 className={styles.title}>Gen-4 HyperCharge</h2>
                        <span className={styles.subtitle}>Technical Specifications</span>
                    </header>

                    <div className={styles.grid}>
                        {/* Comparison Graph */}
                        <div className={styles.graphContainer}>
                            <div className={styles.graphTitle}>
                                <span>Power Output Comparison</span>
                                <span className="text-primary font-mono">7x Faster</span>
                            </div>

                            <div className={styles.chart}>
                                <div className={styles.barGroup}>
                                    <motion.div
                                        className={`${styles.bar} ${styles.barLegacy}`}
                                        initial={{ height: 0 }}
                                        animate={{ height: "15%" }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                    />
                                    <div className={styles.barLabel}>Standard (50kW)</div>
                                </div>
                                <div className={styles.barGroup}>
                                    <motion.div
                                        className={`${styles.bar} ${styles.barGen4}`}
                                        initial={{ height: 0 }}
                                        animate={{ height: "100%" }}
                                        transition={{ duration: 1, delay: 0.4 }}
                                    />
                                    <div className={styles.barLabel}>Gen-4 (350kW)</div>
                                </div>
                            </div>

                            <p className="text-sm text-text-secondary mt-4">
                                Our liquid-cooled cables maintain peak performace, delivering up to 100 miles of range in under 10 minutes.
                            </p>
                        </div>

                        {/* Tech Specs */}
                        <div className={styles.statsContainer}>
                            <div className={styles.statCard}>
                                <Zap className={styles.statIcon} size={32} />
                                <div className={styles.statInfo}>
                                    <span className={styles.statValue}>350 kW</span>
                                    <span className={styles.statLabel}>Max Power Output</span>
                                </div>
                            </div>

                            <div className={styles.statCard}>
                                <Battery className={styles.statIcon} size={32} />
                                <div className={styles.statInfo}>
                                    <span className={styles.statValue}>800 V</span>
                                    <span className={styles.statLabel}>System Architecture</span>
                                </div>
                            </div>

                            <div className={styles.statCard}>
                                <Timer className={styles.statIcon} size={32} />
                                <div className={styles.statInfo}>
                                    <span className={styles.statValue}>10 min</span>
                                    <span className={styles.statLabel}>0-80% Charge Time</span>
                                </div>
                            </div>

                            <div className={styles.statCard}>
                                <Cpu className={styles.statIcon} size={32} />
                                <div className={styles.statInfo}>
                                    <span className={styles.statValue}>99.2%</span>
                                    <span className={styles.statLabel}>Grid Efficiency</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default TechSpecsModal;
