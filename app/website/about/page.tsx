"use client";

import { Navbar } from "@/atomic-design-system/organisms/navbar";
import { Button } from "@/atomic-design-system/atoms/button";
import { Badge } from "@/atomic-design-system/atoms/badge";
import { FeatureSection } from "@/atomic-design-system/organisms/featuresection";
import { TiltCard } from "@/atomic-design-system/molecules/tiltcard";
import { Github, Twitter, Linkedin, Code, Heart, Rocket, Users, Target, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">About sitewise.dev</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Built by Developers,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              For Developers
            </span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            We created sitewise.dev to solve a problem we faced repeatedly: starting new projects with modern, 
            production-ready code instead of reinventing the wheel.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "Make professional web development accessible to everyone by providing world-class templates, components, and best practices—completely free."
              },
              {
                icon: Lightbulb,
                title: "Our Vision",
                desc: "A world where developers spend time building unique features, not recreating basic infrastructure. Focus on what makes your project special."
              },
              {
                icon: Heart,
                title: "Our Values",
                desc: "Open source, community-driven, and quality-first. We believe great tools should be free and accessible to all developers."
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/5 border border-white/10 mb-6">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">The Story</h2>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              After building dozens of landing pages, marketing sites, and SaaS applications, we noticed a pattern. 
              Every project started the same way: setting up Next.js, configuring Tailwind, building a component library, 
              implementing authentication, and creating common UI patterns.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              This repetitive work took 2-4 weeks of every project timeline. Time that could be spent on unique features, 
              user research, and actual product development.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              So we built sitewise.dev—a modern, production-ready template with everything we wish we had when starting 
              new projects. Then we open-sourced it because we believe great tools should be accessible to everyone.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              Today, sitewise.dev helps developers launch projects in hours instead of weeks. And it's completely free.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Philosophy */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Tech Philosophy</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Opinionated, But Flexible
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              We make strong technical choices, but never lock you in
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Modern Stack",
                points: [
                  "Next.js 15 with App Router for optimal performance",
                  "TypeScript for type safety and developer experience",
                  "Tailwind CSS for rapid UI development",
                  "React Server Components by default"
                ]
              },
              {
                title: "Best Practices",
                points: [
                  "Atomic design pattern (atoms → molecules → organisms)",
                  "Accessibility-first components (WCAG 2.1 AA)",
                  "Mobile-first responsive design",
                  "SEO optimization out of the box"
                ]
              },
              {
                title: "Performance First",
                points: [
                  "100 Lighthouse score achievable",
                  "Automatic code splitting and lazy loading",
                  "Optimized images with next/image",
                  "Edge-ready for global distribution"
                ]
              },
              {
                title: "Developer Experience",
                points: [
                  "Hot reload with Fast Refresh",
                  "Comprehensive TypeScript types",
                  "ESLint and Prettier configured",
                  "Clear documentation and examples"
                ]
              }
            ].map((section, i) => (
              <TiltCard key={i}>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-white/70 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4">Open Source</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built by the Community
          </h2>
          <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
            sitewise.dev is maintained by developers around the world who believe in making great tools accessible to everyone.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Button variant="glow" className="gap-2">
              <Github className="h-5 w-5" />
              Contribute on GitHub
            </Button>
            <Button variant="outline" className="gap-2">
              <Users className="h-5 w-5" />
              Join Discord
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1.2k+</div>
              <div className="text-sm text-white/50">GitHub Stars</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-sm text-white/50">Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">5k+</div>
              <div className="text-sm text-white/50">Projects Built</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Building Today
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
            Fork the repository, customize to your needs, and launch in minutes. 
            Join thousands of developers building with sitewise.dev.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Github className="h-5 w-5" />
              View on GitHub
            </Button>
            <Button size="lg" variant="outline">
              Read Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} sitewise.dev. MIT License. Use freely for any project.</p>
        </div>
      </footer>
    </main>
  );
}
