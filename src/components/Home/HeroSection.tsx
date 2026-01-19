"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";

import { motion } from "framer-motion";

const HeroSection = () => {
    const [activeChargers, setActiveChargers] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        "/hero-slide-1.png",
        "/hero-slide-2.png",
        "/hero-slide-3.png"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveChargers(prev => (prev < 5420 ? prev + 20 : 5420));
        }, 10);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(slideInterval);
    }, []);

    return (
        <section className={styles.hero}>
            {/* Background Slider */}
            <div className="absolute inset-0 z-0">
                {slides.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                            ${index === currentSlide ? 'opacity-60' : 'opacity-0'}
                        `}
                    >
                        <Image
                            src={src}
                            alt={`Hero Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.backgroundOverlay} />

            {/* Animated Glow Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 100, 0],
                    y: [0, 50, 0]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, -100, 0],
                    y: [0, -50, 0]
                }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={styles.heroContent}
            >
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`${styles.title} text-gradient`}
                >
                    Powering the <br /> Future of Mobility
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={styles.subtitle}
                >
                    Join the world's largest smart charging network.
                    Real-time availability, green energy updates, and seamless connectivity.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className={styles.ctaGroup}
                >
                    <Link href="/map">
                        <button className={styles.primaryBtn}>Find a Station</button>
                    </Link>
                    <Link href="/dashboard">
                        <button className={styles.secondaryBtn}>Live Dashboard</button>
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className={styles.statsBar}
            >
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{activeChargers.toLocaleString()}+</span>
                    <span className={styles.statLabel}>Active Chargers</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue} style={{ color: 'var(--secondary)' }}>98%</span>
                    <span className={styles.statLabel}>Uptime</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue} style={{ color: 'var(--accent)' }}>0g</span>
                    <span className={styles.statLabel}>CO2 Emitted</span>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
