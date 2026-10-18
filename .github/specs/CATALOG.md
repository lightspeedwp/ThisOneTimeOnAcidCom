# Specification Catalog

Complete index of all active and archived specifications for ThisOneTimeOnAcidCom repository governance and feature development.

---

## Active Specifications

| ID | Feature | Title | Status | Owner | Created | Updated | Link |
|---|---|---|---|---|---|---|---|
| 001 | repo-governance-toa-241 | Repository Governance, Layout and Agentic Workflows | Implementation | @ashley | 2026-10-17 | 2026-10-17 | [.github/specs/001-repo-governance-layout-and-agentic-workflows/](./001-repo-governance-layout-and-agentic-workflows/) |
| 002 | media-library | TOA Media Library Strategy and Asset Recovery | Draft | @ashley | 2026-10-17 | 2026-10-18 | [.github/specs/002-media-library/](./002-media-library/) |

---

## Specification Template

Each specification lives in `.github/specs/{NNN-feature-slug}/` with this structure:

```
.github/specs/{NNN-feature-slug}/
├── spec.md               ← Requirements, user stories, acceptance criteria
├── plan.md               ← Technical design, architecture, technology choices
├── research.md           ← Investigation, decisions, rationale
├── tasks.md              ← Actionable task breakdown for implementation
├── checklists/           ← Quality gates and verification requirements
│   ├── requirements.md   ← Specification completeness checklist
│   ├── integration.md    ← Cross-domain consistency checks
│   └── {custom}.md       ← (Optional) reviewer-defined quality checklists
├── contracts/            ← (Optional) API specs, interfaces, test contracts
├── data-model.md         ← (Optional) Entity definitions and relationships
└── quickstart.md         ← (Optional) Integration scenarios and setup guide
```

**Numbering:** Specifications are numbered sequentially (001, 002, 003…) in the order they are created. The next new specification will be 002.

---

## How to Use This Catalog

### Find a Specification

1. **Browse the Active Specifications table** above to find by feature name, status, or owner
2. **Click the link** in the rightmost column to open the specification directory
3. **Start with `spec.md`** — it defines requirements and acceptance criteria

### Create a New Specification

Run the Spec Kit workflow in Claude Code:

```
/speckit-specify
```

This will:
1. Create a new numbered directory (`.github/specs/{NNN-new-feature}/`)
2. Generate `spec.md` with your requirements
3. Output the path and next steps

Then continue with `/speckit-clarify`, `/speckit-plan`, and `/speckit-tasks` as needed.

### Archive a Specification

When a specification is complete and delivered (merged to main), move its directory to `.github/specs/archive/{NNN-feature-slug}/` and update this catalog, moving the row to an "Archived Specifications" section below.

---

## Related Documentation

- **[Maintenance Procedures](./.github/specs/MAINTENANCE.md)** — How to create, update, and archive specifications
- **[Repository Governance](./.github/CLAUDE.md)** — Branch naming, PR workflow, specification-driven development
- **[Contributing Guide](./CONTRIBUTING.md)** — Contributor workflow and guidelines

---

*Last updated: 2026-10-18*
*Next specification number: 003*
