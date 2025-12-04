#!/bin/bash

# Quick setup script for GitHub automation
# Usage: bash setup-github-automation.sh

set -e

echo "🚀 Infonaut GitHub Automation Setup"
echo "===================================="
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✓ Created .env.local"
    echo ""
    echo "⚠️  Please edit .env.local and add:"
    echo "   - GITHUB_TOKEN (from https://github.com/settings/tokens)"
    echo "   - GITHUB_OWNER (currently: sree-pm)"
    echo "   - GITHUB_REPO (currently: infonaut-ltd)"
    echo ""
else
    echo "✓ .env.local already exists"
    echo ""
fi

# Check if data directory exists
if [ ! -d "data" ]; then
    echo "📁 Creating data directory..."
    mkdir -p data
    echo "✓ Created data directory"
    echo ""
fi

# Check if data/pages.json exists
if [ ! -f "data/pages.json" ]; then
    echo "📄 Creating data/pages.json..."
    cat > data/pages.json << 'EOF'
{
  "content": [],
  "root": {}
}
EOF
    echo "✓ Created data/pages.json"
    echo ""
else
    echo "✓ data/pages.json already exists"
    echo ""
fi

# Check if workflow file exists
if [ ! -f ".github/workflows/rebuild-on-page-change.yml" ]; then
    echo "⚠️  Workflow file not found! Should be at:"
    echo "   .github/workflows/rebuild-on-page-change.yml"
    echo ""
else
    echo "✓ Workflow file found"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✓ Dependencies installed"
echo ""

# Verify TypeScript
echo "🔍 Checking TypeScript..."
npx tsc --noEmit
echo "✓ TypeScript check passed"
echo ""

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local and add GITHUB_TOKEN"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:3000/editor"
echo "4. Read: GITHUB_AUTOMATION_GUIDE.md for full setup"
echo ""
echo "📚 For detailed setup guide, see: GITHUB_AUTOMATION_GUIDE.md"
