#!/bin/bash
set -e
set -o pipefail

echo "🔍 Phase 1 Validation: Guidelines Refactor (TOA-358)"
echo "=================================================="

# Derive repository root from script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

cd "$SCRIPT_DIR"

# 1. File presence
echo "✓ Checking files..."
MISSING_FILES=0
for file in spec.md plan.md research.md data-model.md checklists/requirements.md; do
  if test -f "$file"; then
    echo "  ✓ $file"
  else
    echo "  ✗ $file MISSING"
    MISSING_FILES=$((MISSING_FILES + 1))
  fi
done
if [ "$MISSING_FILES" -gt 0 ]; then
  echo "❌ $MISSING_FILES required file(s) missing" >&2
  exit 1
fi

# 2. Data model validation
echo "✓ Validating data model..."
GUIDELINES_DIR="$REPO_ROOT/guidelines"
GUIDELINE_COUNT=$(find "$GUIDELINES_DIR" -name "*.md" 2>/dev/null | wc -l)
if [ "$GUIDELINE_COUNT" -eq 116 ]; then
  echo "  ✓ Guideline files: $GUIDELINE_COUNT (expected: 116)"
else
  echo "  ✗ Guideline files: $GUIDELINE_COUNT (expected: 116) - MISMATCH" >&2
  exit 1
fi

# 3. Gates documentation (per-record validation)
echo "✓ Checking decision gates..."
GATE_ERRORS=0

# Check all D0–D8 gates are RESOLVED in requirements.md
for gate in D0 D1 D2 D3 D4 D5 D6 D7 D8; do
  if grep -E "^### $gate:" "checklists/requirements.md" >/dev/null 2>&1; then
    if grep -A 1 "^### $gate:" "checklists/requirements.md" | grep -q "RESOLVED"; then
      echo "  ✓ $gate: RESOLVED"
    else
      echo "  ✗ ERROR: $gate status is not RESOLVED" >&2
      GATE_ERRORS=$((GATE_ERRORS + 1))
    fi
  else
    echo "  ✗ ERROR: $gate is not documented" >&2
    GATE_ERRORS=$((GATE_ERRORS + 1))
  fi
done

if [ "$GATE_ERRORS" -gt 0 ]; then
  echo "  ✗ ERROR: $GATE_ERRORS gate(s) are not in expected state" >&2
  exit 1
fi

# 4. Contract completeness
echo "✓ Validating contracts..."
CONTRACT_COUNT=$(find contracts -name "*.md" -type f 2>/dev/null | wc -l)
if [ "$CONTRACT_COUNT" -eq 3 ]; then
  echo "  ✓ Contracts defined: $CONTRACT_COUNT (expected: 3)"
else
  echo "  ✗ ERROR: Found $CONTRACT_COUNT contracts (expected: 3)" >&2
  exit 1
fi

echo ""
echo "✅ Phase 1 Validation PASSED"
echo "📋 Next step: Resolve owner gates (D1–D8) and proceed to Phase 2"
