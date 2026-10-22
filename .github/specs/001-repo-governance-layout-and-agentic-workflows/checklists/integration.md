# Integration Checklist: Repository Governance Layout & Agentic Workflows

**Purpose**: Requirement-quality validation across all five governance domains
(Testing, GitHub, Configuration, Spec Kit, Budget) with emphasis on inter-domain
consistency, integration dependencies, and cross-cutting enforcement.

**Created**: 2026-10-17

**Feature**: [spec.md](../spec.md) | [plan.md](../plan.md) |
[tasks.md](../tasks.md)

**Note**: This custom checklist tests the quality of requirements themselves,
not implementation completeness. Marker semantics: `[x]` means the reviewer
confirmed the requirement-quality criterion is satisfied.

---

## Cross-Domain Consistency & Alignment

- [ ] CHK001 Are testing infrastructure requirements (R4) consistent with CI/CD
  workflow requirements (R6)? Specifically, do Jest ESM, Bats, and Playwright
  test discovery requirements align with the workflow-lint, tests, and
  documentation pipeline stages? [Consistency, Spec §R4, §R6]
- [ ] CHK002 Do package management requirements (R2) conflict with Node.js
  pinning requirements (R3)? Are npm-only enforcement and Node 24 compatibility
  verified together in all installation paths? [Consistency, Spec §R2, §R3]
- [ ] CHK003 Are GitHub Discussions/PR template requirements (R5) compatible
  with branch-name validation requirements (R6)? Can PR routing by branch prefix
  work alongside discussion category templates? [Consistency, Spec §R5, §R6]
- [ ] CHK004 Do folder layout requirements (R1) establish clear ownership for
  all .github/ subfolders touched by Spec Kit, GitHub workflows, and agent
  specs? Or are responsibilities unclear? [Clarity, Spec §R1]
- [ ] CHK005 Are the 8 implementation workflows, 6 evaluation workflows, and 3
  deferred workflows (R6) defined with explicit gating criteria? Can an operator
  determine which workflow to enable without ambiguity? [Measurability, Spec
  §R6.2]

---

## Integration Dependencies & Blocking Relationships

- [ ] CHK006 Are testing infrastructure requirements (R4.1–R4.4) documented as a
  blocking prerequisite for CI/CD workflow implementation (R6)? Or can workflows
  be implemented independently? [Dependency, Spec §R4, §R6]
- [ ] CHK007 Are Node.js 24 pinning requirements (R3) documented as blocking for
  testing baseline validation (R4.2: 103/104 acceptance)? Must Node 24 be pinned
  before Jest ESM can be validated? [Dependency, Spec §R3, §R4.2]
- [ ] CHK008 Does package-management npm-only enforcement (R2) block Spec Kit
  path configuration (R9.1)? If .specify/ or .gemini/ tools require specific
  node_modules layout, is this dependency explicit? [Dependency, Gap, Spec §R2,
  §R9.1]
- [ ] CHK009 Are GitHub CODEOWNERS requirements (R5.4) documented as blocking PR
  template routing requirements (R5.2)? Can PR templates route without
  CODEOWNERS configuration? [Dependency, Spec §R5.2, §R5.4]
- [ ] CHK010 Is agent budget enforcement (R7.3–R7.4) documented as blocking
  CI/CD evaluation-workflow implementation (R6.2)? Or are evaluation workflows
  independent of budget controls? [Dependency, Gap, Spec §R6.2, §R7.3]

---

## Testing Infrastructure – Cross-Domain Impact

- [ ] CHK011 Does Jest ESM configuration (R4.1) require updates to workflow
  commands (e.g., `npm run test:unit` in .github/workflows/tests.yml)? Are these
  updates documented in requirements or deferred to implementation?
  [Completeness, Spec §R4.1, §R6.1]
- [ ] CHK012 Do Bats build tests (R4.1) require changes to root `scripts/`
  directory structure (R1.6)? If so, are those script-placement requirements
  clear and non-conflicting? [Completeness, Spec §R1.6, §R4.1]
- [ ] CHK013 Are Playwright e2e test requirements (R4.1) independent of GitHub
  Actions runner configuration, or do they require specific runner image/OS? Is
  this constraint documented? [Completeness, Gap, Spec §R4.1]
- [ ] CHK014 Does the 103/104 Speckit baseline acceptance (R4.2) apply only to
  Speckit tests, or does it affect Jest unit tests or Playwright e2e tests? Is
  scope clear? [Clarity, Spec §R4.2]
- [ ] CHK015 Are all test discovery paths (unit, build, e2e, speckit per R4.3)
  documented as mutually compatible? Can all four run in parallel without
  resource/port conflicts? [Coverage, Gap, Spec §R4.3]

---

## GitHub Governance – Enforcement & Validation

- [ ] CHK016 Do GitHub Discussions requirements (R5.1) define which discussion
  categories block PR creation, or are discussions purely advisory? Is the
  enforcement model explicit? [Clarity, Gap, Spec §R5.1]
- [ ] CHK017 Are PR template routing requirements (R5.2) tested? Does the spec
  require validation that the correct template loads for each branch prefix
  (feat/, fix/, docs/, etc.)? [Coverage, Gap, Spec §R5.2]
- [ ] CHK018 Does CODEOWNERS enforcement (R5.4) define behavior when a protected
  path is touched but the CODEOWNERS group is unavailable? Is escalation or
  override behavior documented? [Edge Case, Gap, Spec §R5.4]
- [ ] CHK019 Are issue-template requirements (R5.3) and saved-reply requirements
  (R5.5) documented as providing contributor onboarding, or as enforcing issue
  correctness? Is the purpose clear? [Clarity, Spec §R5.3, §R5.5]
- [ ] CHK020 Do labeling requirements (R6.2 evaluation workflow) and
  label-schema requirements (implied in R6.4) both ensure that prefixed labels
  (type:, status:, area:, meta:) are enforced? Or are labels advisory?
  [Consistency, Gap, Spec §R6.2, §R6.4]

---

## Configuration Propagation & Root Settings

- [ ] CHK021 Are Node.js 24 pinning requirements (R3.2) documented to affect
  .nvmrc, package.json `engines` field, README, CI documentation, AND Netlify
  build settings? Are all four locations mentioned? [Completeness, Spec §R3.2]
- [ ] CHK022 Do npm-only requirements (R2.1) specify how pnpm artefacts are
  cleaned (R2.2)? Are the exact files listed (pnpm-workspace.yaml,
  pnpm.overrides, etc.)? [Specificity, Spec §R2.1, §R2.2]
- [ ] CHK023 Is BEM-only CSS enforcement (R8.1) documented to require Tailwind
  dependency removal (R8.2)? Are both ESLint rules and build-system changes
  required? [Completeness, Spec §R8.1, §R8.2]
- [ ] CHK024 Do Figma Make bundler compatibility constraints (implied in
  governance context) conflict with any configuration requirements (R2, R3, R8)?
  Is compatibility preserved? [Consistency, Assumption, Spec §R1, §R8]
- [ ] CHK025 Are protected files (CHANGELOG.md, ATTRIBUTIONS.md, guidelines/,
  Supabase utils, .github/workflows) explicitly listed and rationale given for
  each? [Completeness, Spec §Scope & Exclusions]

---

## Agent & Skill Budget Controls – Enforcement Model

- [ ] CHK026 Are agent budget requirements (R7.3) defined as "advisory (markdown
  instructions)" or "enforced (host-side runtime limits)"? The spec says R7.3 is
  host-side; is this confirmed? [Clarity, Spec §R7.3]
- [ ] CHK027 Do budget requirements (R7) distinguish between per-agent budgets,
  per-workflow budgets, aggregate budgets across concurrent agents, and
  retries/overages? Are all granularities specified? [Completeness, Gap, Spec
  §R7.1–R7.4]
- [ ] CHK028 Is the agent/skill inventory (R7.1: ~18 agents, ~5 skills)
  documented as a BASELINE or a LIMIT? Can TOA-264/265 add new agents without
  modifying budget requirements (R7.3)? [Clarity, Assumption, Spec §R7.1,
  Workstream Dependencies §R9]
- [ ] CHK029 Are Anthropic reference platforms (R7.2: MCP, tool use, streaming,
  prompt caching) documented as optional per-agent capabilities, or required for
  all agents? [Coverage, Clarity, Spec §R7.2]
- [ ] CHK030 Do budget enforcement requirements (R7.3) cover agent
  fallback/degradation when budget is exhausted? Is behavior defined or
  implementation-deferred? [Edge Case, Gap, Spec §R7.3]

---

## Spec Kit Routing & Regression Pipeline

- [ ] CHK031 Does Spec Kit path resolution (R9.1: `.github/specs/{NNN-feature}/`
  canonical) account for SPECIFY*FEATURE*DIRECTORY environment variable? Is the
  mechanism documented? [Completeness, Spec §R9.1]
- [ ] CHK032 Are Spec Kit regression test requirements (R9.2: create → plan →
  tasks pipeline) defined with explicit pass/fail criteria? What does
  "regression test passing" mean? [Measurability, Gap, Spec §R9.2]
- [ ] CHK033 Does Spec Kit routing (R9.1) account for feature numbering sequence
  and conflicts? If two features attempt `001-*`, what is the error handling?
  [Edge Case, Gap, Spec §R9.1]
- [ ] CHK034 Are Spec Kit output files (spec.md, plan.md, research.md,
  data-model.md, contracts/, quickstart.md, tasks.md) documented as stable
  outputs, or can structure change between Spec Kit versions? [Assumption, Spec
  §R9.1, Project Structure §Implementation Targets]
- [ ] CHK035 Does documentation consolidation (R1.3: planning docs, reports,
  portable prompts, task trackers) enforce that these live in `.github/specs/`
  or allow placement in `docs/`? Is the boundary clear? [Clarity, Spec §R1.3]

---

## Completeness & Coverage Across All Domains

- [ ] CHK036 Are requirements equally specified across all five domains (Testing
  R4, GitHub R5, Configuration R2–R3–R8, Spec Kit R9, Budget R7)? Or is one
  domain under-specified? [Completeness]
- [ ] CHK037 Do folder layout requirements (R1) cover all paths that GitHub
  workflows, agents, and Spec Kit may create or modify? Are generated paths
  (dist/, coverage/, export/) documented? [Completeness, Spec §R1]
- [ ] CHK038 Are acceptance criteria for each major requirement (R1–R9)
  measurable and testable? Or do some remain vague (e.g., "deterministic quality
  gates")? [Measurability, Spec §R6.4]
- [ ] CHK039 Are migration/rollback procedures documented for each path move or
  config change? Is reversibility assured for folder layout (R1), testing setup
  (R4), and CI/CD workflows (R6)? [Coverage, Gap, Spec §R1, §R4, §R6]
- [ ] CHK040 Are non-functional requirements (performance, reliability,
  scalability) defined for governance infrastructure? Or is "maintainability"
  the only non-functional attribute? [Completeness, Gap]

---

## Unresolved Questions & Ambiguities

- [ ] CHK041 Figma Make bundler compatibility (constraints: no optional
  chaining, no nullish coalescing, no nested ternaries, no for-of loops) is
  mentioned in context but not formally in R1–R9. Should it be a separate
  requirement or integrated into R8? [Ambiguity, Assumption]
- [ ] CHK042 Are workflows in .github/workflows/ considered "protected files"
  (immutable) or "implementation targets" (can be updated)? The spec §Scope
  mentions protection; is this absolute or policy-dependent? [Clarity, Conflict,
  Spec §Scope & Exclusions]
- [ ] CHK043 The 9 approved decisions (SPEC-001 through STYLE-001) are ratified
  but not all are integrated into requirements (R1–R9). Which decisions are
  "preconditions" vs. "implementation guidance"? [Traceability, Gap, Spec
  §Approved Decisions]
- [ ] CHK044 Are the 27 source references (17 workflows, 7 Anthropic platforms,
  3 repos) documented as "current state" (do these exist?) or "targets" (must be
  created)? Is validation deferred? [Ambiguity, Assumption, Spec §Source
  References]
- [ ] CHK045 Does the requirement for "deterministic quality gates" (R6.4) mean
  outputs must be identical across runs, or only that failure/pass decisions are
  reproducible? [Clarity, Gap, Spec §R6.4]

---

## Cross-Cutting Enforcement & Validation

- [ ] CHK046 Are there any requirements that conflict with preservation of
  application behaviour (SPA build, Netlify deployment, book content, Supabase
  non-exposure, Figma Make compatibility)? [Conflict, Assumption]
- [ ] CHK047 Do all five domain requirements (Testing, GitHub, Configuration,
  Spec Kit, Budget) align with the stated Phase 1–Phase 8 task decomposition?
  Are phases mapped back to requirements? [Traceability, Spec §Plan §Project
  Structure]
- [ ] CHK048 Are the 20 child issues (TOA-242–TOA-274) all mapped to at least
  one requirement (R1–R9)? Are any issues orphaned or unmapped? [Coverage, Spec
  §Child Issue Coverage Matrix]
- [ ] CHK049 Does the Workstream Coverage Matrix (5 workstreams: TOA-254,
  TOA-260, TOA-261, TOA-262, TOA-271) account for all blocking dependencies and
  parallel execution? Is the matrix complete and acyclic? [Completeness,
  Dependency, Spec §Workstream Dependencies]
- [ ] CHK050 If one domain requirement fails (e.g., Node.js 24 pinning causes
  test baseline regression), can other domains proceed? Or is there a hard
  cascade dependency? [Edge Case, Recovery, Spec §R9 Workstream Coordination]

---

## Notes

- Mark items `[x]` only after review confirms the requirement-quality criterion
  is satisfied
- Leave items unchecked when they still require clarification, correction, or
  reviewer evaluation
- Reference sections are keyed to spec.md and plan.md structure
- Items marked [Gap] indicate missing requirements; [Ambiguity] indicates vague
  language; [Conflict] indicates contradictions; [Dependency] indicates
  unresolved dependencies; [Assumption] indicates stated but unvalidated
  assumptions
- Cross-domain items test integration, not domain-local correctness
- All 50 items contributed to comprehensive coverage across Testing, GitHub,
  Configuration, Spec Kit, and Budget domains
