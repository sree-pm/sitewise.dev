# 🎯 SiteWise Repository Reorganization - Execution Guide

## ✅ What Has Been Completed

### 1. Documentation & Planning ✓
- ✓ Created comprehensive migration guide (`SITEWISE_MIGRATION_GUIDE.md`)
- ✓ Created reorganization plan
- ✓ Updated `tsconfig.json` with path mappings
- ✓ Created new `README.md` in `/docs/`

### 2. Scripts Created ✓
- ✓ `reorganize.sh` - Bash script to move all files
- ✓ `migrate-imports.js` - Node script to update import paths
- ✓ `reorganize-sitewise.sh` - Alternative reorganization script

### 3. Structure Prepared ✓
- ✓ Created `/atomic-design-system/` folders
- ✓ Created `/app/website/` folders
- ✓ Created `/app/editor/components/` folder
- ✓ Created `/docs/` folder

### 4. Core Files Created ✓
- ✓ `/atomic-design-system/index.ts` (barrel export)
- ✓ `/atomic-design-system/README.md`
- ✓ `/atomic-design-system/atoms/index.ts`
- ✓ `/atomic-design-system/atoms/button.tsx`
- ✓ `/atomic-design-system/atoms/badge.tsx`
- ✓ `/app/website/layout.tsx`

---

## 🚀 How to Execute the Reorganization

### Step 1: Run the Reorganization Script

```bash
cd /workspaces/infonaut-ltd
chmod +x reorganize.sh
./reorganize.sh
```

This will:
- ✓ Create a timestamped backup
- ✓ Copy components to `/atomic-design-system/`
- ✓ Move Puck blocks to `/app/editor/blocks/`
- ✓ Move integrations to `/app/editor/integrations/`
- ✓ Copy marketing pages to `/app/website/`
- ✓ Consolidate documentation to `/docs/`

### Step 2: Update Import Paths

```bash
node migrate-imports.js
```

This will automatically update all import statements:
- `@/components/atoms/*` → `@/atomic-design-system/atoms/*`
- `@/components/molecules/*` → `@/atomic-design-system/molecules/*`
- `@/components/organisms/*` → `@/atomic-design-system/organisms/*`
- `@/components/puck-blocks` → `@/app/editor/blocks`
- etc.

### Step 3: Copy Remaining Files Manually

Some files need manual attention:

```bash
# Copy all atom components
cp components/atoms/* atomic-design-system/atoms/

# Copy all molecule components
cp components/molecules/* atomic-design-system/molecules/

# Copy all organism components
cp components/organisms/* atomic-design-system/organisms/

# Copy templates if they exist
cp components/templates/* atomic-design-system/templates/ 2>/dev/null || true
```

### Step 4: Update Root app/page.tsx

The root `/app/page.tsx` should redirect to marketing site:

```typescript
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/website");
}
```

### Step 5: Test the Build

```bash
npm run build
```

If there are errors, check:
1. Import paths are updated correctly
2. All components exist in new locations
3. No circular dependencies

### Step 6: Test Development Server

```bash
npm run dev
```

Visit:
- http://localhost:3000 (should redirect to /website)
- http://localhost:3000/website
- http://localhost:3000/website/features
- http://localhost:3000/editor

### Step 7: Clean Up Old Folders (After Verification)

**ONLY AFTER CONFIRMING EVERYTHING WORKS:**

```bash
# Remove old component folder
rm -rf components/

# Remove old website folder
rm -rf website/

# Remove old route group
rm -rf "app/(website)/"

# Remove standalone pages (now under /app/website/)
rm -rf app/about app/features app/pricing app/blog app/contact

# Move markdown docs to /docs (keep README.md at root)
mv *.md docs/ 2>/dev/null || true
mv docs/README.md . 2>/dev/null || true
```

---

## 📁 New Structure Summary

```
/workspaces/infonaut-ltd/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx (redirects to /website)
│   ├── website/           ← Marketing Site
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── features/
│   │   ├── pricing/
│   │   ├── blog/
│   │   └── contact/
│   ├── editor/            ← Page Builder
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── components/
│   │   ├── blocks/
│   │   ├── integrations/
│   │   ├── docs/
│   │   └── settings/
│   └── api/               ← API Routes
│
├── atomic-design-system/  ← Design System
│   ├── index.ts
│   ├── README.md
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
│
├── lib/                   ← Utilities
├── public/                ← Static Assets
├── functions/             ← Cloudflare Functions
├── stories/               ← Storybook
└── docs/                  ← Documentation
```

---

## 🔍 Verification Checklist

After reorganization, verify:

- [ ] `npm run build` succeeds without errors
- [ ] `npm run dev` starts successfully
- [ ] All routes load correctly:
  - [ ] `/website` (homepage)
  - [ ] `/website/features`
  - [ ] `/website/pricing`
  - [ ] `/website/about`
  - [ ] `/website/blog`
  - [ ] `/website/contact`
  - [ ] `/editor`
  - [ ] `/editor/docs`
  - [ ] `/editor/settings`
- [ ] Components import correctly from new paths
- [ ] Design system components work
- [ ] Editor functionality works
- [ ] Storybook still builds: `npm run storybook`
- [ ] No console errors in browser
- [ ] All images and assets load
- [ ] Tailwind classes apply correctly

---

## 🐛 Troubleshooting

### Build Errors

**"Cannot find module '@/components/...'"**
- Run `node migrate-imports.js` again
- Manually search for remaining old imports: `grep -r "@/components" app/`

**"Module not found: Can't resolve '@/atomic-design-system/...'"**
- Check if component file exists in new location
- Verify `tsconfig.json` paths are correct

### Runtime Errors

**Page not found**
- Ensure pages exist in new locations under `/app/website/`
- Check `next.config.ts` for custom routing

**Components not rendering**
- Check import paths in the component files themselves
- Look for circular dependencies

### Import Issues

**Still seeing old imports**
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`

---

## 📝 Next Steps

After successful reorganization:

1. **Update README.md**
   ```bash
   cp docs/README_NEW.md README.md
   ```

2. **Commit Changes**
   ```bash
   git add .
   git commit -m "refactor: reorganize repository structure for clarity

   - Moved components to /atomic-design-system
   - Organized marketing pages under /app/website
   - Consolidated editor under /app/editor
   - Updated all import paths
   - Consolidated documentation to /docs
   "
   ```

3. **Push to GitHub**
   ```bash
   git push origin main
   ```

4. **Deploy**
   - Cloudflare Pages will automatically rebuild
   - Verify deployment works with new structure

---

## 💡 Benefits Achieved

✨ **Before**:
- Components scattered in `/components` and `/atomic-design-system`
- Marketing pages in `/website`, `/app/(website)`, and `/app/*`
- 30+ markdown files at root
- Unclear separation between marketing and editor

🎯 **After**:
- Clear separation: `/atomic-design-system`, `/app/website`, `/app/editor`
- All marketing pages under `/app/website`
- All design system components under `/atomic-design-system`
- Documentation organized in `/docs`
- Easy to understand and navigate
- Truly "wise" organization! 🧠

---

## 🤝 Need Help?

If you encounter issues:
1. Check the backup folder created by reorganize.sh
2. Review `SITEWISE_MIGRATION_GUIDE.md`
3. Search for import errors: `npm run build 2>&1 | grep "Module not found"`
4. Revert if needed: `git reset --hard HEAD`

---

**Ready to make SiteWise truly wise? Let's do this! 🚀**
