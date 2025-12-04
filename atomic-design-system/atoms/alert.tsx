"use client";

import React from 'react';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: React.ReactNode;
}

const variantConfig = {
  info: {
    bg: 'bg-blue-600/10 border-blue-600/30',
    text: 'text-blue-400',
    icon: Info
  },
  success: {
    bg: 'bg-green-600/10 border-green-600/30',
    text: 'text-green-400',
    icon: CheckCircle
  },
  warning: {
    bg: 'bg-yellow-600/10 border-yellow-600/30',
    text: 'text-yellow-400',
    icon: AlertTriangle
  },
  error: {
    bg: 'bg-red-600/10 border-red-600/30',
    text: 'text-red-400',
    icon: AlertCircle
  }
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  icon,
  closable = false,
  onClose,
  action,
  className,
  children
}) => {
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  return (
    <div className={cn(
      "relative rounded-lg border p-4",
      config.bg,
      className
    )}>
      <div className="flex gap-3">
        <div className={cn("flex-shrink-0", config.text)}>
          {icon || <IconComponent className="h-5 w-5" />}
        </div>

        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={cn("font-semibold mb-1", config.text)}>
              {title}
            </h3>
          )}
          
          {description && (
            <p className="text-sm text-white/80">
              {description}
            </p>
          )}
          
          {children && (
            <div className="mt-2 text-sm text-white/80">
              {children}
            </div>
          )}

          {action && (
            <button
              onClick={action.onClick}
              className={cn(
                "mt-3 text-sm font-medium underline underline-offset-2 hover:no-underline",
                config.text
              )}
            >
              {action.label}
            </button>
          )}
        </div>

        {closable && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
