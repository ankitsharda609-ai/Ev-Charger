"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./ScanningOverlay.module.css";
import { useEffect, useState } from "react";

const ScanningOverlay = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [status, setStatus] = useState("INITIALIZING REGIONAL LINK");

    useEffect(() => {
        const timer1 = setTimeout(() => setStatus("TRIANGULATING GPS SIGNAL"), 1000);
        const timer2 = setTimeout(() => setStatus("DOWNLOADING STATION DATA"), 2000);
        const timer3 = setTimeout(() => setStatus("OPTIMIZING ROUTE MESH"), 3000);
        const timer4 = setTimeout(() => setIsVisible(false), 3800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.overlay}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.grid} />

                    <div className={`${styles.corner} ${styles.tl}`} />
                    <div className={`${styles.corner} ${styles.tr}`} />
                    <div className={`${styles.corner} ${styles.bl}`} />
                    <div className={`${styles.corner} ${styles.br}`} />

                    <motion.div
                        className={styles.radarContainer}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <div className={styles.radarCircle} />
                        <div className={styles.radarCircle} />
                        <div className={styles.radarCircle} />
                        <div className={styles.radarScan} />
                    </motion.div>

                    <div className={styles.textContainer}>
                        <motion.div
                            key={status}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={styles.statusText}
                        >
                            {status}
                        </motion.div>
                        <div className={styles.subText}>SYSTEM ONLINE // v4.2.0</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScanningOverlay;
