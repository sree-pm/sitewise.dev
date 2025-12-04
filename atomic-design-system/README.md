# SiteWise Atomic Design System

A comprehensive, production-ready design system for building beautiful websites.

## 📁 Structure

```
/atomic-design-system/
├── index.ts           # Main barrel export
├── /atoms/            # Basic building blocks
│   ├── button.tsx
│   ├── badge.tsx
│   ├── input.tsx
│   ├── text.tsx
│   ├── layout.tsx
│   └── ...
├── /molecules/        # Component combinations
│   ├── bentogrid.tsx
│   ├── marquee.tsx
│   ├── tiltcard.tsx
│   └── ...
├── /organisms/        # Complex compositions
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── pricing.tsx
│   └── ...
└── /templates/        # Page layouts
    └── landing-page.tsx
```

## 🎨 Design Tokens

All components use design tokens from `/lib/designTokens.ts`:

- **Colors**: Brand purple, blue, pink gradients
- **Spacing**: Consistent 4px grid system
- **Typography**: Inter font family with defined scales
- **Shadows**: Layered shadow system for depth
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Usage

### Basic Import

```tsx
import { Button } from '@/atomic-design-system/atoms/button';
import { Navbar } from '@/atomic-design-system/organisms/navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <Button variant="glow">Click me</Button>
    </>
  );
}
```

### Barrel Imports

```tsx
import { Button, Badge, Input } from '@/atomic-design-system/atoms';
import { BentoGrid, Marquee } from '@/atomic-design-system/molecules';
import { Navbar, Footer } from '@/atomic-design-system/organisms';
```

## 🎯 Component Categories

### Atoms (15+ components)
- `Button` - 8 variants with loading states
- `Badge` - Labels and tags
- `Input` - Form inputs with validation
- `Text` - Typography components
- `Shortcut` - Keyboard shortcut displays
- `TechIcon` - Technology logos
- Layout components (Container, Grid, Stack, etc.)

### Molecules (10+ components)
- `BentoGrid` - Card grid layouts
- `Marquee` - Infinite scrolling content
- `TiltCard` - 3D tilt effect cards
- `InteractiveHero` - Animated hero sections
- `AccordionItem` - Collapsible content

### Organisms (10+ components)
- `Navbar` - Navigation header
- `Footer` - Site footer
- `PricingTable` - Pricing grids
- `FeatureSection` - Feature showcases
- `FAQ` - FAQ sections
- `LogoCloud` - Partner/client logos
- `Comparison` - Feature comparison tables

### Templates
- `LandingPage` - Complete landing page layout
- More templates coming soon...

## ✨ Features

- **TypeScript** - Full type safety
- **Responsive** - Mobile-first design
- **Accessible** - WCAG 2.1 AA compliant
- **Dark Mode** - Built-in dark theme
- **Customizable** - Easy to theme and extend
- **Performance** - Optimized for speed
- **Documented** - Storybook integration

## 🔧 Customization

Edit design tokens in `/lib/designTokens.ts`:

```typescript
export const designTokens = {
  colors: {
    brand: {
      purple: '#5E6AD2',
      // ... customize colors
    }
  },
  // ... more tokens
};
```

## 📖 Documentation

- [Component Library](../docs/COMPONENT_GUIDE.md)
- [Design Tokens](../docs/DESIGN_TOKENS.md)
- [Usage Examples](../docs/EXAMPLES.md)

## 🤝 Contributing

Components should follow:
1. Atomic Design principles
2. TypeScript strict mode
3. Accessibility standards
4. Consistent naming conventions
5. Comprehensive prop interfaces

---

Built with ❤️ for SiteWise
