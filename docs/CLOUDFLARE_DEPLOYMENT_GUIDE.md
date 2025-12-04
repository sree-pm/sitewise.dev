# 🚀 Deploy Infonaut to Cloudflare Pages

## Quick Setup (5 minutes)

### Step 1: Ensure `.next` is built locally
```bash
cd /workspaces/infonaut-ltd
npm run build
```

### Step 2: Push to GitHub
```bash
git add .
git commit -m "feat: reposition as AI venture studio"
git push origin main
```

### Step 3: Connect to Cloudflare Pages

**Via Dashboard:**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select account → Pages
3. Click "Create a project"
4. Connect GitHub repo `sree-pm/infonaut-ltd`
5. Select `main` branch

### Step 4: Configure Build Settings

**Build configuration:**
- Framework preset: `Next.js`
- Build command: `npm run build`
- Build output directory: `.next`
- Root directory: `/` (default)

**Environment variables (optional):**
```
NODE_VERSION=18
```

### Step 5: Deploy

Click "Save and Deploy"

Cloudflare will:
1. ✅ Clone your repo
2. ✅ Run `npm run build`
3. ✅ Deploy `.next` folder
4. ✅ Provide URL: `infonaut-xyz.pages.dev`

---

## Custom Domain Setup

### Add Your Custom Domain

1. In Cloudflare Pages project settings
2. Click "Custom domains"
3. Add `infonaut.com` (or your domain)
4. Cloudflare will provide DNS records
5. Add DNS records to your domain registrar
6. Wait 5-10 minutes for SSL cert

---

## Performance Tips

### Optimize for Cloudflare

**Caching Headers (in `next.config.ts`):**
```typescript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, s-maxage=86400',
        },
      ],
    },
  ];
}
```

**This gives you:**
- Browser cache: 1 hour
- Cloudflare cache: 1 day
- Global CDN acceleration

---

## Analytics & Monitoring

### Enable Cloudflare Analytics

In Pages settings:
- ✅ Enable "Web Analytics" (free)
- View real-time traffic
- Monitor deployment health
- Track performance

### Monitor Deployments

Every push to `main` triggers:
1. Build (2-3 minutes)
2. Deploy (30 seconds)
3. Live (automatic HTTPS)

---

## Troubleshooting

### Build Fails?
```bash
# Check locally first
npm run build

# If error, check Node version
node --version  # Should be 18+

# Clear cache and rebuild
rm -rf node_modules .next
npm install
npm run build
```

### Site Not Updating?
1. Check deployment status in Cloudflare dashboard
2. Clear browser cache (Cmd+Shift+Delete)
3. Wait 30 seconds for cache invalidation
4. Try incognito window

### Performance Slow?
1. Enable Cloudflare compression
2. Optimize images (we already did with OptimizedImage)
3. Use Cloudflare's image optimization service
4. Enable auto minification

---

## Environment Variables

If needed for production, add to Cloudflare:

```
NEXT_PUBLIC_API_URL=https://api.infonaut.com
NEXT_PUBLIC_GA_ID=your-analytics-id
```

---

## DNS Configuration

### For infonaut.com

Point to Cloudflare:

```
Type: CNAME
Name: @
Value: infonaut-ltd.pages.dev
```

Or use Cloudflare nameservers:
```
ns1.cloudflare.com
ns2.cloudflare.com
```

---

## Post-Deploy Checklist

- [ ] Site loads at `infonaut-xyz.pages.dev`
- [ ] Form works and submissions received
- [ ] Mobile responsive
- [ ] All animations smooth (60fps)
- [ ] Images lazy-loaded
- [ ] Analytics tracking active
- [ ] Custom domain set up
- [ ] HTTPS working
- [ ] Page speed > 90 Lighthouse

---

## Monitoring First Week

### Check These Metrics
- **Traffic**: Who's visiting? (Founders, investors, partners?)
- **Engagement**: Are people scrolling all sections?
- **Form submissions**: Quality of leads/partnerships?
- **Bounce rate**: Is messaging clear?

### If Poor Results, Check:
1. Are CTAs clear? (Apply/Invest buttons visible?)
2. Is hero copy resonating? (Test with target audience)
3. Are portfolio companies compelling?
4. Is form too long? (Consider UX)

---

## Future Enhancements

### Add Analytics Tracking
```tsx
// In page.tsx
import { useEffect } from 'react';

useEffect(() => {
  // Track page sections
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Viewed:', entry.target);
        // Send to analytics
      }
    });
  });
  sections.forEach(s => observer.observe(s));
}, []);
```

### Add Form Backend
Options:
1. **Supabase** (easiest): Free PostgreSQL + auth
2. **Firebase**: Google-backed, realtime
3. **Vercel Postgres**: Built for Next.js
4. **Resend**: Email + form handling

---

## Command Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Test production build locally
npm run start

# Check for errors
npm run lint

# Clean build
rm -rf .next
npm run build
```

---

## Support

**Cloudflare Pages Docs:**
https://developers.cloudflare.com/pages/

**Next.js on Cloudflare:**
https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/

---

**Your site is now ready for Cloudflare Pages!** 🚀

Deploy, monitor, and iterate based on founder/investor feedback.
