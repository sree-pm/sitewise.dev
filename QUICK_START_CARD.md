# 🎯 QUICK REFERENCE CARD

## What You Asked For
❓ "How to automate this localStorage to github update? automating the option B is possible? These 3 steps after the edit need to be automated: Edit in Puck, Download JSON, Commit JSON to GitHub"

## What You Got
✅ **COMPLETE AUTOMATION**
1. Edit in Puck ✓
2. Commit to GitHub ✓ (one click)
3. Auto-rebuild on Cloudflare ✓ (GitHub Actions)

---

## 🚀 START HERE (5 Minutes)

### Step 1: Create GitHub Token
```
https://github.com/settings/tokens
→ Generate new token (classic)
→ Select: repo
→ Copy token
```

### Step 2: Add GitHub Secrets
```
https://github.com/sree-pm/infonaut-ltd/settings/secrets/actions

Add 3 secrets:
1. GITHUB_TOKEN = (from Step 1)
2. CLOUDFLARE_API_TOKEN = (Cloudflare dashboard)
3. CLOUDFLARE_ACCOUNT_ID = (Cloudflare dashboard)
```

### Step 3: Local Setup
```bash
cp .env.example .env.local
# Edit .env.local and add:
# GITHUB_TOKEN=github_pat_xxxxxxxxxxxxx
```

### Step 4: Initialize Data
```bash
mkdir -p data
cat > data/pages.json << 'EOF'
{ "content": [], "root": {} }
EOF

git add data/pages.json
git commit -m "feat: Initialize page data"
git push
```

### Step 5: Start & Test
```bash
npm install
npm run dev

# Visit: http://localhost:3000/editor
# Make change → Click "Commit to GitHub"
# Wait 3-5 min → Check https://infonaut-ltd.pages.dev
```

**Done! ✅**

---

## 📁 Key Files

| File | What It Does |
|------|-------------|
| `components/integrations/puck.tsx` | Puck editor with GitHub save/load |
| `app/api/save-page/route.ts` | API endpoint to commit to GitHub |
| `.github/workflows/rebuild-on-page-change.yml` | Auto-rebuild on page change |
| `.env.example` | Environment variables template |
| `lib/usePageData.ts` | Load page data from GitHub |

---

## 🔄 Complete Workflow

```
Puck Editor (Drag & Drop)
    ↓
Edit Page Content
    ↓
Enter commit message
    ↓
Click "Commit to GitHub"
    ↓
POST /api/save-page
    ↓
Commit to GitHub
    ↓
GitHub Actions Triggered
    ↓
npm run build
    ↓
Deploy to Cloudflare
    ↓
✅ LIVE SITE UPDATED
```

**Total Time: 3-5 minutes**

---

## 🎯 You Can Now Do This

✅ **Edit Page Content**
- Open http://localhost:3000/editor
- Drag/drop components
- Edit text and properties
- Preview changes

✅ **One-Click Deploy**
- Enter commit message
- Click "Commit to GitHub"
- Get confirmation with commit URL

✅ **Automatic Rebuild**
- GitHub Actions builds site
- Cloudflare deploys automatically
- No manual steps needed

✅ **Backup & Restore**
- Export page data as JSON
- Import from JSON file
- Version history in Git

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "401 Unauthorized" | Check GITHUB_TOKEN in .env.local |
| "Workflow didn't run" | Verify data/pages.json was pushed |
| "Deploy failed" | Check GitHub secrets are set |
| "API returns 404" | Verify route file exists |
| "Site doesn't update" | Wait 10 min, clear cache, check Actions |

---

## 📚 Documentation

Need more details?

- **Setup Guide:** GITHUB_AUTOMATION_GUIDE.md
- **Quick Ref:** GITHUB_AUTOMATION_SETUP_SUMMARY.md
- **Technical:** IMPLEMENTATION_COMPLETE.md
- **Verify:** DEPLOYMENT_READY_CHECKLIST.md

---

## 🔗 Important Links

**GitHub:**
- Repo: https://github.com/sree-pm/infonaut-ltd
- Secrets: https://github.com/sree-pm/infonaut-ltd/settings/secrets/actions
- Actions: https://github.com/sree-pm/infonaut-ltd/actions
- Tokens: https://github.com/settings/tokens

**Production:**
- Site: https://infonaut-ltd.pages.dev
- Editor: https://infonaut-ltd.pages.dev/editor

**Local:**
- Site: http://localhost:3000
- Editor: http://localhost:3000/editor
- API: http://localhost:3000/api/save-page

---

## 💡 Pro Tips

1. **Commit messages matter** - Use clear, descriptive messages
   ```
   ✓ Good: "Update hero section with new tagline"
   ✗ Bad: "update"
   ```

2. **Monitor GitHub Actions** - Check workflow runs after commit
   ```
   https://github.com/sree-pm/infonaut-ltd/actions
   ```

3. **Export before major changes** - Keep JSON backups
   ```
   Click "📥 Export JSON" in editor
   ```

4. **Test locally first** - Use `/editor` route in dev before production

5. **Share workflows** - Document for your team once working

---

## ✨ What's Automated

| Task | Before | Now |
|------|--------|-----|
| Save page data | Manual commits | Auto via Puck |
| Build Next.js | Manual `npm run build` | Auto via GitHub Actions |
| Deploy to Cloudflare | Manual upload | Auto via GitHub Actions |
| Version control | Manual git ops | Auto commits to GitHub |
| Error recovery | Manual rollback | Git history + rollback |

---

## 🎉 Summary

**Your request:** Automate Edit → Download JSON → Commit to GitHub

**What you got:**
- ✅ Puck editor with GitHub integration
- ✅ API endpoint for commits
- ✅ GitHub Actions auto-rebuild
- ✅ Cloudflare auto-deploy
- ✅ Complete documentation
- ✅ Setup script included

**Status:** Production Ready! 🚀

**Next:** Follow 5-step Quick Start above!

---

## 📞 Need Help?

1. **Setup issues?** → GITHUB_AUTOMATION_GUIDE.md
2. **Quick answer?** → This card or GITHUB_AUTOMATION_SETUP_SUMMARY.md
3. **Technical Q?** → IMPLEMENTATION_COMPLETE.md
4. **Verify setup?** → DEPLOYMENT_READY_CHECKLIST.md

---

**🚀 You're All Set! Start with the 5-step Quick Start above!**
