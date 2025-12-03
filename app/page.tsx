"use client";

import { useScrollObserver } from "@/lib/useScrollObserver";
import { useAdvancedScrollObserver } from "@/lib/useAdvancedScroll";
import { Navbar } from "@/components/organisms/navbar";
import { BentoGrid, BentoCard } from "@/components/molecules/bentogrid";
import { Button } from "@/components/atoms/button";
import { LogoCloud } from "@/components/organisms/logocloud";
import { FeatureSection } from "@/components/organisms/featuresection";
import { FAQ } from "@/components/organisms/faq";
import { AdvancedForm } from "@/components/molecules/advancedform";
import { TechIcon } from "@/components/atoms/techicons";
import { Shortcut } from "@/components/atoms/shortcut";
import { ASSETS } from "@/lib/assets";
// FIXED: Added 'Terminal' to this list
import { Zap, Bot, Globe, Cpu, ChevronRight, Star, Command, GitPullRequest, Workflow, ShieldCheck, Twitter, Linkedin, Github, BarChart3, Layers, ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export default function Home() {
  useScrollObserver();
  useAdvancedScrollObserver();
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-brand-purple/30 font-sans page-transition">
      <Navbar />

      {/* --- SECTION 1: THE HERO (Linear Exact Match) --- */}
      <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 px-4 md:px-6 flex flex-col items-center text-center max-w-[1400px] mx-auto min-h-[85vh] md:min-h-[90vh] justify-center border-b border-white/5">
        
        {/* Northern Lights Glow - Enhanced */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[300px] md:h-[500px] bg-brand-purple/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -z-10 animate-float" />
        <div className="absolute top-1/2 right-0 w-[400px] md:w-[600px] h-[250px] md:h-[400px] bg-brand-blue/10 blur-[60px] md:blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="animate-fade-in-up">
            <div className="mb-6 md:mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 md:px-4 py-1.5 md:py-2 text-xs font-semibold text-[#8A8F98] hover:bg-white/[0.08] hover:border-brand-purple/50 smooth-transition cursor-pointer backdrop-blur-lg hover:shadow-[0_0_20px_rgba(94,106,210,0.2)]">
                <span className="flex h-2 w-2 rounded-full bg-brand-purple animate-pulse"></span>
                <span className="hidden sm:inline">Infonaut R&D Release 2.0</span>
                <span className="sm:hidden">R&D Release 2.0</span>
                <span className="w-px h-3 bg-white/10 mx-1"></span>
                <span className="text-brand-purple font-bold text-xs">Read Manifesto</span>
                <ChevronRight className="h-3 w-3 text-[#8A8F98] group-hover:translate-x-1 smooth-transition" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white mb-6 md:mb-8 leading-[1.0] max-w-7xl mx-auto">
            We build <br />
            <span className="text-transparent bg-clip-text bg-gradient-premium animate-pulse-slow">autonomous companies</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#8A8F98] max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed font-medium hover:text-white smooth-transition px-2">
            Infonaut is an AI venture studio. We design, build, and scale autonomous companies powered by AI agents. Meet our portfolio: GroX, Xgent, and more coming next quarter.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center stagger px-4">
                <Button size="lg" variant="glow" className="h-12 px-6 md:px-8 text-sm md:text-base font-bold shadow-[0_0_50px_rgba(94,106,210,0.6)] w-full sm:w-auto">Partner With Us</Button>
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-[#8A8F98] font-semibold px-4 py-2 rounded-full hover:text-white smooth-transition hover:bg-white/5 group cursor-pointer border border-white/10 hover:border-brand-purple/50 w-full sm:w-auto justify-center">
                    <Shortcut keys={['C']} /> <span>to copy manifesto</span>
                </div>
            </div>
        </div>

        {/* Hero Image (The "App" Shot) - Linear Style with Parallax */}
        <div className="mt-16 md:mt-24 relative w-full max-w-6xl animate-fade-in-up delay-300 group px-4 md:px-0">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-blue/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 smooth-transition -z-10" />
            <div className="rounded-2xl border border-white/10 bg-black/50 p-2 md:p-3 backdrop-blur-xl shadow-2xl hover:shadow-[0_0_60px_rgba(94,106,210,0.4)] smooth-transition group-hover:border-brand-purple/30 group-hover:bg-black/30">
                <img src={ASSETS.ventures.xgent} alt="App Interface" className="w-full h-auto rounded-lg opacity-100 border border-white/5 shadow-2xl group-hover:scale-105 smooth-transition" />
            </div>
            <div className="absolute -bottom-20 left-0 w-full h-[200px] md:h-[300px] bg-gradient-to-t from-black via-black to-transparent z-10" />
        </div>
      </section>

      {/* --- SECTION 2: SOCIAL PROOF --- */}
      <div className="border-b border-white/5 bg-black">
         <LogoCloud />
      </div>

      {/* --- SECTION 3: THE "METHOD" (Venture Studio Approach) --- */}
      <section className="py-32 px-6 max-w-[1200px] mx-auto text-center scroll-fade-in">
         <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">The Infonaut Approach</h2>
         <p className="text-xl text-[#8A8F98] max-w-3xl mx-auto leading-relaxed font-medium hover:text-white/80 smooth-transition">
            We don't just build software. We build autonomous companies from the ground up.
            Each portfolio company is designed to operate independently, powered by AI agents,
            and scaled to profitability through our venture studio model.
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
            <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                <div>
                    <h3 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight scroll-fade-in">Engineered for Velocity</h3>
                    <p className="text-lg text-[#8A8F98] max-w-xl leading-relaxed font-medium scroll-fade-in delay-100">We don't build wrappers. We build infrastructure. Our entire stack is designed for sub-millisecond latency and enterprise-grade security.</p>
                </div>
                <Button variant="outline-hover" className="text-brand-purple hover:text-white smooth-transition mt-8 md:mt-0">
                  View Documentation <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
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
                    <div key={i} className="p-8 rounded-2xl bg-black border border-white/10 hover:border-brand-purple/40 smooth-transition group hover:bg-white/[0.03] hover:shadow-[0_0_30px_rgba(94,106,210,0.15)] scale-in delay-0">
                        <div className="p-2 bg-brand-purple/10 rounded-lg w-fit mb-6 group-hover:bg-brand-purple/20 smooth-transition">
                            <item.icon className="h-6 w-6 text-brand-purple group-hover:text-white smooth-transition" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-blue smooth-transition">{item.title}</h4>
                        <p className="text-sm text-[#8A8F98] leading-relaxed group-hover:text-white/70 smooth-transition">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- SECTION 8: THE ECOSYSTEM (Bento Grid) --- */}
      <section id="ventures" className="py-32 px-6 max-w-[1400px] mx-auto border-t border-white/5">
        <div className="mb-20 scroll-fade-in">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">The Constellation</h2>
            <p className="text-lg text-[#8A8F98] font-medium">Our suite of specialized AI products, designed for the modern venture.</p>
        </div>
        
        <BentoGrid className="lg:grid-rows-3">
          <BentoCard
            Icon={Zap}
            name="GroX"
            description="The AI Growth Engine. Automate outbound, enrich leads, and scale without the grind."
            href="#grox"
            cta="View Engine"
            className="lg:col-span-2 lg:row-span-2"
          />
          <BentoCard
            Icon={Bot}
            name="Xgent"
            description="Your 24/7 autonomous employee. Handles complex workflows, performs actions, executes strategies."
            href="#xgent"
            cta="Meet the Agents"
            className="lg:col-span-1 lg:row-span-2"
          />
          <BentoCard
            Icon={Star}
            name="LetsRewise"
            description="Gamified Intelligence. Master any exam with AI-generated skill trees."
            href="#letsrewise"
            cta="Start Learning"
            className="lg:col-span-1 lg:row-span-1"
          />
          <BentoCard
            Icon={Cpu}
            name="a11ygent"
            description="Autonomous Accessibility Fixer. Turns GitHub repos WCAG compliant automatically."
            href="#a11ygent"
            cta="View Demo"
            className="lg:col-span-1 lg:row-span-1"
          />
          <BentoCard
            Icon={Globe}
            name="Farewills"
            description="AI-powered estate planning. Make your last wishes known and protected."
            href="#farewills"
            cta="Learn More"
            className="lg:col-span-1 lg:row-span-1"
          />
          <BentoCard
            Icon={Terminal}
            name="superflash.dev"
            description="Dev tools for velocity. Build AI-native apps in minutes."
            href="#superflash"
            cta="Start Building"
            className="lg:col-span-1 lg:row-span-1"
          />
        </BentoGrid>
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

      {/* --- SECTION 12: RESEARCH & DEVELOPMENT --- */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Research & Development</h2>
            <p className="text-lg text-[#8A8F98]">At the intersection of AI innovation and product development.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-white/10 bg-black p-8 hover:border-brand-purple/50 transition-all">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Foundation Models</h3>
              <p className="text-[#8A8F98] mb-4">We fine-tune cutting-edge LLMs for domain-specific tasks in growth, operations, and accessibility.</p>
              <a href="#" className="text-brand-purple hover:text-white transition-colors text-sm font-semibold">Explore our models →</a>
            </div>
            <div className="rounded-xl border border-white/10 bg-black p-8 hover:border-brand-purple/50 transition-all">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Multi-Agent Frameworks</h3>
              <p className="text-[#8A8F98] mb-4">Proprietary orchestration layer enabling autonomous agents to collaborate and solve complex workflows.</p>
              <a href="#" className="text-brand-purple hover:text-white transition-colors text-sm font-semibold">Read the whitepaper →</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 13: DEPLOYMENT INFRASTRUCTURE --- */}
      <section className="py-32 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Deployment Infrastructure</h2>
            <p className="text-lg text-[#8A8F98]">Global edge networks optimized for sub-millisecond latency.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "6 Continents", desc: "Deployed across 6 continents for zero-latency access" },
              { title: "99.99% Uptime", desc: "Enterprise SLA with automatic failover and redundancy" },
              { title: "Real-time Sync", desc: "Sub-millisecond data propagation across all regions" },
              { title: "Zero Trust Security", desc: "End-to-end encryption with per-tenant isolation" },
              { title: "DDoS Protection", desc: "Cloudflare + AWS Shield for enterprise protection" },
              { title: "Compliance Ready", desc: "SOC2, GDPR, HIPAA ready infrastructure" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black p-6 hover:bg-white/[0.02] transition-all">
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-[#8A8F98]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 14: INTEGRATION ECOSYSTEM --- */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Integration Ecosystem</h2>
            <p className="text-lg text-[#8A8F98]">Connect to 500+ tools and platforms with our API-first architecture.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Slack", "Linear", "GitHub", "Notion", "Airtable", "Zapier", "HubSpot", "Salesforce", "OpenAI", "Anthropic", "Stripe", "Retool"].map((tool) => (
              <div key={tool} className="rounded-lg border border-white/10 bg-black p-4 text-center hover:border-brand-purple/50 transition-all cursor-pointer">
                <p className="text-sm font-semibold text-white">{tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 15: BENCHMARKS & METRICS --- */}
      <section className="py-32 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Performance Benchmarks</h2>
            <p className="text-lg text-[#8A8F98]">Independently verified metrics across all products.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-purple mb-2">94%</div>
              <p className="text-[#8A8F98]">Average task completion rate across all agents</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-blue mb-2">2.3x</div>
              <p className="text-[#8A8F98]">Revenue growth for GroX customers (avg)</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-purple mb-2">45ms</div>
              <p className="text-[#8A8F98]">P99 latency for agent workflows globally</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 16: RESEARCH PAPERS & PUBLICATIONS --- */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Research Publications</h2>
            <p className="text-lg text-[#8A8F98]">Advancing the frontier of autonomous agents and AI infrastructure.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Agentic Orchestration: Beyond Function Calling", date: "Nov 2025", venue: "ICLR 2025" },
              { title: "Enterprise-Grade RAG at Scale", date: "Oct 2025", venue: "NeurIPS Workshop" },
              { title: "Fine-tuning for Real-world Alignment", date: "Sep 2025", venue: "ACL 2025" },
              { title: "Multi-Agent Security & Isolation", date: "Aug 2025", venue: "IEEE Security" },
            ].map((paper, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black p-8 hover:border-brand-purple/50 transition-all">
                <h3 className="text-lg font-bold text-white mb-2">{paper.title}</h3>
                <p className="text-sm text-[#8A8F98] mb-4">{paper.venue}</p>
                <p className="text-xs text-[#8A8F98]">{paper.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 17: TEAM & ADVISORS --- */}
      <section className="py-32 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Team & Advisors</h2>
            <p className="text-lg text-[#8A8F98]">Built by former leaders from OpenAI, Anthropic, and Y Combinator.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Founder & CEO", title: "Ex-OpenAI" },
              { name: "CTO, Agents", title: "Ex-Anthropic" },
              { name: "VP Products", title: "Ex-Linear" },
              { name: "VP Research", title: "PhD, ML" },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-brand-purple to-brand-blue mx-auto mb-4" />
                <h4 className="font-bold text-white">{member.name}</h4>
                <p className="text-sm text-[#8A8F98]">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 18: ROADMAP & VISION --- */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Studio Roadmap</h2>
            <p className="text-lg text-[#8A8F98]">Portfolio companies and platform evolution for next 24 months.</p>
          </div>
          
          <div className="space-y-8">
            {[
              { quarter: "Q1 2026", items: ["Launch 3rd portfolio company", "GroX Series A funding", "Xgent enterprise suite release"] },
              { quarter: "Q2 2026", items: ["Infonaut AI Platform beta", "Venture fund announcement", "2nd exits/acquisitions"] },
              { quarter: "Q3 2026", items: ["Infonaut Academy launch", "4th portfolio company", "Strategic partnerships"] },
              { quarter: "Q4 2026", items: ["IPO preparation", "10+ portfolio companies", "Global expansion"] },
            ].map((roadmap, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black p-8 hover:border-brand-purple/50 transition-all">
                <h3 className="text-xl font-bold text-brand-purple mb-4">{roadmap.quarter}</h3>
                <ul className="space-y-2">
                  {roadmap.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-[#8A8F98]">
                      <div className="h-2 w-2 rounded-full bg-brand-purple" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 19: COMMUNITY & EVENTS --- */}
      <section className="py-32 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Community & Events</h2>
            <p className="text-lg text-[#8A8F98]">Join 10,000+ builders, researchers, and entrepreneurs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-white/10 bg-black p-8 hover:border-brand-purple/50 transition-all">
              <h3 className="text-2xl font-bold text-white mb-3">Monthly Workshops</h3>
              <p className="text-[#8A8F98] mb-6">Learn best practices from practitioners building with autonomous agents.</p>
              <Button variant="outline" size="sm">Register</Button>
            </div>
            <div className="rounded-xl border border-white/10 bg-black p-8 hover:border-brand-purple/50 transition-all">
              <h3 className="text-2xl font-bold text-white mb-3">Discord Community</h3>
              <p className="text-[#8A8F98] mb-6">Real-time support, product feedback, and exclusive announcements.</p>
              <Button variant="outline" size="sm">Join</Button>
            </div>
            <div className="rounded-xl border border-white/10 bg-black p-8 hover:border-brand-purple/50 transition-all">
              <h3 className="text-2xl font-bold text-white mb-3">Annual Conference</h3>
              <p className="text-[#8A8F98] mb-6">Network with industry leaders and showcase your work at AgentoConf.</p>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 20: PARTNERSHIP PROGRAM --- */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Partnership Program</h2>
            <p className="text-lg text-[#8A8F98]">Build with us and reach thousands of users globally.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Integrations", desc: "Build plugins and extend Infonaut products" },
              { name: "Resellers", desc: "Distribute and customize for your enterprise clients" },
              { name: "Research", desc: "Collaborate on cutting-edge AI research projects" },
            ].map((partner, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black p-8 hover:border-brand-purple/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">{partner.name}</h3>
                <p className="text-[#8A8F98] mb-6">{partner.desc}</p>
                <a href="#" className="text-brand-purple hover:text-white transition-colors text-sm font-semibold">Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT FORM SECTION --- */}
      <section className="py-24 md:py-40 px-4 md:px-6 border-t border-white/5 scroll-fade-in">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tighter">Partner With Infonaut</h2>
            <p className="text-base md:text-lg text-[#8A8F98] leading-relaxed">Interested in investing, building with us, or joining as a founder? Let's talk about building the next generation of autonomous companies.</p>
          </div>
          
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-xl hover:bg-white/[0.05] hover:border-brand-purple/30 smooth-transition">
            <AdvancedForm />
          </div>
        </div>
      </section>

      {/* --- FINAL CTA BEFORE FOOTER --- */}
      <section className="py-24 md:py-40 px-4 md:px-6 text-center border-t border-white/10 relative overflow-hidden scroll-fade-in">
        {/* Gradient background glow - Enhanced */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[250px] md:h-[400px] bg-brand-purple/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -z-10 animate-float" />
        <div className="absolute top-0 right-1/4 w-[300px] md:w-[500px] h-[200px] md:h-[300px] bg-brand-blue/15 blur-[60px] md:blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto relative z-10">
             <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-tight">We're Building Next</h2>
             <p className="text-base md:text-xl text-[#8A8F98] mb-8 md:mb-12 leading-relaxed font-medium max-w-2xl mx-auto px-2">Q1 2026: Launching our 3rd portfolio company. We're looking for visionary founders and strategic partners to join us.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 stagger px-4">
                <Button variant="glow" size="lg" className="h-12 md:h-14 px-6 md:px-10 text-sm md:text-lg font-bold shadow-[0_0_60px_rgba(94,106,210,0.6)] w-full sm:w-auto">Apply as Founder</Button>
                <Button variant="outline-hover" size="lg" className="h-12 md:h-14 px-6 md:px-10 text-sm md:text-lg font-semibold w-full sm:w-auto">Invest in Infonaut</Button>
             </div>
        </div>
      </section>

      <footer className="py-16 md:py-24 bg-black border-t border-white/5 text-[#8A8F98] px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
            {/* Brand Column */}
            <div className="mb-12 md:mb-16 max-w-md hover:text-white/80 smooth-transition">
                <span className="text-base md:text-lg font-black text-white tracking-tighter block mb-4">INFONAUT.</span>
                <p className="text-xs md:text-sm mb-6 leading-relaxed font-medium">Infonaut is a UK-based AI Venture Studio building the automated economy through autonomous agents and intelligent systems.</p>
                <div className="flex gap-4 md:gap-5">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer smooth-transition hover:scale-125 p-2 hover:bg-brand-purple/10 rounded-lg">
                      <Twitter className="h-4 md:h-5 w-4 md:w-5" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer smooth-transition hover:scale-125 p-2 hover:bg-brand-purple/10 rounded-lg">
                      <Github className="h-4 md:h-5 w-4 md:w-5" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer smooth-transition hover:scale-125 p-2 hover:bg-brand-purple/10 rounded-lg">
                      <Linkedin className="h-4 md:h-5 w-4 md:w-5" />
                    </a>
                </div>
            </div>
        
            <div className="pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs gap-3 md:gap-4 font-medium text-center">
                <p>&copy; {new Date().getFullYear()} Infonaut LTD. All rights reserved.</p>
                <p className="text-center">Designed in London. Deployed globally.</p>
            </div>
        </div>
      </footer>
    </main>
  );
}