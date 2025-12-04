# SiteWise - Production-Ready Website Template

> **Build beautiful websites in minutes, not months.**

A complete, modern website template with visual editing, 20+ components, and free hosting. Built with Next.js 15, TypeScript, and Tailwind CSS.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

---

## 🎯 What is SiteWise?

SiteWise is a **production-ready website template** that helps you launch beautiful, high-performance websites in minutes. It includes:

- ✨ **Visual Editor** - Edit content without touching code
- 🎨 **Atomic Design System** - 20+ pre-built, customizable components
- 🚀 **Next.js 15** - Latest React framework with App Router
- 💎 **TypeScript** - Full type safety
- 🎭 **Tailwind CSS** - Beautiful dark theme with design tokens
- 🌐 **Free Hosting** - Deploy to Cloudflare Pages at zero cost
- 📱 **Responsive** - Mobile-first, works perfectly on all devices
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🔒 **Secure** - GitHub OAuth built-in

## 🏗️ Repository Structure

```
/workspaces/infonaut-ltd/
│
├── 📁 /app/
│   ├── /website/              # Marketing Website
│   │   ├── page.tsx           # Homepage
│   │   ├── /about/
│   │   ├── /features/
│   │   ├── /pricing/
│   │   ├── /blog/
│   │   └── /contact/
│   │
│   ├── /editor/               # Visual Page Builder
│   │   ├── page.tsx
│   │   ├── /components/       # Editor-specific components
│   │   ├── /blocks/           # Puck editor blocks
│   │   └── /integrations/     # Puck integration
│   │
│   └── /api/                  # API Routes
│       ├── /auth/             # Authentication
│       ├── /repo/             # GitHub repo management
│       └── /versions/         # Version control
│
├── 📁 /atomic-design-system/  # Component Library
│   ├── /atoms/                # Basic components (Button, Badge, etc.)
│   ├── /molecules/            # Composite components (BentoGrid, Marquee)
│   ├── /organisms/            # Complex sections (Navbar, Footer, Pricing)
│   └── /templates/            # Full page layouts
│
├── 📁 /lib/                   # Utilities & Helpers
│   ├── utils.ts
│   ├── designTokens.ts
│   ├── github.ts
│   └── globals.css
│
├── 📁 /public/                # Static Assets
├── 📁 /functions/             # Cloudflare Functions
├── 📁 /stories/               # Storybook Documentation
└── 📁 /docs/                  # Documentation

# Config Files
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── README.md (this file)
```

## 🚀 Quick Start

### 1. Fork & Clone

```bash
# Fork this repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/sitewise.git
cd sitewise
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### 4. Customize Content

- Edit pages in `/app/website/`
- Customize components in `/atomic-design-system/`
- Modify design tokens in `/lib/designTokens.ts`

### 5. Deploy to Cloudflare Pages

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for step-by-step deployment guide.

## 📚 Documentation

- **[Migration Guide](SITEWISE_MIGRATION_GUIDE.md)** - Understanding the new structure
- **[Component Library](docs/COMPONENT_GUIDE.md)** - Using design system components
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Deploying to Cloudflare Pages
- **[Architecture](docs/ARCHITECTURE.md)** - Understanding the codebase
- **[Contributing](docs/CONTRIBUTING.md)** - How to contribute

## 🎨 Component Library

### Atoms (Basic Building Blocks)
- `Button` - 8 variants with loading states
- `Badge` - Labels and tags
- `Input` - Form inputs with validation
- `Text` - Typography components
- Layout components (Container, Grid, Stack)

### Molecules (Component Combinations)
- `BentoGrid` - Card grid layouts
- `Marquee` - Infinite scrolling content
- `TiltCard` - 3D tilt effect cards
- `InteractiveHero` - Animated hero sections
- `AccordionItem` - Collapsible content

### Organisms (Complex Compositions)
- `Navbar` - Navigation header
- `Footer` - Site footer
- `PricingTable` - Pricing grids
- `FeatureSection` - Feature showcases
- `FAQ` - FAQ sections
- `LogoCloud` - Partner/client logos

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Visual Editor**: Puck
- **Authentication**: NextAuth with GitHub OAuth
- **Deployment**: Cloudflare Pages
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Development**: Storybook for component docs

## 📦 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run pages:build  # Build for Cloudflare Pages
npm run storybook    # Start Storybook
```

## 🌐 Routes

### Marketing Website (`/app/website`)
- `/` or `/website` - Homepage
- `/website/about` - About page
- `/website/features` - Features page
- `/website/pricing` - Pricing page
- `/website/blog` - Blog index
- `/website/contact` - Contact page

### Editor (`/app/editor`)
- `/editor` - Visual page builder
- `/editor/docs` - Editor documentation
- `/editor/settings` - Editor settings

## 🎯 Use Cases

Perfect for:
- 🚀 **Landing Pages** - Product launches, marketing campaigns
- 💼 **Portfolio Sites** - Showcase your work
- 🏢 **Agency Websites** - Professional service sites
- 📝 **Blogs** - Content-focused websites
- 🛍️ **SaaS Marketing** - Product marketing sites
- 🎓 **Documentation Sites** - Product docs and guides

## 💡 Features

- **Visual Editing** - Puck editor for non-technical users
- **Type-Safe** - Full TypeScript coverage
- **Responsive** - Mobile-first design
- **Fast** - Optimized for Core Web Vitals (100/100 Lighthouse)
- **SEO-Friendly** - Meta tags, sitemaps, structured data
- **Accessible** - WCAG 2.1 AA compliant
- **Free Hosting** - $0/month with Cloudflare Pages
- **Global CDN** - 300+ edge locations worldwide
- **Dark Mode** - Beautiful dark theme built-in
- **CI/CD Ready** - GitHub Actions included

## 🔄 Recent Reorganization

This repository was recently reorganized for better clarity:

- **Before**: Mixed folders, duplicated pages, unclear structure
- **After**: Clean separation of marketing, editor, and design system

See [SITEWISE_MIGRATION_GUIDE.md](SITEWISE_MIGRATION_GUIDE.md) for details.

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md).

## 📄 License

MIT License - feel free to use this for personal or commercial projects.

## 🌟 Support

- ⭐ Star this repository
- 🐛 Report bugs via [GitHub Issues](https://github.com/sree-pm/infonaut-ltd/issues)
- 💬 Join our [Discord community](#)
- 📧 Email: hello@sitewise.dev

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Puck](https://puckeditor.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Made with ❤️ for the web development community**

[Website](#) · [Documentation](docs/) · [Twitter](#) · [Discord](#)
