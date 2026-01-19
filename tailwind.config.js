/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#00f0ff",
                    glow: "rgba(0, 240, 255, 0.5)",
                },
                secondary: {
                    DEFAULT: "#39ff14",
                    glow: "rgba(57, 255, 20, 0.5)",
                },
                accent: "#ff0055",
                background: {
                    dark: "#050510",
                    card: "rgba(20, 20, 35, 0.6)",
                    "card-hover": "rgba(30, 30, 50, 0.7)",
                },
                text: {
                    primary: "#ffffff",
                    secondary: "#a0a0b0",
                    muted: "#606070",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
            },
            animation: {
                "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                "pulse-glow": {
                    "0%, 100%": { opacity: "1", boxShadow: "0 0 10px var(--primary-glow)" },
                    "50%": { opacity: "0.5", boxShadow: "0 0 20px var(--primary-glow)" },
                },
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
};
