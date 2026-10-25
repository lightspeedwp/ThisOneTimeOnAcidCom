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
MISSING_CONTRACTS=0
for contract in guideline-interface.md approval-process.md pointer-redirect-contract.md; do
  if ! test -f "contracts/$contract"; then
    echo "  ✗ ERROR: Missing required contract: contracts/$contract" >&2
    MISSING_CONTRACTS=$((MISSING_CONTRACTS + 1))
  fi
done
if [ "$MISSING_CONTRACTS" -gt 0 ]; then
  exit 1
fi
CONTRACT_COUNT=$(find contracts -name "*.md" -type f 2>/dev/null | wc -l)
if [ "$CONTRACT_COUNT" -eq 3 ]; then
  echo "  ✓ Contracts defined: $CONTRACT_COUNT (expected: 3)"
else
  echo "  ✗ ERROR: Found $CONTRACT_COUNT contracts (expected: 3)" >&2
  exit 1
fi

# Verify required contract files exist
for contract in guideline-interface.md approval-process.md pointer-redirect-contract.md; do
  if ! test -f "contracts/$contract"; then
    echo "  ✗ ERROR: Missing contracts/$contract" >&2
    exit 1
  fi
done
echo "  ✓ All required contracts present"

# 5. Phase 2 readiness check (separate from Phase 1 artifact validation)
echo "✓ Checking Phase 2 readiness..."
BLOCKING_GUIDANCE=0

# Check for implementation guidance items in requirements.md
# These are the 5 blocking decisions that must be recorded before Phase 2 can proceed
GUIDANCE_ITEMS=(
  "D4.a: Subfolder structure"
  "D4.b: G→N consolidation"
  "D5: Pointer chain depth"
  "D5: Archive location & reverse links"
  "D6: Backend provider stack"
)

for item in "${GUIDANCE_ITEMS[@]}"; do
  if grep -F "✅ $item" "checklists/requirements.md" >/dev/null 2>&1; then
    echo "  ✓ $item recorded"
  else
    echo "  ⚠ $item not yet recorded"
    BLOCKING_GUIDANCE=$((BLOCKING_GUIDANCE + 1))
  fi
done

echo ""
echo "✅ Phase 1 Validation PASSED"
echo "   All Phase 1 artifacts present and gates RESOLVED."

if [ "$BLOCKING_GUIDANCE" -eq 0 ]; then
  echo "✅ Phase 2 Readiness: ALL GUIDANCE RECORDED"
  echo "   All 5 implementation guidance items documented. Phase 2 implementation ready."
else
  echo "⏳ Phase 2 Readiness: $BLOCKING_GUIDANCE guidance item(s) pending"
  echo "   Record remaining guidance decisions before proceeding to Phase 2."
fi
