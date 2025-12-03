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
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        brand: {
          purple: "#A855F7",
          blue: "#3B82F6",
          pink: "#EC4899",
        }
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scroll": "scroll linear infinite",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
      },
      transitionDelay: {
        "100": "100ms",
        "200": "200ms",
        "300": "300ms",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, 40px, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
      },
      backgroundImage: {
         "grid-pattern": "linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
};
export default config;
