#!/bin/bash

# Archive Tasks and Reports Cleanup Script
# Created: March 12, 2026
# Purpose: Archive completed task lists and delete old reports

echo "🗂️  Archive Tasks and Reports Cleanup"
echo "====================================="
echo ""

# ============================================================================
# STEP 1: Archive Completed Task Lists
# ============================================================================
echo "📋 Step 1: Archiving Completed Task Lists"
echo "-------------------------------------------"

# Task lists to archive (100% complete on Mar 11-12, 2026)
TASKS_TO_ARCHIVE=(
  "dark-mode-emergency-fixes.md"
  "dark-mode-implementation-checklist.md"
  "light-mode-deployment-checklist.md"
  "dev-tools-optimization-tasks.md"
  "CRITICAL-dark-mode-contrast-fixes.md"
)

for task in "${TASKS_TO_ARCHIVE[@]}"; do
  if [ -f "tasks/$task" ]; then
    echo "✅ Archiving: tasks/$task → tasks/archived/$task"
    mv "tasks/$task" "tasks/archived/$task"
  else
    echo "⚠️  Not found: tasks/$task (may already be archived)"
  fi
done

echo ""

# ============================================================================
# STEP 2: Move Completed Reports to /reports/archived/
# ============================================================================
echo "📊 Step 2: Moving Completed Reports to Archive"
echo "-----------------------------------------------"

# Reports to archive (associated task lists complete)
REPORTS_TO_ARCHIVE=(
  "alternating-sections-fix"
  "book-dark-mode-final-fix"
  "contrast-audit"
  "dark-mode-audit"
  "dark-mode-color-fix"
  "dark-mode-contrast-audit"
  "flawless-dark-mode"
  "light-gray-fix"
  "sitemap-dark-mode-update"
  "theme-styling-audit"
  "theme-toggle-rewire"
  "dev-tools-optimization"
)

for report in "${REPORTS_TO_ARCHIVE[@]}"; do
  if [ -d "reports/$report" ]; then
    echo "✅ Archiving: reports/$report → reports/archived/$report"
    mv "reports/$report" "reports/archived/$report"
  else
    echo "⚠️  Not found: reports/$report (may already be archived)"
  fi
done

echo ""

# ============================================================================
# STEP 3: Delete Old Archived Reports (>7 days old - Already Archived)
# ============================================================================
echo "🗑️  Step 3: Deleting Old Archived Reports"
echo "----------------------------------------"

# These reports have been archived since March 5-8 (>7 days ago as of March 12)
OLD_ARCHIVED_REPORTS=(
  "feature-work"
  "memory-reduction-v2"
  "music-page-creation"
  "production-launch-prep"
)

for report in "${OLD_ARCHIVED_REPORTS[@]}"; do
  if [ -d "reports/archived/$report" ]; then
    echo "✅ Deleting: reports/archived/$report (archived >7 days ago)"
    rm -rf "reports/archived/$report"
  else
    echo "⚠️  Not found: reports/archived/$report (may already be deleted)"
  fi
done

echo ""

# ============================================================================
# STEP 4: Delete Obsolete Task Lists (NOT in use)
# ============================================================================
echo "🗑️  Step 4: Deleting Obsolete/Duplicate Task Lists"
echo "-------------------------------------------------"

# REALISTIC-dark-mode-fix-plan.md is NOT complete (still shows 101+ failures)
# Keep it for now

echo "ℹ️  Note: REALISTIC-dark-mode-fix-plan.md NOT archived (incomplete)"
echo ""

# ============================================================================
# Summary
# ============================================================================
echo "✅ Cleanup Complete!"
echo "==================="
echo ""
echo "📋 Task Lists Archived: ${#TASKS_TO_ARCHIVE[@]}"
echo "📊 Reports Archived: ${#REPORTS_TO_ARCHIVE[@]}"
echo "🗑️  Old Reports Deleted: ${#OLD_ARCHIVED_REPORTS[@]}"
echo ""
echo "📝 Next Steps:"
echo "  1. Update /tasks/master-task-list.md with archival dates"
echo "  2. Verify all archived files are in /tasks/archived/ and /reports/archived/"
echo "  3. Commit changes to git"
echo ""
