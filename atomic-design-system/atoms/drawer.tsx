"use client";

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  showOverlay?: boolean;
  children: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
}

const sizeConfig = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full'
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full'
  },
  top: {
    sm: 'h-64',
    md: 'h-80',
    lg: 'h-96',
    xl: 'h-[32rem]',
    full: 'h-full'
  },
  bottom: {
    sm: 'h-64',
    md: 'h-80',
    lg: 'h-96',
    xl: 'h-[32rem]',
    full: 'h-full'
  }
};

const positionConfig = {
  left: {
    base: 'left-0 top-0 bottom-0',
    enter: 'animate-in slide-in-from-left duration-300',
    exit: 'animate-out slide-out-to-left duration-200'
  },
  right: {
    base: 'right-0 top-0 bottom-0',
    enter: 'animate-in slide-in-from-right duration-300',
    exit: 'animate-out slide-out-to-right duration-200'
  },
  top: {
    base: 'top-0 left-0 right-0',
    enter: 'animate-in slide-in-from-top duration-300',
    exit: 'animate-out slide-out-to-top duration-200'
  },
  bottom: {
    base: 'bottom-0 left-0 right-0',
    enter: 'animate-in slide-in-from-bottom duration-300',
    exit: 'animate-out slide-out-to-bottom duration-200'
  }
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = 'right',
  size = 'md',
  closeOnOverlay = true,
  closeOnEsc = true,
  showOverlay = true,
  children,
  title,
  description,
  footer,
  className
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusableElements = drawer.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    drawer.addEventListener('keydown', handleTab as any);
    firstElement?.focus();

    return () => {
      drawer.removeEventListener('keydown', handleTab as any);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const drawerContent = (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      {showOverlay && (
        <div
          className="absolute inset-0 bg-black/80 animate-in fade-in duration-200"
          onClick={closeOnOverlay ? onClose : undefined}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        aria-describedby={description ? 'drawer-description' : undefined}
        className={cn(
          "fixed bg-gray-900 shadow-2xl z-10 flex flex-col",
          positionConfig[position].base,
          sizeConfig[position][size],
          positionConfig[position].enter,
          className
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex-shrink-0 px-6 py-4 border-b border-white/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {title && (
                  <h2
                    id="drawer-title"
                    className="text-lg font-semibold text-white truncate"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="drawer-description"
                    className="mt-1 text-sm text-white/60"
                  >
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 p-1 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-white/10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
};

// Simplified Drawer variant without header/footer
export interface SimpleDrawerProps extends Omit<DrawerProps, 'title' | 'description' | 'footer'> {
  showCloseButton?: boolean;
}

export const SimpleDrawer: React.FC<SimpleDrawerProps> = ({
  showCloseButton = true,
  children,
  onClose,
  ...props
}) => {
  return (
    <Drawer {...props} onClose={onClose}>
      <div className="relative">
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        )}
        <div className={showCloseButton ? 'pr-10' : ''}>
          {children}
        </div>
      </div>
    </Drawer>
  );
};
