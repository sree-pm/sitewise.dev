#!/bin/bash
# IMPLEMENTATION VERIFICATION SCRIPT
# Run this to verify all components are in place

set -e

echo "🔍 Verifying GitHub Automation Implementation"
echo "=============================================="
echo ""

PASSED=0
FAILED=0

# Check functions
check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1"
        ((PASSED++))
    else
        echo "❌ $1 (MISSING)"
        ((FAILED++))
    fi
}

check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo "✅ $1 contains: $2"
        ((PASSED++))
    else
        echo "❌ $1 missing: $2"
        ((FAILED++))
    fi
}

echo "📁 Checking API Endpoint..."
check_file "app/api/save-page/route.ts"
check_content "app/api/save-page/route.ts" "Octokit"
check_content "app/api/save-page/route.ts" "POST"
check_content "app/api/save-page/route.ts" "GET"
echo ""

echo "📁 Checking GitHub Actions Workflow..."
check_file ".github/workflows/rebuild-on-page-change.yml"
check_content ".github/workflows/rebuild-on-page-change.yml" "data/pages.json"
check_content ".github/workflows/rebuild-on-page-change.yml" "npm run build"
check_content ".github/workflows/rebuild-on-page-change.yml" "cloudflare/pages-action"
echo ""

echo "📁 Checking Configuration Files..."
check_file ".env.example"
check_file "setup-github-automation.sh"
check_content ".env.example" "GITHUB_TOKEN"
echo ""

echo "📁 Checking Puck Editor Integration..."
check_file "components/integrations/puck.tsx"
check_content "components/integrations/puck.tsx" "handleSaveToGitHub"
check_content "components/integrations/puck.tsx" "loadPageData"
check_content "components/integrations/puck.tsx" "Commit to GitHub"
echo ""

echo "📁 Checking Dependencies..."
check_content "package.json" "@octokit/rest"
check_content "package.json" "@puckjs/core"
echo ""

echo "📁 Checking Documentation..."
check_file "GITHUB_AUTOMATION_GUIDE.md"
check_file "GITHUB_AUTOMATION_SETUP_SUMMARY.md"
check_file "IMPLEMENTATION_COMPLETE.md"
check_file "DEPLOYMENT_READY_CHECKLIST.md"
check_file "QUICK_START_CARD.md"
check_file "FINAL_SUMMARY.md"
echo ""

echo "📁 Checking Data Loading Hook..."
check_file "lib/usePageData.ts"
check_content "lib/usePageData.ts" "usePageData"
check_content "lib/usePageData.ts" "fetch.*api/save-page"
echo ""

echo "📁 Checking README Update..."
check_file "README.md"
check_content "README.md" "Puck"
check_content "README.md" "GitHub"
echo ""

echo "=============================================="
echo "Results:"
echo "  ✅ Passed: $PASSED"
echo "  ❌ Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "🎉 ALL CHECKS PASSED!"
    echo ""
    echo "Next steps:"
    echo "1. Create GitHub Personal Access Token: https://github.com/settings/tokens"
    echo "2. Add to GitHub secrets: https://github.com/sree-pm/infonaut-ltd/settings/secrets/actions"
    echo "3. Copy .env.example to .env.local and add GITHUB_TOKEN"
    echo "4. Run: npm install && npm run dev"
    echo "5. Visit: http://localhost:3000/editor"
    echo ""
    echo "Read QUICK_START_CARD.md for detailed instructions!"
    exit 0
else
    echo "⚠️  Some checks failed. Please review the output above."
    exit 1
fi
