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
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "parallax-scroll": "parallaxScroll 1.2s cubic-bezier(0.23, 1, 0.320, 1) forwards",
        "float-in": "floatIn 1s cubic-bezier(0.23, 1, 0.320, 1) forwards",
        "slide-down-reveal": "slideDownReveal 0.8s cubic-bezier(0.23, 1, 0.320, 1)",
        "scale-pop": "scalePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "shimmer": "shimmer 2s infinite",
        "glow-flicker": "glowFlicker 3s ease-in-out infinite",
        "morph": "morph 8s ease-in-out infinite",
        "color-shift": "colorShift 5s ease-in-out infinite",
        "bounce-custom": "bounceCustom 2s cubic-bezier(0.23, 1, 0.320, 1) infinite",
        "rotate-slow": "rotateSlow 20s linear infinite",
        "tilt": "tilt 6s cubic-bezier(0.23, 1, 0.320, 1) infinite",
        "blob": "blob 7s infinite",
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
        parallaxScroll: {
          "0%": {
            opacity: "0",
            transform: "translateY(40px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        floatIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(60px) scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        slideDownReveal: {
          "0%": {
            opacity: "0",
            transform: "translateY(-30px) skewY(-3deg)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) skewY(0)",
          },
        },
        scalePop: {
          "0%": {
            opacity: "0",
            transform: "scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        glowFlicker: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(94, 106, 210, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(94, 106, 210, 0.6)",
          },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        colorShift: {
          "0%": { color: "#ffffff" },
          "50%": { color: "#5E6AD2" },
          "100%": { color: "#ffffff" },
        },
        bounceCustom: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        tilt: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
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