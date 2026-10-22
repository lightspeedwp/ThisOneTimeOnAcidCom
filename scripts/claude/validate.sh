#!/bin/bash
# Claude Code Validation Script for ThisOneTimeOnAcidCom
# Runs on SessionStart hook to verify environment integrity
# Checks: npm dependencies, build readiness

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"

cd "$PROJECT_DIR"

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Claude Code Validation — ThisOneTimeOnAcidCom${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check 1: Dependencies consistency
echo "Checking npm dependency consistency..."
if npm ls --depth=0 > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} npm dependencies are consistent"
else
  echo -e "${RED}✗${NC} npm dependencies have issues (run 'npm ci --include=dev' to fix)"
  exit 1
fi

# Check 2: Build readiness
echo "Checking build readiness..."
if npm run build > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Build succeeds"
else
  echo -e "${RED}✗${NC} Build validation failed (check npm run build output)"
  exit 1
fi

# Check 3: Claude configuration
echo "Checking Claude configuration..."
if [ -f ".claude/settings.json" ]; then
  echo -e "${GREEN}✓${NC} .claude/settings.json present"
else
  echo -e "${RED}✗${NC} .claude/settings.json missing"
  exit 1
fi

echo ""
echo -e "${GREEN}✨ Environment validation passed${NC}"
echo ""
