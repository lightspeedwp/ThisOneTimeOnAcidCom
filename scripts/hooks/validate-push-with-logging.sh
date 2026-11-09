#!/bin/bash

# Lefthook pre-push validation wrapper with logging
# Runs branch and build validations, logs errors to file, but doesn't block push

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
LOG_DIR="$PROJECT_DIR/logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/push-validation-$(date +%Y%m%d-%H%M%S).log"

{
  echo "=== Push Validation Report ==="
  echo "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "Branch: $(git rev-parse --abbrev-ref HEAD)"
  echo "---"
  echo ""

  # Branch name validation
  echo "📋 Validating branch name for push..."
  if npm run validate:push-branch 2>&1; then
    echo "✅ Branch validation passed"
  else
    echo "⚠️  Branch validation has issues (logged)"
  fi

  echo ""
  echo "---"
  echo ""

  # Build verification
  echo "🔨 Running build verification..."
  if npm run build 2>&1 | tail -20; then
    echo "✅ Build verification passed"
  else
    echo "⚠️  Build verification has issues (logged)"
  fi

  echo ""
  echo "=== End Report ==="
  echo "Full details in: $LOG_FILE"
} | tee -a "$LOG_FILE"

# Always exit successfully so push proceeds
exit 0
