import { Navbar } from "@/components/organisms/navbar";
import { BentoGrid, BentoCard } from "@/components/molecules/bentogrid";
import { FeatureSection } from "@/components/organisms/featuresection";
import { AccordionItem } from "@/components/molecules/accordionitem";
import { Button } from "@/components/atoms/button";
import { Code2, Palette, Zap, Lock, Layout, Database, Cloud, CheckCircle2 } from "lucide-react";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center text-center max-w-5xl mx-auto overflow-hidden">
        <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-xl animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-brand-purple mr-2 animate-pulse-slow"></span>
          Feature Complete
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1] animate-fade-in-up delay-100">
          Everything you need, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue">nothing you don't</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed animate-fade-in-up delay-200">
          Production-ready components, atomic design system, TypeScript everywhere, 
          and deployment configs included. Ship faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-300">
          <Button size="lg" variant="glow" asChild>
            <a href="/#pricing">Get Started Free</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/contact">Talk to Us</a>
          </Button>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      </section>

      {/* Core Features Bento */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Core Features</h2>
          <p className="text-gray-400 text-center text-lg max-w-2xl mx-auto">
            Built with modern best practices and production-ready from day one
          </p>
        </div>
        
        <BentoGrid>
          <BentoCard
            title="Component Library"
            description="17+ production-ready components organized in atomic design pattern"
            icon={<Layout className="h-8 w-8" />}
            className="md:col-span-2"
          />
          <BentoCard
            title="TypeScript First"
            description="Full type safety across your entire application"
            icon={<Code2 className="h-8 w-8" />}
          />
          <BentoCard
            title="Design System"
            description="Consistent design tokens, spacing, colors, typography"
            icon={<Palette className="h-8 w-8" />}
          />
          <BentoCard
            title="Performance Optimized"
            description="Image optimization, lazy loading, code splitting built-in"
            icon={<Zap className="h-8 w-8" />}
            className="md:col-span-2"
          />
        </BentoGrid>
      </section>

      {/* Developer Experience */}
      <FeatureSection
        title="Developer Experience"
        subtitle="Built by developers who value their time"
        features={[
          {
            title: "Hot Module Replacement",
            description: "See changes instantly with Next.js 15 Turbopack",
            icon: "⚡"
          },
          {
            title: "TypeScript Autocomplete",
            description: "Full IntelliSense for every component and prop",
            icon: "🎯"
          },
          {
            title: "ESLint + Prettier",
            description: "Code quality and formatting enforced automatically",
            icon: "✨"
          },
          {
            title: "Component Stories",
            description: "Isolated development with Storybook integration",
            icon: "📖"
          }
        ]}
      />

      {/* Performance Features */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Performance First</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm">
              <Zap className="h-12 w-12 text-brand-purple mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                  <span>Next.js App Router with RSC (React Server Components)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                  <span>Automatic code splitting and lazy loading</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                  <span>Optimized images with next/image</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                  <span>Edge-ready deployment configuration</span>
                </li>
              </ul>
            </div>

            <div className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm">
              <Lock className="h-12 w-12 text-brand-purple mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Security Built-in</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                  <span>Content Security Policy headers configured</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                  <span>NextAuth.js integration ready</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                  <span>Environment variable validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                  <span>HTTPS-only in production</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Design System */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Design System</h2>
          <p className="text-gray-400 text-center text-lg max-w-2xl mx-auto mb-12">
            Consistent, scalable, and customizable design tokens
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Color System</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-brand-purple"></div>
                  <span className="text-sm text-gray-400">brand-purple</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-brand-blue"></div>
                  <span className="text-sm text-gray-400">brand-blue</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-brand-pink"></div>
                  <span className="text-sm text-gray-400">brand-pink</span>
                </div>
              </div>
            </div>

            <div className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Typography</h3>
              <div className="space-y-2 text-gray-400">
                <div className="text-2xl font-bold">Heading Bold</div>
                <div className="text-lg font-semibold">Subheading Semibold</div>
                <div className="text-base">Body Regular</div>
                <div className="text-sm">Small Regular</div>
              </div>
            </div>

            <div className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Spacing Scale</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-brand-purple rounded"></div>
                  <span className="text-sm text-gray-400">2px</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-brand-purple rounded"></div>
                  <span className="text-sm text-gray-400">4px</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-brand-purple rounded"></div>
                  <span className="text-sm text-gray-400">8px</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Feature List */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Complete Feature List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <AccordionItem 
                title="Components" 
                content="17+ components: Button, Badge, TiltCard, BentoGrid, Navbar, FAQ, Comparison Table, Pricing Cards, Logo Cloud, Marquee, and more" 
              />
              <AccordionItem 
                title="Styling" 
                content="Tailwind CSS 3.4.1 with custom config, design tokens, dark mode by default, responsive utilities, hover effects" 
              />
              <AccordionItem 
                title="TypeScript" 
                content="Full type safety, strict mode enabled, no 'any' types, typed props, utilities, and hooks" 
              />
            </div>

            <div className="space-y-3">
              <AccordionItem 
                title="Performance" 
                content="Next.js 15 App Router, React Server Components, automatic code splitting, image optimization, edge deployment ready" 
              />
              <AccordionItem 
                title="Deployment" 
                content="Cloudflare Pages, Vercel, Netlify configs included. Environment variable examples, build optimizations" 
              />
              <AccordionItem 
                title="Developer Tools" 
                content="ESLint, Prettier, TypeScript 5, Storybook ready, Git hooks with Husky, VS Code settings" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to build something amazing?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Get started with sitewise.dev in under 5 minutes. Completely free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glow" size="lg" asChild>
              <a href="https://github.com/sree-pm/sitewise-dev">Clone from GitHub</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/pricing">See Pricing (It's $0)</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-white tracking-tighter">sitewise.dev</span>
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} sitewise.dev. Open source under MIT License.</p>
          </div>
          <div className="flex gap-8 text-sm text-gray-500 font-medium">
            <a href="https://github.com/sree-pm/sitewise-dev" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://twitter.com/sitewise_dev" className="hover:text-white transition-colors">Twitter</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
