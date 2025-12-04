'use client';

import React from 'react';
import { Container, FlexBox, Grid, Stack, Surface, Divider } from '@/atomic-design-system/atoms/layout';
import { Text } from '@/atomic-design-system/atoms/text';
import { Button } from '@/atomic-design-system/atoms/button';
import { cn } from '@/lib/utils';

// ============ HEADER/NAVBAR ============

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  logo?: string;
  title?: string;
  navLinks?: NavLink[];
  rightContent?: React.ReactNode;
  sticky?: boolean;
  variant?: 'default' | 'glass' | 'transparent';
}

export function Header({
  logo,
  title = 'sitewise.dev',
  navLinks = [],
  rightContent,
  sticky = false,
  variant = 'glass',
}: HeaderProps) {
  const variantClasses = {
    default: 'bg-neutral-950 border-b border-neutral-800',
    glass: 'bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/50',
    transparent: 'bg-transparent',
  };

  return (
    <header
      className={cn(
        'py-4 px-6',
        sticky && 'sticky top-0 z-50',
        variantClasses[variant]
      )}
    >
      <Container>
        <FlexBox justify="between" align="center" gap="lg">
          <FlexBox align="center" gap="md">
            {logo && <img src={logo} alt="Logo" className="h-8" />}
            <Text variant="h5">{title}</Text>
          </FlexBox>

          <FlexBox align="center" gap="lg" className="hidden md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white hover:text-brand-purple transition-colors"
              >
                {link.label}
              </a>
            ))}
          </FlexBox>

          {rightContent && <div>{rightContent}</div>}
        </FlexBox>
      </Container>
    </header>
  );
}

// ============ FOOTER ============

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  sections: FooterSection[];
  copyright?: string;
  socialLinks?: { icon: string; url: string }[];
}

export function Footer({ sections, copyright = '© 2024 sitewise.dev', socialLinks }: FooterProps) {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-16 px-6">
      <Container>
        <Grid cols={4} gap="xl" className="mb-12 md:grid-cols-1 lg:grid-cols-4">
          {sections.map((section, i) => (
            <div key={i}>
              <Text variant="h6" className="mb-4 text-white">{section.title}</Text>
              <Stack spacing="sm">
                {section.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-neutral-400 hover:text-brand-purple transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </Stack>
            </div>
          ))}
        </Grid>

        <Divider />

          <FlexBox justify="between" align="center" className="pt-8">
          <Text variant="caption" color="secondary">{copyright}</Text>
          {socialLinks && (
            <FlexBox gap="md">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.url} className="text-neutral-400 hover:text-brand-purple">
                  {social.icon}
                </a>
              ))}
            </FlexBox>
          )}
        </FlexBox>
      </Container>
    </footer>
  );
}

// ============ SIDEBAR LAYOUT ============

export interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
  sidebarWidth?: 'narrow' | 'normal' | 'wide';
}

export function SidebarLayout({
  sidebar,
  content,
  sidebarWidth = 'normal',
}: SidebarLayoutProps) {
  const widthClasses = {
    narrow: 'md:w-56',
    normal: 'md:w-64',
    wide: 'md:w-80',
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-screen">
      <aside className={cn('w-full md:flex-shrink-0 md:overflow-y-auto', widthClasses[sidebarWidth])}>
        {sidebar}
      </aside>
      <main className="flex-1 min-h-0">
        {content}
      </main>
    </div>
  );
}

// ============ TWO COLUMN LAYOUT ============

export interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftWidth?: 'narrow' | 'normal' | 'wide' | 'equal';
}

export function TwoColumnLayout({
  left,
  right,
  leftWidth = 'equal',
}: TwoColumnLayoutProps) {
  const cols = leftWidth === 'equal' ? 2 : 3;

  return (
    <Grid cols={cols} gap="lg" className="md:grid-cols-1 lg:grid-cols-2">
      <div>{left}</div>
      <div>{right}</div>
    </Grid>
  );
}

// ============ CARD GRID ============

export interface CardGridProps {
  items: React.ReactNode[];
  columns?: 2 | 3 | 4 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export function CardGrid({ items, columns = 3, gap = 'lg' }: CardGridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const gridClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
  };

  const responsiveClasses = {
    2: 'md:grid-cols-1 lg:grid-cols-2',
    3: 'md:grid-cols-1 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
    6: 'md:grid-cols-2 lg:grid-cols-6',
  };

  return (
    <div className={cn('grid', gridClasses[columns], gapClasses[gap], responsiveClasses[columns])}>
      {items.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </div>
  );
}

// ============ DASHBOARD WIDGET ============

export interface DashboardWidgetProps {
  title: string;
  value?: string | number;
  icon?: React.ReactNode;
  change?: { value: number; direction: 'up' | 'down' };
  children?: React.ReactNode;
  action?: React.ReactNode;
}

export function DashboardWidget({
  title,
  value,
  icon,
  change,
  children,
  action,
}: DashboardWidgetProps) {
  const changeColor = change?.direction === 'up' ? 'text-green-400' : 'text-red-400';

  return (
    <Surface variant="glass" padding="lg" rounded="lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-3xl">{icon}</div>}
          <Text variant="h6">{title}</Text>
        </div>
        {action}
      </div>

      {value && (
        <div className="mb-4">
          <Text variant="h3" className="text-white mb-1">{value}</Text>
          {change && (
            <Text variant="caption" className={changeColor}>
              {change.direction === 'up' ? '↑' : '↓'} {Math.abs(change.value)}%
            </Text>
          )}
        </div>
      )}

      {children}
    </Surface>
  );
}

// ============ VERTICAL STEPPER ============

export interface Step {
  number: number;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'pending';
}

export interface VerticalStepperProps {
  steps: Step[];
}

export function VerticalStepper({ steps }: VerticalStepperProps) {
  return (
    <div className="space-y-8">
      {steps.map((step, i) => {
        const statusColors = {
          completed: 'bg-green-500',
          current: 'bg-brand-purple',
          pending: 'bg-neutral-700',
        };

        return (
          <div key={i} className="flex gap-6">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center font-bold text-white',
                  statusColors[step.status]
                )}
              >
                {step.status === 'completed' ? '✓' : step.number}
              </div>
              {i < steps.length - 1 && (
                <div className="w-1 h-16 bg-neutral-700 mt-2" />
              )}
            </div>
            <div className="pb-8">
              <Text variant="h5" className="mb-2">{step.title}</Text>
              {step.description && (
                <Text variant="body" color="secondary">{step.description}</Text>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============ MODAL/DIALOG ============

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Surface
        variant="glass"
        padding="lg"
        rounded="xl"
        className={cn('w-full', sizeClasses[size])}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <Text variant="h4">{title}</Text>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="mb-6">{children}</div>

        {actions && (
          <div className="flex gap-3 justify-end">
            {actions}
          </div>
        )}
      </Surface>
    </div>
  );
}

// ============ BREADCRUMB NAV ============

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface BreadcrumbNavProps {
  items: Breadcrumb[];
  separator?: string;
}

export function BreadcrumbNav({ items, separator = '/' }: BreadcrumbNavProps) {
  return (
    <FlexBox align="center" gap="sm" className="text-sm">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {item.href ? (
            <a href={item.href} className="text-brand-purple hover:underline">
              {item.label}
            </a>
          ) : (
            <span className="text-neutral-400">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="text-neutral-600">{separator}</span>}
        </React.Fragment>
      ))}
    </FlexBox>
  );
}

// ============ FEATURE HIGHLIGHT ============

export interface FeatureHighlightProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  imagePosition?: 'left' | 'right';
  cta?: { label: string; href: string };
  highlight?: 'blue' | 'purple' | 'pink';
}

export function FeatureHighlight({
  icon,
  title,
  description,
  image,
  imagePosition = 'right',
  cta,
  highlight = 'purple',
}: FeatureHighlightProps) {
  const highlightClasses = {
    blue: 'border-brand-blue',
    purple: 'border-brand-purple',
    pink: 'border-brand-pink',
  };

  const content = (
    <div className={cn('pl-6 border-l-4', highlightClasses[highlight])}>
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <Text variant="h3" className="mb-3">{title}</Text>
      <Text variant="body" color="secondary" className="mb-6">
        {description}
      </Text>
      {cta && (
        <a href={cta.href}>
          <Button variant="outline" size="sm">
            {cta.label}
          </Button>
        </a>
      )}
    </div>
  );

  if (!image) return content;

  return (
    <Grid cols={2} gap="xl" className="items-center md:grid-cols-1 lg:grid-cols-2">
      {imagePosition === 'left' && <img src={image} alt={title} className="rounded-lg w-full" />}
      {content}
      {imagePosition === 'right' && <img src={image} alt={title} className="rounded-lg w-full" />}
    </Grid>
  );
}

// ============ STATS ROW ============

export interface StatItem {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: { direction: 'up' | 'down'; value: number };
}

export interface StatsRowProps {
  stats: StatItem[];
  layout?: 'horizontal' | 'vertical';
}

export function StatsRow({ stats, layout = 'horizontal' }: StatsRowProps) {
  const rowClass = layout === 'horizontal' ? 'flex gap-8' : 'grid grid-cols-2 gap-8 md:grid-cols-1 lg:grid-cols-2';

  return (
    <div className={rowClass}>
      {stats.map((stat, i) => (
        <div key={i} className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {stat.icon && <span className="text-2xl">{stat.icon}</span>}
            <Text variant="h3" className="text-brand-purple">
              {stat.value}
            </Text>
            {stat.trend && (
              <span className={stat.trend.direction === 'up' ? 'text-green-400' : 'text-red-400'}>
                {stat.trend.direction === 'up' ? '↑' : '↓'} {stat.trend.value}%
              </span>
            )}
          </div>
          <Text variant="body" color="secondary">{stat.label}</Text>
        </div>
      ))}
    </div>
  );
}

// ============ TABS COMPONENT ============

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  variant?: 'line' | 'button' | 'pill';
  defaultTab?: string;
}

export function Tabs({ tabs, variant = 'line', defaultTab }: TabsProps) {
  const [active, setActive] = React.useState(defaultTab || tabs[0]?.id);

  const tabVariants = {
    line: 'border-b-2 pb-3 border-transparent hover:border-brand-purple/50 data-[active=true]:border-brand-purple data-[active=true]:text-brand-purple',
    button: 'px-4 py-2 rounded-lg hover:bg-neutral-800 data-[active=true]:bg-brand-purple data-[active=true]:text-white',
    pill: 'px-6 py-2 rounded-full hover:bg-neutral-800/50 data-[active=true]:bg-brand-purple data-[active=true]:text-white',
  };

  return (
    <div>
      <div className="flex gap-4 border-b border-neutral-800 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            data-active={active === tab.id}
            className={cn(
              'flex items-center gap-2 text-white transition-colors',
              tabVariants[variant]
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {tabs.find((tab) => tab.id === active)?.content}
      </div>
    </div>
  );
}
