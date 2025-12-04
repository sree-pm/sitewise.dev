"use client";

import React from 'react';
import { Navbar } from '@/atomic-design-system/organisms/navbar';
import { Button } from '@/atomic-design-system/atoms/button';
import { Badge } from '@/atomic-design-system/atoms/badge';
import { Text } from '@/atomic-design-system/atoms/text';
import { Container, Grid, FlexBox, Stack } from '@/atomic-design-system/atoms/layout';
import { AccordionItem } from '@/atomic-design-system/molecules/accordionitem';
import { InteractiveHero } from '@/atomic-design-system/molecules/interactivehero';
import { Rocket, Check, X, Star, Users, TrendingUp, Clock, Shield } from 'lucide-react';

/**
 * Product Launch Template
 * 
 * Perfect for: Product launches, pre-orders, beta signups
 * Features: Countdown, waitlist, social proof, feature comparison
 */
export const ProductLaunchTemplate: React.FC = () => {
  const features = [
    { icon: "⚡", title: "Lightning Fast", description: "Optimized for speed with sub-second load times" },
    { icon: "🔒", title: "Secure by Default", description: "Enterprise-grade security built in from day one" },
    { icon: "🎨", title: "Beautiful UI", description: "Pixel-perfect design that users will love" },
    { icon: "📱", title: "Mobile First", description: "Works perfectly on any device, any screen size" },
    { icon: "🚀", title: "Easy Integration", description: "Connect with your existing tools in minutes" },
    { icon: "📊", title: "Analytics Included", description: "Track everything with powerful built-in analytics" }
  ];

  const earlyBirds = [
    { name: "Sarah M.", title: "Product Manager", avatar: "SM", joined: "2 days ago" },
    { name: "Alex K.", title: "Developer", avatar: "AK", joined: "5 days ago" },
    { name: "Emma L.", title: "Designer", avatar: "EL", joined: "1 week ago" },
    { name: "Michael R.", title: "Founder", avatar: "MR", joined: "1 week ago" },
    { name: "Jessica T.", title: "Marketer", avatar: "JT", joined: "2 weeks ago" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero with Countdown */}
      <section className="relative overflow-hidden pt-32 md:pt-48 pb-24 md:pb-32 px-4 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full" />
        
        <Container className="relative z-10 text-center">
          <Badge className="mb-6 border-blue-500/30 bg-blue-500/10 text-blue-300">
            🎉 Launching January 2026
          </Badge>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            The Future of
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Productivity
            </span>
          </h1>
          
          <Text variant="bodyLarge" color="secondary" className="max-w-3xl mx-auto mb-10">
            Join 10,000+ early adopters getting exclusive access to the tool that will 
            revolutionize how you work. Limited spots available.
          </Text>

          {/* Countdown Timer */}
          <div className="mb-10">
            <div className="text-sm text-white/50 mb-4 uppercase tracking-wide">Launch in</div>
            <Grid cols={{ base: 2, md: 4 }} gap="4" className="max-w-2xl mx-auto mb-8">
              {[
                { value: "42", label: "Days" },
                { value: "18", label: "Hours" },
                { value: "36", label: "Minutes" },
                { value: "12", label: "Seconds" }
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6">
                  <div className="text-4xl font-bold text-blue-400 mb-1">{item.value}</div>
                  <div className="text-sm text-white/50">{item.label}</div>
                </div>
              ))}
            </Grid>
          </div>
          
          {/* Waitlist Form */}
          <div className="max-w-md mx-auto mb-12">
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50"
              />
              <Button variant="glow" size="lg">
                Join Waitlist
              </Button>
            </form>
            <p className="text-xs text-white/40 mt-3">
              🎁 Early birds get 50% off lifetime • No credit card required
            </p>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-white/60">10,234 people waiting</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-white/60">234 joined today</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-white/60">Average wait: 3 days</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 border-t border-white/5">
        <Container className="max-w-[1200px]">
          <div className="text-center mb-16">
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for Modern Teams
            </h2>
            <Text variant="bodyLarge" color="secondary">
              Everything you need, nothing you don't
            </Text>
          </div>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <Container className="max-w-[1000px]">
          <div className="text-center mb-16">
            <Badge className="mb-4">Comparison</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Us?
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-6 font-semibold">Feature</th>
                  <th className="p-6 font-semibold text-white/60">Competitors</th>
                  <th className="p-6 font-semibold bg-blue-500/10 border-x border-blue-500/30">
                    <div className="flex items-center justify-center gap-2">
                      <Rocket className="h-5 w-5 text-blue-400" />
                      <span className="text-blue-400">Our Product</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Setup Time", competitors: "Hours", us: "Minutes" },
                  { feature: "Price", competitors: "$99/mo", us: "$29/mo" },
                  { feature: "Team Collaboration", competitors: "Limited", us: "Unlimited" },
                  { feature: "Integrations", competitors: "10+", us: "100+" },
                  { feature: "Support", competitors: "Email only", us: "24/7 Chat" },
                  { feature: "Mobile App", competitors: "Basic", us: "Native iOS & Android" }
                ].map((row, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="p-6 font-medium">{row.feature}</td>
                    <td className="p-6 text-center text-white/60">
                      <div className="flex items-center justify-center gap-2">
                        <X className="h-4 w-4 text-red-400" />
                        {row.competitors}
                      </div>
                    </td>
                    <td className="p-6 text-center bg-blue-500/5 border-x border-blue-500/10">
                      <div className="flex items-center justify-center gap-2 text-blue-400 font-semibold">
                        <Check className="h-5 w-5" />
                        {row.us}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Early Adopters */}
      <section className="py-24 px-6 border-t border-white/5">
        <Container className="max-w-[1000px]">
          <div className="text-center mb-16">
            <Badge className="mb-4">Community</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Join 10K+ Early Adopters
            </h2>
            <Text variant="bodyLarge" color="secondary">
              See who else is excited about the launch
            </Text>
          </div>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="6" className="mb-12">
            {earlyBirds.map((person, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-6 flex items-center gap-4"
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-sm shrink-0">
                  {person.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{person.name}</div>
                  <div className="text-sm text-white/50 truncate">{person.title}</div>
                </div>
                <div className="text-xs text-white/40 shrink-0">{person.joined}</div>
              </div>
            ))}
          </Grid>

          <div className="text-center">
            <Button size="lg" variant="outline">
              View All Members
            </Button>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <Container className="max-w-3xl">
          <div className="text-center mb-16">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Common Questions
            </h2>
          </div>

          <Stack gap="4">
            <AccordionItem
              title="When will the product launch?"
              content="We're launching in January 2026. Early waitlist members get priority access 2 weeks before the public launch."
            />
            <AccordionItem
              title="What's the pricing?"
              content="Early adopters get 50% off lifetime. Regular pricing starts at $29/month after launch. Annual plans available with additional 20% off."
            />
            <AccordionItem
              title="Can I get a refund?"
              content="Yes! We offer a 60-day money-back guarantee. If you're not satisfied, we'll refund you in full, no questions asked."
            />
            <AccordionItem
              title="Will there be a free trial?"
              content="Absolutely. All users get a 14-day free trial with full access to all features. No credit card required to start."
            />
            <AccordionItem
              title="Do you offer team/enterprise plans?"
              content="Yes! Contact our sales team for custom enterprise pricing with volume discounts, dedicated support, and custom SLAs."
            />
          </Stack>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5">
        <Container className="max-w-4xl text-center">
          <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-12 md:p-16">
            <Badge className="mb-6 border-blue-500/30 bg-blue-500/10 text-blue-300">
              Limited Time Offer
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Don't Miss Out
            </h2>
            <Text variant="bodyLarge" color="secondary" className="mb-10">
              Join now and get 50% off for life + exclusive beta access
            </Text>
            
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50"
                />
                <Button variant="glow" size="lg">
                  Secure My Spot
                </Button>
              </form>
              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-white/60">
                <Shield className="h-4 w-4" />
                <span>Your email is safe with us. We never spam.</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
