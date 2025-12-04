'use client';

import React from 'react';
import { Container, Grid, Stack } from '@/components/atoms/layout';
import { Text, GradientText } from '@/components/atoms/text';
import { Button } from '@/components/atoms/button';
import {
  Header,
  Footer,
  SidebarLayout,
  BreadcrumbNav,
  FeatureHighlight,
  StatsRow,
  VerticalStepper,
  Tabs,
} from '@/components/organisms';
import { Surface } from '@/components/atoms/layout';

// ============ LANDING PAGE TEMPLATE ============

export function LandingPageTemplate() {
  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Security', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Docs', href: '#' },
        { label: 'API', href: '#' },
        { label: 'Support', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Cookies', href: '#' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header
        title="sitewise.dev"
        navLinks={navLinks}
        rightContent={<Button size="sm">Sign In</Button>}
        sticky
      />

      {/* Hero Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-brand-purple/10 to-transparent">
        <Container size="xl">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div>
              <GradientText gradient="purple-blue" className="block text-6xl font-bold mb-4">
                Build Amazing Products
              </GradientText>
              <Text variant="bodyLarge" color="secondary">
                Create, scale, and grow with our powerful platform. Everything you need to succeed.
              </Text>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg">Get Started Free</Button>
              <Button variant="outline" size="lg">Watch Demo</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <Container>
          <Text variant="h2" className="text-center mb-16">Why Choose Us</Text>
          <Grid cols={3} gap="lg" className="md:grid-cols-1 lg:grid-cols-3">
            {[
              { icon: '⚡', title: 'Fast', desc: 'Lightning quick performance' },
              { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security' },
              { icon: '♾️', title: 'Scalable', desc: 'Grows with your needs' },
            ].map((feature, i) => (
              <Surface key={i} variant="glass" padding="lg" rounded="xl">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <Text variant="h5" className="mb-3">{feature.title}</Text>
                <Text variant="bodySmall" color="secondary">{feature.desc}</Text>
              </Surface>
            ))}
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20">
        <Container>
          <div className="text-center space-y-6">
            <Text variant="h2">Ready to get started?</Text>
            <Text variant="bodyLarge" color="secondary">
              Join thousands of happy customers using our platform.
            </Text>
            <Button size="lg">Start Free Trial</Button>
          </div>
        </Container>
      </section>

      <Footer
        sections={footerSections}
        copyright="© 2024 sitewise.dev. Open source under MIT License."
        socialLinks={[
          { icon: '𝕏', url: '#' },
          { icon: '💼', url: '#' },
          { icon: '▶️', url: '#' },
        ]}
      />
    </div>
  );
}

// ============ PRODUCT PAGE TEMPLATE ============

export function ProductPageTemplate() {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '📋',
      content: (
        <div className="space-y-6">
          <Text variant="body" color="secondary">
            Our product is designed to help you build amazing things. With a focus on simplicity and power, we provide all the tools you need.
          </Text>
          <Text variant="body" color="secondary">
            Whether you're just starting out or scaling to enterprise, we have the right solution for you.
          </Text>
        </div>
      ),
    },
    {
      id: 'features',
      label: 'Features',
      icon: '✨',
      content: (
        <Stack spacing="lg">
          {['Real-time collaboration', 'Advanced analytics', 'Custom integrations', 'API access'].map((feature, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-brand-purple">✓</span>
              <Text variant="body">{feature}</Text>
            </div>
          ))}
        </Stack>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header title="sitewise.dev" sticky />

      <div className="py-8 px-6 border-b border-neutral-800">
        <Container>
          <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Overview' }]} />
        </Container>
      </div>

      {/* Hero */}
      <section className="py-24 px-6">
        <Container size="xl">
          <Grid cols={2} gap="xl" className="items-center md:grid-cols-1 lg:grid-cols-2">
            <div>
              <Text variant="h1" className="mb-6">
                <GradientText gradient="purple-blue">Powerful Features</GradientText>
              </Text>
              <Text variant="bodyLarge" color="secondary" className="mb-8">
                Everything you need to build, deploy, and scale your product faster than ever before.
              </Text>
              <Button size="lg">Get Started</Button>
            </div>
            <div className="bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 rounded-2xl aspect-square flex items-center justify-center">
              <span className="text-6xl">🚀</span>
            </div>
          </Grid>
        </Container>
      </section>

      {/* Tabs */}
      <section className="py-24 px-6">
        <Container>
          <Tabs tabs={tabs} variant="button" />
        </Container>
      </section>

      <Footer
        sections={[
          { title: 'Product', links: [{ label: 'Features', href: '#' }] },
          { title: 'Company', links: [{ label: 'About', href: '#' }] },
        ]}
      />
    </div>
  );
}

// ============ DOCUMENTATION PAGE TEMPLATE ============

export function DocPageTemplate() {
  const sidebar = (
    <div className="space-y-4">
      <div>
        <Text variant="caption" color="secondary" className="uppercase font-bold mb-3">Getting Started</Text>
        <Stack spacing="sm">
          {['Installation', 'Quick Start', 'Configuration'].map((item, i) => (
            <a key={i} href="#" className="text-neutral-400 hover:text-brand-purple text-sm">
              {item}
            </a>
          ))}
        </Stack>
      </div>
      <div>
        <Text variant="caption" color="secondary" className="uppercase font-bold mb-3">Guides</Text>
        <Stack spacing="sm">
          {['Authentication', 'Deployment', 'Performance'].map((item, i) => (
            <a key={i} href="#" className="text-neutral-400 hover:text-brand-purple text-sm">
              {item}
            </a>
          ))}
        </Stack>
      </div>
    </div>
  );

  const content = (
    <Stack spacing="lg">
      <div>
        <Text variant="h1" className="mb-4">Installation Guide</Text>
        <Text variant="body" color="secondary" className="mb-6">
          Get started with our platform in just a few minutes.
        </Text>
      </div>

      <Surface variant="glass" padding="lg" rounded="lg">
        <Text variant="caption" color="secondary" className="uppercase">Command Line</Text>
        <pre className="bg-neutral-900 p-4 rounded mt-2 overflow-x-auto">
          <code className="text-green-400">npm install @sitewise/sdk</code>
        </pre>
      </Surface>

      <div>
        <Text variant="h3" className="mb-4">Next Steps</Text>
        <VerticalStepper
          steps={[
            { number: 1, title: 'Configure API Key', status: 'completed' },
            { number: 2, title: 'Set up authentication', status: 'current' },
            { number: 3, title: 'Make your first request', status: 'pending' },
          ]}
        />
      </div>
    </Stack>
  );

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header title="Docs" sticky />

      <div className="py-8 px-6 border-b border-neutral-800">
        <Container>
          <BreadcrumbNav items={[{ label: 'Docs' }, { label: 'Getting Started' }]} />
        </Container>
      </div>

      <div className="py-12 px-6">
        <Container size="xl">
          <SidebarLayout sidebar={sidebar} content={content} sidebarWidth="narrow" />
        </Container>
      </div>

      <Footer sections={[{ title: 'Docs', links: [{ label: 'API Reference', href: '#' }] }]} />
    </div>
  );
}

// ============ DASHBOARD TEMPLATE ============

export function DashboardTemplate() {
  const sidebar = (
    <div className="space-y-2">
      {['Dashboard', 'Analytics', 'Users', 'Settings'].map((item, i) => (
        <a
          key={i}
          href="#"
          className="block px-4 py-2 rounded-lg text-neutral-400 hover:bg-brand-purple/10 hover:text-brand-purple"
        >
          {item}
        </a>
      ))}
    </div>
  );

  const content = (
    <Stack spacing="lg">
      <div>
        <BreadcrumbNav items={[{ label: 'Dashboard' }, { label: 'Overview' }]} />
      </div>

      <div>
        <Text variant="h2" className="mb-6">Welcome back!</Text>
        <StatsRow
          stats={[
            { value: '1,234', label: 'Total Revenue', icon: '💰', trend: { direction: 'up', value: 12 } },
            { value: '456', label: 'Active Users', icon: '👥', trend: { direction: 'up', value: 8 } },
            { value: '78%', label: 'Conversion Rate', icon: '📈', trend: { direction: 'down', value: 3 } },
          ]}
        />
      </div>

      <Grid cols={2} gap="lg" className="md:grid-cols-1 lg:grid-cols-2">
        <Surface variant="glass" padding="lg" rounded="lg">
          <Text variant="h5" className="mb-4">Recent Activity</Text>
          <Stack spacing="sm">
            {['New user signup', 'Payment received', 'Feature released'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-neutral-400">
                <span>•</span>
                <span>{item}</span>
              </div>
            ))}
          </Stack>
        </Surface>

        <Surface variant="glass" padding="lg" rounded="lg">
          <Text variant="h5" className="mb-4">Quick Actions</Text>
          <Stack spacing="sm">
            <Button fullWidth variant="outline" size="sm">Export Data</Button>
            <Button fullWidth variant="outline" size="sm">View Reports</Button>
          </Stack>
        </Surface>
      </Grid>
    </Stack>
  );

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header title="Dashboard" />

      <SidebarLayout sidebar={sidebar} content={<Container>{content}</Container>} />

      <Footer sections={[]} />
    </div>
  );
}

// ============ PRICING PAGE TEMPLATE ============

export function PricingPageTemplate() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'For individuals and small teams',
      features: ['Up to 5 projects', 'Basic analytics', 'Email support', '1 GB storage'],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing businesses',
      features: ['Unlimited projects', 'Advanced analytics', 'Priority support', '100 GB storage', 'Custom integrations'],
      cta: 'Try Free',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations',
      features: ['Everything in Pro', 'Dedicated account manager', 'SLA guarantee', 'Unlimited storage', 'On-premise option'],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header title="Pricing" sticky />

      <section className="py-24 px-6">
        <Container>
          <div className="text-center mb-16 space-y-4">
            <Text variant="h1">Simple, Transparent Pricing</Text>
            <Text variant="bodyLarge" color="secondary">
              Choose the perfect plan for your needs. Always flexible to scale.
            </Text>
          </div>

          <Grid cols={3} gap="lg" className="md:grid-cols-1 lg:grid-cols-3">
            {plans.map((plan, i) => (
                <Surface
                key={i}
                variant={plan.highlighted ? 'solid' : 'glass'}
                padding="lg"
                rounded="xl"
                className={plan.highlighted ? 'border-2 border-brand-purple' : ''}
              >
                <Text variant="h5" className="mb-2">{plan.name}</Text>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-brand-purple">{plan.price}</span>
                  <span className="text-neutral-400">/{plan.period}</span>
                </div>
                <Text variant="bodySmall" color="secondary" className="mb-6">
                  {plan.description}
                </Text>
                <Stack spacing="sm" className="mb-6">
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex gap-2 text-sm">
                      <span className="text-brand-purple">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </Stack>
                <Button fullWidth variant={plan.highlighted ? 'glow' : 'outline'}>
                  {plan.cta}
                </Button>
              </Surface>
            ))}
          </Grid>
        </Container>
      </section>

      <Footer sections={[]} />
    </div>
  );
}

// ============ BLOG/ARTICLE TEMPLATE ============

export function ArticlePageTemplate({ title = 'Article Title' } = {}) {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Header title="Blog" sticky />

      <article className="py-12 px-6">
        <Container size="md">
          <BreadcrumbNav items={[{ label: 'Blog', href: '/blog' }, { label: title }]} />

          <div className="mt-8 space-y-8">
            <div>
              <Text variant="h1" className="mb-4">{title}</Text>
              <div className="flex gap-4 text-neutral-400 text-sm">
                <span>By John Doe</span>
                <span>•</span>
                <span>Jan 15, 2024</span>
                <span>•</span>
                <span>5 min read</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 rounded-2xl aspect-video flex items-center justify-center">
              <span className="text-8xl">📝</span>
            </div>

            <div className="space-y-6 prose prose-invert">
              <Text variant="body" color="secondary">
                This is an article template showcasing how content pages can be structured and styled. The layout provides a clean reading experience with proper typography and spacing.
              </Text>

              <Text variant="h3">Key Points</Text>
              <Stack spacing="md">
                {['Point one', 'Point two', 'Point three'].map((point, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-brand-purple">•</span>
                    <Text variant="body">{point}</Text>
                  </div>
                ))}
              </Stack>

              <Text variant="body" color="secondary">
                Conclusion text goes here. This provides a great reading experience with proper spacing and typography.
              </Text>
            </div>

            <div className="pt-8 border-t border-neutral-800 space-y-6">
              <Text variant="h4">Related Articles</Text>
              <Grid cols={3} gap="lg" className="md:grid-cols-1 lg:grid-cols-3">
                {['Article 1', 'Article 2', 'Article 3'].map((article, i) => (
                  <a key={i} href="#" className="group">
                    <Surface variant="glass" padding="lg" rounded="lg" className="h-full">
                      <Text variant="h6" className="group-hover:text-brand-purple">{article}</Text>
                    </Surface>
                  </a>
                ))}
              </Grid>
            </div>
          </div>
        </Container>
      </article>

      <Footer sections={[]} />
    </div>
  );
}
