"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface KbdProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'minimal';
  className?: string;
}

const sizeConfig = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-1 text-sm',
  lg: 'px-2.5 py-1.5 text-base'
};

const variantConfig = {
  default: 'bg-gray-800 border border-gray-700 shadow-sm',
  outlined: 'bg-transparent border-2 border-gray-600',
  minimal: 'bg-gray-900 border border-gray-800'
};

export const Kbd: React.FC<KbdProps> = ({
  children,
  size = 'md',
  variant = 'default',
  className
}) => {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded font-mono font-semibold text-gray-300",
        sizeConfig[size],
        variantConfig[variant],
        className
      )}
    >
      {children}
    </kbd>
  );
};

// Keyboard Shortcut (combination of keys)
export interface KeyboardShortcutProps {
  keys: string[];
  separator?: '+' | 'then' | 'or';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'minimal';
  className?: string;
}

export const KeyboardShortcut: React.FC<KeyboardShortcutProps> = ({
  keys,
  separator = '+',
  size = 'md',
  variant = 'default',
  className
}) => {
  const separatorText = separator === 'then' ? '→' : separator === 'or' ? '/' : '+';

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <Kbd size={size} variant={variant}>
            {key}
          </Kbd>
          {index < keys.length - 1 && (
            <span className="text-gray-500 text-sm mx-0.5">{separatorText}</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};

// Common keyboard shortcuts
export const commonShortcuts = {
  copy: { keys: ['⌘', 'C'], mac: ['⌘', 'C'], windows: ['Ctrl', 'C'] },
  paste: { keys: ['⌘', 'V'], mac: ['⌘', 'V'], windows: ['Ctrl', 'V'] },
  cut: { keys: ['⌘', 'X'], mac: ['⌘', 'X'], windows: ['Ctrl', 'X'] },
  undo: { keys: ['⌘', 'Z'], mac: ['⌘', 'Z'], windows: ['Ctrl', 'Z'] },
  redo: { keys: ['⌘', '⇧', 'Z'], mac: ['⌘', '⇧', 'Z'], windows: ['Ctrl', 'Y'] },
  save: { keys: ['⌘', 'S'], mac: ['⌘', 'S'], windows: ['Ctrl', 'S'] },
  find: { keys: ['⌘', 'F'], mac: ['⌘', 'F'], windows: ['Ctrl', 'F'] },
  selectAll: { keys: ['⌘', 'A'], mac: ['⌘', 'A'], windows: ['Ctrl', 'A'] },
  newTab: { keys: ['⌘', 'T'], mac: ['⌘', 'T'], windows: ['Ctrl', 'T'] },
  closeTab: { keys: ['⌘', 'W'], mac: ['⌘', 'W'], windows: ['Ctrl', 'W'] },
};

// Platform-aware shortcut
export interface PlatformShortcutProps {
  shortcut: keyof typeof commonShortcuts;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'minimal';
  className?: string;
}

export const PlatformShortcut: React.FC<PlatformShortcutProps> = ({
  shortcut,
  size,
  variant,
  className
}) => {
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const keys = isMac ? commonShortcuts[shortcut].mac : commonShortcuts[shortcut].windows;

  return (
    <KeyboardShortcut
      keys={keys}
      size={size}
      variant={variant}
      className={className}
    />
  );
};
