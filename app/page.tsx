"use client";

import { useScrollObserver } from "@/lib/useScrollObserver";
import { useAdvancedScrollObserver } from "@/lib/useAdvancedScroll";
import usePageData from '@/lib/usePageData';
import PageRenderer from '@/components/PageRenderer';
import { Navbar } from "@/components/organisms/navbar";
import { BentoGrid, BentoCard } from "@/components/molecules/bentogrid";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { LogoCloud } from "@/components/organisms/logocloud";
import { ValueProp } from "@/components/organisms/valueprop";
import { FeatureSection } from "@/components/organisms/featuresection";
import { FAQ } from "@/components/organisms/faq";
import { PricingTable } from "@/components/organisms/pricing";
import { ComparisonTable } from "@/components/organisms/comparison";
import { TiltCard } from "@/components/molecules/tiltcard";
import { InteractiveHero } from "@/components/molecules/interactivehero";
import { Marquee } from "@/components/molecules/marquee";
import { AccordionItem } from "@/components/molecules/accordionitem";

import { TechIcon } from "@/components/atoms/techicons";
import { Shortcut } from "@/components/atoms/shortcut";
import { ASSETS } from "@/lib/assets";
import { 
  Zap, Bot, Globe, Cpu, ChevronRight, Star, Command, GitPullRequest, 
  Workflow, ShieldCheck, Twitter, Linkedin, Github, BarChart3, Layers, 
  ArrowRight, Terminal, Check, X, Users, Rocket, Code, Palette, 
  Lock, TrendingUp, Award, MessageCircle, Mail, Phone
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  useScrollObserver();
  useAdvancedScrollObserver();
  const { data } = usePageData();
  const dynamicBlocks = data?.home?.blocks;
  
  if (dynamicBlocks && Array.isArray(dynamicBlocks) && dynamicBlocks.length > 0) {
    return (
      <main className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20 font-sans">
        <Navbar />
        <PageRenderer blocks={dynamicBlocks} />
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20 font-sans">
      <Navbar />

      {/* ========== SECTION 1: INTERACTIVE HERO ========== */}
      <section className="relative overflow-hidden pt-32 md:pt-48 pb-24 md:pb-32 px-4 md:px-8 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Badge className="mb-6">Free • Open Source • Production Ready</Badge>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Build Beautiful Websites
            <br />
            <span className="text-white/60">In Minutes, Not Months</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            A complete website template with 20+ components, visual editing, and free hosting. 
            Fork, customize, and deploy your site in under 5 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 min-w-[180px]">
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 min-w-[180px]">
              Live Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Components", value: "20+" },
              { label: "Deploy Time", value: "<5min" },
              { label: "Monthly Cost", value: "$0" },
              { label: "Page Speed", value: "100" }
            ].map((stat, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: LOGO CLOUD ========== */}
      <section className="py-16 border-b border-white/5 bg-white/[0.02]">
        <LogoCloud />
      </section>

      {/* ========== SECTION 3: VALUE PROPOSITION ========== */}
      <section className="py-24 md:py-32 border-b border-white/5">
        <ValueProp />
      </section>

      {/* ========== SECTION 4: BENTO GRID SHOWCASE ========== */}
      <section className="py-24 md:py-32 px-6 max-w-[1400px] mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <Badge className="mb-4">Component Showcase</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Everything You Need
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Pre-built sections and components ready to use. Just copy, paste, and customize.
          </p>
        </div>

        <BentoGrid className="lg:grid-rows-3">
          <BentoCard
            Icon={Palette}
            name="Design System"
            description="Complete design tokens with Tailwind CSS. Customizable colors, typography, and spacing."
            href="#design"
            cta="View Tokens"
            className="lg:col-span-2 lg:row-span-2"
          />
          <BentoCard
            Icon={Code}
            name="20+ Components"
            description="Atoms, molecules, and organisms. All TypeScript with full type safety."
            href="#components"
            cta="Browse Components"
            className="lg:col-span-1 lg:row-span-2"
          />
          <BentoCard
            Icon={Zap}
            name="Lightning Fast"
            description="Built on Next.js 15 with automatic optimization and code splitting."
            href="#performance"
            cta="See Metrics"
            className="lg:col-span-1 lg:row-span-1"
          />
          <BentoCard
            Icon={Lock}
            name="Secure by Default"
            description="GitHub OAuth, HTTPS, and SOC2-ready infrastructure included."
            href="#security"
            cta="Learn More"
            className="lg:col-span-1 lg:row-span-1"
          />
          <BentoCard
            Icon={Globe}
            name="Global CDN"
            description="Deploy to Cloudflare's edge network in 300+ cities worldwide."
            href="#hosting"
            cta="View Coverage"
            className="lg:col-span-1 lg:row-span-1"
          />
        </BentoGrid>
      </section>

      {/* === SECTION 1: HERO === */}
      <section className="relative overflow-hidden pt-20 md:pt-48 pb-24 md:pb-48 px-4 md:px-8 flex flex-col items-center text-center max-w-full mx-auto min-h-screen md:min-h-[100vh] justify-center border-b border-white/5">
        
        {/* Minimal background */}
        <div className="absolute inset-0 bg-black pointer-events-none -z-20" />
        
        {/* Subtle accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[300px] md:h-[450px] bg-white/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="relative z-10 max-w-5xl mx-auto">
            
            {/* Badge */}
            <div className="mb-8 md:mb-12 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 md:px-6 py-2 text-xs md:text-sm font-medium text-white/70 backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-white" />
                <span>Free • Open Source • Modern Stack</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 md:mb-10 leading-[1.1] tracking-tight">
                <span className="block">Launch Your Website</span>
                <span className="block">In Minutes</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
                A modern, minimal website template built with Next.js, Tailwind CSS, and visual editing. Fork, customize, and deploy to Cloudflare Pages—completely free.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
                {[
                    { label: "Components", value: "20+" },
                    { label: "Build Time", value: "<5 min" },
                    { label: "Cost", value: "$0" },
                    { label: "Lines of Code", value: "1000+" }
                ].map((stat, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-xs md:text-sm text-white/50 uppercase tracking-wide">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16 md:mb-24">
                <Link href="https://github.com/yourusername/sitewise-template" className="w-full sm:w-auto">
                    <Button size="lg" className="h-12 md:h-14 px-8 md:px-10 text-base md:text-lg font-semibold w-full sm:w-auto bg-white text-black hover:bg-white/90">
                        View on GitHub
                    </Button>
                </Link>
                
                <Link href="#features" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 text-base md:text-lg font-semibold rounded-lg border border-white/20 bg-transparent hover:bg-white/5 transition-all text-white">
                        Explore Features
                    </button>
                </Link>
            </div>
        </div>

        {/* Preview Image */}
        <div className="relative w-full max-w-5xl mx-auto mt-16 md:mt-24">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center">
                    <p className="text-white/40 text-sm">Your website preview here</p>
                </div>
            </div>
        </div>
      </section>

      {/* ========== SECTION 5: FEATURE COMPARISON ========== */}
      <section className="py-24 md:py-32 px-6 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Why Choose This Template</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Better Than Building From Scratch
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Save weeks of development time with our production-ready template
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: "Custom Build",
                time: "4-6 weeks",
                cost: "$8,000+",
                features: ["Design from scratch", "Component library", "Authentication", "Deployment setup"],
                color: "red"
              },
              {
                label: "Page Builders",
                time: "1-2 weeks",
                cost: "$50-200/mo",
                features: ["Limited customization", "Vendor lock-in", "Performance issues", "Monthly fees"],
                color: "yellow"
              },
              {
                label: "This Template",
                time: "<5 minutes",
                cost: "$0",
                features: ["Complete codebase", "Full customization", "Free hosting", "Production ready"],
                color: "green",
                highlighted: true
              }
            ].map((option, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-8 ${
                  option.highlighted
                    ? 'border-white/30 bg-white/10 scale-105'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <h3 className="text-xl font-bold text-white mb-2">{option.label}</h3>
                <div className="text-3xl font-bold text-white mb-1">{option.time}</div>
                <div className="text-white/60 text-sm mb-6">{option.cost}</div>
                <ul className="space-y-3">
                  {option.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/80">
                      {option.highlighted ? (
                        <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-white/20 shrink-0 mt-0.5" />
                      )}
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 6: TECH STACK WITH ICONS ========== */}
      <section className="py-24 md:py-32 px-6 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Modern Stack</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Built With Best-in-Class Tools
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Industry-standard technologies for performance, security, and developer experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Next.js", desc: "React Framework" },
              { name: "TypeScript", desc: "Type Safety" },
              { name: "Tailwind", desc: "Styling" },
              { name: "Vercel", desc: "Deployment" },
              { name: "GitHub", desc: "Version Control" },
              { name: "Cloudflare", desc: "CDN" }
            ].map((tech, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition-all group"
              >
                <div className="h-12 w-12 mx-auto mb-4 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-white mb-1">{tech.name}</h4>
                <p className="text-xs text-white/50">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: FEATURES GRID ========== */}
      <section className="py-24 md:py-32 px-6 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">All Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything Included
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Optimized for Core Web Vitals with 100/100 Lighthouse scores" },
              { icon: Lock, title: "Secure", desc: "GitHub OAuth, HTTPS, and security headers configured" },
              { icon: Globe, title: "Global CDN", desc: "Deployed on Cloudflare edge network for instant loading" },
              { icon: Code, title: "Developer Friendly", desc: "TypeScript, ESLint, and Prettier pre-configured" },
              { icon: Palette, title: "Customizable", desc: "Complete design system with Tailwind CSS variables" },
              { icon: Users, title: "SEO Optimized", desc: "Meta tags, sitemaps, and structured data included" },
              { icon: Rocket, title: "CI/CD Ready", desc: "GitHub Actions for automated testing and deployment" },
              { icon: TrendingUp, title: "Analytics", desc: "Easy integration with Google Analytics or Plausible" },
              { icon: Award, title: "Accessible", desc: "WCAG 2.1 AA compliant with ARIA labels" }
            ].map((feature, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black p-6 hover:bg-white/5 transition-all group">
                <div className="p-2 rounded-lg bg-white/10 w-fit mb-4 group-hover:bg-white/20 transition-all">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32 px-6 max-w-[1200px] mx-auto border-b border-white/5">
         <div className="text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Why Your Website Matters</h2>
           <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              Your website is often the first impression customers have of your business. Make it count.
           </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { 
                    icon: "⚡", 
                    title: "First Impressions", 
                    description: "75% of users judge a company's credibility based on website design. You have 50 milliseconds to make an impression." 
                },
                { 
                    icon: "🔍", 
                    title: "SEO & Discovery", 
                    description: "Google processes 8.5 billion searches daily. A well-optimized website puts you in front of potential customers actively searching for your services." 
                },
                { 
                    icon: "💰", 
                    title: "24/7 Sales Machine", 
                    description: "Your website works while you sleep. It's your most cost-effective sales rep, converting visitors into customers around the clock." 
                }
            ].map((item, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
            ))}
         </div>
      </section>

      {/* ========== SECTION 8: ZIGZAG FEATURE SECTIONS ========== */}
      <section className="border-b border-white/5">
        <FeatureSection
          align="left"
          badge="Visual Editor"
          title="Edit Your Website Visually"
          description="Built-in Puck editor lets you modify content without touching code. Perfect for teams with non-technical members who need to update content quickly."
          image="/assets/editor-preview.png"
          features={["Drag & drop interface", "Real-time preview", "Component library", "Version control"]}
          gradient="purple"
        />

        <FeatureSection
          align="right"
          badge="Component Library"
          title="20+ Pre-Built Components"
          description="From simple buttons to complex pricing tables. All components are accessible, responsive, and fully customizable with our design system."
          image="/assets/components-preview.png"
          features={["Atomic design", "TypeScript types", "Storybook docs", "Dark mode ready"]}
          gradient="blue"
        />

        <FeatureSection
          align="left"
          badge="Free Hosting"
          title="Deploy to Cloudflare Pages"
          description="Free hosting with unlimited bandwidth on Cloudflare's global edge network. Automatic SSL, DDoS protection, and 100% uptime SLA."
          image="/assets/hosting-preview.png"
          features={["300+ global locations", "Automatic SSL", "Free forever", "Custom domains"]}
          gradient="pink"
        />
      </section>

      {/* ========== SECTION 9: PRICING TABLE ========== */}
      <section className="py-24 md:py-32 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4">Simple Pricing</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Free for Everyone
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              This template is 100% free and open source. Use it for personal or commercial projects.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Template",
                price: "$0",
                desc: "Forever",
                features: ["Complete source code", "All 20+ components", "Design system", "Documentation"]
              },
              {
                name: "Hosting",
                price: "$0",
                desc: "On Cloudflare",
                features: ["Unlimited bandwidth", "300+ locations", "Auto SSL", "DDoS protection"],
                highlighted: true
              },
              {
                name: "Support",
                price: "$0",
                desc: "Community",
                features: ["GitHub issues", "Discord community", "Documentation", "Video tutorials"]
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-8 ${
                  plan.highlighted
                    ? 'border-white/30 bg-white/10 scale-105'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-white mb-1">{plan.price}</div>
                <div className="text-white/60 text-sm mb-8">{plan.desc}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/80">
                      <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.highlighted ? "glow" : "outline"}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 10: TILT CARDS SHOWCASE ========== */}
      <section className="py-24 md:py-32 px-6 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Use Cases</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Perfect For Any Project
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Landing Pages", desc: "Launch products with high-converting landing pages", icon: Rocket },
              { title: "Portfolio", desc: "Showcase your work with a professional portfolio site", icon: Award },
              { title: "SaaS Websites", desc: "Build marketing sites for your SaaS products", icon: Code },
              { title: "Agency Sites", desc: "Create stunning agency websites with case studies", icon: Users },
              { title: "E-commerce", desc: "Start selling with product pages and checkouts", icon: TrendingUp },
              { title: "Blogs", desc: "Share your thoughts with a fast, modern blog", icon: MessageCircle }
            ].map((useCase, i) => (
              <TiltCard key={i}>
                <div className="p-8">
                  <div className="p-3 rounded-lg bg-white/10 w-fit mb-4">
                    <useCase.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-white/60 text-sm">{useCase.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 11: TESTIMONIALS/SOCIAL PROOF ========== */}
      <section className="py-24 md:py-32 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Loved by Developers
            </h2>
          </div>

          <Marquee 
            speed="slow"
            items={[
              { quote: "Best template I've used. Saved me weeks of work.", author: "Sarah J.", role: "Frontend Dev" },
              { quote: "Clean code, great documentation. Highly recommended!", author: "Mike T.", role: "Product Manager" },
              { quote: "Finally, a template that doesn't suck. Love it!", author: "Alex K.", role: "Designer" },
              { quote: "Deployed my site in 10 minutes. Incredible DX.", author: "Chris P.", role: "Indie Hacker" },
              { quote: "Worth every penny. Oh wait, it's free!", author: "Emma L.", role: "Startup Founder" }
            ].map((testimonial, i) => (
              <div key={i} className="mx-4 rounded-xl border border-white/10 bg-white/5 p-6 min-w-[350px]">
                <p className="text-white/80 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/10" />
                  <div>
                    <div className="font-semibold text-white text-sm">{testimonial.author}</div>
                    <div className="text-white/50 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          />
        </div>
      </section>
      <section id="features" className="py-24 md:py-32 px-6 max-w-[1400px] mx-auto border-b border-white/5">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Everything You Need</h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">Built with modern technologies and best practices. Ready to deploy in minutes.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { icon: "⚡", title: "Lightning Fast", desc: "Built on Next.js 15 with optimized performance. Sub-second load times out of the box." },
                { icon: "🎨", title: "Visual Editor", desc: "Edit your content visually with Puck. No code required for content updates." },
                { icon: "📱", title: "Fully Responsive", desc: "Looks perfect on any device. Mobile-first design with Tailwind CSS." },
                { icon: "🔒", title: "Secure by Default", desc: "GitHub OAuth authentication. Version control for all changes." },
                { icon: "🌐", title: "Free Hosting", desc: "Deploy to Cloudflare Pages for free. Unlimited bandwidth and requests." },
                { icon: "🎯", title: "SEO Optimized", desc: "Meta tags, sitemaps, and semantic HTML. Rank higher on Google." },
                { icon: "♿", title: "Accessible", desc: "WCAG 2.1 compliant. Screen reader friendly with proper ARIA labels." },
                { icon: "🚀", title: "CI/CD Ready", desc: "GitHub Actions included. Automatic deploys on every commit." },
                { icon: "📊", title: "Analytics Ready", desc: "Easy integration with Google Analytics, Plausible, or any analytics tool." },
            ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* === SECTION 4: TECH STACK === */}
      <section className="py-24 md:py-32 px-6 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-20">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Modern Tech Stack</h3>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">Built with the latest technologies for performance, security, and developer experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { icon: "⚛️", title: "Next.js 15", desc: "React framework with App Router, Server Components, and automatic optimization" },
                    { icon: "🎨", title: "Tailwind CSS", desc: "Utility-first CSS framework for rapid UI development with custom design system" },
                    { icon: "📝", title: "TypeScript", desc: "Type-safe code for better developer experience and fewer bugs in production" },
                    { icon: "✏️", title: "Puck Editor", desc: "Visual page builder for non-technical users to edit content easily" },
                    { icon: "🔐", title: "NextAuth", desc: "Complete authentication solution with GitHub OAuth out of the box" },
                    { icon: "☁️", title: "Cloudflare Pages", desc: "Global CDN with unlimited bandwidth, free SSL, and instant deploys" },
                ].map((item, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-black p-8 hover:bg-white/[0.02] transition-all">
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* ========== SECTION 12: FAQ ========== */}
      <section className="py-24 md:py-32 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <AccordionItem 
                title="Is this really free?" 
                content="Yes! This template is 100% free and open source under the MIT license. Use it for personal or commercial projects without restrictions." 
              />
              <AccordionItem 
                title="Do I need to know React/Next.js?" 
                content="Basic knowledge helps, but our documentation guides you through everything. You can also use the visual editor to make changes without touching code." 
              />
              <AccordionItem 
                title="Can I use this for client projects?" 
                content="Absolutely! You can use this template for any project, including client work, commercial products, or SaaS applications." 
              />
            </div>

            <div className="space-y-3">
              <AccordionItem 
                title="What hosting do you recommend?" 
                content="We recommend Cloudflare Pages (free tier) for its global edge network, automatic SSL, and zero cost. But you can deploy anywhere that supports Next.js." 
              />
              <AccordionItem 
                title="How do I customize the design?" 
                content="Everything is built with Tailwind CSS. Edit the design tokens in lib/designTokens.ts to customize colors, spacing, typography, and more." 
              />
              <AccordionItem 
                title="Do you provide support?" 
                content="Community support is available through GitHub issues and our Discord server. Documentation covers most common scenarios." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 13: PROCESS/TIMELINE ========== */}
      <section className="py-24 md:py-32 px-6 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Launch in 3 Simple Steps
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Fork & Clone",
                desc: "Fork the repository on GitHub and clone it to your local machine. All code is yours to customize.",
                time: "1 minute"
              },
              {
                step: "02",
                title: "Customize Content",
                desc: "Edit the pages using the visual editor or directly in code. Swap out text, images, and components to match your brand.",
                time: "30 minutes"
              },
              {
                step: "03",
                title: "Deploy",
                desc: "Connect your GitHub repo to Cloudflare Pages. Automatic builds on every push. Your site is live globally in seconds.",
                time: "2 minutes"
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="text-6xl font-bold text-white/10 shrink-0">{item.step}</div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <Badge className="text-xs border-white/20">{item.time}</Badge>
                  </div>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="text-sm text-white/50 mb-4">Total time from fork to live site:</div>
            <div className="text-4xl font-bold text-white">~33 minutes</div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 14: STATS/METRICS ========== */}
      <section className="py-24 md:py-32 px-6 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">By the Numbers</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Built for Performance
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: "100", label: "Lighthouse Score", suffix: "/100" },
              { metric: "<1s", label: "Time to Interactive", suffix: "" },
              { metric: "300+", label: "Edge Locations", suffix: "" },
              { metric: "99.99%", label: "Uptime SLA", suffix: "" },
              { metric: "20+", label: "Components", suffix: "" },
              { metric: "100%", label: "TypeScript", suffix: "" },
              { metric: "$0", label: "Monthly Cost", suffix: "" },
              { metric: "∞", label: "Bandwidth", suffix: "" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.metric}<span className="text-white/50 text-2xl">{stat.suffix}</span>
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 15: INTEGRATION SHOWCASE ========== */}
      <section className="py-24 md:py-32 px-6 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Integrations</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Works With Your Stack
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Easily integrate with popular services and tools
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Analytics", tools: ["Google Analytics", "Plausible", "Vercel Analytics"] },
              { name: "CMS", tools: ["Contentful", "Sanity", "Strapi"] },
              { name: "Email", tools: ["Resend", "SendGrid", "Mailgun"] },
              { name: "Auth", tools: ["GitHub OAuth", "Google", "Magic Links"] },
              { name: "Payments", tools: ["Stripe", "Paddle", "LemonSqueezy"] },
              { name: "Search", tools: ["Algolia", "Typesense", "MeiliSearch"] },
              { name: "Forms", tools: ["Formspree", "Tally", "React Hook Form"] },
              { name: "Database", tools: ["Postgres", "Supabase", "PlanetScale"] }
            ].map((category, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bold text-white mb-3">{category.name}</h3>
                <ul className="space-y-2">
                  {category.tools.map((tool, j) => (
                    <li key={j} className="text-sm text-white/60 flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-white/40" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 16: CONTACT CTA ========== */}
      <section className="py-24 md:py-32 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4">Get Started</Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Build Your Site Today
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
            Fork the repo, customize to your needs, and deploy in minutes. Join hundreds of developers building with sitewise.dev.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Github className="h-5 w-5" />
              Fork on GitHub
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Globe className="h-5 w-5" />
              View Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* ========== SECTION 17: NEWSLETTER ========== */}
      <section className="py-24 md:py-32 px-6 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-2xl mx-auto text-center">
          <Badge className="mb-4">Stay Updated</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Website Tips & Updates
          </h2>
          <p className="text-white/60 mb-8">
            Join our newsletter for best practices, new components, and template updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
            />
            <Button type="submit">Subscribe</Button>
          </form>
          <p className="text-xs text-white/40 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-16 md:py-24 bg-black border-t border-white/5 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="text-xl font-black text-white mb-4">sitewise.dev</div>
              <p className="text-sm text-white/60 mb-6">
                A modern website template built with Next.js, TypeScript, and Tailwind CSS.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm">Product</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Components</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm">Resources</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm">Company</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
            <p>&copy; {new Date().getFullYear()} sitewise.dev. All rights reserved.</p>
            <p>Built with Next.js • Deployed on Cloudflare Pages</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
