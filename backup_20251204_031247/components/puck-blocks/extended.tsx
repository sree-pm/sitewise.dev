/* eslint-disable react/display-name */
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Container, FlexBox, Grid, Stack } from '@/components/atoms/layout';
import { Text } from '@/components/atoms/text';
import { Button } from '@/components/atoms/button';
import { Surface } from '@/components/atoms/layout';

// ============ HERO WITH IMAGE SIDE ============

export const HeroImageBlock = {
  fields: {
    headline: { type: 'text' },
    subheading: { type: 'textarea' },
    image: { type: 'text' },
    primaryCta: { type: 'text' },
    primaryUrl: { type: 'text' },
    imagePosition: { type: 'select', options: [{ label: 'Right', value: 'right' }, { label: 'Left', value: 'left' }] },
  },
  defaultProps: {
    headline: 'Build Amazing Products',
    subheading: 'Create, scale, and grow with our platform',
    image: 'https://images.unsplash.com/photo-1579353977991-dab046d9c881?w=600',
    primaryCta: 'Get Started',
    primaryUrl: '#',
    imagePosition: 'right',
  },
  render: ({ headline, subheading, image, primaryCta, primaryUrl, imagePosition }: any) => (
    <div className="py-24 px-6">
      <Container size="xl">
        <Grid cols={2} gap="lg" className="items-center">
          {imagePosition === 'left' && (
            <div className="hidden md:block">
              <img src={image} alt="Hero" className="w-full rounded-2xl shadow-2xl" />
            </div>
          )}
          <div>
            <Text variant="h1" className="mb-6">{headline}</Text>
            <Text variant="bodyLarge" color="secondary" className="mb-8 max-w-lg">{subheading}</Text>
            <a href={primaryUrl}><Button size="lg">{primaryCta}</Button></a>
          </div>
          {imagePosition === 'right' && (
            <div className="hidden md:block">
              <img src={image} alt="Hero" className="w-full rounded-2xl shadow-2xl" />
            </div>
          )}
        </Grid>
      </Container>
    </div>
  ),
};

// ============ FEATURES WITH 4 COLUMNS ============

export const FeatureFourBlock = {
  fields: {
    title: { type: 'text' },
    features: {
      type: 'array',
      arrayFields: {
        icon: { type: 'text' },
        title: { type: 'text' },
        description: { type: 'textarea' },
      },
    },
  },
  defaultProps: {
    title: 'Why Choose Us',
    features: [
      { icon: '⚡', title: 'Fast', description: 'Lightning quick performance' },
      { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
      { icon: '♾️', title: 'Scalable', description: 'Grows with your needs' },
      { icon: '🎯', title: 'Reliable', description: '99.9% uptime guarantee' },
    ],
  },
  render: ({ title, features }: any) => (
    <div className="py-24 px-6">
      <Container>
        <Text variant="h2" className="text-center mb-16">{title}</Text>
        <Grid cols={4} gap="lg" className="md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features?.map((feature: any, i: number) => (
            <Surface key={i} variant="glass" padding="lg" rounded="xl">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <Text variant="h5" className="mb-3">{feature.title}</Text>
              <Text variant="bodySmall" color="secondary">{feature.description}</Text>
            </Surface>
          ))}
        </Grid>
      </Container>
    </div>
  ),
};

// ============ COMPARISON TABLE ============

export const ComparisonBlock = {
  fields: {
    title: { type: 'text' },
    features: {
      type: 'array',
      arrayFields: {
        name: { type: 'text' },
        plans: { type: 'text' },
      },
    },
  },
  defaultProps: {
    title: 'Feature Comparison',
    features: [
      { name: 'Feature 1', plans: 'true,true,false' },
      { name: 'Feature 2', plans: 'true,true,true' },
    ],
  },
  render: ({ title, features }: any) => (
    <div className="py-24 px-6">
      <Container>
        <Text variant="h2" className="text-center mb-12">{title}</Text>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-neutral-700">
                <th className="text-left py-4 px-4 font-bold">Feature</th>
                <th className="text-center py-4 px-4 font-bold">Starter</th>
                <th className="text-center py-4 px-4 font-bold">Pro</th>
                <th className="text-center py-4 px-4 font-bold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features?.map((feature: any, i: number) => (
                <tr key={i} className="border-b border-neutral-800">
                  <td className="py-4 px-4 text-white">{feature.name}</td>
                  {feature.plans.split(',').map((plan: string, pi: number) => (
                    <td key={pi} className="text-center py-4 px-4">
                      {plan === 'true' ? <span className="text-green-400">✓</span> : <span className="text-neutral-500">✗</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  ),
};

// ============ BENEFITS SECTION ============

export const BenefitsBlock = {
  fields: {
    title: { type: 'text' },
    benefits: {
      type: 'array',
      arrayFields: {
        icon: { type: 'text' },
        title: { type: 'text' },
        description: { type: 'textarea' },
      },
    },
  },
  defaultProps: {
    title: 'Key Benefits',
    benefits: [
      { icon: '📈', title: 'Grow Faster', description: 'Accelerate your growth with our tools' },
      { icon: '💰', title: 'Save Money', description: 'Reduce costs by 60%' },
      { icon: '⏱️', title: 'Save Time', description: 'Automate repetitive tasks' },
    ],
  },
  render: ({ title, benefits }: any) => (
    <div className="py-24 px-6 bg-gradient-to-b from-brand-purple/10 to-transparent">
      <Container>
        <Text variant="h2" className="text-center mb-16">{title}</Text>
        <Stack spacing="lg">
          {benefits?.map((benefit: any, i: number) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="text-5xl flex-shrink-0">{benefit.icon}</div>
              <div className="flex-1">
                <Text variant="h4" className="mb-2">{benefit.title}</Text>
                <Text variant="body" color="secondary">{benefit.description}</Text>
              </div>
            </div>
          ))}
        </Stack>
      </Container>
    </div>
  ),
};

// ============ TEAM SECTION ============

export const TeamBlock = {
  fields: {
    title: { type: 'text' },
    members: {
      type: 'array',
      arrayFields: {
        image: { type: 'text' },
        name: { type: 'text' },
        role: { type: 'text' },
        bio: { type: 'text' },
      },
    },
  },
  defaultProps: {
    title: 'Meet Our Team',
    members: [
      { image: 'https://via.placeholder.com/300', name: 'John Doe', role: 'CEO', bio: 'Visionary leader' },
      { image: 'https://via.placeholder.com/300', name: 'Jane Smith', role: 'CTO', bio: 'Technical innovator' },
    ],
  },
  render: ({ title, members }: any) => (
    <div className="py-24 px-6">
      <Container>
        <Text variant="h2" className="text-center mb-16">{title}</Text>
        <Grid cols={3} gap="lg" className="md:grid-cols-1 lg:grid-cols-3">
          {members?.map((member: any, i: number) => (
            <div key={i} className="text-center">
              <img src={member.image} alt={member.name} className="w-full aspect-square object-cover rounded-xl mb-4" />
              <Text variant="h5">{member.name}</Text>
              <Text variant="bodySmall" color="secondary" className="mb-2">{member.role}</Text>
              <Text variant="caption" color="tertiary">{member.bio}</Text>
            </div>
          ))}
        </Grid>
      </Container>
    </div>
  ),
};

// ============ TIMELINE SECTION ============

export const TimelineBlock = {
  fields: {
    title: { type: 'text' },
    events: {
      type: 'array',
      arrayFields: {
        year: { type: 'text' },
        title: { type: 'text' },
        description: { type: 'textarea' },
      },
    },
  },
  defaultProps: {
    title: 'Our Journey',
    events: [
      { year: '2020', title: 'Founded', description: 'Started with a mission' },
      { year: '2021', title: 'Series A', description: 'Raised $5M in funding' },
      { year: '2022', title: 'Growth', description: 'Expanded to 50+ team members' },
    ],
  },
  render: ({ title, events }: any) => (
    <div className="py-24 px-6">
      <Container size="md">
        <Text variant="h2" className="text-center mb-16">{title}</Text>
        <div className="space-y-8">
          {events?.map((event: any, i: number) => (
            <div key={i} className="flex gap-6">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-brand-purple flex items-center justify-center text-white font-bold">{i + 1}</div>
                {i < events.length - 1 && <div className="w-0.5 h-24 bg-neutral-700 mt-2" />}
              </div>
              <div className="pb-8">
                <Text variant="caption" color="secondary" className="mb-1">{event.year}</Text>
                <Text variant="h5" className="mb-2">{event.title}</Text>
                <Text variant="body" color="secondary">{event.description}</Text>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  ),
};

// ============ STATS COUNTER ============

export const CounterBlock = {
  fields: {
    title: { type: 'text' },
    stats: {
      type: 'array',
      arrayFields: {
        value: { type: 'text' },
        label: { type: 'text' },
        icon: { type: 'text' },
      },
    },
  },
  defaultProps: {
    title: 'Our Impact',
    stats: [
      { value: '1000+', label: 'Happy Customers', icon: '😊' },
      { value: '50M+', label: 'Transactions', icon: '💳' },
      { value: '99.9%', label: 'Uptime', icon: '⚡' },
    ],
  },
  render: ({ title, stats }: any) => (
    <div className="py-24 px-6 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20">
      <Container>
        {title && <Text variant="h2" className="text-center mb-16">{title}</Text>}
        <Grid cols={3} gap="lg" className="md:grid-cols-1 lg:grid-cols-3">
          {stats?.map((stat: any, i: number) => (
            <div key={i} className="text-center py-8">
              {stat.icon && <div className="text-6xl mb-4">{stat.icon}</div>}
              <Text variant="h2" className="text-brand-purple mb-2">{stat.value}</Text>
              <Text variant="body" color="secondary">{stat.label}</Text>
            </div>
          ))}
        </Grid>
      </Container>
    </div>
  ),
};

// ============ TESTIMONIAL GRID ============

export const TestimonialGridBlock = {
  fields: {
    title: { type: 'text' },
    testimonials: {
      type: 'array',
      arrayFields: {
        quote: { type: 'textarea' },
        author: { type: 'text' },
        role: { type: 'text' },
        image: { type: 'text' },
        rating: { type: 'text' },
      },
    },
  },
  defaultProps: {
    title: 'What Customers Say',
    testimonials: [
      { quote: 'Amazing product!', author: 'Alice', role: 'CEO', image: '', rating: '5' },
      { quote: 'Great support team', author: 'Bob', role: 'Founder', image: '', rating: '5' },
      { quote: 'Best investment ever', author: 'Carol', role: 'Manager', image: '', rating: '5' },
    ],
  },
  render: ({ title, testimonials }: any) => (
    <div className="py-24 px-6">
      <Container>
        <Text variant="h2" className="text-center mb-16">{title}</Text>
        <Grid cols={3} gap="lg" className="md:grid-cols-1 lg:grid-cols-3">
          {testimonials?.map((testimonial: any, i: number) => (
            <Surface key={i} variant="glass" padding="lg" rounded="xl">
              <div className="flex gap-1 mb-4">
                {[...Array(parseInt(testimonial.rating) || 5)].map((_, j) => (
                  <span key={j} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-white mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                {testimonial.image && <img src={testimonial.image} alt={testimonial.author} className="w-10 h-10 rounded-full" />}
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-xs text-neutral-400">{testimonial.role}</p>
                </div>
              </div>
            </Surface>
          ))}
        </Grid>
      </Container>
    </div>
  ),
};

// ============ CONTACT FORM BLOCK ============

export const ContactFormBlock = {
  fields: {
    title: { type: 'text' },
    description: { type: 'textarea' },
    buttonText: { type: 'text' },
    backgroundColor: { type: 'text' },
  },
  defaultProps: {
    title: 'Get In Touch',
    description: 'We\'d love to hear from you',
    buttonText: 'Send Message',
    backgroundColor: 'rgba(94, 106, 210, 0.05)',
  },
  render: ({ title, description, buttonText, backgroundColor }: any) => (
    <div style={{ backgroundColor }} className="py-24 px-6">
      <Container size="md">
        <div className="text-center mb-8">
          <Text variant="h2" className="mb-4">{title}</Text>
          <Text variant="bodyLarge" color="secondary">{description}</Text>
        </div>
        <form className="space-y-6">
          <input type="text" placeholder="Your name" className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-brand-purple" />
          <input type="email" placeholder="Your email" className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-brand-purple" />
          <textarea placeholder="Your message" rows={5} className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-brand-purple" />
          <Button fullWidth size="lg">{buttonText}</Button>
        </form>
      </Container>
    </div>
  ),
};

// ============ INTEGRATED BLOCKS ============

export const puckBlocksExtended = {
  // New blocks
  HeroImage: HeroImageBlock,
  FeatureFour: FeatureFourBlock,
  Comparison: ComparisonBlock,
  Benefits: BenefitsBlock,
  Team: TeamBlock,
  Timeline: TimelineBlock,
  Counter: CounterBlock,
  TestimonialGrid: TestimonialGridBlock,
  ContactForm: ContactFormBlock,
};
