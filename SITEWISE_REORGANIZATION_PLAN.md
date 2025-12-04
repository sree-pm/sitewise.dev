# SiteWise Repository Reorganization Plan

## Vision
A clean, modular repository structure that reflects SiteWise's purpose: making website building wise and efficient.

## New Structure

```
/workspaces/infonaut-ltd/
├── Root Files (Next.js, Cloudflare, Config)
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── next-env.d.ts
│   ├── .gitignore
│   └── README.md
│
├── /app/
│   ├── layout.tsx (Root layout)
│   ├── page.tsx (Landing/redirect)
│   │
│   ├── /website/              # Marketing Website
│   │   ├── layout.tsx
│   │   ├── page.tsx (Homepage)
│   │   ├── /about/
│   │   ├── /features/
│   │   ├── /pricing/
│   │   ├── /blog/
│   │   └── /contact/
│   │
│   ├── /editor/               # Page Builder/Editor App
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── /components/       # Editor-specific components
│   │   ├── /docs/
│   │   └── /settings/
│   │
│   └── /api/                  # API Routes
│       ├── /auth/
│       ├── /repo/
│       ├── /save-page/
│       └── /versions/
│
├── /atomic-design-system/     # Design System
│   ├── index.ts (Main export)
│   ├── /atoms/
│   │   ├── index.ts
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── /molecules/
│   │   ├── index.ts
│   │   ├── bentogrid.tsx
│   │   ├── marquee.tsx
│   │   └── ...
│   ├── /organisms/
│   │   ├── index.ts
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── ...
│   └── /templates/
│       ├── index.ts
│       └── ...
│
├── /lib/                      # Utilities & Helpers
│   ├── utils.ts
│   ├── github.ts
│   ├── auth.ts
│   ├── designTokens.ts
│   ├── globals.css
│   └── ...
│
├── /public/                   # Static Assets
│   ├── /assets/
│   └── /data/
│
├── /functions/                # Cloudflare Functions
│   └── /api/
│
├── /stories/                  # Storybook Stories
│   └── ...
│
└── /docs/                     # Documentation (Consolidated)
    ├── README.md
    ├── SETUP.md
    ├── DEPLOYMENT.md
    └── COMPONENT_GUIDE.md
```

## Migration Steps

1. **Create new structure**
2. **Move marketing pages to /app/website**
3. **Move editor files to /app/editor**
4. **Consolidate design system to /atomic-design-system**
5. **Update all imports**
6. **Clean up documentation**
7. **Update configs**
8. **Test build**

