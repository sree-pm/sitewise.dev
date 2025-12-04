"use client";

import { Navbar } from "@/components/organisms/navbar";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { BentoGrid, BentoCard } from "@/components/molecules/bentogrid";
import { FeatureSection } from "@/components/organisms/featuresection";
import { AccordionItem } from "@/components/molecules/accordionitem";
import { 
  Zap, Palette, Code, Lock, Globe, Smartphone, Search, 
  Layers, Package, Terminal, GitBranch, Settings, Eye,
  Gauge, Shield, Workflow, Boxes, FileCode, Database
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">Full Feature List</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Everything You Need
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Out of the Box
            </span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            A complete toolkit for building modern websites. No assembly required.
          </p>
        </div>
      </section>

      {/* Core Features Bento Grid */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Core Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for Modern Web Development
            </h2>
          </div>

          <BentoGrid className="lg:grid-rows-3">
            <BentoCard
              Icon={Zap}
              name="Lightning Performance"
              description="Optimized for speed with React Server Components, automatic code splitting, and edge-ready deployment."
              href="#performance"
              cta="Learn More"
              className="lg:col-span-2 lg:row-span-1"
            />
            <BentoCard
              Icon={Palette}
              name="Beautiful Design System"
              description="20+ pre-built components following atomic design principles. Fully customizable with Tailwind."
              href="#design"
              cta="View Components"
              className="lg:col-span-1 lg:row-span-1"
            />
            <BentoCard
              Icon={Code}
              name="TypeScript First"
              description="Full type safety across the entire codebase. Catch bugs before they reach production."
              href="#typescript"
              cta="Explore"
              className="lg:col-span-1 lg:row-span-1"
            />
            <BentoCard
              Icon={Lock}
              name="Authentication Ready"
              description="GitHub OAuth integration with NextAuth. Add Google, email, or magic links easily."
              href="#auth"
              cta="Setup Auth"
              className="lg:col-span-1 lg:row-span-1"
            />
            <BentoCard
              Icon={Globe}
              name="Global Edge Network"
              description="Deploy to Cloudflare Pages for free. 300+ locations worldwide with automatic SSL."
              href="#deployment"
              cta="Deploy Now"
              className="lg:col-span-1 lg:row-span-1"
            />
          </BentoGrid>
        </div>
      </section>

      {/* Developer Experience */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Developer Experience</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for Productivity
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Terminal, title: "Modern Tooling", desc: "ESLint, Prettier, and TypeScript configured out of the box" },
              { icon: GitBranch, title: "Git Workflow", desc: "GitHub Actions for CI/CD, automatic deployments on push" },
              { icon: Settings, title: "Easy Configuration", desc: "Centralized design tokens, environment variables, and settings" },
              { icon: Eye, title: "Visual Editor", desc: "Puck editor for content changes without touching code" },
              { icon: FileCode, title: "Clean Code", desc: "Organized file structure following Next.js best practices" },
              { icon: Database, title: "API Routes", desc: "Built-in API examples with rate limiting and validation" }
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

      {/* Performance Features */}
      <section className="py-24 px-6 border-t border-white/5">
        <FeatureSection
          align="left"
          badge="Performance"
          title="Optimized for Speed"
          description="Achieve perfect Lighthouse scores with automatic optimizations, lazy loading, and edge caching. Your users will feel the difference."
          image="/assets/performance.png"
          features={[
            "React Server Components by default",
            "Automatic image optimization",
            "Code splitting and lazy loading",
            "Edge runtime support"
          ]}
          gradient="purple"
        />
      </section>

      {/* Design System Features */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <FeatureSection
          align="right"
          badge="Design System"
          title="Atomic Design Pattern"
          description="Components organized as atoms, molecules, and organisms. Build complex UIs by combining simple, reusable pieces."
          image="/assets/components.png"
          features={[
            "20+ production-ready components",
            "Accessible (WCAG 2.1 AA compliant)",
            "Dark mode support",
            "Responsive by default"
          ]}
          gradient="blue"
        />
      </section>

      {/* Security Features */}
      <section className="py-24 px-6 border-t border-white/5">
        <FeatureSection
          align="left"
          badge="Security"
          title="Enterprise-Grade Security"
          description="Built with security best practices. OAuth authentication, CSRF protection, rate limiting, and secure headers out of the box."
          image="/assets/security.png"
          features={[
            "NextAuth for authentication",
            "Rate limiting on API routes",
            "CSRF token protection",
            "Secure HTTP headers"
          ]}
          gradient="pink"
        />
      </section>

      {/* All Features List */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Complete Feature List</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything Included
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <AccordionItem 
                title="🎨 UI Components" 
                content="20+ components including buttons, badges, cards, forms, navigation, and more. All built with Tailwind CSS and fully customizable." 
              />
              <AccordionItem 
                title="📱 Responsive Design" 
                content="Mobile-first approach ensures perfect rendering on all devices. Breakpoints configured for phones, tablets, and desktops." 
              />
              <AccordionItem 
                title="🔐 Authentication" 
                content="NextAuth integration with GitHub OAuth. Easy to extend with Google, email, or magic link authentication." 
              />
              <AccordionItem 
                title="⚡ Performance" 
                content="React Server Components, automatic code splitting, optimized images, and edge-ready deployment for maximum speed." 
              />
              <AccordionItem 
                title="🎯 TypeScript" 
                content="Full type safety with TypeScript. Comprehensive types for all components and utilities catch errors at compile time." 
              />
            </div>

            <div className="space-y-3">
              <AccordionItem 
                title="🌐 SEO Optimized" 
                content="Meta tags, OpenGraph, Twitter Cards, and sitemap generation. Structured data for rich search results." 
              />
              <AccordionItem 
                title="📊 Analytics Ready" 
                content="Easy integration with Google Analytics, Plausible, or any analytics provider. Privacy-focused options available." 
              />
              <AccordionItem 
                title="🔧 Developer Tools" 
                content="ESLint, Prettier, and Git hooks configured. Consistent code style across the team." 
              />
              <AccordionItem 
                title="📝 Content Management" 
                content="Visual editor with Puck SDK. Non-technical team members can update content without code changes." 
              />
              <AccordionItem 
                title="☁️ Edge Deployment" 
                content="Optimized for Cloudflare Pages, Vercel, and Netlify. Deploy with one command, scales automatically." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build?
          </h2>
          <p className="text-lg text-white/60 mb-10">
            Get started in minutes with our comprehensive template
          </p>
          <Button size="lg">Fork on GitHub</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} sitewise.dev. MIT License.</p>
        </div>
      </footer>
    </main>
  );
}
