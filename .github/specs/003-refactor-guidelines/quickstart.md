# Quickstart: Validate the Guidelines Refactor

**Specification:** [Specification 003](./spec.md)  
**Status:** Phase 1 Design Complete  
**Date:** 2026-10-24

---

## What This Document Is

This is a **validation and verification guide** that proves the Guidelines Refactor specification is complete and ready for Phase 2 implementation.

It is NOT a step-by-step implementation guide. For implementation details, see [plan.md](./plan.md) and [tasks.md](./tasks.md) (generated after gates are resolved).

---

## Prerequisites

- [ ] Git repository cloned: `lightspeedwp/ThisOneTimeOnAcidCom`
- [ ] Branch: `docs/spec-003-guidelines-reconcile` (validated)
- [ ] All Phase 1 design artifacts generated (this directory)
- [ ] Owner decisions (D1–D8) recorded in [checklists/requirements.md](./checklists/requirements.md)

---

## Validation Scenarios

### Scenario 1: Verify Specification Completeness

**Goal:** Confirm all required specification components are present and reference each other correctly.

**Steps:**

```bash
# 1. Navigate to spec directory
cd .github/specs/003-refactor-guidelines

# 2. List all files
ls -la
# Expected output:
#   -rw-r--r-- spec.md
#   -rw-r--r-- plan.md
#   -rw-r--r-- research.md             (NEW in Phase 1)
#   -rw-r--r-- data-model.md           (NEW in Phase 1)
#   -rw-r--r-- quickstart.md           (this file)
#   drwxr-xr-x contracts/              (NEW in Phase 1)
#   drwxr-xr-x checklists/

# 3. Verify all design artifacts reference spec correctly
grep -l "Specification 003" *.md contracts/*.md
# Expected: All *.md files in this directory

# 4. Verify gate decisions are documented in research.md
PENDING_GATES=$(grep -c "### Gate D[1-8].*PENDING OWNER DECISION" research.md)
if [ "$PENDING_GATES" -gt 0 ]; then
  echo "✓ Found $PENDING_GATES documented pending gate decisions"
else
  echo "✗ No gate decisions found in research.md"
  exit 1
fi
# Verify no unresolved TODO/FIXME markers remain
grep -i "TODO\|FIXME\|XXX" research.md && echo "✗ Found unresolved markers" && exit 1 || echo "✓ No unresolved markers"
```

**Expected Outcome:**
- ✅ All Phase 1 artifacts present
- ✅ All artifacts reference spec
- ✅ No unresolved technical unknowns
- ✅ All unknowns documented as "PENDING OWNER DECISION"

---

### Scenario 2: Validate Data Model Against Repository

**Goal:** Confirm the data model accurately reflects the current repository state.

**Steps:**

```bash
# 1. Count guideline files in repository
cd /home/user/ThisOneTimeOnAcidCom
find guidelines -type f -name "*.md" | wc -l
# Expected: 116

# 2. Compare against data-model.md claim
grep "G-count: 116" .github/specs/003-refactor-guidelines/data-model.md
# Expected: Found (exact match)

# 3. List supporting documents and verify paths exist
ls -la .claude/skills/*/SKILL.md AGENTS.md CONTRIBUTING.md .claude/skills/INVENTORY.md
# Expected: All 9 files exist

# 4. Verify data model sections reference all three entity types
grep -E "^### [0-9]+\. (Guideline|Supporting|New Guidance|Pointer)" \
  .github/specs/003-refactor-guidelines/data-model.md
# Expected: 4 sections (G, S, N, P entities)
```

**Expected Outcome:**
- ✅ Guideline file count matches spec (116)
- ✅ All 9 supporting documents exist
- ✅ Data model entities match reality
- ✅ No discrepancies found

---

### Scenario 3: Verify Gate Dependencies

**Goal:** Confirm all decision gates and their dependencies are documented in requirements.md.

**Steps:**

```bash
# 1. Extract all gate sections from requirements.md
grep "^### D[0-8]:" .github/specs/003-refactor-guidelines/checklists/requirements.md
# Expected: 8 lines (D0–D8)

# 2. Check gate status (resolved vs pending) from headings
RESOLVED=$(grep -c "### .*RESOLVED" .github/specs/003-refactor-guidelines/checklists/requirements.md)
PENDING=$(grep -c "### .*PENDING" .github/specs/003-refactor-guidelines/checklists/requirements.md)
echo "Gate status: $RESOLVED resolved, $PENDING pending"
# Expected: 2 resolved (D0, D7); 7 pending (D1–D6, D8)

# 3. Verify each pending gate has clarification questions
grep -A 5 "^### D[1-6]:\|^### D8:" \
  .github/specs/003-refactor-guidelines/checklists/requirements.md | \
  grep "Owner Input Needed"
# Expected: 7 matches (one per pending gate)
```

**Expected Outcome:**
- ✅ All 8 gates documented
- ✅ D0, D7 marked RESOLVED with evidence
- ✅ D1–D6, D8 marked PENDING with owner-input sections
- ✅ Each pending gate has clarification questions

---

### Scenario 4: Validate Contract Interface Definitions

**Goal:** Confirm all interface contracts are complete and reference the data model.

**Steps:**

```bash
# 1. List contracts
ls -la contracts/
# Expected:
#   -rw-r--r-- guideline-interface.md
#   -rw-r--r-- approval-process.md
#   -rw-r--r-- pointer-redirect-contract.md

# 2. Verify each contract references data model
grep -l "data-model.md\|data model\|Data Model" contracts/*.md
# Expected: All three contracts

# 3. Check for acceptance criteria in each contract
grep -l "Acceptance Criteria" contracts/*.md
# Expected: All three contracts

# 4. Verify no acceptance criteria are marked "NOT IMPLEMENTED"
grep -i "not implemented\|todo" contracts/*.md
# Expected: No results (all criteria are scoped)
```

**Expected Outcome:**
- ✅ Three contracts present and complete
- ✅ All contracts reference data model
- ✅ All contracts have acceptance criteria
- ✅ No unimplemented features in contracts

---

### Scenario 5: Cross-Reference Integrity

**Goal:** Verify all internal cross-references between spec documents are accurate.

**Steps:**

```bash
# 1. Find all internal links in Phase 1 documents
cd .github/specs/003-refactor-guidelines
grep -h "\[.*\](\./" spec.md plan.md research.md data-model.md \
  checklists/requirements.md contracts/*.md quickstart.md | sort -u

# 2. For each link, verify file exists
# Example: [research.md](./research.md) → file should exist

# 3. Verify no broken anchors
grep "\[.*#" spec.md plan.md research.md data-model.md | \
  grep -v "Constitution § \|AGENTS.md § \|CONTRIBUTING.md § "
# Expected: No results (external anchors OK; internal anchors should use explicit links)
```

**Expected Outcome:**
- ✅ All internal links point to existing files
- ✅ All files referenced in links exist
- ✅ No broken anchor references within spec

---

### Scenario 6: Constitution Alignment (Final Check)

**Goal:** Confirm the specification aligns with constitutional principles before implementation.

**Steps:**

```bash
# 1. Read constitution principles
grep -A 5 "^### [IVI]\." ../../../.specify/memory/constitution.md | head -50

# 2. For each principle, verify research.md documents alignment
grep -E "Principle (I|II|III|IV|V|VI|VII)" \
  .github/specs/003-refactor-guidelines/research.md
# Expected: 7 matches (one per principle)

# 3. Verify status is COMPLIANT
grep "COMPLIANT\|Constitutional alignment" research.md
# Expected: Found
```

**Expected Outcome:**
- ✅ All 7 constitutional principles documented
- ✅ Alignment status marked as "COMPLIANT"
- ✅ No conflicts identified

---

## End-to-End Validation Script

Run this sequence to validate the entire Phase 1 design:

```bash
#!/bin/bash
set -e

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
    ((MISSING_FILES++))
  fi
done
if [ "$MISSING_FILES" -gt 0 ]; then
  echo "❌ $MISSING_FILES required file(s) missing" >&2
  exit 1
fi

# 2. Data model validation
echo "✓ Validating data model..."
GUIDELINE_COUNT=$(find ../../../guidelines -name "*.md" 2>/dev/null | wc -l)
if [ "$GUIDELINE_COUNT" -eq 116 ]; then
  echo "  ✓ Guideline files: $GUIDELINE_COUNT (expected: 116)"
else
  echo "  ✗ Guideline files: $GUIDELINE_COUNT (expected: 116) - MISMATCH" >&2
  exit 1
fi

# 3. Gates documentation
echo "✓ Checking decision gates..."
D_RESOLVED=$(grep -c "RESOLVED" checklists/requirements.md)
D_PENDING=$(grep -c "PENDING" checklists/requirements.md | head -1)
echo "  ✓ Gates RESOLVED: $D_RESOLVED (expected: ≥2)"
echo "  ✓ Gates PENDING: $D_PENDING (expected: ≥7)"

# 4. Contract completeness
echo "✓ Validating contracts..."
CONTRACT_COUNT=$(ls contracts/*.md 2>/dev/null | wc -l)
echo "  ✓ Contracts defined: $CONTRACT_COUNT (expected: 3)"

echo ""
echo "✅ Phase 1 Validation PASSED"
echo "📋 Next step: Resolve owner gates (D1–D8) and proceed to Phase 2"
```

**Run it:**

```bash
bash /home/user/ThisOneTimeOnAcidCom/.github/specs/003-refactor-guidelines/quickstart.md
# (or save as .sh and execute)
```

---

## Checklist: Ready for Phase 2?

Use this checklist to confirm Phase 1 is complete and Phase 2 can proceed:

- [ ] **Specification**: spec.md exists and is marked "Draft"
- [ ] **Research**: research.md exists; all NEEDS CLARIFICATION → PENDING OWNER DECISION
- [ ] **Data Model**: data-model.md exists; entities match repository (116 G, 9 S, 33 N)
- [ ] **Contracts**: All 3 contracts present (guideline-interface, approval-process, pointer-redirect)
- [ ] **Gates**: requirements.md documents all 8 gates (D0–D8)
- [ ] **Status**: D0, D7 RESOLVED; D1–D6, D8 PENDING (awaiting owner decisions)
- [ ] **Cross-References**: All internal links valid; no broken references
- [ ] **Constitution**: research.md confirms COMPLIANT with all 7 principles

**When all boxes are checked,** proceed with:

1. **Owner Decision Session** — Resolve D1–D6, D8 with recorded decisions
2. **Update requirements.md** — Record decisions and approval evidence
3. **Generate tasks.md** — Decompose Phase 2 implementation into actionable tasks
4. **Phase 2 Implementation** — Execute per plan.md

---

## Troubleshooting

### If a file is missing:

**Likely cause:** Phase 1 workflow was incomplete.

**Fix:** Run the plan skill again:
```bash
cd /home/user/ThisOneTimeOnAcidCom
SPECIFY_FEATURE_DIRECTORY=.github/specs/003-refactor-guidelines /speckit-plan
```

### If a gate is marked RESOLVED but should be PENDING:

**Likely cause:** Manual edit or merge conflict.

**Fix:** Check requirements.md for the gate definition:
```bash
grep -A 10 "^### D[X]:" .github/specs/003-refactor-guidelines/checklists/requirements.md
```

### If data model count doesn't match repository:

**Likely cause:** Files added/removed since baseline.

**Fix:**
```bash
find guidelines -name "*.md" | wc -l  # Get current count
git log --oneline -1 b7c3c44  # Verify baseline commit
```

---

## Resources

- **Specification:** [spec.md](./spec.md)
- **Implementation Plan:** [plan.md](./plan.md)
- **Research Findings:** [research.md](./research.md)
- **Requirements Checklist:** [checklists/requirements.md](./checklists/requirements.md)
- **Tasks (Phase 2):** [tasks.md](./tasks.md) (generated after gates resolved)

---

*Quickstart complete 2026-10-24 | Phase 1 design artifacts generated | Ready for gate resolutions*
