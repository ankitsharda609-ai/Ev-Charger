"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import ContactModal from "../Contact/ContactModal";
import ConnectEVModal from "./ConnectEVModal";

const Navbar = () => {
    const pathname = usePathname();
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isConnectOpen, setIsConnectOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    return (
        <>
            <nav className={`${styles.navbar} glass`}>
                <Link href="/" className={`${styles.logo} text-gradient`}>
                    NeonEV
                </Link>

                <ul className={styles.navLinks}>
                    <li>
                        <Link
                            href="/"
                            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/map"
                            className={`${styles.navLink} ${isActive('/map') ? styles.active : ''}`}
                        >
                            Find Stations
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard"
                            className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
                        >
                            Live Dashboard
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className={styles.navLink}
                        >
                            Contact
                        </button>
                    </li>
                </ul>

                <button
                    className={styles.ctaButton}
                    onClick={() => setIsConnectOpen(true)}
                >
                    Connect EV
                </button>
            </nav>
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            {isConnectOpen && <ConnectEVModal onClose={() => setIsConnectOpen(false)} />}
        </>
    );
};

export default Navbar;
