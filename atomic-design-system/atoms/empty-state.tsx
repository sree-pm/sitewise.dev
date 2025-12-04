"use client";

import React from 'react';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  illustration?: 'search' | 'folder' | 'error' | 'success' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const illustrations = {
  search: (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mx-auto">
      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="4" opacity="0.2" />
      <line x1="71" y1="71" x2="95" y2="95" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.2" />
    </svg>
  ),
  folder: (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mx-auto">
      <path
        d="M20 40C20 35.5817 23.5817 32 28 32H48L56 40H92C96.4183 40 100 43.5817 100 48V80C100 84.4183 96.4183 88 92 88H28C23.5817 88 20 84.4183 20 80V40Z"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.2"
      />
    </svg>
  ),
  error: <XCircle className="mx-auto" size={120} opacity={0.2} />,
  success: <CheckCircle2 className="mx-auto" size={120} opacity={0.2} />
};

const sizeConfig = {
  sm: {
    container: 'py-8',
    icon: 'w-16 h-16',
    title: 'text-lg',
    description: 'text-sm',
    button: 'px-4 py-2 text-sm'
  },
  md: {
    container: 'py-12',
    icon: 'w-24 h-24',
    title: 'text-xl',
    description: 'text-base',
    button: 'px-6 py-2.5 text-base'
  },
  lg: {
    container: 'py-16',
    icon: 'w-32 h-32',
    title: 'text-2xl',
    description: 'text-lg',
    button: 'px-8 py-3 text-lg'
  }
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  illustration = 'folder',
  size = 'md',
  className
}) => {
  const config = sizeConfig[size];

  return (
    <div className={cn('text-center', config.container, className)}>
      {/* Icon/Illustration */}
      <div className={cn('mb-6 text-white/20', config.icon)}>
        {icon || (illustration !== 'custom' && illustrations[illustration])}
      </div>

      {/* Title */}
      <h3 className={cn('font-semibold text-white mb-2', config.title)}>
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className={cn('text-white/60 max-w-md mx-auto mb-6', config.description)}>
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className={cn(
            'rounded-lg font-medium transition-colors',
            config.button,
            action.variant === 'primary'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
          )}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

// Loading Overlay Component
export interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  spinner?: React.ReactNode;
  backdrop?: boolean;
  blur?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = 'Loading...',
  spinner,
  backdrop = true,
  blur = true,
  className,
  children
}) => {
  if (!visible) return <>{children}</>;

  const defaultSpinner = (
    <div className="w-12 h-12 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin" />
  );

  return (
    <div className={cn('relative', className)}>
      {children}
      
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center z-50',
          backdrop && 'bg-black/60',
          blur && 'backdrop-blur-sm'
        )}
      >
        {spinner || defaultSpinner}
        {message && (
          <p className="mt-4 text-white font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

// Success/Error State Component
export interface StateMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  className?: string;
}

export const StateMessage: React.FC<StateMessageProps> = ({
  type,
  title,
  message,
  action,
  onClose,
  className
}) => {
  const icons = {
    success: <CheckCircle2 className="text-green-500" size={48} />,
    error: <XCircle className="text-red-500" size={48} />,
    warning: <AlertCircle className="text-yellow-500" size={48} />,
    info: <AlertCircle className="text-blue-500" size={48} />
  };

  const colors = {
    success: 'border-green-500/20 bg-green-500/10',
    error: 'border-red-500/20 bg-red-500/10',
    warning: 'border-yellow-500/20 bg-yellow-500/10',
    info: 'border-blue-500/20 bg-blue-500/10'
  };

  return (
    <div
      className={cn(
        'p-8 border rounded-xl text-center max-w-md mx-auto',
        colors[type],
        className
      )}
    >
      <div className="mb-4">{icons[type]}</div>
      
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      
      {message && (
        <p className="text-white/70 mb-6">{message}</p>
      )}
      
      <div className="flex gap-3 justify-center">
        {action && (
          <button
            onClick={action.onClick}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            {action.label}
          </button>
        )}
        
        {onClose && (
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors border border-white/10"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};
