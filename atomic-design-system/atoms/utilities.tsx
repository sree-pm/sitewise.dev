"use client";

import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement | null;
  className?: string;
}

export const Portal: React.FC<PortalProps> = ({
  children,
  container,
  className
}) => {
  const defaultContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container) {
      const div = document.createElement('div');
      if (className) div.className = className;
      document.body.appendChild(div);
      defaultContainer.current = div;

      return () => {
        if (defaultContainer.current) {
          document.body.removeChild(defaultContainer.current);
        }
      };
    }
  }, [container, className]);

  const targetContainer = container || defaultContainer.current;

  return targetContainer ? createPortal(children, targetContainer) : null;
};

// Focus Trap Utility
export interface FocusTrapProps {
  active?: boolean;
  children: React.ReactNode;
  onEscape?: () => void;
  restoreFocus?: boolean;
  initialFocus?: HTMLElement | null;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({
  active = true,
  children,
  onEscape,
  restoreFocus = true,
  initialFocus
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape?.();
      }

      if (e.key === 'Tab' && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Set initial focus
    if (initialFocus) {
      initialFocus.focus();
    } else if (containerRef.current) {
      const firstFocusable = containerRef.current.querySelector(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [active, onEscape, restoreFocus, initialFocus]);

  return <div ref={containerRef}>{children}</div>;
};

// Click Outside Utility
export interface ClickOutsideProps {
  onClickOutside: () => void;
  children: React.ReactNode;
  enabled?: boolean;
}

export const ClickOutside: React.FC<ClickOutsideProps> = ({
  onClickOutside,
  children,
  enabled = true
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [enabled, onClickOutside]);

  return <div ref={ref}>{children}</div>;
};

// Resize Observer Hook & Component
export interface ResizeObserverProps {
  onResize: (entry: ResizeObserverEntry) => void;
  children: React.ReactNode;
}

export const ResizeObserverComponent: React.FC<ResizeObserverProps> = ({
  onResize,
  children
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        onResize(entry);
      }
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [onResize]);

  return <div ref={ref}>{children}</div>;
};

export const useResizeObserver = (
  ref: React.RefObject<HTMLElement>,
  callback: (entry: ResizeObserverEntry) => void
) => {
  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        callback(entry);
      }
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [ref, callback]);
};

// Intersection Observer Hook & Component
export interface IntersectionObserverProps {
  onIntersect: (entry: IntersectionObserverEntry) => void;
  children: React.ReactNode;
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const IntersectionObserverComponent: React.FC<IntersectionObserverProps> = ({
  onIntersect,
  children,
  threshold = 0,
  rootMargin = '0px',
  triggerOnce = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!triggerOnce || !hasTriggered.current) {
              onIntersect(entry);
              if (triggerOnce) {
                hasTriggered.current = true;
              }
            }
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onIntersect, threshold, rootMargin, triggerOnce]);

  return <div ref={ref}>{children}</div>;
};

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  callback: (entry: IntersectionObserverEntry) => void,
  options?: {
    threshold?: number | number[];
    rootMargin?: string;
    triggerOnce?: boolean;
  }
) => {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!options?.triggerOnce || !hasTriggered.current) {
              callback(entry);
              if (options?.triggerOnce) {
                hasTriggered.current = true;
              }
            }
          }
        }
      },
      {
        threshold: options?.threshold || 0,
        rootMargin: options?.rootMargin || '0px'
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, callback, options]);
};

// Media Query Hook & Component
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    const updateMatch = () => setMatches(media.matches);
    updateMatch();

    // Modern API
    if (media.addEventListener) {
      media.addEventListener('change', updateMatch);
      return () => media.removeEventListener('change', updateMatch);
    }
    // Fallback for older browsers
    else {
      media.addListener(updateMatch);
      return () => media.removeListener(updateMatch);
    }
  }, [query]);

  return matches;
};

export interface MediaQueryProps {
  query: string;
  children: (matches: boolean) => React.ReactNode;
}

export const MediaQuery: React.FC<MediaQueryProps> = ({ query, children }) => {
  const matches = useMediaQuery(query);
  return <>{children(matches)}</>;
};
