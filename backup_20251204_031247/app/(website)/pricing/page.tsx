import { Navbar } from "@/components/organisms/navbar";
import { ComparisonTable } from "@/components/organisms/comparison";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { AccordionItem } from "@/components/molecules/accordionitem";
import { Check, X, Zap, Heart, Code2 } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center text-center max-w-5xl mx-auto overflow-hidden">
        <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-xl animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-brand-purple mr-2 animate-pulse-slow"></span>
          Transparent Pricing
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1] animate-fade-in-up delay-100">
          Simple pricing: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue">$0</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed animate-fade-in-up delay-200">
          No hidden fees. No paywalls. No "enterprise" tier. Just clone, customize, 
          and deploy. Forever free.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-300">
          <Button size="lg" variant="glow" asChild>
            <a href="https://github.com/sree-pm/sitewise-dev">Get Started Free</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/contact">Questions? Ask Us</a>
          </Button>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Personal */}
          <div className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition-all">
            <Badge variant="purple">Personal</Badge>
            <h3 className="text-3xl font-bold text-white mt-4 mb-2">$0</h3>
            <p className="text-gray-400 mb-6">For individuals and side projects</p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">All components & templates</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Unlimited projects</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Community support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">MIT License</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">TypeScript & Next.js 15</span>
              </li>
            </ul>

            <Button variant="outline" size="lg" className="w-full" asChild>
              <a href="https://github.com/sree-pm/sitewise-dev">Clone on GitHub</a>
            </Button>
          </div>

          {/* Startup */}
          <div className="border-2 border-brand-purple rounded-2xl bg-gradient-to-b from-brand-purple/10 to-black/50 p-8 backdrop-blur-sm relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="purple">Most Popular</Badge>
            </div>
            
            <Badge variant="blue">Startup</Badge>
            <h3 className="text-3xl font-bold text-white mt-4 mb-2">$0</h3>
            <p className="text-gray-400 mb-6">For growing companies</p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Everything in Personal</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Commercial use allowed</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Priority GitHub issues</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Design system included</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Deployment guides</span>
              </li>
            </ul>

            <Button variant="glow" size="lg" className="w-full" asChild>
              <a href="https://github.com/sree-pm/sitewise-dev">Get Started Free</a>
            </Button>
          </div>

          {/* Enterprise */}
          <div className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition-all">
            <Badge variant="pink">Enterprise</Badge>
            <h3 className="text-3xl font-bold text-white mt-4 mb-2">$0</h3>
            <p className="text-gray-400 mb-6">For large organizations</p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Everything in Startup</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Custom integrations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Dedicated support (optional)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Security audit available</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-brand-purple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Training sessions (paid)</span>
              </li>
            </ul>

            <Button variant="outline" size="lg" className="w-full" asChild>
              <a href="/contact">Contact Sales</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Cost Breakdown */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Traditional Template vs sitewise.dev
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="border border-red-500/30 rounded-2xl bg-red-500/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <X className="h-8 w-8 text-red-500" />
                <h3 className="text-2xl font-bold text-white">Traditional Template</h3>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Template License</span>
                  <span className="font-semibold text-red-400">$199</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Component Library</span>
                  <span className="font-semibold text-red-400">$299</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Design System</span>
                  <span className="font-semibold text-red-400">$149</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Updates (per year)</span>
                  <span className="font-semibold text-red-400">$99</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Support</span>
                  <span className="font-semibold text-red-400">$49/mo</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-xl font-bold text-white">Total (Year 1)</span>
                  <span className="text-3xl font-bold text-red-500">$1,334</span>
                </div>
              </div>
            </div>

            {/* sitewise.dev */}
            <div className="border-2 border-brand-purple rounded-2xl bg-gradient-to-b from-brand-purple/10 to-black/50 p-8 relative">
              <div className="flex items-center gap-3 mb-6">
                <Check className="h-8 w-8 text-brand-purple" />
                <h3 className="text-2xl font-bold text-white">sitewise.dev</h3>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Template License</span>
                  <span className="font-semibold text-brand-purple">$0</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Component Library</span>
                  <span className="font-semibold text-brand-purple">$0</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Design System</span>
                  <span className="font-semibold text-brand-purple">$0</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Updates (forever)</span>
                  <span className="font-semibold text-brand-purple">$0</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Support</span>
                  <span className="font-semibold text-brand-purple">Community</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-xl font-bold text-white">Total (Forever)</span>
                  <span className="text-3xl font-bold text-brand-purple">$0</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/30">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-brand-purple">Save $1,334+</span> in the first year alone. 
                  Use that budget for what matters: your product.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Pricing FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <AccordionItem 
                title="Is it really free?" 
                content="Yes. 100% free. Forever. No credit card required. No hidden fees. No 'free tier' with limitations. Clone the repo and it's yours." 
              />
              <AccordionItem 
                title="Can I use this commercially?" 
                content="Absolutely. MIT License means you can use sitewise.dev for personal projects, client work, SaaS products, anything. No attribution required (but appreciated!)." 
              />
              <AccordionItem 
                title="Do I get updates?" 
                content="Yes! We actively maintain sitewise.dev. Pull the latest changes from GitHub anytime. Watch the repo for notifications on new components and features." 
              />
            </div>

            <div className="space-y-3">
              <AccordionItem 
                title="What about support?" 
                content="Community support via GitHub Issues and Discussions. For paid priority support, custom development, or training, contact us." 
              />
              <AccordionItem 
                title="Can I modify the code?" 
                content="Yes! That's the whole point. Customize everything: colors, components, animations, structure. It's your codebase now." 
              />
              <AccordionItem 
                title="Why is it free?" 
                content="We believe great tools should be accessible to everyone. We built this for ourselves first, now we're sharing it. Plus, open source is awesome." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Start building for free</h2>
          <p className="text-gray-400 mb-8 text-lg">
            No signup. No credit card. Just clone and go. Deploy your first site in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glow" size="lg" asChild>
              <a href="https://github.com/sree-pm/sitewise-dev">
                <Code2 className="mr-2 h-5 w-5" />
                Clone from GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">
                <Heart className="mr-2 h-5 w-5" />
                Need Help? Contact Us
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
