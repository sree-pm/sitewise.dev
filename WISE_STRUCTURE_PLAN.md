# 🎯 sitewise.dev - WISE Repository Structure

## Final Clean Structure

```
sitewise-dev/
├── app/
│   ├── website/              # 📄 All marketing pages (clear!)
│   │   ├── page.tsx         # Homepage (/)
│   │   ├── about/
│   │   │   └── page.tsx     # /about
│   │   ├── features/
│   │   │   └── page.tsx     # /features
│   │   ├── pricing/
│   │   │   └── page.tsx     # /pricing
│   │   ├── contact/
│   │   │   └── page.tsx     # /contact
│   │   └── blog/
│   │       └── page.tsx     # /blog
│   ├── editor/              # 🎨 Visual page editor
│   │   └── page.tsx
│   ├── api/                 # 🔌 API routes
│   └── layout.tsx           # Root layout
│
├── atomic-design-system/    # 🧬 All UI components (clear!)
│   ├── atoms/              # Basic building blocks
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── shortcut.tsx
│   │   └── techicons.tsx
│   ├── molecules/          # Combined atoms
│   │   ├── accordionitem.tsx
│   │   ├── advancedform.tsx
│   │   ├── bentocard.tsx
│   │   ├── bentogrid.tsx
│   │   ├── interactivehero.tsx
│   │   ├── marquee.tsx
│   │   ├── optimizedimage.tsx
│   │   └── tiltcard.tsx
│   └── organisms/          # Full sections
│       ├── comparison.tsx
│       ├── faq.tsx
│       ├── featuresection.tsx
│       ├── logocloud.tsx
│       ├── navbar.tsx
│       ├── pricing.tsx
│       └── valueprop.tsx
│
├── lib/                     # 🛠️ Utilities & helpers
│   ├── assets.ts
│   ├── designTokens.ts
│   ├── globals.css
│   ├── tailwind.config.ts
│   ├── useAdvancedScroll.ts
│   ├── useScrollObserver.ts
│   └── utils.ts
│
├── public/                  # 📦 Static assets
│   └── assets/
│       ├── brand/
│       ├── team/
│       └── ventures/
│
├── .storybook/             # 📚 Component stories
├── stories/                # 📖 Storybook files
├── functions/              # ⚡ Cloudflare functions
│
└── Root config files       # ⚙️ Configuration
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── postcss.config.js
    ├── .eslintrc.json
    ├── README.md
    └── DEPLOYMENT.md
```

## Actions Required

### 1. Copy Components to atomic-design-system/
- ✅ Created `/atomic-design-system/atoms/`
- ✅ Created `/atomic-design-system/molecules/`
- ✅ Created `/atomic-design-system/organisms/`
- 🔄 Need to copy all files from `/components/` subfolders

### 2. Move Pages to app/website/
- ✅ Created `/app/website/` structure
- 🔄 Need to copy from `/app/(website)/` to `/app/website/`
- 🔄 Update all imports from `@/components/` to `@/atomic-design-system/`

### 3. Clean Up Old Folders
- 🗑️ Delete `/components/` (after copying to atomic-design-system)
- 🗑️ Delete `/app/(website)/` (after copying to app/website)
- 🗑️ Delete `/app/about/`, `/app/features/`, etc. (old duplicates)
- 🗑️ Delete `/website/` folder I created earlier (mistake)
- 🗑️ Delete 34 markdown documentation files

### 4. Update tsconfig.json Path Aliases
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/atomic-design-system/*": ["./atomic-design-system/*"]
    }
  }
}
```

### 5. Update All Imports
Change in all files:
- `@/components/atoms/*` → `@/atomic-design-system/atoms/*`
- `@/components/molecules/*` → `@/atomic-design-system/molecules/*`
- `@/components/organisms/*` → `@/atomic-design-system/organisms/*`

## Wise Benefits

✅ **Clear folder names** - Anyone understands what each folder contains  
✅ **Atomic design principle** - Proper component organization  
✅ **Marketing separate** - All website pages under `/app/website/`  
✅ **Editor isolated** - Visual editor in `/app/editor/`  
✅ **No confusion** - No duplicate folders or files  
✅ **Professional structure** - Enterprise-level organization  

## Next Steps

1. Copy all component files to atomic-design-system (automated)
2. Copy all page files to app/website with updated imports (automated)
3. Delete old folders (manual - terminal blocked)
4. Update tsconfig.json paths
5. Test build
