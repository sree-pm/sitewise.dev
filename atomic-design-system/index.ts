/**
 * SiteWise Atomic Design System
 * 
 * A comprehensive component library built with:
 * - React 18+
 * - TypeScript
 * - Tailwind CSS
 * - Atomic Design principles
 * 
 * @module atomic-design-system
 */

// ============================================
// ATOMS - Basic building blocks
// ============================================
export * from './atoms';

// ============================================
// MOLECULES - Simple component combinations
// ============================================
export * from './molecules';

// ============================================
// ORGANISMS - Complex component compositions
// ============================================
export * from './organisms';

// ============================================
// TEMPLATES - Page-level layouts
// ============================================
export * from './templates';

// ============================================
// TYPES & UTILITIES
// ============================================
export type { ButtonProps } from './atoms/button';
// Add more type exports as needed
