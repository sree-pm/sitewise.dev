"use client";

import { Navbar } from "@/atomic-design-system/organisms/navbar";
import { Button } from "@/atomic-design-system/atoms/button";
import { Badge } from "@/atomic-design-system/atoms/badge";
import { ComparisonTable } from "@/atomic-design-system/organisms/comparison";
import { Check, X, Github, Zap, Heart, Star } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">Pricing</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Free Forever
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              No Hidden Costs
            </span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            100% free and open source. Use for personal projects, client work, or commercial products. 
            No restrictions, no subscriptions, no surprises.
          </p>
        </div>
      </section>

      {/* Main Pricing Cards */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Template */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-500/10 mb-4">
                  <Github className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Template</h3>
                <div className="text-5xl font-bold mb-2">$0</div>
                <p className="text-white/60 text-sm">Forever free</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Complete source code",
                  "All 20+ components",
                  "Design system",
                  "TypeScript support",
                  "Documentation",
                  "MIT License",
                  "Use for any project",
                  "No attribution required"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" variant="glow">
                Fork on GitHub
              </Button>
            </div>

            {/* Hosting - Highlighted */}
            <div className="rounded-2xl border border-white/30 bg-white/10 p-8 scale-105 shadow-2xl shadow-purple-500/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/10 mb-4">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <Badge className="mb-2">Recommended</Badge>
                <h3 className="text-2xl font-bold mb-2">Hosting</h3>
                <div className="text-5xl font-bold mb-2">$0</div>
                <p className="text-white/60 text-sm">On Cloudflare Pages</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited bandwidth",
                  "300+ global locations",
                  "Automatic SSL",
                  "DDoS protection",
                  "99.99% uptime SLA",
                  "Free custom domains",
                  "Instant deployments",
                  "No credit card needed"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" variant="glow">
                Deploy Now
              </Button>
            </div>

            {/* Support */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-pink-500/10 mb-4">
                  <Heart className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Support</h3>
                <div className="text-5xl font-bold mb-2">$0</div>
                <p className="text-white/60 text-sm">Community</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "GitHub Issues",
                  "Discord community",
                  "Documentation",
                  "Video tutorials",
                  "Code examples",
                  "Active contributors",
                  "Quick responses",
                  "Helpful community"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" variant="outline">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Comparison</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How We Compare
            </h2>
            <p className="text-lg text-white/60">
              See how sitewise.dev stacks up against alternatives
            </p>
          </div>

          <ComparisonTable />
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">True Cost Analysis</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What You Actually Save
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Approach */}
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-400">Traditional Approach</h3>
              <div className="space-y-4">
                {[
                  { item: "Developer time (2 weeks)", cost: "$8,000" },
                  { item: "Design work", cost: "$2,000" },
                  { item: "Component library license", cost: "$399/yr" },
                  { item: "Hosting (traditional)", cost: "$50/mo" },
                  { item: "SSL certificate", cost: "$100/yr" },
                  { item: "Monitoring & analytics", cost: "$50/mo" }
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                    <span className="text-white/70">{row.item}</span>
                    <span className="font-semibold text-red-400">{row.cost}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-lg font-bold pt-4 border-t border-red-500/20">
                  <span>First Year Total:</span>
                  <span className="text-red-400">$11,699</span>
                </div>
              </div>
            </div>

            {/* With sitewise.dev */}
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-400">With sitewise.dev</h3>
              <div className="space-y-4">
                {[
                  { item: "Template (fork & customize)", cost: "$0" },
                  { item: "All components included", cost: "$0" },
                  { item: "Design system included", cost: "$0" },
                  { item: "Cloudflare Pages hosting", cost: "$0" },
                  { item: "Free SSL & CDN", cost: "$0" },
                  { item: "Built-in analytics ready", cost: "$0" }
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                    <span className="text-white/70">{row.item}</span>
                    <span className="font-semibold text-green-400">{row.cost}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-lg font-bold pt-4 border-t border-green-500/20">
                  <span>First Year Total:</span>
                  <span className="text-green-400">$0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10 px-8 py-6">
              <div className="text-sm text-white/60 mb-2">You Save:</div>
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                $11,699+
              </div>
              <div className="text-sm text-white/60 mt-2">in the first year alone</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Pricing */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pricing Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Is it really free forever?",
                a: "Yes! sitewise.dev is MIT licensed. Use it for any project—personal, client work, or commercial products. No subscriptions, no hidden fees, no restrictions."
              },
              {
                q: "Do I need to pay for hosting?",
                a: "No. Deploy to Cloudflare Pages (free tier) for unlimited bandwidth, global CDN, and automatic SSL. You can also use Vercel or Netlify's free tiers."
              },
              {
                q: "Can I use this for client projects?",
                a: "Absolutely! Build websites for clients using sitewise.dev. Charge whatever you want. No royalties, no revenue sharing."
              },
              {
                q: "What about premium support?",
                a: "Currently, we only offer community support (Discord, GitHub Issues). It's free and quite active. We may offer premium support in the future."
              },
              {
                q: "Are there any paid add-ons?",
                a: "No. Everything is included. We believe in keeping things simple and free. If we add premium features in the future, they'll be optional."
              }
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-white/60">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Building for Free
          </h2>
          <p className="text-lg text-white/60 mb-10">
            No credit card. No signup. Just fork and start building.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Github className="h-5 w-5" />
              Fork on GitHub
            </Button>
            <Button size="lg" variant="outline">
              View Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} sitewise.dev. MIT License. Free forever.</p>
        </div>
      </footer>
    </main>
  );
}
