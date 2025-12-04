# Cloudflare Pages Deployment Guide

## Prerequisites

✅ GitHub repository pushed to GitHub  
✅ Next.js application builds successfully  
✅ All environment variables documented in `.env.example`  

## Deployment Steps

### 1. Create Cloudflare Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **Create Application** → **Pages**
3. Connect your GitHub account
4. Select the `sitewise-dev` repository

### 2. Configure Build Settings

Use these settings for Next.js deployment:

```
Framework preset: Next.js
Build command: npx @cloudflare/next-on-pages
Build output directory: .vercel/output/static
Root directory: (leave blank)
Environment variables: (see below)
```

### 3. Add Environment Variables

In Cloudflare Pages settings, add these variables:

**Required for GitHub Integration (Editor):**
```
GITHUB_TOKEN=your_github_pat_token
GITHUB_OWNER=your-username
GITHUB_REPO=sitewise-dev
GITHUB_BRANCH=main
```

**Required for NextAuth (if using):**
```
NEXTAUTH_URL=https://your-project.pages.dev
NEXTAUTH_SECRET=generate_random_32_char_string
GITHUB_CLIENT_ID=your_oauth_app_id
GITHUB_CLIENT_SECRET=your_oauth_app_secret
```

### 4. Deploy

Click **Save and Deploy**. Your site will build and deploy automatically.

## Post-Deployment

### Verify Deployment

- [ ] Homepage loads correctly
- [ ] All pages are accessible (About, Features, Pricing, Contact, Blog)
- [ ] Components render properly
- [ ] No console errors
- [ ] Images load correctly
- [ ] Navigation works
- [ ] Responsive design works on mobile

### Custom Domain (Optional)

1. Go to your Pages project settings
2. Click **Custom domains**
3. Add your domain (e.g., `sitewise.dev`)
4. Update DNS records as instructed
5. SSL certificate will be issued automatically

## Troubleshooting

### Build Fails

**Error: Module not found**
- Solution: Run `npm install` locally and ensure `package-lock.json` is committed

**Error: Type errors**
- Solution: Run `npx tsc --noEmit` locally to check for TypeScript errors

**Error: Environment variable missing**
- Solution: Add required env vars in Cloudflare Pages settings

### Runtime Issues

**Page loads blank**
- Check browser console for errors
- Verify all API routes are working
- Check environment variables are set correctly

**Images not loading**
- Ensure images are in `public/` directory
- Check file paths are correct
- Verify Next.js Image optimization is compatible with Cloudflare

**Visual editor not working**
- Verify GitHub token has proper permissions
- Check CORS settings for API routes
- Ensure NextAuth is configured correctly

## Performance Optimization

After deployment, verify:

- [ ] Lighthouse score is 90+ on all metrics
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Largest Contentful Paint < 2.5s

## Continuous Deployment

Every push to `main` branch will automatically:
1. Trigger a new build on Cloudflare Pages
2. Deploy to production if build succeeds
3. Previous version remains live until new deploy succeeds

## Rollback

To rollback to a previous version:
1. Go to Cloudflare Pages → Deployments
2. Find the working deployment
3. Click **Rollback to this deployment**

## Monitoring

Set up monitoring:
- [ ] Add Cloudflare Web Analytics
- [ ] Configure error tracking (Sentry, LogRocket, etc.)
- [ ] Set up uptime monitoring (UptimeRobot, etc.)

## Cost

**Cloudflare Pages Free Tier:**
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ 1 build at a time
- ✅ Custom domains

**Total cost: $0/month**

## Support

If you encounter issues:
1. Check [Cloudflare Pages docs](https://developers.cloudflare.com/pages/)
2. Review [Next.js on Cloudflare guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
3. Ask in Cloudflare Discord
4. Open GitHub issue in sitewise-dev repo

---

**Ready to deploy?** Push to GitHub and connect to Cloudflare Pages!
