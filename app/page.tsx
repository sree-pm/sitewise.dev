"use client";

import { Navbar } from "@/components/organisms/Navbar";
import { BentoCard } from "@/components/molecules/BentoCard";
import { Button } from "@/components/atoms/Button";
import { LogoCloud } from "@/components/organisms/LogoCloud";
// REMOVED: import { Pricing } from "@/components/organisms/Pricing"; <--- Deleted this line
import { FAQ } from "@/components/organisms/FAQ";
import { TechIcon } from "@/components/atoms/TechIcons";
import { ASSETS } from "@/lib/assets";
import { Zap, Bot, Globe, Cpu, ChevronRight, Star, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center text-center max-w-5xl mx-auto overflow-hidden">
        
        {/* Badge */}
        <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-xl animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-brand-purple mr-2 animate-pulse-slow"></span>
          Infonaut R&D: Public Preview
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1] animate-fade-in-up delay-100">
          We build <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue">Intelligence</span> <br />
          for the automated economy.
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed animate-fade-in-up delay-200">
          Infonaut is a UK-based AI Venture Studio. We engineer autonomous agents, 
          growth systems, and enterprise infrastructure.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-300">
          <Button size="lg" variant="glow" className="w-full sm:w-auto">
            Explore Ventures
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto group">
            About Infonaut <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"/>
          </Button>
        </div>

        {/* Hero Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      </section>

      {/* 2. SOCIAL PROOF */}
      <LogoCloud />

      {/* 3. BENTO GRID (THE ECOSYSTEM) */}
      <section id="products" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The Constellation</h2>
            <p className="text-gray-400">Our ecosystem of specialized AI products.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[28rem]">
            
            {/* GroX */}
            <BentoCard
              className="md:col-span-1"
              title="GroX"
              description="The AI Growth Engine. Automate your outbound and enrich leads."
              href="#grox"
              cta="View Engine"
              icon={Zap}
              gradient="purple"
            >
               <div className="absolute inset-0 top-32 px-4 pointer-events-none">
                  {/* <img src={ASSETS.ventures.grox} alt="GroX Dashboard" className="rounded-t-xl border border-white/10 shadow-2xl opacity-80" /> */}
                  <div className="w-full h-full bg-white/5 border border-white/10 rounded-t-xl" />
               </div>
            </BentoCard>
            
            {/* Xgent */}
            <BentoCard
              className="md:col-span-2"
              title="Xgent"
              description="Autonomous Workforce. Xgent agents handle complex workflows 24/7."
              href="#xgent"
              cta="Meet the Agents"
              icon={Bot}
              gradient="blue"
            >
               <div className="absolute right-0 bottom-0 w-3/4 h-3/4 pointer-events-none translate-x-12 translate-y-12">
                  <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-black border-l border-t border-white/10 rounded-tl-2xl" />
               </div>
            </BentoCard>
            
            {/* Leancraft */}
            <BentoCard
              className="md:col-span-2"
              title="Leancraft.org"
              description="AI Consulting for the SMB. Strategy, implementation, and training."
              href="https://leancraft.org"
              cta="Book Consultation"
              icon={Globe}
              gradient="pink"
            >
               <div className="absolute right-4 top-4 opacity-50">
                  <TechIcon name="OpenAI" className="h-12 w-12 text-white/20" />
               </div>
            </BentoCard>
            
             {/* Superflash */}
            <BentoCard
              className="md:col-span-1"
              title="superflash.dev"
              description="Dev tools for velocity. Build AI-native apps in minutes."
              href="#superflash"
              cta="Start Building"
              icon={Cpu}
              gradient="gray"
            >
                 <div className="absolute inset-0 top-32 px-4 pointer-events-none">
                   <div className="w-full h-full bg-white/5 border border-white/10 rounded-t-xl p-4 font-mono text-xs text-gray-400">
                     <p>$ npx create-superflash-app</p>
                     <p className="text-brand-pink"> &gt; Initializing AI core...</p>
                     <p>&gt; Done in 0.4s.</p>
                   </div>
               </div>
            </BentoCard>
        </div>
      </section>

      {/* 4. TECH STACK (3D FEEL) */}
      <section className="py-24 bg-black border-y border-white/10 overflow-hidden relative">
         <div className="absolute inset-0 bg-brand-blue/5 blur-3xl pointer-events-none" />
         <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-2xl font-bold text-white mb-12">Engineered on the Modern Stack</h2>
            <div className="flex flex-wrap justify-center gap-12 opacity-70">
                <div className="flex flex-col items-center gap-4">
                    <TechIcon name="NextJS" className="h-12 w-12 text-white" />
                    <span className="text-xs font-mono text-gray-500">Next.js 14</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                     <TechIcon name="TypeScript" className="h-12 w-12 text-blue-400" />
                     <span className="text-xs font-mono text-gray-500">TypeScript</span>
                </div>
                 <div className="flex flex-col items-center gap-4">
                     <TechIcon name="React" className="h-12 w-12 text-cyan-400" />
                     <span className="text-xs font-mono text-gray-500">React</span>
                </div>
                 <div className="flex flex-col items-center gap-4">
                     <TechIcon name="OpenAI" className="h-12 w-12 text-green-400" />
                     <span className="text-xs font-mono text-gray-500">OpenAI</span>
                </div>
            </div>
         </div>
      </section>

      {/* 5. FAQ (REMOVED PRICING, KEPT FAQ) */}
      <FAQ />

      {/* 6. FOUNDER STATEMENT */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="absolute -top-6 -left-6 text-6xl text-brand-purple opacity-50">&quot;</div>
                <p className="text-xl md:text-2xl text-gray-200 font-medium leading-relaxed mb-8">
                    We founded Infonaut because the future isn&apos;t about AI chat wrappers. 
                    It&apos;s about autonomous agents that perform actual work. 
                    We are building the workforce of tomorrow.
                </p>
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden border border-white/20 bg-gray-800">
                         {/* <img src={ASSETS.team.founder} alt="Founder" className="object-cover w-full h-full" /> */}
                    </div>
                    <div>
                        <div className="text-white font-bold">Founder Name</div>
                        <div className="text-brand-purple text-sm">CEO, Infonaut LTD</div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 7. CTA & FOOTER */}
      <section className="py-24 px-6 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto">
             <h2 className="text-4xl font-bold text-white mb-6">Ready to automate?</h2>
             <div className="flex justify-center gap-4">
                <Button variant="glow" size="lg">Contact Us</Button>
             </div>
        </div>
      </section>

      <footer className="py-12 bg-black border-t border-white/10 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-white tracking-tighter">INFONAUT.</span>
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Infonaut LTD.</p>
          </div>
          <div className="flex gap-8 text-sm text-gray-500 font-medium">
             <Button variant="ghost" size="sm">Twitter</Button>
             <Button variant="ghost" size="sm">LinkedIn</Button>
          </div>
        </div>
      </footer>
    </main>
  );
}