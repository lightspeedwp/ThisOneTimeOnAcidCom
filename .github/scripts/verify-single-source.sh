#!/bin/bash

# verify-single-source.sh
# Validates that ThisOneTimeOnAcidCom has zero duplicate governance files
# and relies on canonical sources from lightspeedwp/.github
#
# Usage:
#   ./.github/scripts/verify-single-source.sh [--verbose]
#
# Exit codes:
#   0 = All validations passed (no drift detected)
#   1 = Validation failed (drift detected)

set -e

VERBOSE="${1:-}"
DRIFT_DETECTED=0

# Canonical governance files in lightspeedwp/.github
CANONICAL_FILES=(
    ".github/labels.yml"
    ".github/issue-types.yml"
    ".github/branch-labels.yml"
    ".github/ISSUE_TEMPLATE/*"
    ".github/PULL_REQUEST_TEMPLATE/*"
)

# Files that MUST NOT exist in ThisOneTimeOnAcidCom
FORBIDDEN_FILES=(
    ".github/labels.yml"
    ".github/issue-types.yml"
    ".github/branch-labels.yml"
)

# Directories that MUST be empty or not exist
FORBIDDEN_DIRS=(
    ".github/ISSUE_TEMPLATE"
    ".github/PULL_REQUEST_TEMPLATE"
)

echo "================================================"
echo "Single Source of Truth Validation"
echo "================================================"
echo ""
echo "Verifying that ThisOneTimeOnAcidCom has zero duplicate governance files..."
echo ""

# Check forbidden files
echo "Checking for forbidden files..."
for file in "${FORBIDDEN_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "❌ DRIFT DETECTED: $file exists (should be deleted)"
        DRIFT_DETECTED=1
    else
        [ -n "$VERBOSE" ] && echo "✅ $file: not found (correct)"
    fi
done

echo ""

# Check forbidden directories
echo "Checking for forbidden directories..."
for dir in "${FORBIDDEN_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        FILE_COUNT=$(find "$dir" -type f 2>/dev/null | wc -l)
        if [ "$FILE_COUNT" -gt 0 ]; then
            echo "❌ DRIFT DETECTED: $dir/ contains $FILE_COUNT files (should be deleted)"
            DRIFT_DETECTED=1
        else
            [ -n "$VERBOSE" ] && echo "✅ $dir/: exists but empty (will be deleted)"
        fi
    else
        [ -n "$VERBOSE" ] && echo "✅ $dir/: not found (correct)"
    fi
done

echo ""

# Check that custom workflows ARE preserved
echo "Checking that custom workflows are preserved..."
if [ -d ".github/workflows" ]; then
    WORKFLOW_COUNT=$(find .github/workflows -name "*.yml" -o -name "*.yaml" 2>/dev/null | wc -l)
    if [ "$WORKFLOW_COUNT" -gt 0 ]; then
        echo "✅ Custom workflows: $WORKFLOW_COUNT workflow(s) found (correct)"
    else
        echo "⚠️  No custom workflows found (unexpected for ThisOneTimeOnAcidCom)"
    fi
else
    echo "⚠️  .github/workflows directory not found"
fi

echo ""
echo "================================================"

if [ $DRIFT_DETECTED -eq 0 ]; then
    echo "✅ VALIDATION PASSED: Zero drift detected"
    echo "   ThisOneTimeOnAcidCom correctly references canonical .github"
    echo "================================================"
    exit 0
else
    echo "❌ VALIDATION FAILED: Drift detected"
    echo "   Remove duplicate governance files from ThisOneTimeOnAcidCom"
    echo "================================================"
    exit 1
fi
