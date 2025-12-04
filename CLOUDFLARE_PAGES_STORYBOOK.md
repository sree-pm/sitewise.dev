# Deploy Storybook to Cloudflare Pages

This repo is pre-configured with Storybook. Follow these steps to build and deploy the static Storybook site on Cloudflare Pages.

## Build the static site

```bash
# Install deps (if not already)
npm install

# Build Storybook to static files
npm run build-storybook
# Output: storybook-static/
```

## Cloudflare Pages Setup

- Project type: **Framework preset: None** (static site)
- **Build command**: `npm run build-storybook`
- **Build output directory**: `storybook-static`
- **Root directory**: repository root

You can set these in Cloudflare Pages UI when creating the project, or via `cloudflare-pages.yml` in CI.

## Optional: Deploy via `wrangler` CLI

If you prefer CLI deployments, use Cloudflare Pages Git integration or run:

```bash
# Authenticate once
npx wrangler login

# Deploy the static directory (requires Pages project name)
# Replace <PROJECT_NAME> with your Cloudflare Pages project
npx wrangler pages deploy ./storybook-static --project-name <PROJECT_NAME>
```

## Notes

- Stories live under `stories/` and `components/**/*.stories.tsx`.
- The `.storybook` directory contains config and preview: dark background to match app.
- Ensure any aliased imports (e.g., `@/components/...`) resolve in Storybook (we rely on tsconfig path mapping via Next/TS; Storybook respects this when running in the repo).
- For monorepos or custom paths, add a webpack alias in `.storybook/main.ts`.
