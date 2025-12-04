"use client";

import React, { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

export interface ToastProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const variantConfig = {
  info: {
    bg: 'bg-blue-600/90 border-blue-500',
    text: 'text-white',
    icon: Info
  },
  success: {
    bg: 'bg-green-600/90 border-green-500',
    text: 'text-white',
    icon: CheckCircle
  },
  warning: {
    bg: 'bg-yellow-600/90 border-yellow-500',
    text: 'text-white',
    icon: AlertTriangle
  },
  error: {
    bg: 'bg-red-600/90 border-red-500',
    text: 'text-white',
    icon: AlertCircle
  }
};

const positionConfig = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
};

export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  description,
  icon,
  duration = 5000,
  position = 'top-right',
  onClose,
  action
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  useEffect(() => {
    setIsAnimating(true);
    
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  const toastElement = (
    <div
      className={cn(
        "fixed z-50 w-full max-w-sm transform transition-all duration-300",
        positionConfig[position],
        isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      )}
    >
      <div className={cn(
        "rounded-lg border backdrop-blur-sm shadow-lg p-4",
        config.bg
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
              <p className="text-sm text-white/90">
                {description}
              </p>
            )}

            {action && (
              <button
                onClick={action.onClick}
                className="mt-2 text-sm font-medium underline underline-offset-2 hover:no-underline text-white"
              >
                {action.label}
              </button>
            )}
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress bar */}
        {duration > 0 && (
          <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/60"
              style={{
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );

  return typeof window !== 'undefined' ? createPortal(
    toastElement,
    document.body
  ) : null;
};

// Toast Manager Hook
interface ToastOptions extends Omit<ToastProps, 'onClose'> {}

class ToastManager {
  private toasts: Map<string, ToastOptions> = new Map();
  private listeners: Set<() => void> = new Set();

  show(options: ToastOptions) {
    const id = Math.random().toString(36).substring(2, 9);
    this.toasts.set(id, options);
    this.notify();
    
    return {
      close: () => this.close(id)
    };
  }

  close(id: string) {
    this.toasts.delete(id);
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getToasts() {
    return Array.from(this.toasts.entries());
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }
}

export const toastManager = new ToastManager();

export const useToast = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(() => forceUpdate({}));
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    show: (options: ToastOptions) => toastManager.show(options),
    success: (title: string, description?: string) => 
      toastManager.show({ variant: 'success', title, description }),
    error: (title: string, description?: string) => 
      toastManager.show({ variant: 'error', title, description }),
    warning: (title: string, description?: string) => 
      toastManager.show({ variant: 'warning', title, description }),
    info: (title: string, description?: string) => 
      toastManager.show({ variant: 'info', title, description })
  };
};

// ToastContainer Component
export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState(toastManager.getToasts());

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(() => {
      setToasts(toastManager.getToasts());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {toasts.map(([id, toast]) => (
        <Toast
          key={id}
          {...toast}
          onClose={() => toastManager.close(id)}
        />
      ))}
    </>
  );
};

// Add keyframes to global CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shrink {
      from { width: 100%; }
      to { width: 0%; }
    }
  `;
  document.head.appendChild(style);
}
