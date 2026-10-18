# Phase Documentation — Spec 001: Repository Governance Layout & Agentic Workflows

This directory contains phase-specific task breakdowns and implementation details for Spec 001.

## Phase Structure

### Phase 1: Shared Governance Infrastructure (Setup)

**Location**: Main `tasks.md` (Phase 1 section)

**Scope**: 
- Initialize governance artefacts and directory structure
- Document current state and inventory
- Validate integrations (.specify/, .gemini/)
- Update documentation and protected files

**Status**: Ready for implementation

---

### Phase 2: Governance Consolidation — Repository Restructuring

**Location**: [`phase-2-governance-consolidation.md`](./phase-2-governance-consolidation.md)

**Scope**:
- Audit existing governance files (labels, templates, issue types)
- Remove duplicate governance files from ThisOneTimeOnAcidCom
- Implement drift prevention validation workflows
- Implement PR/issue template routing from canonical .github
- Preserve and validate repo-specific custom workflows
- Document hybrid governance model

**Related**:
- **Spec 021** (lightspeedwp/.github) — Source governance consolidation plan
- **TOA-262** — PR/Issue Template Routing (workstream)
- **TOA-271** — Validation & Automation (workstream)

**Implementation**: 40 tasks organized across 6 subphases
1. **Phase 2.1**: Setup (3 tasks) — Clone and prepare
2. **Phase 2.2**: Audit (7 tasks) — Discovery and findings
3. **Phase 2.3**: Consolidation (12 tasks) — Remove duplicates, preserve workflows
4. **Phase 2.4**: Drift Prevention (7 tasks) — Deploy validation workflows
5. **Phase 2.5**: Workflow Validation (5 tasks) — Ensure custom workflows work
6. **Phase 2.6**: Documentation (6 tasks) — Final validation and docs

**Status**: Ready for implementation (detailed task breakdown complete)

---

## How to Use This Directory

**To implement Phase 2**:
1. Read [`phase-2-governance-consolidation.md`](./phase-2-governance-consolidation.md)
2. Follow the task sequences (Phase 2.1 → 2.2 → 2.3 → 2.4 → 2.5 → 2.6)
3. Use parallel execution opportunities where noted [P]
4. Check off tasks as completed
5. Review checkpoint validations before proceeding to next phase

**To reference from main spec**:
- `spec.md` links to the phase documentation
- `tasks.md` main task list has overview; phase-specific files have details
- `plan.md` describes overall architecture and dependencies

---

## Phase Interdependencies

```
Phase 1: Shared Governance Infrastructure (SETUP)
  ↓ (must complete)
Phase 2: Governance Consolidation (CURRENT)
  ├── Phase 2.1: Setup & Audit Preparation
  │   ↓ (must complete)
  ├── Phase 2.2: Foundational Audit
  │   ↓ (must complete — audit findings required for consolidation)
  ├── Phase 2.3: Configuration Consolidation
  │   ↓ (must complete before drift prevention)
  ├── Phase 2.4: Drift Prevention & Template Routing
  │   ↓ (must complete before workflow validation)
  ├── Phase 2.5: Custom Workflow Validation
  │   ↓ (independent from 2.3/2.4, can partially overlap)
  └── Phase 2.6: Documentation & Final Validation
      ↓ (must complete before Phase 3)

Phase 3+: Enhanced Monitoring & Rollout (FUTURE)
```

---

## Success Criteria

Phase 2 is complete when:

- ✅ All 40 tasks completed
- ✅ All audits documented with findings
- ✅ All duplicate governance files removed (0 remaining in ThisOneTimeOnAcidCom)
- ✅ All custom workflows preserved and working
- ✅ Drift prevention workflows deployed and tested
- ✅ PR template routing deployed and tested
- ✅ All 5 quickstart validation scenarios passing
- ✅ CI/CD green on both repositories
- ✅ Hybrid governance model documented
- ✅ Ready for Phase 3

---

## Key Artifacts

All Phase 2 artifacts are stored in `.github/.tmp/phase2-audit/`:

- `AUDIT-SUMMARY.md` — High-level findings
- `labels-audit.md` — Label duplication analysis
- `issue-types-audit.md` — Issue type analysis
- `issue-templates-audit.md` — Template duplication analysis
- `pr-templates-audit.md` — PR template duplication analysis
- `workflows-inventory.md` — Custom workflow inventory
- `consolidation-verification.md` — Deletion verification checklist
- `PHASE2-COMPLETION-REPORT.md` — Final completion summary
- `QUICKSTART-VALIDATION.md` — Validation scenario results

---

## References

- **Spec 021** (lightspeedwp/.github): Repository Restructuring & Canonical Governance Config
- **Spec 001** (ThisOneTimeOnAcidCom): Repository Governance Layout & Agentic Workflows
- **Contracts** (lightspeedwp/.github/specs/021-repo-restructuring-canonical-config/contracts/):
  - `drift-detection.contract.md`
  - `template-routing.contract.md`
  - `workflow-reference.contract.md`
- **CLAUDE.md** (lightspeedwp/.github): Branch naming and governance rules
- **AGENTS.md** (ThisOneTimeOnAcidCom): Repository-specific agent instructions
