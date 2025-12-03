"use client";

import { Navbar } from "@/components/organisms/navbar";
import { BentoCard } from "@/components/molecules/bentocard";
import { Button } from "@/components/atoms/button";
import { LogoCloud } from "@/components/organisms/logocloud";
import { FeatureSection } from "@/components/organisms/featuresection";
import { FAQ } from "@/components/organisms/faq";
import { TechIcon } from "@/components/atoms/techicons";
import { Shortcut } from "@/components/atoms/shortcut";
import { ASSETS } from "@/lib/assets";
// FIXED: Added 'Terminal' to this list
import { Zap, Bot, Globe, Cpu, ChevronRight, Star, Command, GitPullRequest, Workflow, ShieldCheck, Twitter, Linkedin, Github, BarChart3, Layers, ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-brand-purple/30 font-sans">
      <Navbar />

      {/* --- SECTION 1: THE HERO (Linear Exact Match) --- */}
      <section className="relative pt-40 pb-32 px-6 flex flex-col items-center text-center max-w-[1400px] mx-auto min-h-[90vh] justify-center border-b border-white/5">
        
        {/* Northern Lights Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="animate-fade-in-up">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-400 hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-brand-purple animate-pulse"></span>
                Infonaut R&D Release 2.0
                <span className="w-px h-3 bg-white/10 mx-1"></span>
                <span className="text-brand-purple">Read the Manifesto</span>
                <ChevronRight className="h-3 w-3 text-gray-500" />
            </div>

            <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-tighter text-white mb-8 leading-[1.05] max-w-5xl mx-auto">
            Infonaut is a purpose-built engine for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-white to-brand-blue">automating the economy.</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#8A8F98] max-w-2xl mx-auto mb-12 leading-relaxed">
            Meet the new standard for modern venture building. Streamline growth, 
            deploy autonomous agents, and execute strategy at the speed of AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Button size="lg" variant="glow" className="h-12 px-8 text-base shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]">Start Building</Button>
                <div className="flex items-center gap-3 text-sm text-[#8A8F98] font-medium px-4 hover:text-white transition-colors cursor-pointer">
                    <Shortcut keys={['C']} /> <span>to copy manifest</span>
                </div>
            </div>
        </div>

        {/* Hero Image (The "App" Shot) - Linear Style Tilt */}
        <div className="mt-24 relative w-full max-w-6xl animate-fade-in-up delay-200 perspective-[2000px]">
            <div className="rounded-xl border border-white/10 bg-black/50 p-2 backdrop-blur-sm shadow-2xl transform rotate-x-12 hover:rotate-x-0 transition-transform duration-1000">
                <img src={ASSETS.ventures.xgent} alt="App Interface" className="w-full h-auto rounded-lg opacity-100 border border-white/5 shadow-2xl" />
            </div>
            <div className="absolute -bottom-20 left-0 w-full h-[300px] bg-gradient-to-t from-black via-black to-transparent z-10" />
        </div>
      </section>

      {/* --- SECTION 2: SOCIAL PROOF --- */}
      <div className="border-b border-white/5 bg-black">
         <LogoCloud />
      </div>

      {/* --- SECTION 3: THE "METHOD" (Philosophy) --- */}
      <section className="py-32 px-6 max-w-[1200px] mx-auto text-center">
         <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">The Infonaut Method</h2>
         <p className="text-xl text-[#8A8F98] max-w-3xl mx-auto leading-relaxed">
            Most companies hire humans to do robot work. We build robots to do human work.
            Our "Venture Studio" model allows us to deploy specialized AI agents across 
            marketing, legal, and engineering verticals simultaneously.
         </p>
      </section>

      {/* --- SECTION 4, 5, 6: THE DEEP DIVES (Zig Zag) --- */}
      <div className="relative border-t border-white/5">
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden xl:block left-1/4" />
        
        <FeatureSection 
            align="left"
            badge="Growth Intelligence"
            title="GroX: Scale without the grind."
            description="GroX isn't just an auto-poster. It's a sentient growth engine that analyzes viral hooks, engages with high-value accounts, and converts followers into leads automatically."
            image={ASSETS.ventures.grox}
            features={["Sentiment Analysis", "Viral Hook Generator", "Auto-DM Workflows", "Audience Clustering"]}
            gradient="purple"
        />

        <FeatureSection 
            align="right"
            badge="Autonomous Workforce"
            title="Xgent: The 24/7 Employee."
            description="Xgent deploys autonomous agents into your Slack, CRM, and Email. They don't just chat; they perform actions. From finding leads to closing deals, Xgent handles the grunt work."
            image={ASSETS.ventures.xgent}
            features={["Multi-Modal Execution", "Enterprise Security", "Slack Integration", "Self-Healing Workflows"]}
            gradient="blue"
        />

        <FeatureSection 
            align="left"
            badge="Enterprise Strategy"
            title="Leancraft: Strategy as Code."
            description="Leancraft democratizes elite management consulting. We use AI to analyze your business bottlenecks and implement the exact systems used by Uber and Airbnb to scale."
            image={ASSETS.ventures.leancraft}
            features={["Operational Audit", "AI Implementation", "Team Training", "Metric Tracking"]}
            gradient="pink"
        />
      </div>

      {/* --- SECTION 7: THE "INSIGHTS" GRID (Linear Feature Wall) --- */}
      <section className="py-32 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                    <h3 className="text-4xl font-bold text-white mb-4">Engineered for Velocity</h3>
                    <p className="text-[#8A8F98] max-w-xl">We don't build wrappers. We build infrastructure. Our entire stack is designed for sub-millisecond latency and enterprise-grade security.</p>
                </div>
                <Button variant="ghost" className="text-brand-purple hover:text-white">View Documentation <ArrowRight className="ml-2 h-4 w-4"/></Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                {[
                    { icon: Command, title: "Keyboard First", desc: "Navigate the entire ecosystem without touching your mouse. Speed is a feature." },
                    { icon: GitPullRequest, title: "Git Integration", desc: "Syncs directly with your existing engineering workflows. Push to deploy." },
                    { icon: ShieldCheck, title: "SOC2 Security", desc: "Enterprise-grade encryption and data isolation by default. Your data is yours." },
                    { icon: Workflow, title: "Custom Workflows", desc: "Build your own autonomous agents using our visual builder. No code required." },
                    { icon: Zap, title: "Real-time Sync", desc: "Data propagates instantly across your entire venture ecosystem using our custom sync engine." },
                    { icon: Globe, title: "Global Edge", desc: "Deployed on the edge for sub-millisecond latency worldwide." },
                    { icon: BarChart3, title: "Deep Analytics", desc: "Granular insights into agent performance and ROI tracking." },
                    { icon: Layers, title: "Multi-Tenant", desc: "Manage multiple organizations and workspaces from a single dashboard." },
                    { icon: Terminal, title: "API First", desc: "Everything you see in the dashboard is available via our GraphQL API." },
                ].map((item, i) => (
                    <div key={i} className="p-8 rounded-xl bg-black border border-white/10 hover:border-brand-purple/50 transition-all group hover:bg-white/[0.02]">
                        <item.icon className="h-8 w-8 text-[#8A8F98] group-hover:text-white mb-6 transition-colors" />
                        <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
                        <p className="text-sm text-[#8A8F98] leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- SECTION 8: THE ECOSYSTEM (Bento Grid) --- */}
      <section id="ventures" className="py-32 px-6 max-w-[1400px] mx-auto border-t border-white/5">
        <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">The Constellation</h2>
            <p className="text-xl text-[#8A8F98] max-w-2xl mx-auto">Explore our suite of specialized AI products.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[32rem]">
            {/* Superflash */}
            <BentoCard className="md:col-span-1" title="superflash.dev" description="Flashpoint Architecture for instant web builds." href="#superflash" cta="Start Building" icon={Cpu} gradient="gray">
                 <div className="absolute inset-0 top-32 px-4 pointer-events-none"><img src={ASSETS.ventures.superflash} alt="Superflash" className="rounded-t-xl border border-white/10 opacity-90 object-cover w-full h-full shadow-2xl" /></div>
            </BentoCard>
            {/* LetsRewise */}
            <BentoCard className="md:col-span-2" title="LetsRewise" description="Gamified Intelligence. Master any exam with AI skill trees." href="#letsrewise" cta="Start Learning" icon={Star} gradient="teal">
               <div className="absolute right-0 top-0 w-3/4 h-full pointer-events-none"><img src={ASSETS.ventures.letsrewise} alt="LetsRewise" className="rounded-l-xl border-l border-white/10 opacity-90 shadow-2xl object-cover w-full h-full" /></div>
            </BentoCard>
            {/* a11ygent */}
            <BentoCard className="md:col-span-2" title="a11ygent" description="Autonomous Accessibility Fixer. Turns github repos compliant automatically." href="#a11ygent" cta="View Demo" icon={Cpu} gradient="green">
               <div className="absolute right-0 bottom-0 w-3/4 h-3/4 pointer-events-none translate-x-8 translate-y-8"><img src={ASSETS.ventures.a11ygent} alt="a11ygent" className="rounded-tl-2xl border border-white/10 opacity-90 object-cover w-full h-full shadow-2xl" /></div>
            </BentoCard>
            {/* Farewills */}
            <BentoCard className="md:col-span-1" title="Farewills" description="AI Estate Planning." href="#farewills" cta="Learn More" icon={Globe} gradient="gray">
               <div className="absolute inset-0 top-32 px-4 pointer-events-none"><img src={ASSETS.ventures.farewills} alt="Farewills" className="rounded-t-xl border border-white/10 opacity-90 object-cover w-full h-full shadow-2xl" /></div>
            </BentoCard>
        </div>
      </section>

      {/* --- SECTION 9: THE QUOTE (Founder) --- */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-1 rounded-full border border-white/10 bg-white/5 mb-8">
                {/* UNCOMMENT FOR REAL PHOTO: <img src={ASSETS.team.founder} alt="Founder" className="h-16 w-16 rounded-full grayscale hover:grayscale-0 transition-all" /> */}
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-purple to-brand-blue" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
                "We don't just build software. We build the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue">autonomous workforce</span> of tomorrow."
            </h2>
            <div className="text-[#8A8F98] font-medium">
                Founder Name — CEO, Infonaut LTD
            </div>
        </div>
      </section>

      {/* --- SECTION 10: FAQ --- */}
      <div className="border-t border-white/5">
        <FAQ />
      </div>

      {/* --- SECTION 11: BIG CTA (Linear Style) --- */}
      <section className="py-40 px-6 text-center border-t border-white/10 bg-[url('https://linear.app/_next/static/media/hero-background.6e3c0c9e.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/80" /> {/* Overlay to darken background */}
        <div className="max-w-3xl mx-auto relative z-10">
             <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">Ready to automate?</h2>
             <p className="text-xl text-[#8A8F98] mb-12">Join the waiting list for our next cohort of partners. We are onboarding 5 companies per week.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="glow" size="lg" className="h-14 px-10 text-lg">Get Early Access</Button>
                <Button variant="outline" size="lg" className="h-14 px-10 text-lg hover:bg-white/10">Contact Sales</Button>
             </div>
        </div>
      </section>

      {/* --- MEGA FOOTER (Linear Style) --- */}
      <footer className="py-20 bg-black border-t border-white/10 text-sm text-[#8A8F98]">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-12">
            
            {/* Brand Column */}
            <div className="col-span-2">
                <span className="text-lg font-bold text-white tracking-tighter block mb-4">INFONAUT.</span>
                <p className="mb-6 max-w-xs">Infonaut is a UK-based AI Venture Studio building the automated economy.</p>
                <div className="flex gap-4">
                    <Twitter className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                    <Github className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                    <Linkedin className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                </div>
            </div>

            {/* Links Columns */}
            <div>
                <h4 className="font-bold text-white mb-6">Product</h4>
                <ul className="space-y-4">
                    <li><Link href="#grox" className="hover:text-white transition-colors">GroX</Link></li>
                    <li><Link href="#xgent" className="hover:text-white transition-colors">Xgent</Link></li>
                    <li><Link href="#a11ygent" className="hover:text-white transition-colors">a11ygent</Link></li>
                    <li><Link href="#superflash" className="hover:text-white transition-colors">superflash.dev</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white mb-6">Services</h4>
                <ul className="space-y-4">
                    <li><Link href="https://leancraft.org" className="hover:text-white transition-colors">Leancraft</Link></li>
                    <li><Link href="#farewills" className="hover:text-white transition-colors">Farewills</Link></li>
                    <li><Link href="#letsrewise" className="hover:text-white transition-colors">LetsRewise</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white mb-6">Company</h4>
                <ul className="space-y-4">
                    <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                    <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                    <li><Link href="/manifesto" className="hover:text-white transition-colors">Manifesto</Link></li>
                    <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white mb-6">Legal</h4>
                <ul className="space-y-4">
                    <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                    <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                    <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                </ul>
            </div>

        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Infonaut LTD. All rights reserved.</p>
            <p>Designed in London. Deployed globally.</p>
        </div>
      </footer>
    </main>
  );
}