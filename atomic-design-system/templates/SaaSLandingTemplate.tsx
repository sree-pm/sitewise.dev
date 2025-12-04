"use client";

import React from 'react';
import { Navbar } from '@/atomic-design-system/organisms/navbar';
import { Button } from '@/atomic-design-system/atoms/button';
import { Badge } from '@/atomic-design-system/atoms/badge';
import { Text, GradientText } from '@/atomic-design-system/atoms/text';
import { Container, FlexBox, Grid } from '@/atomic-design-system/atoms/layout';
import { BentoGrid, BentoCard } from '@/atomic-design-system/molecules/bentogrid';
import { FeatureSection } from '@/atomic-design-system/organisms/featuresection';
import { PricingTable } from '@/atomic-design-system/organisms/pricing';
import { FAQ } from '@/atomic-design-system/organisms/faq';
import { Zap, Shield, Globe, TrendingUp, Users, Code, Check } from 'lucide-react';

/**
 * SaaS Landing Page Template
 * 
 * Perfect for: Software products, web apps, API services
 * Features: Hero, feature grid, pricing, FAQ, CTA
 */
export const SaaSLandingTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 md:pt-48 pb-24 md:pb-32 px-4 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full" />
        
        <Container className="relative z-10 text-center">
          <Badge className="mb-6">🚀 Now in Public Beta</Badge>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Ship Products
            <br />
            <GradientText>10x Faster</GradientText>
          </h1>
          
          <Text variant="bodyLarge" color="secondary" className="max-w-3xl mx-auto mb-10">
            The all-in-one platform for modern teams to build, deploy, and scale applications 
            without the infrastructure headache.
          </Text>
          
          <FlexBox justify="center" gap="4" className="mb-16">
            <Button size="lg" variant="glow">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </FlexBox>

          {/* Stats */}
          <Grid cols={{ base: 2, md: 4 }} gap="4" className="max-w-4xl mx-auto">
            {[
              { label: "Active Users", value: "100K+" },
              { label: "Deploy Time", value: "<30s" },
              { label: "Uptime", value: "99.99%" },
              { label: "Countries", value: "150+" }
            ].map((stat, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Bento Features */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4">Features</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need
          </h2>
          <Text variant="bodyLarge" color="secondary" className="max-w-2xl mx-auto">
            Built-in tools to help you move faster
          </Text>
        </div>

        <BentoGrid className="lg:grid-rows-3">
          <BentoCard
            Icon={Zap}
            name="Instant Deployments"
            description="Push to deploy. Your code is live in under 30 seconds with automatic rollbacks."
            href="#deploy"
            cta="Learn More"
            className="lg:col-span-2 lg:row-span-2"
          />
          <BentoCard
            Icon={Shield}
            name="Enterprise Security"
            description="SOC2, GDPR compliant. Your data is encrypted at rest and in transit."
            href="#security"
            cta="View Compliance"
            className="lg:col-span-1 lg:row-span-2"
          />
          <BentoCard
            Icon={Globe}
            name="Global Edge Network"
            description="Deployed across 300+ locations worldwide for instant response times."
            href="#cdn"
            cta="Check Coverage"
            className="lg:col-span-1"
          />
          <BentoCard
            Icon={Code}
            name="Developer First"
            description="CLI, API, webhooks. Integrate with your existing workflow."
            href="#api"
            cta="View Docs"
            className="lg:col-span-1"
          />
          <BentoCard
            Icon={TrendingUp}
            name="Analytics Built-in"
            description="Real-time insights into performance, errors, and user behavior."
            href="#analytics"
            cta="See Dashboard"
            className="lg:col-span-1"
          />
        </BentoGrid>
      </section>

      {/* Feature Sections */}
      <section className="border-t border-white/5">
        <FeatureSection
          align="left"
          badge="Developer Experience"
          title="Built for Speed"
          description="Deploy with a single command. No configuration required. We handle the infrastructure so you can focus on building."
          image="/assets/dashboard-preview.png"
          features={[
            "Zero-config deployments",
            "Automatic HTTPS & CDN",
            "Built-in CI/CD",
            "Preview deployments"
          ]}
          gradient="purple"
        />

        <FeatureSection
          align="right"
          badge="Collaboration"
          title="Ship as a Team"
          description="Invite your team, manage permissions, and collaborate in real-time. Everything stays in sync."
          image="/assets/team-preview.png"
          features={[
            "Team workspaces",
            "Role-based access",
            "Activity logs",
            "Slack integration"
          ]}
          gradient="blue"
        />
      </section>

      {/* Pricing */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <Container>
          <div className="text-center mb-16">
            <Badge className="mb-4">Pricing</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Free, Scale as You Grow
            </h2>
          </div>

          <PricingTable
            tiers={[
              {
                name: "Starter",
                price: "$0",
                description: "For side projects and MVPs",
                features: [
                  "Unlimited projects",
                  "100GB bandwidth/mo",
                  "Community support",
                  "Basic analytics"
                ],
                cta: "Get Started",
                highlighted: false
              },
              {
                name: "Pro",
                price: "$29",
                description: "For growing teams",
                features: [
                  "Everything in Starter",
                  "1TB bandwidth/mo",
                  "Priority support",
                  "Advanced analytics",
                  "Custom domains",
                  "Team collaboration"
                ],
                cta: "Start Free Trial",
                highlighted: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: [
                  "Everything in Pro",
                  "Unlimited bandwidth",
                  "24/7 phone support",
                  "SLA guarantees",
                  "SSO & SAML",
                  "Dedicated account manager"
                ],
                cta: "Contact Sales",
                highlighted: false
              }
            ]}
          />
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-white/5">
        <Container className="max-w-4xl">
          <div className="text-center mb-16">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Common Questions
            </h2>
          </div>

          <FAQ
            items={[
              {
                question: "How does the free trial work?",
                answer: "Start with a 14-day free trial of Pro features. No credit card required. Downgrade to Starter anytime or upgrade to continue with Pro features."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Yes! Cancel your subscription at any time from your dashboard. You'll keep access until the end of your billing period."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, Mastercard, Amex) and offer annual billing with a 20% discount."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee. If you're not satisfied, contact support for a full refund."
              }
            ]}
          />
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <Container className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Ship Faster?
          </h2>
          <Text variant="bodyLarge" color="secondary" className="max-w-2xl mx-auto mb-10">
            Join thousands of developers building the future
          </Text>
          <FlexBox justify="center" gap="4">
            <Button size="lg" variant="glow">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Talk to Sales
            </Button>
          </FlexBox>
        </Container>
      </section>
    </div>
  );
};
