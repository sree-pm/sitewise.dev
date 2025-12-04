# Fork Setup Checklist

Use this checklist to turn a fork into a live website on Cloudflare Pages.

## 1) Cloudflare Pages
- Create a new Pages project from your fork
- Build command: `npm run build`
- Output directory: `.next`
- Set `NODE_VERSION` to 20 (Pages auto-detects, but this keeps parity with CI)

## 2) GitHub Repo Settings
- Enable GitHub Actions
- (Optional) Add Secrets for Storybook CI:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_PAGES_PROJECT`

## 3) Branding & Content
- Update `public/assets/brand/*` with your logo and images
- Update `public/data/pages.json` with your content blocks
- Check `app/page.tsx` for any custom sections you want to keep/remove

## 4) Verify Locally
```bash
npm install
npx tsc --noEmit
npm run lint
npm run build
```

## 5) Domain
- Add your domain in Cloudflare Pages → Custom domains
- Ensure DNS records are managed by Cloudflare (orange cloud)

## 6) Optional Extras
- Storybook deploy (CI workflows added): run `npm run build-storybook`
- PR previews (preview workflow already included)
- Add analytics, error tracking, and custom headers in Cloudflare settings
