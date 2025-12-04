#!/bin/bash

echo "🧹 Final SiteWise Repository Cleanup"
echo "======================================"
echo ""

cd /workspaces/infonaut-ltd

# Step 1: Remove all duplicate markdown files from root (keep only in /docs/)
echo "📄 Removing duplicate markdown files from root..."

rm -f CLEANUP_CHECKLIST.md
rm -f CLOUDFLARE_DEPLOYMENT_GUIDE.md
rm -f CLOUDFLARE_PAGES_STORYBOOK.md
rm -f COMPONENT_ARCHITECTURE.md
rm -f COMPONENT_FILE_STRUCTURE.md
rm -f COMPONENT_INDEX.md
rm -f COMPONENT_LIBRARY.md
rm -f COMPONENT_LIBRARY_V2.md
rm -f COMPONENT_QUICK_START.md
rm -f DEPLOYMENT.md
rm -f DEPLOYMENT_READY_CHECKLIST.md
rm -f DOCUMENTATION_INDEX.md
rm -f ENHANCEMENT_SUMMARY.md
rm -f ENTERPRISE_SITEMAP.md
rm -f FEATURE_CHECKLIST.md
rm -f FINAL_ENHANCEMENT_REPORT.md
rm -f FINAL_SUMMARY.md
rm -f FORK_SETUP_CHECKLIST.md
rm -f GITHUB_AUTOMATION_COMPLETE.md
rm -f GITHUB_AUTOMATION_GUIDE.md
rm -f GITHUB_AUTOMATION_SETUP_SUMMARY.md
rm -f HONEST_ASSESSMENT.md
rm -f IMPLEMENTATION_COMPLETE.md
rm -f IMPLEMENTATION_GUIDE.md
rm -f IMPLEMENTATION_SUMMARY.md
rm -f LINEAR_COMPARISON.md
rm -f PHASE_1_COMPLETION_SUMMARY.md
rm -f PHASE_2_COMPLETION_REPORT.md
rm -f PHASE_2_SESSION_SUMMARY.md
rm -f QUICK_START_CARD.md
rm -f RATING_VERDICT.md
rm -f README_CHANGES.md
rm -f README_TASK_2.md
rm -f REORGANIZATION_EXECUTION_GUIDE.md
rm -f REPOSITORY_REORGANIZATION.md
rm -f REPO_MANAGEMENT.md
rm -f START_HERE.md
rm -f START_HERE_REORGANIZATION.md
rm -f STRUCTURE_VISUAL_GUIDE.md
rm -f TASK_2_COMPLETION.md
rm -f VENTURE_STUDIO_REPOSITIONING.md
rm -f VERIFICATION_CHECKLIST.md
rm -f WISE_STRUCTURE_PLAN.md

echo "✓ Removed duplicate markdown files from root"

# Step 2: Keep only essential docs in /docs/
echo ""
echo "📚 Cleaning up /docs/ folder..."

cd docs

# Keep these essential docs
# - README_NEW.md (will become main docs README)
# - SITEWISE_MIGRATION_GUIDE.md
# - DEPLOYMENT.md
# - COMPONENT_LIBRARY.md

# Remove duplicates and outdated files
rm -f RATING_VERDICT.md
rm -f VENTURE_STUDIO_REPOSITIONING.md
rm -f START_HERE.md
rm -f FINAL_SUMMARY.md
rm -f COMPONENT_LIBRARY_V2.md
rm -f ENTERPRISE_SITEMAP.md
rm -f REPO_MANAGEMENT.md
rm -f DEPLOYMENT_READY_CHECKLIST.md
rm -f TASK_2_COMPLETION.md
rm -f COMPONENT_QUICK_START.md
rm -f DOCUMENTATION_INDEX.md
rm -f CLOUDFLARE_PAGES_STORYBOOK.md
rm -f VERIFICATION_CHECKLIST.md
rm -f FORK_SETUP_CHECKLIST.md
rm -f COMPONENT_INDEX.md
rm -f COMPONENT_ARCHITECTURE.md
rm -f COMPONENT_FILE_STRUCTURE.md
rm -f WISE_STRUCTURE_PLAN.md
rm -f GITHUB_AUTOMATION_GUIDE.md
rm -f QUICK_START_CARD.md
rm -f STRUCTURE_VISUAL_GUIDE.md
rm -f HONEST_ASSESSMENT.md
rm -f CLEANUP_CHECKLIST.md
rm -f FEATURE_CHECKLIST.md
rm -f PHASE_2_SESSION_SUMMARY.md
rm -f IMPLEMENTATION_COMPLETE.md
rm -f LINEAR_COMPARISON.md
rm -f GITHUB_AUTOMATION_SETUP_SUMMARY.md
rm -f IMPLEMENTATION_SUMMARY.md
rm -f README_TASK_2.md
rm -f START_HERE_REORGANIZATION.md
rm -f README_CHANGES.md
rm -f FINAL_ENHANCEMENT_REPORT.md
rm -f PHASE_1_COMPLETION_SUMMARY.md
rm -f REPOSITORY_REORGANIZATION.md
rm -f GITHUB_AUTOMATION_COMPLETE.md
rm -f ENHANCEMENT_SUMMARY.md
rm -f PHASE_2_COMPLETION_REPORT.md

# Rename README_NEW.md to README.md
if [ -f README_NEW.md ]; then
    mv README_NEW.md README.md
fi

cd ..

echo "✓ Cleaned up /docs/ folder"

# Step 3: Remove temporary scripts
echo ""
echo "🗑️  Removing temporary reorganization scripts..."

rm -f reorganize-sitewise.sh
rm -f reorganize.sh
rm -f cleanup-old-folders.sh
rm -f migrate-imports.js
rm -f setup-github-automation.sh
rm -f verify-implementation.sh
rm -f TASK_2_SUMMARY.sh

echo "✓ Removed temporary scripts"

# Step 4: Remove backup folder (optional - commented for safety)
echo ""
echo "💾 Backup folder preserved at: backup_20251204_031247"
echo "   (You can delete it manually after verifying everything works)"
# rm -rf backup_20251204_031247

# Step 5: Summary
echo ""
echo "✨ Cleanup Complete!"
echo "==================="
echo ""
echo "Repository structure is now clean:"
echo "  📂 /app/website/              - Marketing site"
echo "  📂 /app/editor/               - Page builder"
echo "  📂 /atomic-design-system/     - Design system"
echo "  📂 /docs/                     - Essential documentation"
echo "  📂 /lib/                      - Utilities"
echo "  📂 /public/                   - Static assets"
echo "  📂 /stories/                  - Storybook"
echo "  📄 README.md                  - Main README (at root)"
echo ""
echo "Next steps:"
echo "  1. Run: npm install"
echo "  2. Run: npm run build"
echo "  3. Run: npm run dev"
echo "  4. Commit: git add . && git commit -m 'chore: clean up repository structure'"
echo ""
