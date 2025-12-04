'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ============ AVATAR ============

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'away' | 'busy';
  initials?: string;
}

export function Avatar({ src, alt = 'Avatar', size = 'md', variant = 'circle', status, initials }: AvatarProps) {
  const sizeClass = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  }[size];

  const variantClass = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg',
  }[variant];

  const statusClass = {
    online: 'ring-2 ring-green-500',
    offline: 'ring-2 ring-neutral-600',
    away: 'ring-2 ring-yellow-500',
    busy: 'ring-2 ring-red-500',
  };

  return (
    <div className={cn('relative flex items-center justify-center bg-gradient-to-br from-brand-purple to-brand-blue', sizeClass, variantClass)}>
      {src ? (
        <img src={src} alt={alt} className={cn('w-full h-full object-cover', variantClass)} />
      ) : initials ? (
        <span className="font-bold text-white">{initials}</span>
      ) : (
        <span className="text-white">👤</span>
      )}
      {status && (
        <span className={cn('absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white', statusClass[status])} />
      )}
    </div>
  );
}

// ============ BADGE VARIANTS ============

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'info' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Badge({ children, variant = 'default', size = 'md', icon, dismissible, onDismiss }: BadgeProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  const variantClass = {
    default: 'bg-brand-purple/20 text-brand-purple border border-brand-purple/30',
    secondary: 'bg-neutral-700 text-neutral-100 border border-neutral-600',
    outline: 'border-2 border-neutral-500 text-neutral-300 bg-transparent',
    success: 'bg-green-500/20 text-green-300 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    error: 'bg-red-500/20 text-red-300 border border-red-500/30',
    info: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    subtle: 'bg-neutral-900 text-neutral-400 border border-neutral-800',
  }[variant];

  const sizeClass = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }[size];

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <span className={cn('inline-flex items-center gap-2 rounded-full font-medium', sizeClass, variantClass)}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {dismissible && (
        <button onClick={handleDismiss} className="ml-1 hover:opacity-70 transition-opacity flex-shrink-0">
          ✕
        </button>
      )}
    </span>
  );
}

// ============ BUTTON ICON ============

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outline' | 'ghost' | 'danger';
  circular?: boolean;
}

export function IconButton({ icon, size = 'md', variant = 'default', circular = true, className, ...props }: IconButtonProps) {
  const sizeClass = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-14 h-14 text-xl',
  }[size];

  const variantClass = {
    default: 'bg-brand-purple hover:bg-brand-purple/80 text-white',
    outline: 'border-2 border-brand-purple text-brand-purple hover:bg-brand-purple/10',
    ghost: 'text-neutral-400 hover:text-white hover:bg-neutral-800',
    danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30',
  }[variant];

  return (
    <button
      className={cn(
        'flex items-center justify-center transition-all duration-200 font-bold',
        circular ? 'rounded-full' : 'rounded-lg',
        sizeClass,
        variantClass,
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}

// ============ TAG ============

export interface TagProps {
  children: React.ReactNode;
  onRemove?: () => void;
  variant?: 'default' | 'outline' | 'filled';
  icon?: React.ReactNode;
}

export function Tag({ children, onRemove, variant = 'default', icon }: TagProps) {
  const variantClass = {
    default: 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20',
    outline: 'border-2 border-neutral-600 text-neutral-300 bg-transparent',
    filled: 'bg-neutral-700 text-white border border-neutral-600',
  }[variant];

  return (
    <span className={cn('inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium', variantClass)}>
      {icon && <span>{icon}</span>}
      {children}
      {onRemove && (
        <button onClick={onRemove} className="ml-1 hover:opacity-70">
          ✕
        </button>
      )}
    </span>
  );
}

// ============ PILL BUTTON ============

export interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function PillButton({ size = 'md', variant = 'primary', icon, children, className, ...props }: PillButtonProps) {
  const sizeClass = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }[size];

  const variantClass = {
    primary: 'bg-brand-purple text-white hover:bg-brand-purple/80',
    secondary: 'bg-neutral-800 text-white hover:bg-neutral-700',
    outline: 'border-2 border-brand-purple text-brand-purple hover:bg-brand-purple/10',
    ghost: 'text-brand-purple hover:bg-brand-purple/10',
  }[variant];

  return (
    <button className={cn('inline-flex items-center gap-2 rounded-full font-semibold transition-colors', sizeClass, variantClass, className)} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

// ============ LABEL ============

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  hint?: string;
  error?: boolean;
}

export function Label({ children, required, hint, error, className, ...props }: LabelProps) {
  return (
    <div className="mb-2">
      <label className={cn('text-sm font-semibold text-white', error && 'text-red-400', className)} {...props}>
        {children}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-neutral-400 mt-1">{hint}</p>}
    </div>
  );
}

// ============ TOOLTIP ============

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const [show, setShow] = React.useState(false);

  const positionClass = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  }[position];

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
      {show && (
        <div className={cn('absolute z-50 px-3 py-2 text-sm bg-neutral-900 text-white rounded-lg border border-neutral-700 whitespace-nowrap', positionClass)}>
          {content}
          <div className="absolute w-2 h-2 bg-neutral-900 border-neutral-700" />
        </div>
      )}
    </div>
  );
}

// ============ CHIP ============

export interface ChipProps {
  label: string;
  icon?: React.ReactNode;
  onDelete?: () => void;
  selected?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'filled' | 'outlined';
}

export function Chip({ label, icon, onDelete, selected = false, onClick, variant = 'default' }: ChipProps) {
  const variantClass = {
    default: selected ? 'bg-brand-purple text-white border border-brand-purple' : 'bg-neutral-800 text-white border border-neutral-700',
    filled: 'bg-neutral-700 text-white border border-neutral-600',
    outlined: 'bg-transparent border-2 border-brand-purple text-brand-purple',
  }[variant];

  return (
    <button
      onClick={onClick}
      className={cn('inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors', variantClass, onClick && 'cursor-pointer hover:opacity-80')}
    >
      {icon && <span>{icon}</span>}
      {label}
      {onDelete && (
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="ml-1 hover:opacity-70">
          ✕
        </button>
      )}
    </button>
  );
}

// ============ BREADCRUMB ============

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export function Breadcrumb({ items, separator = '/' }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm flex-wrap">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {item.href ? (
            <a href={item.href} className="text-brand-purple hover:underline">
              {item.label}
            </a>
          ) : (
            <span className={i === items.length - 1 ? 'text-white font-semibold' : 'text-neutral-400'}>{item.label}</span>
          )}
          {i < items.length - 1 && <span className="text-neutral-600">{separator}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

// ============ COUNTDOWN ============

export interface CountdownProps {
  endTime: Date;
  onComplete?: () => void;
}

export function Countdown({ endTime, onComplete }: CountdownProps) {
  const [time, setTime] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTime('Expired');
        clearInterval(interval);
        onComplete?.();
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, onComplete]);

  return <span className="font-mono text-sm text-brand-purple font-bold">{time}</span>;
}

// ============ RATING ============

export interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  color?: 'yellow' | 'brand' | 'green';
}

export function Rating({ value = 0, onChange, size = 'md', readonly = false, color = 'yellow' }: RatingProps) {
  const sizeClass = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];

  const colorClass = {
    yellow: 'text-yellow-400',
    brand: 'text-brand-purple',
    green: 'text-green-400',
  }[color];

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          className={cn(sizeClass, 'cursor-pointer transition-transform hover:scale-110', star <= (value || 0) ? colorClass : 'text-neutral-600', readonly && 'cursor-default')}
        >
          ★
        </button>
      ))}
    </div>
  );
}

// ============ ALERT ============

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  action?: { label: string; onClick: () => void };
  closable?: boolean;
  onClose?: () => void;
}

export function Alert({ type = 'info', title, message, action, closable = true, onClose }: AlertProps) {
  const [show, setShow] = React.useState(true);

  if (!show) return null;

  const typeConfig = {
    info: { icon: 'ℹ️', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300' },
    success: { icon: '✓', bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-300' },
    warning: { icon: '⚠️', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-300' },
    error: { icon: '✕', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-300' },
  }[type];

  const handleClose = () => {
    setShow(false);
    onClose?.();
  };

  return (
    <div className={cn('px-4 py-3 rounded-lg border-2 flex items-start gap-3', typeConfig.bg, typeConfig.border)}>
      <span className="text-xl flex-shrink-0">{typeConfig.icon}</span>
      <div className="flex-1 min-w-0">
        {title && <p className={cn('font-semibold mb-1', typeConfig.text)}>{title}</p>}
        <p className="text-sm text-neutral-300">{message}</p>
        {action && (
          <button onClick={action.onClick} className={cn('text-sm font-semibold mt-2 hover:underline', typeConfig.text)}>
            {action.label}
          </button>
        )}
      </div>
      {closable && (
        <button onClick={handleClose} className="text-neutral-400 hover:text-white flex-shrink-0">
          ✕
        </button>
      )}
    </div>
  );
}

// ============ TABS ============

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'line' | 'button' | 'pill';
}

export function Tabs({ items, activeId, onChange, variant = 'line' }: TabsProps) {
  const variantClass = {
    line: 'border-b border-neutral-700',
    button: 'bg-neutral-900 rounded-lg p-1',
    pill: 'bg-neutral-900 rounded-full p-1',
  }[variant];

  const itemClass = {
    line: (active: boolean) => cn('px-4 py-3 font-medium border-b-2 transition-colors', active ? 'border-brand-purple text-white' : 'border-transparent text-neutral-400 hover:text-white'),
    button: (active: boolean) => cn('px-4 py-2 rounded-md font-medium transition-colors', active ? 'bg-brand-purple text-white' : 'text-neutral-300 hover:text-white'),
    pill: (active: boolean) => cn('px-4 py-2 rounded-full font-medium transition-colors', active ? 'bg-brand-purple text-white' : 'text-neutral-300 hover:text-white'),
  };

  return (
    <div className={cn('flex items-center gap-1', variantClass)}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={itemClass[variant](item.id === activeId)}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  );
}
