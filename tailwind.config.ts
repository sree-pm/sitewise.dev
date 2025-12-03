import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Mandatory for Linear look
      },
      colors: {
        background: "#000000", // Pure black
        foreground: "#ffffff",
        // Linear's specific gray scale
        glass: "rgba(255, 255, 255, 0.08)",
        "glass-hover": "rgba(255, 255, 255, 0.12)",
        border: "rgba(255, 255, 255, 0.1)",
        "text-secondary": "#8A8F98", // The Linear gray text color
        brand: {
          purple: "#5E6AD2", // Linear's Blurple
          blue: "#3B82F6",
          pink: "#EC4899",
        }
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "scale-in": "scale-in 0.6s cubic-bezier(0.23, 1, 0.320, 1) forwards",
        "slide-down": "slide-down 0.6s cubic-bezier(0.23, 1, 0.320, 1) forwards",
        "blur-in": "blur-in 0.8s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "glow": "glow 4s ease-in-out infinite alternate",
        "scroll": "scroll 40s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "blur-in": {
          "0%": { filter: "blur(10px)", opacity: "0" },
          "100%": { filter: "blur(0)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", boxShadow: "0 0 20px rgba(94, 106, 210, 0.3)" },
          "50%": { opacity: "1", boxShadow: "0 0 40px rgba(94, 106, 210, 0.6)" },
        },
        glow: {
          "0%": { opacity: "0.5", transform: "scale(1)" },
          "100%": { opacity: "1", transform: "scale(1.05)" },
        },
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      transitionTimingFunction: {
        "in-out-cubic": "cubic-bezier(0.23, 1, 0.320, 1)",
      },
      backgroundImage: {
         "glow-conic": "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      }
    },
  },
  plugins: [],
};
export default config;