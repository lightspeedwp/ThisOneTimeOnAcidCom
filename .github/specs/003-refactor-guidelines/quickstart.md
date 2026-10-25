# Quickstart: Validate the Guidelines Refactor

**Specification:** [Specification 003](./spec.md)  
**Status:** Phase 1 Design Complete  
**Date:** 2026-10-24

---

## What This Document Is

This is a **validation and verification guide** that proves Phase 1 of the Guidelines Refactor specification is complete and ready for owner gate resolution.

It is NOT a step-by-step implementation guide. For implementation details, see [plan.md](./plan.md) and [tasks.md](./tasks.md) (generated after owner decisions on D1–D8 gates are recorded).

---

## Prerequisites

- [ ] Git repository cloned: `lightspeedwp/ThisOneTimeOnAcidCom`
- [ ] Branch: `aiops/refactor-guidelines` (validated)
- [ ] All Phase 1 design artifacts generated (this directory)
- [ ] Ready for owner decision session on D1–D8 gates

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
RESOLVED_GATES=$(grep -c "^### Gate D[0-7]:" research.md)
PENDING_GATES=$(grep -c "^### Gate D[1-68]:" research.md)
if [ "$RESOLVED_GATES" -gt 0 ] && [ "$PENDING_GATES" -gt 0 ]; then
  echo "✓ Found gates documented in research.md"
else
  echo "✗ Gate definitions not found in research.md"
  exit 1
fi
# Verify no unresolved TODO/FIXME markers remain
if grep -i "TODO\|FIXME\|XXX" research.md >/dev/null 2>&1; then
  echo "✗ Found unresolved markers"
  exit 1
else
  echo "✓ No unresolved markers"
fi
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
cd "$(git rev-parse --show-toplevel)"
find guidelines -type f -name "*.md" | wc -l
# Expected: 116

# 2. Compare against data-model.md claim
grep "G-count: 116" .github/specs/003-refactor-guidelines/data-model.md
# Expected: Found (exact match)

# 3. List supporting documents and verify canonical paths exist
ls -la .agents/skills/*/SKILL.md AGENTS.md CONTRIBUTING.md .claude/skills/INVENTORY.md
# Expected: All 9 files exist (S002–S009 at canonical .agents/skills/ paths)

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
grep -E "Principle (I|II|III|IV|V|VI|VII)" research.md
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

A standalone validator is provided in `validate-phase1.sh`. To run it:

```bash
# From the repository root:
cd .github/specs/003-refactor-guidelines

# Make executable and run
chmod +x validate-phase1.sh
./validate-phase1.sh
```

The script:
- Derives the repository root dynamically (works in any clone location)
- Verifies all Phase 1 design artifacts are present
- Validates the 116 guideline files exist in `guidelines/`
- Confirms all decision gates (D0–D8) are documented
- Checks contract definitions are complete

**Expected output:** `✅ Phase 1 Validation PASSED`

---

## Checklist: Phase 1 Complete — Ready for Implementation Guidance?

Use this checklist to confirm Phase 1 is complete and identify what blocks Phase 2 implementation:

- [x] **Specification**: spec.md exists and is marked "Draft"
- [x] **Research**: research.md exists; all gates marked RESOLVED with owner decisions recorded
- [x] **Data Model**: data-model.md exists; entities match repository (116 G, 9 S, 33 N)
- [x] **Contracts**: All 3 contracts present (guideline-interface, approval-process, pointer-redirect)
- [x] **Gates**: requirements.md documents all 8 gates (D0–D8) as RESOLVED with evidence
- [x] **Status**: D0–D8 all RESOLVED (owner decisions recorded 2026-10-25)
- [x] **Cross-References**: All internal links valid; no broken references
- [x] **Constitution**: research.md confirms COMPLIANT with all 7 principles

**Phase 1 is COMPLETE.** All owner decisions (D0–D8) are RESOLVED and recorded. Phase 2 remains **BLOCKED** pending 5 implementation guidance items:

1. **D4.a: Guidelines folder structure** — Should `guidelines/` be flat or categorized (`guidelines/{category}/`)?
2. **D4.b: G→N consolidation mapping** — Per-guideline decision: which become pointers vs. deleted?
3. **D5.a: Pointer chain depth confirmation** — Is 1-hop maximum acceptable?
4. **D5.b: Archive location and reverse-link policy** — Directory structure and reverse-link format?
5. **D6: Backend provider stack specification** — Serverless, managed DB, API services, deployment platform?

When guidance is provided:

1. **Record guidance** — Update requirements.md with answers to D4.a, D4.b, D5.a, D5.b, D6
2. **Phase 2 Implementation** — Execute per plan.md with clear guidance recorded

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
