# SiteWise - Production-Ready Website Template

A modern, production-ready website template built with Next.js 15, TypeScript, and Tailwind CSS. Build beautiful websites in minutes with our atomic design system, visual editor, and free hosting.

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange)](https://pages.cloudflare.com/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## ✨ Features

- 🎨 **20+ Components** - Buttons, cards, forms, navigation, and more
- ⚡ **Lightning Fast** - React Server Components, automatic code splitting
- 🎯 **TypeScript** - Full type safety across the entire codebase
- 📱 **Responsive** - Mobile-first design that works everywhere
- 🌐 **Free Hosting** - Deploy to Cloudflare Pages at zero cost
- 🔐 **Auth Ready** - GitHub OAuth with NextAuth (easy to extend)
- ✏️ **Visual Editor** - Puck SDK for content editing without code
- 🎭 **Atomic Design** - Organized components (atoms → molecules → organisms)
- ♿ **Accessible** - WCAG 2.1 AA compliant components
- 🚀 **Production Ready** - Built-in SEO, analytics-ready, optimized

## 🚀 Quick Start

### 1. Fork & Clone

```bash
# Fork this repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/sitewise.dev.git
cd sitewise.dev

# Install dependencies
npm install
```

### 2. Set Up Environment

```bash
# Copy environment template
cp .env.example .env.local

# Add your credentials (optional for basic usage)
# Required only if using GitHub integration or visual editor
```

### 3. Start Development

```bash
# Run development server
npm run dev

# Open in browser
# http://localhost:3000
```

## 📁 Project Structure

```
sitewise.dev/
├── app/
│   ├── page.tsx                  # Home page
│   ├── about/page.tsx            # About page
│   ├── features/page.tsx         # Features showcase
│   ├── pricing/page.tsx          # Pricing page
│   ├── contact/page.tsx          # Contact page
│   ├── blog/page.tsx             # Blog listing
│   ├── editor/page.tsx           # Visual editor (Puck)
│   └── api/                      # API routes
├── components/
│   ├── atoms/                    # Basic components
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   ├── molecules/                # Composite components
│   │   ├── bentogrid.tsx
│   │   ├── tiltcard.tsx
│   │   └── ...
│   └── organisms/                # Full sections
│       ├── navbar.tsx
│       ├── featuresection.tsx
│       └── ...
├── lib/
│   ├── designTokens.ts           # Design system tokens
│   ├── utils.ts                  # Utility functions
│   └── globals.css               # Global styles
└── public/
    └── assets/                   # Images, fonts, etc.
```

## 🎨 Component Library

### Atoms (Basic Building Blocks)
- `Button` - Multiple variants (glow, outline, ghost, etc.)
- `Badge` - Labels and tags
- `Input` - Form inputs with validation
- `TechIcon` - Technology logos and icons

### Molecules (Composite Components)
- `BentoGrid` - Modern grid layouts
- `TiltCard` - 3D tilt effect cards
- `InteractiveHero` - Animated hero sections
- `Marquee` - Infinite scroll marquee
- `AccordionItem` - Expandable content

### Organisms (Full Sections)
- `Navbar` - Responsive navigation
- `FeatureSection` - Feature showcase with images
- `PricingTable` - Pricing tiers
- `ComparisonTable` - Feature comparison
- `FAQ` - Frequently asked questions
- `LogoCloud` - Partner/tech logos

## 🛠 Customization

### Design Tokens

Edit `lib/designTokens.ts` to customize colors, spacing, typography:

```typescript
export const colors = {
  brand: {
    purple: "#5E6AD2",
    blue: "#26B5CE",
    // Add your brand colors
  }
}
```

### Tailwind Config

Modify `tailwind.config.ts` for custom breakpoints, plugins, etc.

### Components

All components use Tailwind CSS. Simply edit the className props:

```tsx
<Button variant="glow" size="lg">
  Get Started
</Button>
```

## 🌍 Deployment

### Cloudflare Pages (Recommended - FREE)

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your repository
4. Build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Build output:** `.next`
5. Deploy!

Your site will be live on `https://your-project.pages.dev` with:
- ✅ Unlimited bandwidth
- ✅ 300+ global edge locations
- ✅ Automatic SSL
- ✅ DDoS protection
- ✅ $0/month forever

### Other Platforms

- **Vercel:** `vercel --prod`
- **Netlify:** Connect repo, deploy automatically
- **AWS/GCP/Azure:** Use Next.js SSR hosting

## 🔐 Environment Variables

Create `.env.local` for local development:

```bash
# GitHub Integration (Optional - only for visual editor)
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your-username
GITHUB_REPO=your-repo-name
GITHUB_BRANCH=main

# NextAuth (Optional - only if using auth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GITHUB_CLIENT_ID=your-oauth-app-id
GITHUB_CLIENT_SECRET=your-oauth-app-secret
```

## 📚 Documentation

- **[START_HERE.md](./START_HERE.md)** - First-time setup guide
- **[FORK_SETUP_CHECKLIST.md](./FORK_SETUP_CHECKLIST.md)** - Deployment checklist
- **Component Docs** - See `/stories` for Storybook documentation

## 🧪 Development Commands

```bash
# Development server
npm run dev

# Type checking
npx tsc --noEmit

# Build for production
npm run build

# Start production server
npm run start

# Run Storybook (component documentation)
npm run storybook
```

## 📦 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 15 | React framework with App Router |
| TypeScript 5 | Type-safe JavaScript |
| Tailwind CSS | Utility-first styling |
| Puck SDK | Visual page editor |
| NextAuth | Authentication |
| Framer Motion | Animations |
| Lucide Icons | Icon library |
| Radix UI | Accessible primitives |

## 🎯 Use Cases

Perfect for:
- 🚀 **Landing Pages** - Product launches, marketing sites
- 💼 **Portfolios** - Showcase your work professionally
- 🏢 **SaaS Websites** - Marketing sites for your products
- 🎨 **Agency Sites** - Beautiful client-facing websites
- 📝 **Blogs** - Content-focused sites with great UX
- 🛍️ **E-commerce** - Product pages and storefronts

## 💰 Pricing

**Template:** $0 (MIT License)  
**Hosting:** $0 (Cloudflare Pages free tier)  
**Support:** $0 (Community Discord + GitHub Issues)

**Total Cost:** $0 forever

## 🤝 Contributing

We welcome contributions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues & Support

- **Bug Reports:** [GitHub Issues](https://github.com/sitewise-dev/sitewise/issues)
- **Feature Requests:** [GitHub Discussions](https://github.com/sitewise-dev/sitewise/discussions)
- **Community:** [Discord Server](https://discord.gg/sitewise)
- **Documentation:** [Full Docs](https://sitewise.dev/docs)

## 📝 License

MIT License - use for any project, personal or commercial.

See [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

Built with amazing open source tools:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Puck](https://puckeditor.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 🌟 Show Your Support

If you find this template useful, please:
- ⭐ Star this repository
- 🐦 Share on Twitter
- 📝 Write a blog post
- 🤝 Contribute improvements

---

**Built for developers who want to ship fast.** Fork it, make it yours, and launch today.

[View Demo](https://sitewise.dev) | [Documentation](https://sitewise.dev/docs) | [Discord Community](https://discord.gg/sitewise)
