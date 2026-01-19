"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Car, Search, Wifi, CheckCircle, Loader } from "lucide-react";
import styles from "./ConnectEVModal.module.css";
import React, { useState, useEffect } from "react";

interface ConnectEVModalProps {
    onClose: () => void;
}

const ConnectEVModal: React.FC<ConnectEVModalProps> = ({ onClose }) => {
    const [step, setStep] = useState<'scan' | 'found' | 'connecting' | 'success'>('scan');

    useEffect(() => {
        // Step 1: Scan
        const scanTimer = setTimeout(() => {
            setStep('found');
        }, 3000);

        // Step 2: Found -> Connecting
        const foundTimer = setTimeout(() => {
            if (step === 'scan') return; // protection
            setStep('connecting');
        }, 5000);

        // Step 3: Connecting -> Success
        const connectTimer = setTimeout(() => {
            setStep('success');
        }, 8000);

        return () => {
            clearTimeout(scanTimer);
            clearTimeout(foundTimer);
            clearTimeout(connectTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                className={styles.modal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <button className={styles.backBtn} onClick={onClose}>
                    ← Cancel Connection
                </button>

                <div className={styles.content}>
                    {step === 'scan' && (
                        <>
                            <div className={styles.scanner}>
                                <div className={styles.scannerLine} />
                                <Search size={64} className="text-blue-400 opacity-50" />
                            </div>
                            <h2 className={styles.statusText}>Scanning nearby devices...</h2>
                            <p className={styles.subText}>Ensure your vehicle's Bluetooth is on.</p>
                        </>
                    )}

                    {step === 'found' && (
                        <>
                            <div className={`${styles.scanner} border-blue-500`}>
                                <div className={styles.vehicleFound}>
                                    <Car size={80} />
                                </div>
                            </div>
                            <h2 className={styles.statusText}>Vehicle Detected</h2>
                            <p className={styles.subText}>Tesla Model Y (Deep Blue)</p>
                        </>
                    )}

                    {step === 'connecting' && (
                        <>
                            <div className={styles.scanner}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <Loader size={80} className="text-blue-400" />
                                </motion.div>
                            </div>
                            <h2 className={styles.statusText}>Establishing Connection...</h2>
                            <p className={styles.subText}>Handshaking with safe-charge protocol.</p>
                        </>
                    )}

                    {step === 'success' && (
                        <>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={styles.successRing}
                            >
                                <CheckCircle size={80} className="text-green-400" />
                            </motion.div>
                            <h2 className={styles.statusText}>Connected Successfully!</h2>
                            <p className={styles.subText}>Ready to initiate charging session.</p>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8 px-8 py-3 bg-blue-600 rounded-full font-bold text-white hover:bg-blue-500 transition-colors"
                                onClick={onClose}
                            >
                                Go to Dashboard
                            </motion.button>
                        </>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ConnectEVModal;
