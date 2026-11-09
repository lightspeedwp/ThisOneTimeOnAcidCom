#!/bin/bash

# Lefthook validation wrapper with logging
# Runs all validations, logs errors to file, but doesn't block commits

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
LOG_DIR="$PROJECT_DIR/logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/hook-errors-$(date +%Y%m%d-%H%M%S).log"

{
  echo "=== Hook Validation Report ==="
  echo "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "Branch: $(git rev-parse --abbrev-ref HEAD)"
  echo "Commit: $(git rev-parse --short HEAD 2>/dev/null || echo 'N/A')"
  echo "---"
  echo ""

  # Branch name validation
  echo "📋 Validating branch name..."
  if npm run validate:branch-name 2>&1; then
    echo "✅ Branch name validation passed"
  else
    echo "❌ Branch name validation failed"
  fi

  echo ""
  echo "---"
  echo ""

  # Journal validation
  echo "📝 Validating journal entries..."
  if npm run journal:validate 2>&1; then
    echo "✅ Journal validation passed"
  else
    echo "⚠️  Journal validation failed (or no journal entries)"
  fi

  echo ""
  echo "=== End Report ==="
  echo "See details in: $LOG_FILE"
} | tee -a "$LOG_FILE"

# Always exit successfully so commit proceeds
exit 0
