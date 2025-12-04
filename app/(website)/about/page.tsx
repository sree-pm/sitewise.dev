import { Navbar } from "@/components/organisms/navbar";
import { TiltCard } from "@/components/molecules/tiltcard";
import { FeatureSection } from "@/components/organisms/featuresection";
import { Button } from "@/components/atoms/button";
import { Mail, Github, Twitter, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center text-center max-w-5xl mx-auto overflow-hidden">
        <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-xl animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-brand-purple mr-2 animate-pulse-slow"></span>
          Open Source • Free Forever
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1] animate-fade-in-up delay-100">
          Built by developers, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue">for developers</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed animate-fade-in-up delay-200">
          sitewise.dev is the template we wish existed when building modern web apps. 
          No cruft, no vendor lock-in, just pure Next.js + TypeScript excellence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-300">
          <Button size="lg" variant="glow" asChild>
            <a href="https://github.com/sree-pm/sitewise-dev">View on GitHub</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              Make world-class web development accessible to everyone. No paywalls, no hidden costs, 
              no compromises on quality. Just open-source excellence.
            </p>
          </div>

          <div className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              A world where launching a production-ready website takes minutes, not months. 
              Where design systems are accessible, and TypeScript is the default.
            </p>
          </div>

          <div className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
            <p className="text-gray-400 leading-relaxed">
              Open source first. Developer experience obsessed. Performance paranoid. 
              Security conscious. Community driven. Always free.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">The Story</h2>
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              After building dozens of landing pages, marketing sites, and SaaS products, we noticed 
              something frustrating: every project started from scratch. Copy-paste components. 
              Rebuild the same navbar. Re-implement dark mode. Again. And again.
            </p>
            <p>
              Existing templates were either too opinionated (lock you into their ecosystem), too expensive 
              ($200+ for a single site?), or frankly, just not good enough for production.
            </p>
            <p>
              So we built sitewise.dev. A template that's actually production-ready. With atomic design 
              patterns. TypeScript everywhere. Accessible components. Performance optimized. And completely free.
            </p>
            <p className="text-white font-semibold">
              This is the template we use for our own projects. Now it's yours.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Philosophy */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Tech Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TiltCard
              title="TypeScript First"
              description="Full type safety, zero runtime errors, maximum developer confidence"
              icon="⚡"
            />
            <TiltCard
              title="Atomic Design"
              description="Scalable component architecture from atoms to organisms"
              icon="🧬"
            />
            <TiltCard
              title="Performance Obsessed"
              description="Optimized images, lazy loading, edge-ready, sub-second loads"
              icon="🚀"
            />
            <TiltCard
              title="Zero Lock-in"
              description="No proprietary SDKs, no vendor APIs, you own everything"
              icon="🔓"
            />
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue mb-2">
                1,000+
              </div>
              <div className="text-gray-400">GitHub Stars</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue mb-2">
                500+
              </div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue mb-2">
                50+
              </div>
              <div className="text-gray-400">Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue mb-2">
                100%
              </div>
              <div className="text-gray-400">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Join the Community</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Star us on GitHub, report issues, submit PRs, or just say hi on Discord.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glow" size="lg" asChild>
              <a href="https://github.com/sree-pm/sitewise-dev">
                <Github className="mr-2 h-5 w-5" />
                Star on GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </a>
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
