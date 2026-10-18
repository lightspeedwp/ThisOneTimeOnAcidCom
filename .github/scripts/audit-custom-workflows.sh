#!/bin/bash

# audit-custom-workflows.sh
# Audits ThisOneTimeOnAcidCom custom workflows for drift violations
# Phase 2.5: Custom Workflow Validation (T430)
#
# Checks for:
# 1. References to LOCAL governance files that shouldn't exist
# 2. Attempts to copy or embed governance files
# 3. Hard-coded label/template definitions (should use canonical sources)
#
# Excludes:
# - Legitimate references to CANONICAL files from .github repo
# - API-based label operations
#
# Usage:
#   ./.github/scripts/audit-custom-workflows.sh [--verbose]
#
# Exit codes:
#   0 = All workflows clean (no drift violations)
#   1 = Drift violations detected

set -e

VERBOSE="${1:-}"
VIOLATIONS_FOUND=0
WORKFLOW_DIR=".github/workflows"
AUDIT_REPORT=".github/.tmp/phase2-audit/workflow-audit-phase-2-5.md"

mkdir -p .github/.tmp/phase2-audit

echo "================================================"
echo "Phase 2.5: Custom Workflow Audit"
echo "Repository Restructuring & Governance Model"
echo "================================================"
echo ""
echo "Auditing custom workflows in $WORKFLOW_DIR/"
echo "Checking for local governance file references (excluding canonical sources)"
echo ""

# Initialize report
cat > "$AUDIT_REPORT" << 'HEADER'
# Phase 2.5 Custom Workflow Audit Report

**Date:** 2026-10-18
**Phase:** 2.5 Custom Workflow Validation
**Task:** T430 — Audit custom workflows for drift violations

---

## Executive Summary

Auditing all custom workflows in `.github/workflows/` for:
- Hard-coded governance file definitions (should use canonical sources)
- Local copies of labels, templates, or configurations
- Violations of governance consolidation contract

**Note:** References to canonical files from `lightspeedwp/.github` (via `.canonical-github`) are ALLOWED and expected.

---

## Workflow Analysis

HEADER

# List all workflows (except drift-detection and pr-template-routing which are phase 2.4)
CUSTOM_WORKFLOWS=$(find "$WORKFLOW_DIR" -name "*.yml" -o -name "*.yaml" | grep -v "drift-detection.yml\|pr-template-routing.yml" | sort)

WORKFLOW_COUNT=0
CLEAN_WORKFLOWS=0
WORKFLOWS_WITH_ISSUES=()

for workflow in $CUSTOM_WORKFLOWS; do
    WORKFLOW_COUNT=$((WORKFLOW_COUNT + 1))
    WORKFLOW_NAME=$(basename "$workflow")
    VIOLATIONS_IN_WORKFLOW=0
    VIOLATION_DETAILS=()

    echo -n "Checking $WORKFLOW_NAME..."

    # Check for LOCAL governance file references (key patterns)
    # These should NOT exist since files were consolidated into .github repo

    # Pattern 1: LABELS_CONFIG pointing to local .github/labels.yml (not canonical)
    if grep "LABELS_CONFIG:" "$workflow" 2>/dev/null | grep -q "\.github/labels\.yml" && \
       ! grep "LABELS_CONFIG:" "$workflow" 2>/dev/null | grep -q "canonical-github"; then
        VIOLATIONS_IN_WORKFLOW=$((VIOLATIONS_IN_WORKFLOW + 1))
        VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
        VIOLATION_DETAILS+=("  - Local LABELS_CONFIG reference (should reference canonical .github repo)")
        echo -n " ⚠️"
    fi

    # Pattern 2: Commands copying PULL_REQUEST_TEMPLATE or ISSUE_TEMPLATE locally
    if grep -q "cp.*PULL_REQUEST_TEMPLATE\|cp.*ISSUE_TEMPLATE" "$workflow" 2>/dev/null; then
        VIOLATIONS_IN_WORKFLOW=$((VIOLATIONS_IN_WORKFLOW + 1))
        VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
        VIOLATION_DETAILS+=("  - Template copy command (templates should be canonical in .github)")
        echo -n " ⚠️"
    fi

    # Pattern 3: References to local .github/labels.yml without canonical reference
    if grep "\.github/labels\.yml" "$workflow" 2>/dev/null | grep -q -v "canonical-github\|CANONICAL"; then
        VIOLATIONS_IN_WORKFLOW=$((VIOLATIONS_IN_WORKFLOW + 1))
        VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
        VIOLATION_DETAILS+=("  - Reference to local labels.yml (should use canonical from .github repo)")
        echo -n " ⚠️"
    fi

    # Pattern 4: References to removed .github/labeler.yml
    if grep -q "\.github/labeler\.yml" "$workflow" 2>/dev/null; then
        VIOLATIONS_IN_WORKFLOW=$((VIOLATIONS_IN_WORKFLOW + 1))
        VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
        VIOLATION_DETAILS+=("  - Reference to removed labeler.yml (consolidated into canonical .github)")
        echo -n " ⚠️"
    fi

    # Pattern 5: References to removed issue or PR templates in local .github
    if grep -E "\.github/(ISSUE|PULL_REQUEST)_TEMPLATE" "$workflow" 2>/dev/null | grep -q -v "canonical-github"; then
        VIOLATIONS_IN_WORKFLOW=$((VIOLATIONS_IN_WORKFLOW + 1))
        VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
        VIOLATION_DETAILS+=("  - Reference to local issue/PR templates (should use canonical from .github repo)")
        echo -n " ⚠️"
    fi

    if [ $VIOLATIONS_IN_WORKFLOW -eq 0 ]; then
        CLEAN_WORKFLOWS=$((CLEAN_WORKFLOWS + 1))
        echo " ✅"
        [ -n "$VERBOSE" ] && echo "  → No drift violations detected"

        # Add to report
        cat >> "$AUDIT_REPORT" << EOF

### ✅ $WORKFLOW_NAME

**Status:** Clean — No drift violations detected

**Path:** \`$WORKFLOW_DIR/$WORKFLOW_NAME\`

**Compliance:** Passed governance audit

EOF
    else
        WORKFLOWS_WITH_ISSUES+=("$WORKFLOW_NAME")
        echo ""
        echo "  ❌ Found $VIOLATIONS_IN_WORKFLOW violation(s):"
        for detail in "${VIOLATION_DETAILS[@]}"; do
            echo "$detail"
        done

        # Add to report
        cat >> "$AUDIT_REPORT" << EOF

### ⚠️ $WORKFLOW_NAME

**Status:** VIOLATIONS DETECTED — $VIOLATIONS_IN_WORKFLOW issue(s)

**Path:** \`$WORKFLOW_DIR/$WORKFLOW_NAME\`

**Violations Found:**
EOF
        for detail in "${VIOLATION_DETAILS[@]}"; do
            echo "$detail" >> "$AUDIT_REPORT"
        done

        # Show context
        echo "" >> "$AUDIT_REPORT"
        echo "**Context:** References to `.canonical-github/.github/` are legitimate (fetching canonical files)" >> "$AUDIT_REPORT"
        echo "" >> "$AUDIT_REPORT"
    fi
done

echo ""
echo "================================================"
echo "Summary"
echo "================================================"
echo "Total workflows audited: $WORKFLOW_COUNT"
echo "Clean workflows: $CLEAN_WORKFLOWS"
echo "Workflows with violations: ${#WORKFLOWS_WITH_ISSUES[@]}"
echo "Total violations found: $VIOLATIONS_FOUND"

# Add summary to report
cat >> "$AUDIT_REPORT" << EOF

---

## Summary

- **Total Workflows Audited:** $WORKFLOW_COUNT
- **Clean Workflows:** $CLEAN_WORKFLOWS
- **Workflows with Violations:** ${#WORKFLOWS_WITH_ISSUES[@]}
- **Total Violations Found:** $VIOLATIONS_FOUND

### Audit Result

EOF

if [ $VIOLATIONS_FOUND -eq 0 ]; then
    echo "✅ AUDIT PASSED: All custom workflows are governance compliant"
    cat >> "$AUDIT_REPORT" << EOF
✅ **PASSED** — All custom workflows comply with governance consolidation model

All workflows correctly:
- Do not reference local governance files
- Either use canonical governance files from lightspeedwp/.github
- Or do not require centralized governance configuration
- Comply with single source of truth architecture

EOF
    echo ""
    echo "✅ Audit Report: $AUDIT_REPORT"
    exit 0
else
    echo "❌ AUDIT FAILED: Governance violations detected"
    echo ""
    echo "Workflows with issues:"
    for workflow in "${WORKFLOWS_WITH_ISSUES[@]}"; do
        echo "  - $workflow"
    done
    echo ""

    cat >> "$AUDIT_REPORT" << EOF
❌ **FAILED** — Governance violations detected

The following workflows contain references to local governance files that were consolidated:
EOF
    for workflow in "${WORKFLOWS_WITH_ISSUES[@]}"; do
        echo "- $workflow" >> "$AUDIT_REPORT"
    done

    cat >> "$AUDIT_REPORT" << EOF

### Required Actions

For each workflow with violations:
1. Review the violations listed above
2. Update references to point to canonical sources (lightspeedwp/.github)
3. Use fetch-canonical-files pattern (see labeling-unified.yml example in Phase 2.5)
4. Test the workflow to verify it works with canonical files
5. Re-run this audit to verify fixes

See Phase 2.5 remediation documentation for implementation patterns.

EOF

    echo "❌ Audit Report: $AUDIT_REPORT"
    echo ""
    echo "Review the report above for required actions."
    exit 1
fi
