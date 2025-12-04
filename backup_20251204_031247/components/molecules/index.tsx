'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Surface } from '@/components/atoms/layout';
import { Text } from '@/components/atoms/text';
import { Button } from '@/components/atoms/button';

// ============ INPUT GROUP ============

export interface InputGroupProps {
  type?: 'email' | 'password' | 'text' | 'number' | 'url';
  placeholder?: string;
  label?: string;
  error?: string;
  buttonLabel?: string;
  onSubmit?: (value: string) => void;
}

export function InputGroup({ type = 'text', placeholder, label, error, buttonLabel = 'Submit', onSubmit }: InputGroupProps) {
  const [value, setValue] = React.useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit?.(value);
      setValue('');
    }
  };

  return (
    <div className="w-full">
      {label && <Text variant="h6" className="mb-3">{label}</Text>}
      <div className="flex gap-2">
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className={cn(
            'flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500',
            'focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/30',
            error && 'border-red-500'
          )}
        />
        <Button onClick={handleSubmit}>{buttonLabel}</Button>
      </div>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
}

// ============ STAT CARD ============

export interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatCard({ label, value, change, icon, trend = 'neutral' }: StatCardProps) {
  const trendColor = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-neutral-400',
  }[trend];

  const trendIcon = {
    up: '↑',
    down: '↓',
    neutral: '→',
  }[trend];

  return (
    <Surface variant="glass" padding="md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-400 text-sm mb-2">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {change !== undefined && (
            <p className={cn('text-xs mt-2', trendColor)}>
              {trendIcon} {Math.abs(change)}% vs last period
            </p>
          )}
        </div>
        {icon && <div className="text-3xl text-brand-purple">{icon}</div>}
      </div>
    </Surface>
  );
}

// ============ FEATURE CARD ============

export interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  badges?: string[];
  action?: { label: string; onClick: () => void };
  hoverable?: boolean;
}

export function FeatureCard({ icon, title, description, badges, action, hoverable = true }: FeatureCardProps) {
  return (
    <Surface variant="glass" padding="lg" rounded="xl" hover={hoverable}>
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <Text variant="h4" className="mb-2">{title}</Text>
      <Text variant="bodySmall" color="secondary" className="mb-4">{description}</Text>
      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((badge, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-brand-purple/20 text-brand-purple">
              {badge}
            </span>
          ))}
        </div>
      )}
      {action && (
        <Button size="sm" variant="outline" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </Surface>
  );
}

// ============ TESTIMONIAL CARD ============

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
  company?: string;
  rating?: number;
}

export function TestimonialCard({ quote, author, role, image, company, rating }: TestimonialCardProps) {
  return (
    <Surface variant="glass" padding="lg" rounded="xl">
      {rating && (
        <div className="mb-3 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-neutral-600'}>
              ★
            </span>
          ))}
        </div>
      )}
      <p className="text-base text-white mb-4 leading-relaxed italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        {image && (
          <img src={image} alt={author} className="w-10 h-10 rounded-full object-cover" />
        )}
        <div>
          <p className="font-semibold text-white">{author}</p>
          <p className="text-sm text-neutral-400">
            {role} {company && `at ${company}`}
          </p>
        </div>
      </div>
    </Surface>
  );
}

// ============ PRICE CARD ============

export interface PriceCardProps {
  plan: string;
  price: string | number;
  period?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  cta?: { label: string; onClick: () => void };
}

export function PriceCard({ plan, price, period = 'month', description, features, highlighted = false, cta }: PriceCardProps) {
  return (
    <Surface
      variant={highlighted ? 'solid' : 'glass'}
      padding="lg"
      rounded="xl"
      className={highlighted ? 'border-2 border-brand-purple' : ''}
    >
      {highlighted && (
        <div className="mb-3 inline-block px-3 py-1 rounded-full bg-brand-purple/20 text-brand-purple text-xs font-semibold">
          POPULAR
        </div>
      )}
      <Text variant="h4" className="mb-1">{plan}</Text>
      {description && <Text variant="bodySmall" color="secondary" className="mb-4">{description}</Text>}
      <div className="mb-6">
        <span className="text-4xl font-bold text-white">${price}</span>
        {period && <span className="text-neutral-400 ml-2">/{period}</span>}
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-white">
            <span className="text-green-400">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      {cta && (
        <Button
          onClick={cta.onClick}
          variant={highlighted ? 'glow' : 'outline'}
          fullWidth
        >
          {cta.label}
        </Button>
      )}
    </Surface>
  );
}

// ============ INFO BOX ============

export interface InfoBoxProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  action?: { label: string; onClick: () => void };
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function InfoBox({ type = 'info', title, message, action, dismissible = false, onDismiss }: InfoBoxProps) {
  const [show, setShow] = React.useState(true);

  if (!show) return null;

  const typeConfig = {
    info: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', icon: 'ℹ️' },
    success: { bg: 'bg-green-500/20', border: 'border-green-500/30', icon: '✓' },
    warning: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', icon: '⚠' },
    error: { bg: 'bg-red-500/20', border: 'border-red-500/30', icon: '✕' },
  }[type];

  const handleDismiss = () => {
    setShow(false);
    onDismiss?.();
  };

  return (
    <Surface
      variant="outline"
      padding="md"
      className={cn('border-2', typeConfig.bg, typeConfig.border)}
    >
      <div className="flex gap-3">
        <span className="text-xl">{typeConfig.icon}</span>
        <div className="flex-1">
          {title && <Text variant="h6" className="mb-1">{title}</Text>}
          <Text variant="bodySmall">{message}</Text>
          {action && (
            <Button size="sm" variant="ghost" onClick={action.onClick} className="mt-3">
              {action.label}
            </Button>
          )}
        </div>
        {dismissible && (
          <button onClick={handleDismiss} className="text-neutral-400 hover:text-white transition-colors">
            ✕
          </button>
        )}
      </div>
    </Surface>
  );
}

// ============ CODE BLOCK ============

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
}

export function CodeBlock({ code, language = 'javascript', showLineNumbers = true, copyable = true }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Surface variant="solid" padding="md" rounded="lg" className="relative">
      <div className="flex justify-between items-center mb-3 pb-3 border-b border-neutral-700">
        <span className="text-xs font-mono text-neutral-400">{language}</span>
        {copyable && (
          <button
            onClick={handleCopy}
            className="text-xs px-2 py-1 bg-neutral-800 hover:bg-neutral-700 rounded text-white transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        )}
      </div>
      <pre className="overflow-x-auto text-sm text-neutral-300 font-mono">
        <code>
          {code.split('\n').map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="text-neutral-600 mr-4 select-none w-8 text-right">{i + 1}</span>
              )}
              <span>{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </Surface>
  );
}

// ============ TIMELINE ITEM ============

export interface TimelineItemProps {
  date: string;
  title: string;
  description?: string;
  active?: boolean;
  icon?: React.ReactNode;
}

export function TimelineItem({ date, title, description, active = false, icon }: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold',
          active ? 'bg-brand-purple' : 'bg-neutral-700'
        )}>
          {icon || '•'}
        </div>
        <div className="w-0.5 h-12 bg-neutral-700 mt-2" />
      </div>
      <div className="pb-8">
        <p className="text-sm font-semibold text-brand-purple">{date}</p>
        <p className="text-base font-bold text-white mt-1">{title}</p>
        {description && <p className="text-sm text-neutral-400 mt-2">{description}</p>}
      </div>
    </div>
  );
}

// ============ BADGE GROUP ============

export interface BadgeGroupProps {
  items: string[];
  onRemove?: (item: string) => void;
  removable?: boolean;
  variant?: 'default' | 'outline' | 'filled';
}

export function BadgeGroup({ items, onRemove, removable = false, variant = 'default' }: BadgeGroupProps) {
  const variantClass = {
    default: 'bg-brand-purple/20 text-brand-purple border border-brand-purple/30',
    outline: 'border border-neutral-600 text-neutral-300',
    filled: 'bg-neutral-700 text-white',
  }[variant];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <div
          key={i}
          className={cn('px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2', variantClass)}
        >
          {item}
          {removable && (
            <button
              onClick={() => onRemove?.(item)}
              className="ml-1 hover:opacity-70 transition-opacity"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// ============ STEP INDICATOR ============

export interface StepIndicatorProps {
  steps: string[];
  activeStep?: number;
  completedSteps?: number[];
}

export function StepIndicator({ steps, activeStep = 0, completedSteps = [] }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors',
                  i === activeStep
                    ? 'bg-brand-purple ring-2 ring-brand-purple/30'
                    : completedSteps.includes(i)
                    ? 'bg-green-500'
                    : 'bg-neutral-700'
                )}
              >
                {completedSteps.includes(i) ? '✓' : i + 1}
              </div>
              <p className="text-xs mt-2 text-center text-neutral-400">{step}</p>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 mx-2 mb-8 transition-colors',
                  i < activeStep ? 'bg-green-500' : 'bg-neutral-700'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ============ CALLOUT BOX ============

export interface CalloutBoxProps {
  icon?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  type?: 'info' | 'tip' | 'warning' | 'danger';
}

export function CalloutBox({ icon, title, children, type = 'info' }: CalloutBoxProps) {
  const typeConfig = {
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: 'ℹ️' },
    tip: { bg: 'bg-green-500/10', border: 'border-green-500/30', icon: '💡' },
    warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: '⚠️' },
    danger: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: '🔥' },
  }[type];

  return (
    <Surface
      variant="outline"
      padding="md"
      className={cn('border-l-4', typeConfig.bg, typeConfig.border)}
    >
      <div className="flex gap-3">
        {(icon || typeConfig.icon) && (
          <span className="text-xl flex-shrink-0">{icon || typeConfig.icon}</span>
        )}
        <div>
          {title && <p className="font-semibold text-white mb-2">{title}</p>}
          <div className="text-sm text-neutral-300">{children}</div>
        </div>
      </div>
    </Surface>
  );
}
