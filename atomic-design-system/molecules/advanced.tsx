'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Surface } from '@/atomic-design-system/atoms/layout';
import { Text } from '@/atomic-design-system/atoms/text';
import { Button } from '@/atomic-design-system/atoms/button';

// ============ CARD WITH HEADER ============

export interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'outline';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export function Card({ header, footer, children, variant = 'glass', padding = 'md', hoverable = false }: CardProps) {
  return (
    <Surface variant={variant} padding={padding} rounded="lg" hover={hoverable} className="flex flex-col">
      {header && <div className="pb-3 border-b border-neutral-700">{header}</div>}
      <div className="flex-1">{children}</div>
      {footer && <div className="pt-3 border-t border-neutral-700">{footer}</div>}
    </Surface>
  );
}

// ============ HERO CARD ============

export interface HeroCardProps {
  image?: string;
  title: string;
  description?: string;
  badge?: string;
  action?: { label: string; onClick: () => void };
  overlay?: boolean;
}

export function HeroCard({ image, title, description, badge, action, overlay = true }: HeroCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg group">
      {image && (
        <>
          <img src={image} alt={title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
          {overlay && <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />}
        </>
      )}
      <div className={image ? 'absolute inset-0 flex flex-col justify-end p-6 text-white' : 'p-6'}>
        {badge && <span className="text-xs font-bold px-2 py-1 bg-brand-purple w-fit rounded-full mb-3">{badge}</span>}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {description && <p className="text-sm opacity-90 mb-4">{description}</p>}
        {action && <Button size="sm" variant={image ? 'glow' : 'outline'} onClick={action.onClick}>{action.label}</Button>}
      </div>
    </div>
  );
}

// ============ FORM SECTION ============

export interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  gap?: 'sm' | 'md' | 'lg';
}

export function FormSection({ title, description, children, columns = 1, gap = 'md' }: FormSectionProps) {
  const gapClass = { sm: 'gap-4', md: 'gap-6', lg: 'gap-8' }[gap];
  const colsClass = { 1: 'grid-cols-1', 2: 'grid-cols-1 md:grid-cols-2', 3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' }[columns];

  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="mb-6">
          {title && <Text variant="h4" className="mb-2">{title}</Text>}
          {description && <Text variant="bodySmall" color="secondary">{description}</Text>}
        </div>
      )}
      <div className={cn('grid', colsClass, gapClass)}>{children}</div>
    </div>
  );
}

// ============ MEDIA OBJECT ============

export interface MediaObjectProps {
  media: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  reverse?: boolean;
}

export function MediaObject({ media, title, description, action, reverse = false }: MediaObjectProps) {
  return (
    <div className={cn('flex gap-4', reverse && 'flex-row-reverse')}>
      <div className="flex-shrink-0">{media}</div>
      <div className="flex-1 min-w-0">
        <Text variant="h5" className="mb-1">{title}</Text>
        {description && <Text variant="bodySmall" color="secondary" className="mb-3">{description}</Text>}
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}

// ============ LIST ITEM ============

export interface ListItemProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  divider?: boolean;
  onClick?: () => void;
}

export function ListItem({ icon, title, subtitle, action, divider = true, onClick }: ListItemProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 py-3 px-4 hover:bg-neutral-800/50 transition-colors text-left"
      >
        {icon && <div className="flex-shrink-0 text-xl">{icon}</div>}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white truncate">{title}</p>
          {subtitle && <p className="text-sm text-neutral-400 truncate">{subtitle}</p>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </button>
      {divider && <div className="border-b border-neutral-800" />}
    </>
  );
}

// ============ EMPTY STATE ============

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="text-6xl mb-4 opacity-50">{icon}</div>
      <Text variant="h4" className="mb-2">{title}</Text>
      {description && <Text variant="bodySmall" color="secondary" className="mb-6 max-w-md">{description}</Text>}
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  );
}

// ============ BREADCRUMB SECTION ============

export interface BreadcrumbSectionProps {
  items: Array<{ label: string; href?: string }>;
  title?: string;
  action?: React.ReactNode;
}

export function BreadcrumbSection({ items, title, action }: BreadcrumbSectionProps) {
  return (
    <div className="space-y-4 py-4 border-b border-neutral-800">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <nav className="flex items-center gap-2 text-sm flex-wrap">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              {item.href ? (
                <a href={item.href} className="text-brand-purple hover:underline">{item.label}</a>
              ) : (
                <span className={i === items.length - 1 ? 'text-white font-semibold' : 'text-neutral-400'}>{item.label}</span>
              )}
              {i < items.length - 1 && <span className="text-neutral-600">/</span>}
            </React.Fragment>
          ))}
        </nav>
        {action && <div>{action}</div>}
      </div>
      {title && <Text variant="h3">{title}</Text>}
    </div>
  );
}

// ============ DETAIL GRID ============

export interface DetailGridProps {
  items: Array<{
    label: string;
    value: React.ReactNode;
    copy?: boolean;
  }>;
  columns?: 1 | 2 | 3;
}

export function DetailGrid({ items, columns = 2 }: DetailGridProps) {
  const colsClass = { 1: 'grid-cols-1', 2: 'grid-cols-1 md:grid-cols-2', 3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' }[columns];

  return (
    <div className={cn('grid gap-6', colsClass)}>
      {items.map((item, i) => (
        <div key={i} className="bg-neutral-900/50 rounded-lg p-4">
          <p className="text-xs font-semibold text-neutral-400 uppercase mb-2">{item.label}</p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-base font-semibold text-white break-all">{item.value}</p>
            {item.copy && (
              <button
                onClick={() => navigator.clipboard.writeText(String(item.value))}
                className="text-neutral-400 hover:text-white flex-shrink-0"
              >
                📋
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ PROGRESS SECTION ============

export interface ProgressSectionProps {
  items: Array<{
    label: string;
    value: number;
    color?: 'primary' | 'success' | 'warning' | 'error';
  }>;
}

export function ProgressSection({ items }: ProgressSectionProps) {
  const colorClass = {
    primary: 'bg-brand-purple',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-2">
            <Text variant="bodySmall" className="font-semibold">{item.label}</Text>
            <Text variant="caption" color="secondary">{item.value}%</Text>
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={cn('h-full transition-all duration-500', colorClass[item.color || 'primary'])}
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ METRIC GRID ============

export interface MetricProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: { value: number; direction: 'up' | 'down' | 'neutral' };
  icon?: React.ReactNode;
}

export function MetricGrid({ items }: { items: MetricProps[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <Surface key={i} variant="glass" padding="md" rounded="lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase mb-1">{item.label}</p>
              <div className="flex items-baseline gap-2">
                <Text variant="h4" className="text-white">{item.value}</Text>
                {item.unit && <Text variant="bodySmall" color="secondary">{item.unit}</Text>}
              </div>
              {item.trend && (
                <p className={cn('text-xs mt-2 font-semibold', 
                  item.trend.direction === 'up' ? 'text-green-400' :
                  item.trend.direction === 'down' ? 'text-red-400' :
                  'text-neutral-400'
                )}>
                  {item.trend.direction === 'up' ? '↑' : item.trend.direction === 'down' ? '↓' : '→'}
                  {Math.abs(item.trend.value)}% vs last period
                </p>
              )}
            </div>
            {item.icon && <div className="text-2xl opacity-50">{item.icon}</div>}
          </div>
        </Surface>
      ))}
    </div>
  );
}

// ============ TIMELINE ============

export interface TimelineItemComponent {
  date: string;
  title: string;
  description?: string;
  status?: 'completed' | 'pending' | 'error';
  icon?: React.ReactNode;
}

export function Timeline({ items }: { items: TimelineItemComponent[] }) {
  const statusColors = {
    completed: 'bg-green-500',
    pending: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={cn('w-10 h-10 rounded-full flex items-center justify-center font-bold text-white', statusColors[item.status || 'pending'])}>
              {item.icon || '✓'}
            </div>
            {i < items.length - 1 && <div className="w-0.5 h-12 bg-neutral-700 mt-2" />}
          </div>
          <div className="pb-6">
            <p className="text-sm font-semibold text-brand-purple">{item.date}</p>
            <p className="text-base font-bold text-white mt-1">{item.title}</p>
            {item.description && <p className="text-sm text-neutral-400 mt-2">{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ FILTER CHIPS ============

export interface FilterChipsProps {
  items: Array<{ id: string; label: string; icon?: React.ReactNode }>;
  selected?: string[];
  onChange?: (selected: string[]) => void;
  multiple?: boolean;
}

export function FilterChips({ items, selected = [], onChange, multiple = true }: FilterChipsProps) {
  const handleToggle = (id: string) => {
    if (multiple) {
      const newSelected = selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id];
      onChange?.(newSelected);
    } else {
      onChange?.(selected.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleToggle(item.id)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2',
            selected.includes(item.id)
              ? 'bg-brand-purple text-white'
              : 'bg-neutral-800 text-neutral-300 hover:text-white'
          )}
        >
          {item.icon && <span>{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ============ NOTIFICATION ============

export interface NotificationProps {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  action?: { label: string; onClick: () => void };
  onClose?: () => void;
}

export function Notification({ title, message, type = 'info', action, onClose }: NotificationProps) {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose?.();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  const typeConfig = {
    info: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', icon: 'ℹ️' },
    success: { bg: 'bg-green-500/20', border: 'border-green-500/30', icon: '✓' },
    warning: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', icon: '⚠️' },
    error: { bg: 'bg-red-500/20', border: 'border-red-500/30', icon: '✕' },
  }[type];

  return (
    <Surface
      variant="outline"
      padding="md"
      rounded="lg"
      className={cn('border-2 flex items-start gap-3', typeConfig.bg, typeConfig.border)}
    >
      <span className="text-xl flex-shrink-0">{typeConfig.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white">{title}</p>
        <p className="text-sm text-neutral-300 mt-1">{message}</p>
        {action && (
          <button onClick={action.onClick} className="text-sm font-semibold text-brand-purple hover:underline mt-2">
            {action.label}
          </button>
        )}
      </div>
      <button onClick={() => setShow(false)} className="text-neutral-400 hover:text-white flex-shrink-0">
        ✕
      </button>
    </Surface>
  );
}
