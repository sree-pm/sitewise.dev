"use client";
import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setScrolled(scrolled);

      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 border-b smooth-transition duration-500",
      scrolled ? "bg-black/70 backdrop-blur-2xl border-white/10 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)]" : "bg-transparent border-transparent py-6"
    )}>
      {/* Animated scroll progress bar - Enhanced */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand-purple via-brand-blue to-brand-pink opacity-0 smooth-transition shadow-[0_0_20px_rgba(168,85,247,0.6)]"
        style={{ 
          width: `${scrollProgress}%`,
          opacity: scrolled ? 1 : 0,
          boxShadow: `0 0 20px rgba(94, 106, 210, ${scrollProgress / 100})`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group hover:opacity-80 smooth-transition">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue group-hover:shadow-[0_0_20px_rgba(94,106,210,0.4)] smooth-transition hover-lift group-hover:scale-110" />
          <span className="text-lg font-bold tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-blue smooth-transition">
            sitewise.dev
          </span>
        </a>
        
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {['Features', 'Pricing', 'About'].map((item, idx) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "smooth-transition relative group text-reveal",
                activeSection === item.toLowerCase() ? "text-white" : "text-gray-400 hover:text-white"
              )}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-brand-purple to-brand-blue group-hover:w-full smooth-transition shadow-[0_0_10px_rgba(94,106,210,0.4)]" />
              {activeSection === item.toLowerCase() && (
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-brand-purple to-brand-blue shadow-[0_0_10px_rgba(94,106,210,0.4)]" />
              )}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline-hover" size="sm" asChild className="ripple hidden md:inline-flex">
            <a href="/contact" className="smooth-transition">Contact</a>
          </Button>

          {/* Mobile menu button */}
          <MobileMenuButton />
        </div>
      </div>
      {/* Mobile menu panel (rendered at root of nav) */}
      <MobileMenu />
    </nav>
  )
}

function MobileMenuButton() {
  const [open, setOpen] = useState(false);
  return (
    <button
      aria-label="Toggle menu"
      onClick={() => setOpen(!open)}
      className="md:hidden p-2 rounded-lg bg-white/3 hover:bg-white/6 transition"
    >
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  // Keep it simple: toggle via body class in future; for now render hidden by default
  return (
    <div className="md:hidden fixed inset-x-4 top-20 z-40 rounded-xl bg-black/70 backdrop-blur-2xl border border-white/6 p-6 transform-gpu transition-all opacity-0 pointer-events-none">
      <nav className="flex flex-col gap-4">
        <a href="/features" className="text-white font-semibold">Features</a>
        <a href="/pricing" className="text-white font-semibold">Pricing</a>
        <a href="/about" className="text-white font-semibold">About</a>
        <a href="/contact" className="text-brand-purple font-semibold">Contact</a>
      </nav>
    </div>
  )
}