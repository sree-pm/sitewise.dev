# Component Architecture Diagram

## Hierarchical Component System

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PUCK EDITOR                                  │
│  (Drag & Drop, 12 Editable Block Types)                            │
└────────────┬────────────────────────────────────────────────────────┘
             │
             ├─────────────────────────────────────────────────────────┐
             │                    PUCK BLOCKS (12)                      │
             │  (Full-page editable sections for WYSIWYG editing)      │
             │                                                          │
             │  ┌─────────┐  ┌────────┐  ┌───────┐  ┌──────────┐     │
             │  │  Hero   │  │Section │  │ Image │  │ GridSec  │     │
             │  └────┬────┘  └───┬────┘  └───┬───┘  └────┬─────┘     │
             │       │           │           │           │             │
             │  ┌─────────────────────────────────────────┐            │
             │  │     ORGANISMS (7 Existing)              │            │
             │  │  ┌──────────┐  ┌──────────┐           │            │
             │  │  │ Pricing  │  │    FAQ   │  ...      │            │
             │  │  └────┬─────┘  └────┬─────┘           │            │
             │  └───────┼────────┬────┼─────────────────┘            │
             │          │        │    │                              │
             │  ┌──────────────────────────────┐                     │
             │  │    MOLECULES (15+)           │                     │
             │  │  ┌────────────┐ ┌──────────┐ │                     │
             │  │  │ FeatureCard│ │PriceCard │ │                     │
             │  │  └──────┬─────┘ └────┬─────┘ │                     │
             │  │         │            │       │                     │
             │  │  ┌──────────────────────┐    │                     │
             │  │  │ StatCard, TestCard   │    │                     │
             │  │  └──────┬──────────┬────┘    │                     │
             │  └─────────┼──────────┼─────────┘                     │
             │            │          │                               │
             │  ┌──────────────────────────────────────┐             │
             │  │     ATOMS (45+)                      │             │
             │  │                                      │             │
             │  │  TEXT:          LAYOUT:              │             │
             │  │  • Text         • Container          │             │
             │  │  • GradientText • Grid               │             │
             │  │  • BadgeText    • Flex               │             │
             │  │                 • Stack              │             │
             │  │  INPUT:         • Surface            │             │
             │  │  • Input        • Spacer             │             │
             │  │  • Textarea     • Divider            │             │
             │  │  • Select       • AspectRatio        │             │
             │  │  • Checkbox     • Skeleton           │             │
             │  │  • Radio                             │             │
             │  │  • Toggle                            │             │
             │  │  • Loader                            │             │
             │  │  • ProgressBar                       │             │
             │  └──────────────┬───────────────────────┘             │
             │                 │                                      │
             └─────────────────┼──────────────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                │   DESIGN SYSTEM             │
                │  (lib/designTokens.ts)      │
                │                             │
                │  • Colors (20+)            │
                │  • Typography (11 levels)  │
                │  • Spacing (8px base)      │
                │  • Shadows (10 levels)     │
                │  • Animations              │
                │  • Glass Morphism          │
                └─────────────────────────────┘
```

---

## Component Flow: Building a Page

```
User Opens Editor (/editor)
        ↓
    Authenticates (GitHub OAuth)
        ↓
    Repo Selector (Choose or create repo)
        ↓
    Load Page Data (from GitHub)
        ↓
    Puck Editor Ready
        ↓
    Drag Hero Block → Renders Hero Block
        ↓
    Customize Fields (headline, subheading, etc)
        ↓
    Preview Updates Live
        ↓
    Add More Blocks (Section, Image, GridSection, etc)
        ↓
    Customize Each Block
        ↓
    Commit to GitHub
        ↓
    Data Saved to /data/pages.json
        ↓
    GitHub Actions Rebuilds Site
        ↓
    New Page Live!
```

---

## Component Composition Example: Feature Section

```
Feature Section (Puck Block)
    ↓
    ├── Section Block Props
    │   ├── title: "Our Features"
    │   ├── padding: "lg"
    │   └── backgroundColor: "transparent"
    ↓
    ├── Container (Atom)
    │   └── size: "lg"
    ↓
    ├── Text (Atom)
    │   ├── variant: "h2"
    │   └── children: "Our Features"
    ↓
    ├── Grid (Atom)
    │   ├── cols: 3
    │   ├── gap: "lg"
    │   └── children:
    │       ├── FeatureCard (Molecule)
    │       │   ├── icon: "⚡"
    │       │   ├── title: "Fast"
    │       │   ├── description: "Lightning quick"
    │       │   └── Surface (Atom)
    │       │       ├── variant: "glass"
    │       │       ├── padding: "lg"
    │       │       └── rounded: "lg"
    │       │
    │       ├── FeatureCard (Molecule)
    │       │   └── [Same structure]
    │       │
    │       └── FeatureCard (Molecule)
    │           └── [Same structure]
    └── Result: Beautiful 3-column feature grid with full customization!
```

---

## Import Hierarchy

```
app/page.tsx (Home Page)
    ↓
    ├── imports from components/puck-blocks/ (Blocks)
    │   └── imports from components/molecules/ (Molecules)
    │       └── imports from components/atoms/ (Atoms)
    │           └── imports from lib/designTokens.ts (Design System)
    │
    └── imports from lib/utils.ts (Utilities)

components/integrations/puck.tsx (Puck Editor)
    ↓
    ├── imports from components/puck-blocks/ (All 12 blocks)
    │   └── imports from components/molecules/ (For rendering)
    │       └── imports from components/atoms/ (For base components)
    │           └── imports from lib/designTokens.ts (Design System)
    │
    └── Puck Config includes all components for editing
```

---

## File Organization

```
components/
├── atoms/                          # 45+ Base Components
│   ├── index.ts                    # ← Import from here
│   ├── text.tsx                    # Text, GradientText, BadgeText
│   ├── layout.tsx                  # Container, Grid, Flex, Surface, etc
│   ├── inputs.tsx                  # Input, Textarea, Select, Toggle, etc
│   ├── button.tsx                  # Existing
│   ├── badge.tsx                   # Existing
│   ├── shortcut.tsx                # Existing
│   └── techicons.tsx               # Existing
│
├── molecules/                      # 15+ Smart Components
│   └── index.tsx                   # ← Import from here
│       # InputGroup, StatCard, FeatureCard, PriceCard, etc
│
├── organisms/                      # 7 Complex Sections
│   ├── pricing.tsx                 # Existing
│   ├── faq.tsx                     # Existing
│   └── ... (5 more)
│
├── puck-blocks/                    # 12 Editable Blocks
│   └── index.tsx                   # ← Import into Puck
│       # Hero, Section, Image, GridSection, PricingTable, etc
│
└── integrations/
    └── puck.tsx                    # ← Puck Editor Config
        # Includes all 12 blocks from puck-blocks/

lib/
├── designTokens.ts                 # Design System (imported by all)
└── utils.ts                        # Utilities (cn() function, etc)
```

---

## Variant Examples

### Text Component (Atoms)
```
<Text variant="h1" />                    → Heading 1
<Text variant="h2" color="secondary" />  → Heading 2, secondary color
<Text variant="body" weight="bold" />    → Bold body text
<Text variant="caption" />               → Small caption text
```

### Surface Component (Atoms)
```
<Surface variant="glass" />              → Frosted glass effect
<Surface variant="solid" />              → Solid background
<Surface variant="outline" />            → Outline only
<Surface variant="elevated" />           → Elevated shadow
```

### Button Component (Existing Atoms)
```
<Button variant="glow" />                → Primary with glow
<Button variant="outline" />             → Outline style
<Button variant="ghost" />               → Minimal style
<Button size="lg" />                     → Large button
```

### Puck Blocks (Editable)
```
<Hero
  headline="Welcome"
  subheading="Build amazing sites"
  primaryCta="Get Started"
/>

<GridSection
  columns={3}
  items={[
    { icon: "⚡", title: "Fast", description: "Quick" }
  ]}
/>

<PricingTable
  plans={[
    { name: "Pro", price: "$99", features: ["..."] }
  ]}
/>
```

---

## Component Coverage by Use Case

### Landing Page → Use Blocks
- Hero Block (headline, CTAs)
- GridSection Block (features)
- Testimonials Block (social proof)
- PricingTable Block (pricing)
- Newsletter Block (subscribe)
- CTA Block (final call-to-action)

### Product Page → Use Blocks
- Hero Block (product intro)
- Image Block (product screenshots)
- GridSection Block (benefits)
- Stats Block (metrics)
- FAQ Block (questions)
- CTA Block (purchase button)

### Custom Section → Use Atoms + Molecules
```tsx
import { Container, Grid } from '@/components/atoms';
import { StatCard, FeatureCard } from '@/components/molecules';

export function Dashboard() {
  return (
    <Container>
      <Grid cols={3}>
        <StatCard label="Revenue" value="$45K" />
        <FeatureCard icon="📊" title="Analytics" />
      </Grid>
    </Container>
  );
}
```

---

## Performance Considerations

**Atom Components:**
- Minimal, re-render optimized
- Used multiple times per page
- Highly reusable

**Molecule Components:**
- Combine atoms for specific use cases
- Cache-friendly
- Moderate reuse

**Puck Blocks:**
- Heavy, complex sections
- Single or few instances per page
- Used mainly in editor

**Design Tokens:**
- Centralized in lib/designTokens.ts
- Used by all components
- Single source of truth

---

## Customization Flow

```
1. Design System (lib/designTokens.ts)
   └─ Colors, typography, spacing, shadows
   
2. Atoms (components/atoms/)
   └─ Basic building blocks using design tokens
   
3. Molecules (components/molecules/)
   └─ Combine atoms with semantic meaning
   
4. Puck Blocks (components/puck-blocks/)
   └─ Large sections combining molecules + atoms
   
5. Page Composition
   └─ Combine blocks in Puck editor or React code

To customize:
- Update design tokens → Affects all components
- Update atom styles → Affects molecules and blocks
- Update molecule → Affects blocks using it
- Update block → Affects only that block type
```

---

## Available Blocks Summary

| Block Name | Purpose | Fields |
|-----------|---------|--------|
| Hero | Page header with CTA | headline, subheading, badge, CTAs |
| Section | Generic container | title, subtitle, padding, bg color |
| Image | Image display | src, alt, size, rounded, shadow, caption |
| GridSection | Icon grid | columns (2/3/4), title, items |
| PricingTable | Pricing plans | plans (name, price, features) |
| Testimonials | Social proof | testimonials (quote, author, image) |
| LogoCloud | Logo grid | logos (name, src) |
| FAQ | Questions | faqs (question, answer) |
| Newsletter | Email form | title, description, placeholder |
| TwoColumn | 2-col layout | titles, content, images |
| CTA | Call-to-action | headline, description, CTAs |
| Stats | Metrics | title, stats (value, label) |

---

**Architecture Version:** 1.0.0  
**Total Components:** 130+  
**Status:** Production Ready
