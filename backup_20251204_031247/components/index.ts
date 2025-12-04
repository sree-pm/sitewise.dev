/* eslint-disable @typescript-eslint/no-unused-vars */
// Centralized component library exports
// Import this file to access all sitewise.dev components

// ============ ATOMS ============
export * from '@/components/atoms/text';
export * from '@/components/atoms/layout';
export * from '@/components/atoms/inputs';
export * from '@/components/atoms/button';
export * from '@/components/atoms/shortcut';
// Note: `atoms/advanced` contains names (Breadcrumb, Tabs, etc.) that
// overlap with other modules. Import advanced atoms directly when needed:
// import { Breadcrumb } from '@/components/atoms/advanced';

// ============ MOLECULES ============
export * from '@/components/molecules/index';
// Note: `molecules/advanced` also exposes utilities that may collide with
// organism-level exports. Import it directly if required:
// import { BreadcrumbSection } from '@/components/molecules/advanced';

// ============ ORGANISMS ============
// NOTE: Organisms are available via direct imports to avoid export name collisions:
// import { Header } from '@/components/organisms';

// ============ TEMPLATES ============
export * from '@/components/templates/index';

// ============ PUCK BLOCKS ============
export * from '@/components/puck-blocks/index';
export * from '@/components/puck-blocks/extended';

// NOTE: Central type re-exports were removed to avoid incorrect references.
// If you rely on type exports from `components/index.ts`, re-add explicit
// `export type { ... } from '...';` entries pointing at the correct files.
