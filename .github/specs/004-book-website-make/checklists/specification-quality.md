# Specification Quality Checklist: Book Website Figma Make Prompt Pack

**Purpose**: Validate requirements quality across spec.md, plan.md, research.md, data-model.md, quickstart.md, contracts/, and tasks.md — ensuring completeness, clarity, consistency, and measurability before approval gates and implementation.

**Created**: 2026-11-09

**Feature**: [spec.md](../spec.md) | [plan.md](../plan.md) | [tasks.md](../tasks.md)

**Review Type**: Specification Quality (peer review for PR readiness)

**Rigor Level**: Standard (comprehensive requirements validation)

**Note**: This custom checklist is a reviewer-owned requirements-quality review artifact. Mark an item `[x]` only when the reviewer determines the requirements-quality criterion is satisfied. `[x]` means the requirement is well-written and complete—not that implementation is done.

---

## Specification Completeness

**Purpose**: Are all necessary requirements documented?

- [ ] CHK001 Are all 4 user stories (US1–US4) documented with clear goals and priorities? [Completeness, Spec §User Scenarios]
- [ ] CHK002 Are acceptance scenarios defined for each user story with Given/When/Then format? [Completeness, Spec §Acceptance Scenarios]
- [ ] CHK003 Are all 10 functional requirements (FR-001 through FR-010) documented with full text? [Completeness, Spec §Requirements]
- [ ] CHK004 Are all 8 success criteria (SC-001 through SC-004+) documented as measurable outcomes? [Completeness, Spec §Success Criteria]
- [ ] CHK005 Are all 7 blocking decisions documented in research.md with options A/B/C/D? [Completeness, research.md §Blocking Decisions]
- [ ] CHK006 Are all 6 Figma Make prompts (1, 2A, 2B, 3A, 3B, 3C) documented in contracts/ directory? [Completeness, contracts/]
- [ ] CHK007 Are all 51 tasks documented in tasks.md across 7 phases with phase purposes defined? [Completeness, tasks.md §Phases]
- [ ] CHK008 Are assumptions documented (8 assumptions listed in spec.md)? [Completeness, Spec §Assumptions]
- [ ] CHK009 Are edge cases documented (4 edge cases listed in spec.md)? [Completeness, Spec §Edge Cases]
- [ ] CHK010 Are all key entities (6 entities in data-model.md) documented with fields, relationships, and validation? [Completeness, data-model.md §Entities]

---

## Specification Clarity

**Purpose**: Are requirements specific and unambiguous?

- [ ] CHK011 Is "documentation-only package" definition clear (no code, no commits, no deployments)? [Clarity, Spec §Input]
- [ ] CHK012 Are approval gates clearly defined with prerequisites for Gate 1, 2, 3? [Clarity, quickstart.md §Approval Gates]
- [ ] CHK013 Is the "blocking decision" concept clearly defined with example decisions? [Clarity, research.md, plan.md]
- [ ] CHK014 Are design baseline specifications quantified (Space Grotesk weights/sizes, 9 colors named)? [Clarity, plan.md §Design System]
- [ ] CHK015 Is reader access policy specified with concrete numbers (10-minute codes, 30-day lifecycle)? [Clarity, plan.md §Reader Access Policy]
- [ ] CHK016 Are Figma Make prompt references clear (stage numbers 0–3C, execution order documented)? [Clarity, plan.md §Figma Make Integration]
- [ ] CHK017 Is the term "unblocked prompts" vs "blocked prompts" clearly defined with prerequisites? [Clarity, plan.md, quickstart.md]
- [ ] CHK018 Are navigation changes explicit (Speaking/Events/Media hidden from sitemap)? [Clarity, contracts/prompt-1-navigation-exposure.md]
- [ ] CHK019 Is "unapproved candidates" list explicit (R3, T1, RT2, C1 named, not included)? [Clarity, Spec §Design Candidate]
- [ ] CHK020 Are error state scenarios explicit (5 scenarios: invalid, expired, rate-limited, server, session-conflict)? [Clarity, contracts/prompt-3c-error-states.md]

---

## Specification Consistency

**Purpose**: Do requirements align without conflicts?

- [ ] CHK021 Are user story priorities consistent (P1: US1, US2, US4; P2: US3)? [Consistency, Spec §User Scenarios, plan.md §Scale/Scope]
- [ ] CHK022 Are design baseline references consistent across spec.md, plan.md, data-model.md? [Consistency, cross-reference check]
- [ ] CHK023 Are blocking decision references consistent between research.md and prompt contracts? [Consistency, research.md ↔ contracts/prompt-3b, prompt-3c]
- [ ] CHK024 Are task IDs consistent across tasks.md (sequential T001–T051 with no gaps)? [Consistency, tasks.md §Task Format Validation]
- [ ] CHK025 Are user story labels consistent in tasks.md (only US1–US4, no other story IDs)? [Consistency, tasks.md §Format]
- [ ] CHK026 Are independent test criteria consistent with acceptance scenarios? [Consistency, Spec §User Scenarios ↔ tasks.md §Independent Test Criteria]
- [ ] CHK027 Do approval gate prerequisites (Gate 1: decisions, Gate 2: design, Gate 3: readiness) align with blocking dependencies in tasks.md? [Consistency, quickstart.md ↔ tasks.md]
- [ ] CHK028 Is "documentation-only" constraint consistently applied (no code, no commits throughout)?  [Consistency, Spec §FR-009, plan.md §Project Type]

---

## Acceptance Criteria Quality

**Purpose**: Are success criteria measurable and testable?

- [ ] CHK029 Is SC-001 measurable? ("100% reconciliation coverage" is quantified) [Measurability, Spec §SC-001]
- [ ] CHK030 Is SC-002 measurable? ("Exact Prompt 1 preview includes all four elements" lists elements) [Measurability, Spec §SC-002]
- [ ] CHK031 Is SC-003 measurable? ("95%+ complete specifications" is quantified) [Measurability, Spec §SC-003]
- [ ] CHK032 Is SC-004 testable? ("3+ options per decision" is quantified) [Measurability, Spec §SC-004+]
- [ ] CHK033 Are acceptance criteria in contracts/ measurable (CR-2A.1–CR-3C.8 are specific, not vague)? [Measurability, contracts/]
- [ ] CHK034 Are task completion criteria defined per user story (tasks.md §Independent Test Criteria)?  [Measurability, tasks.md]
- [ ] CHK035 Can "blocking decision resolved" be objectively measured (decision selected + documented)? [Measurability, quickstart.md §Gate 1]

---

## Blocking Decisions & Dependencies

**Purpose**: Are all blockers documented with clear prerequisites?

- [ ] CHK036 Are all 7 blocking decisions named with specific questions (Decision 1–7 in research.md)? [Completeness, research.md]
- [ ] CHK037 Does each blocking decision have 3+ options with impact assessment? [Completeness, research.md §Options]
- [ ] CHK038 Is the dependency chain clear (Decisions 1–3 block Prompts 3B/3C; others block content)? [Clarity, research.md, contracts/]
- [ ] CHK039 Are blocked prompts clearly marked in contracts/ with prerequisite decisions? [Clarity, contracts/prompt-3b-recovery-flows.md, prompt-3c-error-states.md]
- [ ] CHK040 Is the task dependency graph clear (phases sequential, Phase 2 blocks phases 3–5)? [Clarity, tasks.md §Dependencies]
- [ ] CHK041 Are approval gates documented as gating conditions (Gate 1 must pass before Phase 3+ tasks)?  [Completeness, quickstart.md, tasks.md]

---

## User Story Coverage

**Purpose**: Are all user stories complete and independently testable?

- [ ] CHK042 Does US1 have complete specification (goal, test criteria, acceptance scenarios, tasks)? [Completeness, Spec + tasks.md §Phase 3]
- [ ] CHK043 Does US2 have complete specification (goal, test criteria, acceptance scenarios, tasks)? [Completeness, Spec + tasks.md §Phase 4]
- [ ] CHK044 Does US3 have complete specification (goal, test criteria, acceptance scenarios, tasks)? [Completeness, Spec + tasks.md §Phase 5]
- [ ] CHK045 Does US4 have complete specification (goal, test criteria, acceptance scenarios, tasks)? [Completeness, Spec + tasks.md §Phase 6]
- [ ] CHK046 Are US1–US4 independent (each can be completed without others, except foundational)? [Consistency, Spec §User Scenarios]
- [ ] CHK047 Is the MVP scope clear (Phases 1–2 + Phase 3 = minimum viable output)? [Clarity, tasks.md §MVP Scope]

---

## Scenario & Edge Case Coverage

**Purpose**: Are all flows, cases, and boundaries addressed?

- [ ] CHK048 Are primary flows documented (email entry → code entry → success path)? [Completeness, contracts/prompt-3a-reader-access.md]
- [ ] CHK049 Are error flows documented (all 5 error scenarios in contracts/prompt-3c-error-states.md)? [Completeness, contracts/]
- [ ] CHK050 Are recovery flows documented (contracts/prompt-3b-recovery-flows.md, pending decisions)? [Completeness, contracts/]
- [ ] CHK051 Are rate-limiting scenarios addressed (rate-limit error state + timer specified)? [Completeness, contracts/prompt-3c-error-states.md]
- [ ] CHK052 Are session timeout scenarios addressed (session-conflict error state documented)? [Completeness, contracts/prompt-3c-error-states.md]
- [ ] CHK053 Are zero-state scenarios documented (e.g., no previous session, first-time user)? [Completeness, contracts/]
- [ ] CHK054 Is the "version mismatch" edge case documented (6 source files reconciled)? [Completeness, Spec §FR-002]
- [ ] CHK055 Is the "unblocked while blocked" race condition handled (Task ordering prevents this)? [Completeness, tasks.md]

---

## Non-Functional Requirements

**Purpose**: Are performance, accessibility, security, and other NFRs specified?

- [ ] CHK056 Is accessibility specified (WCAG 2.2 AA mentioned for forms)? [Completeness, contracts/prompt-3a-reader-access.md]
- [ ] CHK057 Are performance requirements specified or explicitly out of scope? [Gap, Spec]
- [ ] CHK058 Are security requirements specified or explicitly out of scope? [Gap, Spec]
- [ ] CHK059 Are privacy requirements documented (purpose-limited records mentioned for reader access)? [Completeness, plan.md §Reader Access Policy]
- [ ] CHK060 Is the "no hardcoded content" principle documented (derives from design baseline/sources)? [Completeness, Spec §FR-009]

---

## Assumptions & Traceability

**Purpose**: Are assumptions documented and requirements traceable?

- [ ] CHK061 Are all 8 assumptions documented (users have email, source files are authoritative, etc.)? [Completeness, Spec §Assumptions]
- [ ] CHK062 Is each assumption validated or marked for later validation? [Clarity, Spec §Assumptions]
- [ ] CHK063 Are source file references clear (6 files in content/book/ with versions v1.0.0–v1.9.0)? [Traceability, plan.md §Source Files]
- [ ] CHK064 Are Linear issue references documented (TOA-446, TOA-445, TOA-441, etc.)? [Traceability, Spec]
- [ ] CHK065 Is the governance framework referenced (constitution.md § principles applied)? [Traceability, plan.md §Constitution Check]
- [ ] CHK066 Are spec sections cross-referenced (e.g., Spec §FR-001 links to affected tasks)? [Traceability, cross-reference check]

---

## Data Model & Entities

**Purpose**: Are entities, fields, and relationships clearly defined?

- [ ] CHK067 Are all 6 entities defined (Specification File, Design Baseline, Design Candidate, Blocking Decision, Figma Make Prompt, Preflight Analysis)? [Completeness, data-model.md]
- [ ] CHK068 Does each entity have fields listed (not just names)? [Completeness, data-model.md]
- [ ] CHK069 Are relationships documented (Design Baseline derived from Specification File, etc.)? [Completeness, data-model.md]
- [ ] CHK070 Are validation rules documented for each entity? [Completeness, data-model.md]
- [ ] CHK071 Are state transitions documented (e.g., Blocking Decision: Pending → Resolved)? [Completeness, data-model.md]

---

## Approval Gates & Workflow

**Purpose**: Are approval prerequisites and sequencing clear?

- [ ] CHK072 Is Gate 1 (Blocking Decisions) prerequisite clear? (7 decisions selected + documented) [Clarity, quickstart.md §Gate 1]
- [ ] CHK073 Is Gate 2 (Design Baseline) prerequisite clear? (design tokens approved, unapproved candidates listed) [Clarity, quickstart.md §Gate 2]
- [ ] CHK074 Is Gate 3 (Readiness) prerequisite clear? (preflight analysis complete + signed off) [Clarity, quickstart.md §Gate 3]
- [ ] CHK075 Is the workflow sequence clear (Gates 1→2→3 must pass in order)? [Clarity, quickstart.md]
- [ ] CHK076 Are validation scenarios documented for each gate? [Completeness, quickstart.md]

---

## Task Decomposition Quality

**Purpose**: Are tasks well-structured and independently executable?

- [ ] CHK077 Do all 51 tasks follow checklist format `- [ ] [TaskID] [P?] [Story?] Description`? [Format, tasks.md]
- [ ] CHK078 Are all task IDs sequential (T001–T051) with no gaps or duplicates? [Consistency, tasks.md]
- [ ] CHK079 Are parallelizable tasks marked `[P]` consistently across phases? [Completeness, tasks.md]
- [ ] CHK080 Are user story labels `[US1]–[US4]` applied only to phases 3–6? [Consistency, tasks.md]
- [ ] CHK081 Does each task have a file path or clear deliverable reference? [Completeness, tasks.md]
- [ ] CHK082 Are task dependencies documented (blocking tasks, sequential phases)? [Completeness, tasks.md §Dependencies]
- [ ] CHK083 Are parallel execution opportunities identified for each phase? [Completeness, tasks.md]
- [ ] CHK084 Is the MVP scope clearly defined (what's minimum for launch)? [Clarity, tasks.md §MVP Scope]

---

## Version Reconciliation

**Purpose**: Are version differences documented without silent merges?

- [ ] CHK085 Are all 6 source files listed with versions (01 v1.0.0, 02 v1.0.4, 03 v1.3.0, 04 v1.1.2, 05 v1.9.0, 06 v1.1.1)? [Completeness, plan.md §Source Files]
- [ ] CHK086 Are version differences documented (02: v1.0.3→v1.0.4, 03: v1.2.2→v1.3.0, 05: v1.7.0→v1.9.0)? [Traceability, Spec §FR-002]
- [ ] CHK087 Is each version difference assessed for material impact? [Clarity, reconciliation notes]

---

## Figma Make Prompt Specifications

**Purpose**: Are prompt contracts complete and ready for execution?

- [ ] CHK088 Does Prompt 1 (Navigation Exposure) have complete specification? [Completeness, contracts/prompt-1-navigation-exposure.md]
- [ ] CHK089 Does Prompt 2A (Design Baseline) have complete specification? [Completeness, contracts/prompt-2a-design-baseline.md]
- [ ] CHK090 Does Prompt 2B (Navigation Design) have complete specification? [Completeness, contracts/prompt-2b-navigation-design.md]
- [ ] CHK091 Does Prompt 3A (Reader Access) have complete specification? [Completeness, contracts/prompt-3a-reader-access.md]
- [ ] CHK092 Does Prompt 3B (Recovery Flows) clearly mark blocking conditions (Decisions 1&2)? [Completeness, contracts/prompt-3b-recovery-flows.md]
- [ ] CHK093 Does Prompt 3C (Error States) clearly mark blocking conditions (Decision 3)? [Completeness, contracts/prompt-3c-error-states.md]
- [ ] CHK094 Does each prompt contract include acceptance criteria (CR-XXX criteria)? [Completeness, contracts/]

---

## Overall Quality Gates

**Purpose**: Is the specification ready for approval and implementation?

- [ ] CHK095 Are there any unresolved `[NEEDS CLARIFICATION]` markers in spec.md? [Gap, Spec]
- [ ] CHK096 Is the spec marked as "Draft" or "Ready for Review"? [Status, Spec]
- [ ] CHK097 Is there a checklist completion percentage for this document? [Governance, this checklist]
- [ ] CHK098 Are all reviewers identified (who approves Gate 1, Gate 2, Gate 3)? [Gap, quickstart.md]
- [ ] CHK099 Is the approval timeline documented (expected dates for gates)? [Gap, quickstart.md]
- [ ] CHK100 Has the specification been tested against constitution.md principles? [Completeness, plan.md §Constitution Check]

---

## Notes

- Mark items `[x]` only after review confirms the requirement-quality criterion is satisfied
- Leave items unchecked when they require clarification, correction, or reviewer evaluation
- Use annotations for finding details (e.g., "CHK011: 'documentation-only' is clear in Spec §Input and plan.md §Project Type")
- Link to relevant resources inline (e.g., "See research.md §Decision 1 for options")
- Items are numbered sequentially (CHK001–CHK100) for easy reference
- `/speckit.implement` reads checklist checkbox state as a gate and must not modify markers
- `checklists/requirements.md` has a separate built-in lifecycle maintained by `/speckit.specify` and `/speckit.clarify`

**Reviewer Guidance**:
- This is a **requirements quality** checklist—evaluating whether requirements are well-written, complete, and measurable
- NOT an implementation checklist (don't test if code works, just if requirements are clear)
- Every `[x]` should mean: "The requirement is documented, specific, and ready for implementation"
- Every `[ ]` should mean: "The requirement needs clarification, completion, or verification"

---

**Version**: 1.0.0 | **Type**: Specification Quality | **Audience**: Peer Review | **Created**: 2026-11-09
