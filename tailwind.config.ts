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
        "fade-in": "fade-in 1s ease-out forwards",
        "fade-in-up": "fade-in-up 1s ease-out forwards",
        "glow": "glow 4s ease-in-out infinite alternate",
        "scroll": "scroll 40s linear infinite",
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
        glow: {
          "0%": { opacity: "0.5", transform: "scale(1)" },
          "100%": { opacity: "1", transform: "scale(1.1)" },
        },
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
      },
      backgroundImage: {
         "glow-conic": "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      }
    },
  },
  plugins: [],
};
export default config;