# GitHub Automation Setup Guide

This guide explains how to fully automate the workflow: **Edit in Puck → Commit to GitHub → Auto-rebuild on Cloudflare Pages**

## Architecture Overview

```
┌─────────────────────┐
│  Puck Editor UI     │ (/editor)
│  - Edit components  │
│  - Preview changes  │
└──────────┬──────────┘
           │ Click "Commit to GitHub"
           ▼
┌─────────────────────┐
│ /api/save-page      │ POST endpoint
│ - Validates data    │
│ - Commits to GitHub │
└──────────┬──────────┘
           │ Pushes to data/pages.json
           ▼
┌─────────────────────┐
│ GitHub Repository   │ main branch
│ - Stores page JSON  │
│ - Triggers CI/CD    │
└──────────┬──────────┘
           │ Webhook triggers workflow
           ▼
┌─────────────────────┐
│ GitHub Actions      │ .github/workflows/
│ - npm ci             │ rebuild-on-page-change.yml
│ - npm run build      │
│ - Deploy to CF Pages │
└──────────┬──────────┘
           │ Pushes build artifacts
           ▼
┌─────────────────────┐
│ Cloudflare Pages    │ infonaut-ltd
│ - Hosts site        │
│ - Shows new content │
└─────────────────────┘
```

## Step 1: Create GitHub Personal Access Token (PAT)

1. Visit: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Configure:
   - **Name:** `infonaut-page-editor`
   - **Expiration:** 90 days (or No expiration for production)
   - **Scopes:** Select `repo` (this includes all repo permissions)
4. Copy the token (you'll only see it once!)

## Step 2: Add Secrets to GitHub Repository

1. Go to: https://github.com/sree-pm/infonaut-ltd/settings/secrets/actions
2. Click "New repository secret"
3. Add these secrets:

| Name | Value | Source |
|------|-------|--------|
| `GITHUB_TOKEN` | `github_pat_xxxxx` | From Step 1 |
| `CLOUDFLARE_API_TOKEN` | Your Cloudflare API token | Cloudflare dashboard → Account Settings → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID | Cloudflare dashboard → Account Settings |

### Getting Cloudflare Secrets

**For CLOUDFLARE_API_TOKEN:**
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template or create custom with:
   - Permissions: `Cloudflare Pages:Edit`
   - Account Resources: Select your account
4. Copy the token

**For CLOUDFLARE_ACCOUNT_ID:**
1. Go to: https://dash.cloudflare.com/
2. Look at the URL: `dash.cloudflare.com/ACCOUNT_ID`
3. Or find in Account Settings → Account ID

## Step 3: Set Up Local Environment Variables

Create `.env.local` in project root:

```bash
# Copy from .env.example and fill in values
cp .env.example .env.local

# Edit .env.local and add:
GITHUB_TOKEN=github_pat_xxxxxxxxxxxxx
GITHUB_OWNER=sree-pm
GITHUB_REPO=infonaut-ltd
GITHUB_BRANCH=main
```

**Do NOT commit .env.local to GitHub** (add to .gitignore if not already)

## Step 4: Verify Workflow File

Check that `.github/workflows/rebuild-on-page-change.yml` exists and has:

```yaml
on:
  push:
    paths:
      - 'data/pages.json'  # Trigger on page data changes
    branches:
      - main

jobs:
  rebuild:
    # ... steps ...
```

This workflow:
- ✅ Triggers when `data/pages.json` changes
- ✅ Runs `npm ci` and `npm run build`
- ✅ Deploys to Cloudflare Pages using `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets

## Step 5: Initialize data/pages.json

First-time setup:

```bash
# Create data directory
mkdir -p data

# Create initial pages.json with default content
cat > data/pages.json << 'EOF'
{
  "content": [],
  "root": {}
}
EOF

# Commit and push
git add data/pages.json
git commit -m "feat: Initialize page data for Puck editor"
git push origin main
```

## Step 6: Test the Full Workflow

### 6a. Local Testing

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open editor
open http://localhost:3000/editor

# Make a test change and click "Commit to GitHub"
```

### 6b. Verify GitHub Commit

1. Go to: https://github.com/sree-pm/infonaut-ltd/blob/main/data/pages.json
2. Confirm your changes appear in the file
3. Check that commit message matches what you entered

### 6c. Monitor GitHub Actions

1. Go to: https://github.com/sree-pm/infonaut-ltd/actions
2. Click on the latest "Rebuild on Page Change" workflow
3. Verify all steps complete successfully:
   - ✅ Checkout repository
   - ✅ Setup Node.js
   - ✅ Install dependencies
   - ✅ Build site
   - ✅ Deploy to Cloudflare Pages

### 6d. Verify Live Site Update

1. Wait for deployment to complete (~2-3 minutes)
2. Visit: https://infonaut-ltd.pages.dev
3. Confirm your changes are live

## Usage: The Complete Workflow

Every time you want to update the site:

1. **Open Editor**
   ```
   Visit http://localhost:3000/editor (local)
   or https://infonaut-ltd.pages.dev/editor (production)
   ```

2. **Edit Content**
   - Drag/drop components
   - Edit text, images, links
   - Preview changes in real-time

3. **Commit to GitHub**
   - Enter commit message (e.g., "Update hero section with new tagline")
   - Click "💾 Commit to GitHub"
   - Wait for confirmation popup

4. **Auto-Rebuild & Deploy**
   - GitHub Actions workflow triggers automatically
   - Cloudflare Pages rebuilds and deploys
   - Live site updates within 2-3 minutes

5. **(Optional) Manual Export/Import**
   - Click "📥 Export JSON" to download page data as JSON backup
   - Click "📤 Import JSON" to load page data from file

## Troubleshooting

### "Failed to save to GitHub: 401 Unauthorized"

**Cause:** GITHUB_TOKEN not set or invalid

**Fix:**
```bash
# Verify token is set
echo $GITHUB_TOKEN

# If not set, add to .env.local
GITHUB_TOKEN=github_pat_xxxxxxxxxxxxx

# Restart dev server
npm run dev
```

### "GitHub Actions workflow did not trigger"

**Cause:** Workflow file may be inactive or `data/pages.json` path not matched

**Fix:**
1. Verify `.github/workflows/rebuild-on-page-change.yml` exists
2. Check workflow logs: https://github.com/sree-pm/infonaut-ltd/actions
3. Confirm commit touched `data/pages.json` (check GitHub diff)
4. Manual trigger: Go to Actions → Rebuild on Page Change → Run workflow

### "Cloudflare Pages deployment failed"

**Cause:** Missing `CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_ACCOUNT_ID` secrets

**Fix:**
1. Go to: https://github.com/sree-pm/infonaut-ltd/settings/secrets/actions
2. Verify both secrets exist and are not empty
3. Re-run workflow after adding secrets

### "Site doesn't update after 5 minutes"

**Cause:** Deployment may still be in progress

**Fix:**
1. Check GitHub Actions: https://github.com/sree-pm/infonaut-ltd/actions
2. Check Cloudflare Pages: https://dash.cloudflare.com/?account=pages
3. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
4. Wait up to 10 minutes for full propagation

## Environment Variables Reference

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `GITHUB_TOKEN` | ✅ | - | PAT for GitHub API access |
| `GITHUB_OWNER` | ✅ | `sree-pm` | GitHub username/org |
| `GITHUB_REPO` | ✅ | `infonaut-ltd` | Repository name |
| `GITHUB_BRANCH` | ✅ | `main` | Branch to commit to |
| `CLOUDFLARE_API_TOKEN` | ✅ (for CI/CD) | - | Cloudflare API token (GitHub Actions only) |
| `CLOUDFLARE_ACCOUNT_ID` | ✅ (for CI/CD) | - | Cloudflare account ID (GitHub Actions only) |
| `NEXT_PUBLIC_API_BASE_URL` | ❌ | `http://localhost:3000` | API endpoint base URL |

## API Endpoints Reference

### Save Page to GitHub
```bash
POST /api/save-page
Content-Type: application/json

{
  "pageData": { "content": [], "root": {} },
  "message": "Update page content"
}

Response: { "success": true, "commit": "abc123...", "url": "..." }
```

### Load Page from GitHub
```bash
GET /api/save-page?branch=main

Response: { "success": true, "data": { "content": [], "root": {} } }
```

## File Structure

```
infonaut-ltd/
├── .env.local                  # Local env vars (DO NOT COMMIT)
├── .env.example                # Template for env vars
├── .github/
│   └── workflows/
│       └── rebuild-on-page-change.yml  # CI/CD trigger
├── app/
│   ├── editor/
│   │   └── page.tsx            # Puck editor page
│   └── api/
│       └── save-page/
│           └── route.ts        # GitHub save/load endpoint
├── components/
│   └── integrations/
│       └── puck.tsx            # Puck editor component
├── data/
│   └── pages.json              # Stored page content (in GitHub)
└── package.json
```

## Next Steps

1. ✅ Create GitHub PAT (Step 1)
2. ✅ Add secrets to GitHub (Step 2)
3. ✅ Set up local .env.local (Step 3)
4. ✅ Verify workflow file (Step 4)
5. ✅ Initialize data/pages.json (Step 5)
6. ✅ Test full workflow (Step 6)
7. 🚀 Go live!

## Support

For issues or questions:
- GitHub Issues: https://github.com/sree-pm/infonaut-ltd/issues
- Puck Docs: https://puckeditor.com/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- GitHub Actions: https://docs.github.com/en/actions
