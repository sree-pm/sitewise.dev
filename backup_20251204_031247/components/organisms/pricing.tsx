'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/button';
import { Check } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export function PricingTable() {
  const [selectedPlan, setSelectedPlan] = useState<string>('Pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans: Plan[] = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '$299' : '$2,990',
      description: 'Perfect for early-stage startups',
      features: [
        '1 AI Agent',
        '10K API calls/month',
        'Basic analytics',
        'Email support',
        'Community access',
      ],
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '$999' : '$9,990',
      description: 'For growing companies',
      features: [
        '5 AI Agents',
        '100K API calls/month',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
        'Team collaboration',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Unlimited AI Agents',
        'Unlimited API calls',
        'Enterprise analytics',
        '24/7 dedicated support',
        'Custom development',
        'SLA guarantee',
      ],
    },
  ];

  return (
    <section className="py-24 md:py-40 px-4 md:px-6 max-w-6xl mx-auto scroll-fade-in">
      {/* Header */}
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
          Simple, Transparent Pricing
        </h2>
        <p className="text-base md:text-xl text-[#8A8F98] mb-8 max-w-2xl mx-auto leading-relaxed">
          Choose the plan that fits your needs. Always transparent, no hidden fees.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1 md:p-1.5 smooth-transition hover:bg-white/10 hover:border-white/20">
          {(['monthly', 'annual'] as const).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                billingCycle === cycle
                  ? 'bg-brand-purple text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'text-[#8A8F98] hover:text-white'
              }`}
            >
              {cycle === 'monthly' ? 'Monthly' : 'Annual (Save 17%)'}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            onClick={() => setSelectedPlan(plan.name)}
            className={`scroll-reveal relative rounded-2xl border smooth-transition duration-500 cursor-pointer transform hover:scale-105 group/card ${
              selectedPlan === plan.name || plan.highlighted
                ? 'border-brand-purple/50 bg-gradient-to-br from-brand-purple/10 to-brand-blue/5 shadow-[0_0_40px_rgba(168,85,247,0.3)]'
                : 'border-white/10 bg-black/50 hover:border-white/20 hover:bg-white/5'
            }`}
          >
            {/* Premium badge for highlighted plan */}
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-purple to-brand-blue rounded-full text-xs font-bold text-white whitespace-nowrap scale-pop">
                Most Popular
              </div>
            )}

            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 smooth-transition duration-500">
              <div className="absolute inset-0 rounded-2xl border border-brand-purple/30 blur-sm" />
            </div>

            <div className="relative p-6 md:p-8 h-full flex flex-col">
              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs md:text-sm text-[#8A8F98]">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl md:text-5xl font-black text-white mb-1">
                  {plan.price}
                </div>
                {plan.price !== 'Custom' && (
                  <p className="text-xs md:text-sm text-[#8A8F98]">
                    per {billingCycle === 'monthly' ? 'month' : 'year'}
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <div className="mb-8">
                <Button
                  variant={plan.highlighted ? 'glow-premium' : 'outline-hover'}
                  size="lg"
                  className="w-full font-bold ripple"
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </div>

              {/* Features list */}
              <div className="space-y-3 md:space-y-4 flex-1">
                {plan.features.map((feature, i) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 group/feature"
                    style={{
                      animation: `fade-in-up 0.6s ease-out forwards`,
                      animationDelay: `${i * 50}ms`,
                      opacity: 0,
                    }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-4 md:h-5 w-4 md:w-5 text-brand-purple group-hover/feature:text-brand-blue smooth-transition" />
                    </div>
                    <span className="text-sm md:text-base text-[#8A8F98] group-hover/feature:text-white smooth-transition">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ below pricing */}
      <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-white/10 scroll-reveal">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
          Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {[
            {
              q: 'Can I change plans anytime?',
              a: 'Yes, upgrade or downgrade your plan anytime. Changes take effect on your next billing cycle.',
            },
            {
              q: 'Do you offer refunds?',
              a: 'We offer a 30-day money-back guarantee for all plans.',
            },
            {
              q: 'Is there a free trial?',
              a: 'Yes, get 14 days free access to any plan. No credit card required.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, PayPal, and wire transfers for enterprise.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="scroll-reveal p-4 md:p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-brand-purple/30 smooth-transition group/faq"
            >
              <h4 className="text-sm md:text-base font-bold text-white mb-2 group-hover/faq:text-brand-purple smooth-transition">
                {item.q}
              </h4>
              <p className="text-xs md:text-sm text-[#8A8F98] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
