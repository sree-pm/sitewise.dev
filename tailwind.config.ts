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
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      fontSize: {
        // Premium typography scale
        "xs": ["12px", { lineHeight: "18px", fontWeight: "500", letterSpacing: "0.02em" }],
        "sm": ["14px", { lineHeight: "24px", fontWeight: "400" }],
        "base": ["16px", { lineHeight: "28px", fontWeight: "400" }],
        "lg": ["18px", { lineHeight: "32px", fontWeight: "400" }],
        "xl": ["20px", { lineHeight: "28px", fontWeight: "700" }],
        "2xl": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "3xl": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "4xl": ["48px", { lineHeight: "56px", fontWeight: "800" }],
        "5xl": ["56px", { lineHeight: "64px", fontWeight: "800" }],
        "6xl": ["64px", { lineHeight: "72px", fontWeight: "900", letterSpacing: "-0.015em" }],
        "7xl": ["80px", { lineHeight: "88px", fontWeight: "900", letterSpacing: "-0.02em" }],
      },
      spacing: {
        "xs": "8px",
        "sm": "16px",
        "md": "24px",
        "lg": "32px",
        "xl": "48px",
        "2xl": "64px",
        "3xl": "96px",
        "4xl": "128px",
      },
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        // Premium brand colors
        "brand-purple": "#5E6AD2",
        "brand-purple-light": "#7B85F0",
        "brand-purple-dark": "#4A55B8",
        "brand-blue": "#3B82F6",
        "brand-blue-light": "#60A5FA",
        "brand-pink": "#EC4899",
        // Neutral scale
        "neutral-950": "#0A0A0A",
        "neutral-900": "#0F0F12",
        "neutral-800": "#1A1A1F",
        "neutral-700": "#2D2D35",
        "neutral-600": "#404048",
        // Semantic colors
        "text-primary": "#FFFFFF",
        "text-secondary": "#AEAFB5",
        "text-tertiary": "#8A8F98",
        "surface-primary": "#000000",
        "surface-secondary": "#0F0F12",
        "surface-tertiary": "#1A1A1F",
        // Glass
        "glass": "rgba(255, 255, 255, 0.02)",
        "glass-light": "rgba(255, 255, 255, 0.02)",
        "glass-medium": "rgba(255, 255, 255, 0.05)",
        "glass-heavy": "rgba(255, 255, 255, 0.08)",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        // Borders
        "border-light": "rgba(255, 255, 255, 0.08)",
        "border-medium": "rgba(255, 255, 255, 0.12)",
        "border-heavy": "rgba(255, 255, 255, 0.16)",
      },
      boxShadow: {
        // Premium shadow system
        "xs": "0 1px 2px rgba(0, 0, 0, 0.05)",
        "sm": "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "md": "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
        "lg": "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
        "xl": "0 20px 25px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.05)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.25)",
        "3xl": "0 35px 60px rgba(0, 0, 0, 0.3)",
        // Glow effects
        "glow-purple": "0 0 40px rgba(94, 106, 210, 0.4)",
        "glow-blue": "0 0 40px rgba(59, 130, 246, 0.4)",
        "glow-pink": "0 0 40px rgba(236, 72, 153, 0.4)",
      },
      borderRadius: {
        "xs": "4px",
        "sm": "6px",
        "md": "8px",
        "lg": "12px",
        "xl": "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      backdropFilter: {
        blur: "blur(12px)",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-down": "slide-down 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
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
          "0%": { opacity: "0", transform: "translateY(16px)" },
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
          "50%": { transform: "translateY(-20px)" },
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
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "material": "cubic-bezier(0.23, 1, 0.32, 1)",
        "elastic": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};
export default config;