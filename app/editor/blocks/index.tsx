/* eslint-disable react/display-name */
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Text, GradientText } from '@/atomic-design-system/atoms/text';
import { Surface, Container, FlexBox, Grid, Stack } from '@/atomic-design-system/atoms/layout';
import { Button } from '@/atomic-design-system/atoms/button';
import { Spacer, Divider } from '@/atomic-design-system/atoms/layout';
import { Badge } from '@/atomic-design-system/atoms/badge';

// ============ SECTION BLOCK ============

export const SectionBlock = {
  fields: {
    title: { type: 'text' },
    subtitle: { type: 'textarea' },
    backgroundColor: { type: 'text' },
    padding: {
      type: 'select',
      options: [
        { label: 'None', value: '0' },
        { label: 'Small', value: '1' },
        { label: 'Medium', value: '2' },
        { label: 'Large', value: '3' },
        { label: 'Extra Large', value: '4' },
      ],
    },
  },
  defaultProps: {
    title: 'Section Title',
    subtitle: 'Add your section subtitle here',
    backgroundColor: 'transparent',
    padding: '2',
  },
    render: ({ title, subtitle, backgroundColor, padding }: any) => {
    const paddingMap = { '0': 'py-0', '1': 'py-8', '2': 'py-16', '3': 'py-24', '4': 'py-32' };
    const paddingClass = paddingMap[padding as keyof typeof paddingMap] || paddingMap['2'];
    return (
      <div style={{ backgroundColor }} className={cn('w-full', paddingClass)}>
        <Container>
          {title && <Text variant="h2" className="mb-4 text-center">{title}</Text>}
          {subtitle && <Text variant="bodyLarge" color="secondary" className="text-center max-w-2xl mx-auto">{subtitle}</Text>}
        </Container>
      </div>
    );
  },
};

// ============ HERO BLOCK ============

export const HeroBlock = {
  fields: {
    headline: { type: 'text' },
    subheading: { type: 'textarea' },
    badge: { type: 'text' },
    primaryCta: { type: 'text' },
    secondaryCta: { type: 'text' },
    ctaUrl1: { type: 'text' },
    ctaUrl2: { type: 'text' },
    align: { type: 'select', options: [{ label: 'Center', value: 'center' }, { label: 'Left', value: 'left' }] },
    backgroundImage: { type: 'text' },
    minHeight: { type: 'text' },
  },
  defaultProps: {
    headline: 'Build Autonomous Companies at Scale',
    subheading: 'sitewise.dev is a production-ready Next.js template.',
    badge: 'Q1 2026: Launching 3rd Portfolio Company',
    primaryCta: 'Apply as Founder',
    secondaryCta: 'Explore Portfolio',
    ctaUrl1: '#',
    ctaUrl2: '#',
    align: 'center',
    backgroundImage: '',
    minHeight: '600px',
  },
  render: ({ headline, subheading, badge, primaryCta, secondaryCta, ctaUrl1, ctaUrl2, align, backgroundImage, minHeight }: any) => (
    <div
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight,
      }}
      className="relative w-full flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 py-24 px-6 text-center">
        {badge && <div className="mb-6 text-sm font-semibold text-brand-purple inline-block px-4 py-2 rounded-full bg-brand-purple/10">{badge}</div>}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">{headline}</h1>
        <p className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-3xl mx-auto">{subheading}</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href={ctaUrl1}>
            <Button size="lg" variant="glow">{primaryCta}</Button>
          </a>
          <a href={ctaUrl2}>
            <Button size="lg" variant="outline">{secondaryCta}</Button>
          </a>
        </div>
      </div>
    </div>
  ),
};

// ============ IMAGE BLOCK ============

export const ImageBlock = {
  fields: {
    src: { type: 'text' },
    alt: { type: 'text' },
    width: { type: 'text' },
    height: { type: 'text' },
    objectFit: { type: 'select', options: [{ label: 'Cover', value: 'cover' }, { label: 'Contain', value: 'contain' }, { label: 'Fill', value: 'fill' }] },
    rounded: { type: 'select', options: [{ label: 'None', value: 'none' }, { label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }] },
    shadow: { type: 'select', options: [{ label: 'None', value: 'none' }, { label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }] },
    caption: { type: 'text' },
  },
  defaultProps: {
    src: 'https://images.unsplash.com/photo-1579353977991-dab046d9c881?w=800',
    alt: 'Placeholder image',
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    rounded: 'lg',
    shadow: 'lg',
    caption: '',
  },
    render: ({ src, alt, width, height, objectFit, rounded, shadow, caption }: any) => {
    const roundedMap = { none: '', sm: 'rounded-md', md: 'rounded-lg', lg: 'rounded-2xl' };
    const shadowMap = { none: '', sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-2xl' };
    const roundedClass = roundedMap[rounded as keyof typeof roundedMap] || '';
    const shadowClass = shadowMap[shadow as keyof typeof shadowMap] || '';
    return (
      <div className="py-8 px-6">
        <div className={cn('overflow-hidden', roundedClass, shadowClass)}>
          <img src={src} alt={alt} style={{ width, height, objectFit }} className="w-full h-full" />
        </div>
        {caption && <p className="text-sm text-neutral-400 mt-4 text-center">{caption}</p>}
      </div>
    );
  },
};

// ============ GRID SECTION BLOCK ============

export const GridSectionBlock = {
  fields: {
    columns: { type: 'select', options: [{ label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }] },
    title: { type: 'text' },
    items: {
      type: 'array',
      arrayFields: {
        icon: { type: 'text' },
        title: { type: 'text' },
        description: { type: 'textarea' },
      },
    },
  },
  defaultProps: {
    columns: '3',
    title: 'Grid Section',
    items: [
      { icon: '⚡', title: 'Fast', description: 'Lightning quick performance' },
      { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
      { icon: '♾️', title: 'Scalable', description: 'Grows with your needs' },
    ],
  },
  render: ({ columns, title, items }: any) => (
    <div className="py-24 px-6">
      <Container>
        {title && <Text variant="h2" className="text-center mb-12">{title}</Text>}
        <div className={cn('grid gap-6', {
          'grid-cols-1 md:grid-cols-2': columns === '2',
          'grid-cols-1 md:grid-cols-3': columns === '3',
          'grid-cols-1 md:grid-cols-4': columns === '4',
        })}>
          {items?.map((item: any, i: number) => (
            <Surface key={i} variant="glass" padding="lg" rounded="lg">
              {item.icon && <div className="text-4xl mb-4">{item.icon}</div>}
              <Text variant="h4" className="mb-2">{item.title}</Text>
              <Text variant="bodySmall" color="secondary">{item.description}</Text>
            </Surface>
          ))}
        </div>
      </Container>
    </div>
  ),
};

// ============ PRICING TABLE BLOCK ============

export const PricingTableBlock = {
  fields: {
    title: { type: 'text' },
    plans: {
      type: 'array',
      arrayFields: {
        name: { type: 'text' },
        price: { type: 'text' },
        description: { type: 'text' },
        features: { type: 'text' },
        cta: { type: 'text' },
        highlighted: { type: 'select', options: [{ label: 'No', value: 'false' }, { label: 'Yes', value: 'true' }] },
      },
    },
  },
  defaultProps: {
    title: 'Simple, Transparent Pricing',
    plans: [
      { name: 'Starter', price: '$29', description: 'For individuals', features: 'Feature 1\nFeature 2\nFeature 3', cta: 'Get Started', highlighted: 'false' },
      { name: 'Pro', price: '$99', description: 'For teams', features: 'All Starter features\nAdvanced analytics\nPriority support', cta: 'Choose Plan', highlighted: 'true' },
      { name: 'Enterprise', price: 'Custom', description: 'For organizations', features: 'All Pro features\nCustom integration\nDedicated support', cta: 'Contact Sales', highlighted: 'false' },
    ],
  },
  render: ({ title, plans }: any) => (
    <div className="py-24 px-6">
      <Container>
        {title && <Text variant="h2" className="text-center mb-12">{title}</Text>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans?.map((plan: any, i: number) => (
            <Surface
              key={i}
              variant={plan.highlighted === 'true' ? 'solid' : 'glass'}
              padding="lg"
              rounded="xl"
              className={plan.highlighted === 'true' ? 'border-2 border-brand-purple' : ''}
            >
              {plan.highlighted === 'true' && <div className="mb-3 inline-block px-3 py-1 bg-brand-purple/20 text-brand-purple text-xs font-bold rounded-full">POPULAR</div>}
              <Text variant="h4" className="mb-2">{plan.name}</Text>
              <Text variant="bodySmall" color="secondary" className="mb-6">{plan.description}</Text>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features?.split('\n').map((feature: string, fi: number) => (
                  <li key={fi} className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button fullWidth variant={plan.highlighted === 'true' ? 'glow' : 'outline'}>
                {plan.cta}
              </Button>
            </Surface>
          ))}
        </div>
      </Container>
    </div>
  ),
};

// ============ TESTIMONIALS BLOCK ============

export const TestimonialsBlock = {
  fields: {
    title: { type: 'text' },
    testimonials: {
      type: 'array',
      arrayFields: {
        quote: { type: 'textarea' },
        author: { type: 'text' },
        role: { type: 'text' },
        image: { type: 'text' },
      },
    },
  },
  defaultProps: {
    title: 'What Our Customers Say',
    testimonials: [
      { quote: 'This platform changed how we work.', author: 'Sarah', role: 'CEO', image: '' },
      { quote: 'Incredible product and even better support.', author: 'John', role: 'Founder', image: '' },
    ],
  },
  render: ({ title, testimonials }: any) => (
    <div className="py-24 px-6">
      <Container>
        {title && <Text variant="h2" className="text-center mb-12">{title}</Text>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials?.map((testimonial: any, i: number) => (
            <Surface key={i} variant="glass" padding="lg" rounded="lg">
              <Text variant="body" color="secondary" className="mb-4 italic">"{testimonial.quote}"</Text>
              <div className="flex items-center gap-3">
                {testimonial.image && <img src={testimonial.image} alt={testimonial.author} className="w-10 h-10 rounded-full" />}
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-xs text-neutral-400">{testimonial.role}</p>
                </div>
              </div>
            </Surface>
          ))}
        </div>
      </Container>
    </div>
  ),
};

// ============ LOGO CLOUD BLOCK ============

export const LogoCloudBlock = {
  fields: {
    title: { type: 'text' },
    logos: {
      type: 'array',
      arrayFields: {
        name: { type: 'text' },
        src: { type: 'text' },
      },
    },
  },
  defaultProps: {
    title: 'Trusted by leading companies',
    logos: [
      { name: 'Company 1', src: 'https://via.placeholder.com/150x50?text=Company+1' },
      { name: 'Company 2', src: 'https://via.placeholder.com/150x50?text=Company+2' },
    ],
  },
  render: ({ title, logos }: any) => (
    <div className="py-16 px-6">
      <Container>
        {title && <Text variant="h4" className="text-center mb-12 text-neutral-400">{title}</Text>}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {logos?.map((logo: any, i: number) => (
            <div key={i} className="flex items-center justify-center h-12">
              <img src={logo.src} alt={logo.name} className="h-full object-contain opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ),
};

// ============ FAQ BLOCK ============

export const FAQBlock = {
  fields: {
    title: { type: 'text' },
    faqs: {
      type: 'array',
      arrayFields: {
        question: { type: 'text' },
        answer: { type: 'textarea' },
      },
    },
  },
  defaultProps: {
    title: 'Frequently Asked Questions',
    faqs: [
      { question: 'How do I get started?', answer: 'Getting started is easy. Sign up for an account and follow our onboarding guide.' },
      { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.' },
    ],
  },
  render: ({ title, faqs }: any) => (
    <div className="py-24 px-6">
      <Container size="md">
        {title && <Text variant="h2" className="text-center mb-12">{title}</Text>}
        <div className="space-y-4">
          {faqs?.map((faq: any, i: number) => (
            <details key={i}>
              <summary className="py-4 px-6 cursor-pointer bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-800 font-semibold text-white transition-colors">
                {faq.question}
              </summary>
              <div className="py-4 px-6 bg-neutral-950 border border-t-0 border-neutral-800 rounded-b-lg text-neutral-300">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </div>
  ),
};

// ============ NEWSLETTER BLOCK ============

export const NewsletterBlock = {
  fields: {
    title: { type: 'text' },
    description: { type: 'textarea' },
    placeholder: { type: 'text' },
    buttonText: { type: 'text' },
    backgroundColor: { type: 'text' },
  },
  defaultProps: {
    title: 'Subscribe to Our Newsletter',
    description: 'Get the latest updates delivered to your inbox.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    backgroundColor: 'rgba(94, 106, 210, 0.1)',
  },
  render: ({ title, description, placeholder, buttonText, backgroundColor }: any) => (
    <div style={{ backgroundColor }} className="py-24 px-6">
      <Container size="md">
        <div className="text-center">
          {title && <Text variant="h2" className="mb-4">{title}</Text>}
          {description && <Text variant="bodyLarge" color="secondary" className="mb-8">{description}</Text>}
          <div className="flex gap-2">
            <input
              type="email"
              placeholder={placeholder}
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-brand-purple"
            />
            <Button>{buttonText}</Button>
          </div>
        </div>
      </Container>
    </div>
  ),
};

// ============ TWO COLUMN BLOCK ============

export const TwoColumnBlock = {
  fields: {
    title: { type: 'text' },
    leftTitle: { type: 'text' },
    leftContent: { type: 'textarea' },
    rightTitle: { type: 'text' },
    rightContent: { type: 'textarea' },
    imageLeft: { type: 'text' },
    imageRight: { type: 'text' },
  },
  defaultProps: {
    title: 'Two Column Section',
    leftTitle: 'Left Column',
    leftContent: 'Add your left column content here',
    rightTitle: 'Right Column',
    rightContent: 'Add your right column content here',
    imageLeft: '',
    imageRight: 'https://images.unsplash.com/photo-1579353977991-dab046d9c881?w=500',
  },
  render: ({ title, leftTitle, leftContent, rightTitle, rightContent, imageLeft, imageRight }: any) => (
    <div className="py-24 px-6">
      <Container>
        {title && <Text variant="h2" className="text-center mb-12">{title}</Text>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            {leftTitle && <Text variant="h3" className="mb-4">{leftTitle}</Text>}
            {leftContent && <Text variant="body" color="secondary" className="mb-6">{leftContent}</Text>}
            {imageLeft && <img src={imageLeft} alt="Left" className="w-full rounded-lg" />}
          </div>
          <div>
            {rightTitle && <Text variant="h3" className="mb-4">{rightTitle}</Text>}
            {rightContent && <Text variant="body" color="secondary" className="mb-6">{rightContent}</Text>}
            {imageRight && <img src={imageRight} alt="Right" className="w-full rounded-lg" />}
          </div>
        </div>
      </Container>
    </div>
  ),
};

// ============ CALL TO ACTION BLOCK ============

export const CTABlock = {
  fields: {
    headline: { type: 'text' },
    description: { type: 'textarea' },
    primaryBtn: { type: 'text' },
    secondaryBtn: { type: 'text' },
    primaryUrl: { type: 'text' },
    secondaryUrl: { type: 'text' },
    alignment: { type: 'select', options: [{ label: 'Center', value: 'center' }, { label: 'Left', value: 'left' }] },
  },
  defaultProps: {
    headline: 'Ready to Get Started?',
    description: 'Join thousands of companies using our platform.',
    primaryBtn: 'Get Started',
    secondaryBtn: 'Learn More',
    primaryUrl: '#',
    secondaryUrl: '#',
    alignment: 'center',
  },
  render: ({ headline, description, primaryBtn, secondaryBtn, primaryUrl, secondaryUrl, alignment }: any) => (
    <div className="py-16 px-6">
      <Container>
        <Surface variant="glass" padding="xl" rounded="2xl" className="text-center">
          {headline && <Text variant="h2" className="mb-4">{headline}</Text>}
          {description && <Text variant="bodyLarge" color="secondary" className="mb-8 max-w-2xl mx-auto">{description}</Text>}
          <div className="flex gap-4 justify-center flex-wrap">
            <a href={primaryUrl}>
              <Button size="lg">{primaryBtn}</Button>
            </a>
            <a href={secondaryUrl}>
              <Button size="lg" variant="outline">{secondaryBtn}</Button>
            </a>
          </div>
        </Surface>
      </Container>
    </div>
  ),
};

// ============ STATS SECTION BLOCK ============

export const StatsBlock = {
  fields: {
    title: { type: 'text' },
    stats: {
      type: 'array',
      arrayFields: {
        value: { type: 'text' },
        label: { type: 'text' },
      },
    },
  },
  defaultProps: {
    title: 'Our Impact',
    stats: [
      { value: '1000+', label: 'Companies' },
      { value: '500M+', label: 'Users' },
      { value: '99.9%', label: 'Uptime' },
    ],
  },
  render: ({ title, stats }: any) => (
    <div className="py-24 px-6 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10">
      <Container>
        {title && <Text variant="h2" className="text-center mb-12">{title}</Text>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats?.map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <Text variant="h2" className="text-brand-purple mb-2">{stat.value}</Text>
              <Text variant="body" color="secondary">{stat.label}</Text>
            </div>
          ))}
        </div>
      </Container>
    </div>
  ),
};

export const puckBlocks = {
  Section: SectionBlock,
  Hero: HeroBlock,
  Image: ImageBlock,
  GridSection: GridSectionBlock,
  PricingTable: PricingTableBlock,
  Testimonials: TestimonialsBlock,
  LogoCloud: LogoCloudBlock,
  FAQ: FAQBlock,
  Newsletter: NewsletterBlock,
  TwoColumn: TwoColumnBlock,
  CTA: CTABlock,
  Stats: StatsBlock,
};
