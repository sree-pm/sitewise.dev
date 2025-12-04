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

export default function HomePage() {
  useScrollObserver();
  useAdvancedScrollObserver();

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />

      {/* ========== SECTION 1: HERO ========== */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge className="mb-6 animate-fade-in">sitewise.dev</Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight animate-fade-in-up">
            Build Beautiful Websites
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              in Minutes
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            A modern, production-ready website template with 20+ components, TypeScript, and free hosting. 
            Fork it, customize it, launch it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animation-delay-400">
            <Button size="lg" className="gap-2">
              <Github className="h-5 w-5" />
              Fork on GitHub
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Globe className="h-5 w-5" />
              View Live Demo
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
            {[
              { value: "20+", label: "Components" },
              { value: "<5min", label: "Deploy Time" },
              { value: "$0", label: "Cost" },
              { value: "100", label: "Page Speed" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: LOGO CLOUD ========== */}
      <section className="py-16 border-t border-white/5">
        <LogoCloud />
      </section>

      {/* ========== SECTION 3: VALUE PROPOSITION ========== */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-white/[0.02]">
        <ValueProp />
      </section>

      {/* ========== SECTION 4: BENTO GRID ========== */}
      <section className="py-24 md:py-32 px-6 max-w-[1400px] mx-auto border-t border-white/5">
        <div className="mb-16 text-center">
          <Badge className="mb-4">Component Showcase</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-white/60">
            Pre-built components ready to use in your next project
          </p>
        </div>
        
        <BentoGrid className="lg:grid-rows-3">
          <BentoCard
            Icon={Zap}
            name="Lightning Fast"
            description="Optimized for performance with React Server Components and edge deployment"
            href="/features"
            cta="Learn More"
            className="lg:col-span-2 lg:row-span-1"
          />
          <BentoCard
            Icon={Lock}
            name="Secure by Default"
            description="Built-in authentication, CSRF protection, and security best practices"
            href="/features"
            cta="View Security"
            className="lg:col-span-1 lg:row-span-1"
          />
          <BentoCard
            Icon={Code}
            name="TypeScript First"
            description="Full type safety across the entire codebase for fewer bugs"
            href="/features"
            cta="Explore"
            className="lg:col-span-1 lg:row-span-1"
          />
          <BentoCard
            Icon={Palette}
            name="Beautiful Design"
            description="20+ components with a modern design system and dark mode"
            href="/features"
            cta="See Components"
            className="lg:col-span-1 lg:row-span-1"
          />
          <BentoCard
            Icon={Globe}
            name="Global CDN"
            description="Deploy to 300+ locations worldwide with Cloudflare Pages"
            href="/pricing"
            cta="Deploy Free"
            className="lg:col-span-1 lg:row-span-1"
          />
        </BentoGrid>
      </section>

      {/* ========== SECTION 5: FEATURE COMPARISON ========== */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Comparison</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose sitewise.dev?
            </h2>
            <p className="text-lg text-white/60">
              See how we compare to building from scratch or using page builders
            </p>
          </div>

          <ComparisonTable />
        </div>
      </section>

      {/* ========== SECTION 6: TECH STACK ========== */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Tech Stack</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Built with Modern Tools
            </h2>
            <p className="text-lg text-white/60">
              Industry-standard technologies for maximum performance
            </p>
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

      {/* ========== SECTION 7: FEATURES GRID ========== */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything Included
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed with sub-second load times" },
              { icon: Lock, title: "Secure", desc: "Built-in security best practices and HTTPS" },
              { icon: Globe, title: "Global CDN", desc: "300+ edge locations worldwide" },
              { icon: Code, title: "Developer-First", desc: "Clean code, TypeScript, and great DX" },
              { icon: Palette, title: "Beautiful UI", desc: "Modern design system with 20+ components" },
              { icon: Users, title: "Production Ready", desc: "Used by hundreds of projects in production" },
              { icon: Rocket, title: "Launch Fast", desc: "Deploy in minutes, not weeks" },
              { icon: TrendingUp, title: "SEO Optimized", desc: "Meta tags, sitemaps, and structured data" },
              { icon: Award, title: "Award Winning", desc: "Best practices and modern patterns" }
            ].map((feature, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-8 hover:bg-white/[0.08] transition-all">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-white/10 mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 8: ZIGZAG FEATURE SECTIONS ========== */}
      <section className="border-t border-white/5">
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
      <section className="py-24 md:py-32 border-t border-white/5 bg-white/[0.02]">
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
      <section className="py-24 md:py-32 px-6 border-t border-white/5">
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
      <section className="py-24 md:py-32 border-t border-white/5 bg-white/[0.02]">
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

      {/* ========== SECTION 12: FAQ ========== */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5">
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
      <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-white/[0.02]">
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
      <section className="py-24 md:py-32 px-6 border-t border-white/5">
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
      <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-white/[0.02]">
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
      <section className="py-24 md:py-32 px-6 border-t border-white/5">
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
      <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-white/[0.02]">
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
                <li><Link href="/features" className="hover:text-white transition-colors">Components</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm">Resources</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm">Company</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
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
