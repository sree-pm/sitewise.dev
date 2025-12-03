"use client";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
        "fixed top-0 w-full z-50 border-b transition-all duration-300",
        scrolled ? "bg-black/80 backdrop-blur-xl border-white/10 py-4" : "bg-transparent border-transparent py-6"
    )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue" />
            <span className="text-xl font-bold tracking-tighter text-white">
              INFONAUT
            </span>
          </Link>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <Link href="#grox" className="hover:text-white transition-colors">GroX</Link>
            <Link href="#xgent" className="hover:text-white transition-colors">Xgent</Link>
            <Link href="#services" className="hover:text-white transition-colors">Consulting</Link>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href="mailto:contact@infonaut.ai">Contact Us</Link>
          </Button>
        </div>
      </nav>
  )
}