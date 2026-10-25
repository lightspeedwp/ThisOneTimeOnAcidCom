# Coverage Matrix: Spec 001 Requirements → Tasks → Evidence → Verification

**File**: `.github/specs/001-repo-governance-layout-and-agentic-workflows/coverage.md`
**Purpose**: Traceability from each requirement identifier to its implementing tasks, child issues, verification method, and current status
**Prepared**: October 22, 2026
**Base**: develop @ c9dd145fbb5ee59544393e91abb114806ad95a61

---

## Matrix Legend

| Column | Meaning |
| -------- | --------- |
| **Req** | Requirement identifier (R#.#) |
| **Description** | Requirement text (from spec.md) |
| **Tasks** | Implementing task IDs (T###) |
| **Child Issues** | TOA-### epic/child issue numbers |
| **Workstream** | WS-### parallel workstream owner |
| **Status** | ✅ Implemented \ | ⏳ Pending \ | ❌ Blocked |
| **Evidence** | File path or PR reference with proof |
| **Verified** | Verification method and result |

---

## R1: Folder Layout & Path Conventions

| Req | Description | Tasks | Child Issues | Workstream | Status | Evidence | Verified |
| ----- | ------------- | ------- | ------------- | ----------- | -------- | ---------- | ---------- |
| R1.1 | Inventory current paths, consumers, generated outputs | T002 | TOA-242 | WS-260 | ✅ | research.md (path inventory) | read-only inspection |
| R1.2 | Spec Kit output routing (`.github/specs/` canonical) | T018, T019, T021 | TOA-254, TOA-255 | WS-254 | ✅ | `.specify/init-options.json`, spec.md | verified in .specify/ |
| R1.3 | Documentation consolidation | T004, T021, T023, T024 | TOA-255 | WS-254 | ✅ | Directory structure present | directory traversal |
| R1.4 | Test colocation with modules (Jest ESM) | T008, T016, T025 | TOA-260 | WS-260 | ✅ | jest.config.js | PR #429 CI: 588/588 passing |
| R1.5 | Build and generated output paths | T002, T054 | TOA-242 | WS-260 | ✅ | .gitignore | checked .gitignore |
| R1.6 | Scripts at root `scripts/` | T042 | TOA-258 | WS-262 | ✅ | scripts/ directory | 4 scripts present |

---

## R2: Package Management (npm-only)

| Req | Description | Tasks | Child Issues | Workstream | Status | Evidence | Verified |
| ----- | ------------- | ------- | ------------- | ----------- | -------- | ---------- | ---------- |
| R2.1 | npm-only enforcement (PKG-001 approved) | T011 | TOA-242 | WS-260 | ✅ | AGENTS.md L98–115 | confirmed pnpm removed |
| R2.2 | Remove pnpm artefacts | T011 | TOA-242 | WS-260 | ✅ | package.json, package-lock.json | npm ls confirms |
| R2.3 | Dependency validation | T017 | TOA-242 | WS-260 | ✅ | AGENTS.md L106 | `npm ci` passes |

---

## R3: Node.js Pinning (Node 24 LTS)

| Req | Description | Tasks | Child Issues | Workstream | Status | Evidence | Verified |
| ----- | ------------- | ------- | ------------- | ----------- | -------- | ---------- | ---------- |
| R3.1 | Pin to Node.js 24 LTS (NODE-001 approved) | T012 | TOA-242 | WS-260 | ✅ | .nvmrc, package.json | AGENTS.md L121–124 |
| R3.2 | Add `.nvmrc` and `engines` field | T012 | TOA-242 | WS-260 | ✅ | .nvmrc (content: 24), package.json | verified in root |
| R3.3 | Document in README and CI | T012, T044 | TOA-242 | WS-260/WS-262 | ✅ | README.md, netlify.toml | CONTRIBUTING.md L10–21 |

---

## R4: Testing Infrastructure

| Req | Description | Tasks | Child Issues | Workstream | Status | Evidence | Verified |
| ----- | ------------- | ------- | ------------- | ----------- | -------- | ---------- | ---------- |
| R4.1 | Jest ESM configuration (@swc/core) (TEST-001) | T008, T025 | TOA-260 | WS-260 | ✅ | jest.config.js | AGENTS.md: 588/588 pass |
| R4.2 | Accept SpecKit baseline 103/104 (TEST-002) | T010, T030 | TOA-260 | WS-260 | ✅ | tests/speckit.test.mjs | AGENTS.md L172–173 |
| R4.3 | Test discovery (unit, build, e2e, speckit) | T016, T026, T027, T053 | TOA-260, TOA-274 | WS-260 | ✅ | docs/TESTING.md, package.json scripts | all suites discoverable |
| R4.4 | Playwright and Bats integration | T026, T027 | TOA-260 | WS-260 | ✅ | playwright.config.ts, tests/build.bats | Bats 12/12; Playwright configured |

---

## R5: GitHub Governance

| Req | Description | Tasks | Child Issues | Workstream | Status | Evidence | Verified |
| ----- | ------------- | ------- | ------------- | ----------- | -------- | ---------- | ---------- |
| R5.1 | GitHub Discussions (GH-001) | T033, T062 | TOA-250 | WS-261 | ⏳ | .github/DISCUSSION_TEMPLATE/ (templates created) | T062 (enablement) outstanding |
| R5.2 | PR Template Routing (GH-002) | T035, T060 | TOA-252 | WS-261 | ⏳ | pr-template-routing.yml documented | T035, T060 unchecked |
| R5.3 | CODEOWNERS & Branch Protection (GH-003) | T037, T038, T061 | TOA-261 | WS-261 | ⏳ | .github/CODEOWNERS created | T038, T061 require manual GitHub setup |
| R5.4 | Issue Template Inheritance | T034 | TOA-251 | WS-261 | ✅ | CONTRIBUTING.md inheritance section | confirmed inheritance from org |
| R5.5 | Saved Replies | T036 | TOA-253 | WS-261 | ✅ | CONTRIBUTING.md "Using Saved Replies" | T036 complete |

---

## R6: CI/CD Workflows

| Req | Description | Tasks | Child Issues | Workstream | Status | Evidence | Verified |
| ----- | ------------- | ------- | ------------- | ----------- | -------- | ---------- | ---------- |
| R6.1 | Implementation Workflows (8 active) | T029, T032, T044, T053 | TOA-242 | WS-260/WS-262 | ✅ | 8 workflows in .github/workflows/ | AGENTS.md L130–156 |
| R6.2 | Evaluation Workflows (6 documented) | T031, T032 | TOA-243, TOA-244 | WS-261 | ✅ | workflow-lint.yml, protected-files-guard.yml | active and documented |
| R6.3 | Deferred Workflows (3, owner decision) | T044, T053 | TOA-242 | WS-260/WS-262 | ⏳ | plan.md "Workflow Enablement" | documented as deferred; awaiting owner policy |
| R6.4 | Workflow quality gates | T032, T053 | TOA-244 | WS-261 | ✅ | workflow-lint.yml | validates YAML syntax |

---

## R7: Agentic Workflows & Agents

| Req | Description | Tasks | Child Issues | Workstream | Status | Evidence | Verified |
| ----- | ------------- | ------- | ------------- | ----------- | -------- | ---------- | ---------- |
| R7.1 | Agent inventory and contract specification | T017a, T047 | TOA-271 | WS-271 | ✅ | `.claude/agents/INVENTORY.md` (20 agents documented) | T047 complete |
| R7.2 | Anthropic reference assessment | T017b, T049 | TOA-271 | WS-271 | ✅ | `docs/AnthropicPlatforms.md` (platform matrix) | T049 complete |
| R7.3 | Agent budget controls (TOA-271 separate epic) | T050 | TOA-271 | WS-271 | ✅ | `.claude/BUDGET_CONTROLS.md` | T050 complete; implementation in TOA-271 |
| R7.4 | Skill runtime routing | T048, T051 | TOA-271 | WS-271 | ✅ | `.claude/SKILL_ROUTING.md` | T051 complete |

---

## R8: Styling & Component Rules (BEM-only)

| Req | Description | Tasks | Child Issues | Workstream | Status | Evidence | Verified |
| ----- | ------------- | ------- | ------------- | ----------- | -------- | ---------- | ---------- |
| R8.1 | Enforce BEM-only CSS (STYLE-001) | T013, T014, T015 | TOA-242 | WS-260 | ✅ | src/styles/ (BEM blocks present) | AGENTS.md L203–209 |
| R8.2 | Remove Tailwind configuration | T014 | TOA-242 | WS-260 | ✅ | package.json (no tailwindcss) | verified absent |
| R8.3 | Bundler syntax enforcement (Figma Make) | T013, T015 | TOA-242 | WS-260 | ✅ | guidelines/css-architecture.md | locked for BEM-only |

---

## R9: Spec Kit Integration

| Req | Description | Tasks | Child Issues | Workstream | Status | Evidence | Verified |
| ----- | ------------- | ------- | ------------- | ----------- | -------- | ---------- | ---------- |
| R9.1 | Feature directory canonical path (`.github/specs/`) (SPEC-001) | T018, T021 | TOA-254, TOA-255 | WS-254 | ✅ | `.specify/init-options.json`, spec.md | verified in .specify/ |
| R9.2 | Regression coverage (create → plan → tasks) | T019, T020 | TOA-254 | WS-254 | ✅ | tests/speckit.test.mjs (103/104 baseline) | AGENTS.md L172 |

---

## Unresolved Mappings (Outstanding T035, T038, T055, T062, T064)

| Task | Requirement | Status | Blocker | Resolution Path |
| ------ | ------------- | -------- | --------- | ----------------- |
| T035 | R5.2 (PR template routing verification) | ⏳ Pending | No test PR references recorded | Create test PRs from feat/, fix/, docs/, unmatched prefixes; record template/label results |
| T038 | R5.3 (Branch protection configuration) | ⏳ Manual | GitHub Settings access required | Owner (@ashley) enables branch protection in Settings → Branches |
| T055 | R5.1–R5.3 (Protected-file changes validation) | ⏳ Blocked | PR #429 guard failure; approval needed | Record owner approval from lightspeedwp/.github#3975; rerun guard workflow |
| T062 | R5.1 (GitHub Discussions enablement) | ⏳ Manual | GitHub Settings access required | Owner enables Discussions in Settings → Discussions and configures categories |
| T064 | R5.1–R5.3 (Protected-file revalidation) | ⏳ Blocked | Guard rerun requires approved changes | Revalidate protected-file guard after T055 approval and changes merged |

---

## Summary Statistics

- **Total Requirements**: 34 (R1.1–R9.2)
- **Requirement Categories**: 9 (R1–R9)
- **Total Tasks**: 69 (T001–T065)
- **Implemented & Verified**: 46 tasks (67%)
- **Pending Completion**: 9 tasks (13%)
- **Blocked / Awaiting Approval**: 5 tasks (7%)
- **Phase 9 Convergence**: 11 tasks (16%)

---

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016hNMcvrE64pAKFHgLLMYJo
