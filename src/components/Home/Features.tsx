import { useState } from "react";
import Link from "next/link";
import styles from "./Features.module.css";
import TechSpecsModal from "./TechSpecsModal";
import EnergySourceModal from "./EnergySourceModal";
import AppFeaturesModal from "./AppFeaturesModal";

type Feature = {
    icon: string;
    title: string;
    desc: string;
    href?: string;
};

const features: Feature[] = [
    {
        icon: "⚡",
        title: "Super Fast Charging",
        desc: "Get 100 miles of range in just 10 minutes with our Gen-4 DC fast chargers."
    },
    {
        icon: "🌿",
        title: "100% Renewable",
        desc: "Every kilowatt powered by wind and solar energy."
    },
    {
        icon: "📱",
        title: "Smart Connectivity",
        desc: "Manage your sessions and track stats via our real-time app."
    }
];

const Features = () => {
    const [showTechModal, setShowTechModal] = useState(false);
    const [showEnergyModal, setShowEnergyModal] = useState(false);
    const [showAppModal, setShowAppModal] = useState(false);

    const handleCardClick = (index: number) => {
        if (index === 0) setShowTechModal(true);
        if (index === 1) setShowEnergyModal(true);
        if (index === 2) setShowAppModal(true);
    };

    return (
        <>
            <section className={styles.section}>
                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${styles.card} cursor-pointer`}
                            onClick={() => handleCardClick(index)}
                        >
                            <span className={styles.icon}>{feature.icon}</span>
                            <h3 className={styles.title}>{feature.title}</h3>
                            <p className={styles.description}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {showTechModal && (
                <TechSpecsModal onClose={() => setShowTechModal(false)} />
            )}
            {showEnergyModal && (
                <EnergySourceModal onClose={() => setShowEnergyModal(false)} />
            )}
            {showAppModal && (
                <AppFeaturesModal onClose={() => setShowAppModal(false)} />
            )}
        </>
    );
};

export default Features;
