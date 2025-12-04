# SiteWise Repository Migration Guide

## 🎯 Goal
Transform the repository into a clean, modular structure that clearly separates:
- **Marketing Website** (`/app/website`)
- **Editor/Builder** (`/app/editor`)  
- **Design System** (`/atomic-design-system`)

## 📋 Current State Analysis

### Problems with Current Structure:
1. **Duplicate folders**: `/website`, `/app/website`, `/app/(website)` all contain marketing pages
2. **Mixed components**: `/components` mixes design system with editor-specific components
3. **Documentation chaos**: 30+ markdown files at root level
4. **Unclear separation**: Hard to know what belongs to marketing vs editor vs design system

## 🏗️ Target Structure

```
/workspaces/infonaut-ltd/
│
├── 📁 Root (Config Files Only)
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── README.md
│   └── .gitignore
│
├── 📁 /app/
│   ├── layout.tsx (Root layout - applies to all routes)
│   ├── page.tsx (Homepage redirect or landing)
│   │
│   ├── 📁 /website/           ← MARKETING SITE
│   │   ├── layout.tsx (Website-specific layout with navbar/footer)
│   │   ├── page.tsx (Homepage)
│   │   ├── /about/page.tsx
│   │   ├── /features/page.tsx
│   │   ├── /pricing/page.tsx
│   │   ├── /blog/
│   │   │   ├── page.tsx (Blog index)
│   │   │   └── /[slug]/page.tsx
│   │   └── /contact/page.tsx
│   │
│   ├── 📁 /editor/            ← PAGE BUILDER APP
│   │   ├── layout.tsx (Editor layout)
│   │   ├── page.tsx (Editor home)
│   │   ├── /docs/page.tsx
│   │   ├── /settings/page.tsx
│   │   ├── /components/       # Editor-specific components
│   │   │   ├── PageRenderer.tsx
│   │   │   ├── RepoSelector.tsx
│   │   │   └── DynamicHelpModal.tsx
│   │   ├── /blocks/           # Puck editor blocks
│   │   │   ├── index.tsx
│   │   │   └── extended.tsx
│   │   └── /integrations/     # Puck integration
│   │       └── puck.tsx
│   │
│   └── 📁 /api/               ← API ROUTES
│       ├── /auth/
│       ├── /repo/
│       ├── /save-page/
│       ├── /versions/
│       └── /admin-status/
│
├── 📁 /atomic-design-system/  ← DESIGN SYSTEM
│   ├── index.ts (Main barrel export)
│   ├── README.md (Design system docs)
│   │
│   ├── /atoms/
│   │   ├── index.ts
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── text.tsx
│   │   ├── shortcut.tsx
│   │   ├── techicons.tsx
│   │   ├── turnstile.tsx
│   │   ├── layout.tsx (Container, Grid, Stack, etc.)
│   │   └── advanced.tsx
│   │
│   ├── /molecules/
│   │   ├── index.ts
│   │   ├── bentogrid.tsx
│   │   ├── marquee.tsx
│   │   ├── tiltcard.tsx
│   │   ├── interactivehero.tsx
│   │   ├── accordionitem.tsx
│   │   ├── advanced.tsx
│   │   └── index.tsx
│   │
│   ├── /organisms/
│   │   ├── index.ts
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── logocloud.tsx
│   │   ├── valueprop.tsx
│   │   ├── featuresection.tsx
│   │   ├── pricing.tsx
│   │   ├── comparison.tsx
│   │   └── faq.tsx
│   │
│   └── /templates/
│       ├── index.ts
│       └── landing-page.tsx
│
├── 📁 /lib/                   ← UTILITIES
│   ├── utils.ts
│   ├── github.ts
│   ├── auth.ts
│   ├── repoAdmin.ts
│   ├── designTokens.ts
│   ├── tailwind.config.ts
│   ├── globals.css
│   ├── usePageData.ts
│   ├── useScrollObserver.ts
│   ├── useAdvancedScroll.ts
│   └── assets.ts
│
├── 📁 /public/
│   ├── /assets/
│   └── /data/
│
├── 📁 /functions/             ← CLOUDFLARE FUNCTIONS
│   ├── env.d.ts
│   └── /api/
│
├── 📁 /stories/               ← STORYBOOK
│   ├── Button.stories.tsx
│   ├── Header.stories.tsx
│   ├── Input.stories.tsx
│   └── LandingPageTemplate.stories.tsx
│
└── 📁 /docs/                  ← DOCUMENTATION
    ├── README.md (Main documentation)
    ├── SETUP.md
    ├── DEPLOYMENT.md
    ├── COMPONENT_GUIDE.md
    ├── ARCHITECTURE.md
    └── CLOUDFLARE.md
```

## 🔧 Migration Steps

### Phase 1: Update tsconfig.json Paths

Add path mappings for cleaner imports:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/atomic-design-system/*": ["./atomic-design-system/*"],
      "@/components/*": ["./atomic-design-system/*"],
      "@/lib/*": ["./lib/*"],
      "@/app/*": ["./app/*"]
    }
  }
}
```

### Phase 2: Create Main Barrel Export for Design System

File: `/atomic-design-system/index.ts`

```typescript
// Atoms
export * from './atoms';

// Molecules  
export * from './molecules';

// Organisms
export * from './organisms';

// Templates
export * from './templates';
```

### Phase 3: Update Import Statements

Replace across codebase:
- `@/components/atoms/*` → `@/atomic-design-system/atoms/*`
- `@/components/molecules/*` → `@/atomic-design-system/molecules/*`
- `@/components/organisms/*` → `@/atomic-design-system/organisms/*`
- `@/components/puck-blocks` → `@/app/editor/blocks`
- `@/components/integrations/puck` → `@/app/editor/integrations/puck`
- `@/components/PageRenderer` → `@/app/editor/components/PageRenderer`
- `@/components/repo-selector` → `@/app/editor/components/RepoSelector`

### Phase 4: Update Routes

All marketing pages should be under `/app/website`:
- `/` → `/app/website/page.tsx` (homepage)
- `/about` → `/app/website/about/page.tsx`
- `/features` → `/app/website/features/page.tsx`
- `/pricing` → `/app/website/pricing/page.tsx`
- `/blog` → `/app/website/blog/page.tsx`
- `/contact` → `/app/website/contact/page.tsx`

Editor routes under `/app/editor`:
- `/editor` → `/app/editor/page.tsx`
- `/editor/docs` → `/app/editor/docs/page.tsx`
- `/editor/settings` → `/app/editor/settings/page.tsx`

### Phase 5: Clean Up

**Delete these redundant folders:**
- `/website/` (after moving content to `/app/website/`)
- `/app/(website)/` (after consolidating)
- `/app/about/` (standalone pages, now under `/app/website/`)
- `/app/features/`
- `/app/pricing/`
- `/app/blog/`
- `/app/contact/`
- `/components/` (after moving to `/atomic-design-system/` and `/app/editor/`)

**Consolidate documentation:**
Move all `*.md` files from root to `/docs/` except:
- `README.md` (keep at root)
- `package.json`
- Config files

## 🎨 Design System Import Examples

### Before (Old):
```typescript
import { Button } from "@/components/atoms/button";
import { Navbar } from "@/components/organisms/navbar";
import { BentoGrid } from "@/components/molecules/bentogrid";
```

### After (New):
```typescript
import { Button } from "@/atomic-design-system/atoms/button";
import { Navbar } from "@/atomic-design-system/organisms/navbar";
import { BentoGrid } from "@/atomic-design-system/molecules/bentogrid";

// OR using barrel exports:
import { Button, Badge, Input } from "@/atomic-design-system/atoms";
import { Navbar, Footer } from "@/atomic-design-system/organisms";
```

## 🚀 Benefits of New Structure

1. **Clear Separation**: Marketing site vs Editor vs Design System
2. **Better DX**: Developers instantly know where to find things
3. **Scalability**: Easy to add new pages to website or editor
4. **Modularity**: Design system can be extracted to separate package
5. **Less Confusion**: No duplicate folders or scattered files
6. **Wise Organization**: Truly reflects the SiteWise name! 🧠

## ✅ Verification Checklist

After migration:
- [ ] `npm run build` succeeds
- [ ] All pages load correctly
- [ ] Design system components import properly
- [ ] Editor functionality works
- [ ] No broken imports
- [ ] Storybook still works
- [ ] Documentation is organized

---

**Remember**: This is a SiteWise repository - let's make it wise! 🎯
