#!/bin/bash
# Claude Code Setup Script for ThisOneTimeOnAcidCom
# Installs dependencies and validates build environment
# Called by: Manual invocation or SessionStart hook (optional)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"

echo "🔧 Claude Code Setup — ThisOneTimeOnAcidCom"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Install dependencies
echo "📦 Installing dependencies with npm ci --include=dev..."
cd "$PROJECT_DIR"
npm ci --include=dev || {
  echo "❌ Failed to install dependencies"
  exit 1
}
echo "✓ Dependencies installed"
echo ""

# Step 2: Verify build
echo "🏗️  Verifying build with npm run build..."
npm run build || {
  echo "❌ Build validation failed"
  exit 1
}
echo "✓ Build verified"
echo ""

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Review .claude/settings.json for configuration"
echo "  2. Restart Claude Code to load hooks"
echo "  3. Run /status in Claude Code to verify settings"
