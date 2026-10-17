# Prompts Directory

AI prompt templates and orchestrators for audits, feature development, and project workflows.

---

## Prompt Organization

Prompts are organized by project phase, feature area, or audit type in subdirectories:

```
prompts/
├── content-expansion-phase7/      ← Content expansion (Phase 7)
├── content-expansion-phase8/      ← Content expansion (Phase 8)
├── content-specimens/             ← Content specimen examples
├── dark-mode-audit/               ← Dark mode and theming audit
├── feature-work/                  ← Feature development and design system
├── modern-react-migration/        ← React best practices migration
├── phosphor-migration/            ← Icon system migration (Lucide → Phosphor)
├── project-stability-audit/       ← Stability and quality audits
├── dev-tools-optimization/        ← Performance and tooling optimization
├── production-launch-prep/        ← Launch readiness and preparation
├── (individual prompts)           ← Single-topic audits and workflows
└── README.md                      ← This file
```

Each subdirectory contains:
- **`orchestrator.md`** — Main prompt that coordinates subtasks
- **Sub-prompts** — Individual audit or feature prompts (e.g., `01-timeline-expansion.md`)

---

## Classification: Portable vs. Repository-Specific

### Repository-Specific Prompts (This Directory)

**Current prompts in `prompts/` are all repository-specific** — they reference this project's structure, components, content, and feature phases.

**Examples:**
- `content-expansion-phase8/` — Ash Shaw portfolio content development
- `feature-work/` — Portfolio site features (timeline, gear expansion, about subpages)
- `project-stability-audit/` — ThisOneTimeOnAcidCom stability and quality checks
- `phosphor-migration/` — Icon migration for this project's design system

### Portable Prompts (Future `.github/prompts/`)

When this repository produces **reusable prompt templates** that apply to multiple projects or teams, those will be moved to `.github/prompts/` and documented in the `.github/` repository. Examples might include:

- Generic AI audit orchestrators (code quality, security, accessibility)
- Reusable feature breakdown templates
- Cross-project design system migration guides
- AI-driven test generation patterns

---

## Using Prompts

### Single Audit or Feature

For a standalone audit or feature prompt:

```bash
# Example: Run the spacing standardization audit
# Copy the prompt: prompts/spacing-standardization-audit.md
# Paste into Claude and run
```

### Multi-Phase Workflows

For orchestrated workflows with sub-prompts:

```bash
# Example: Run Phase 8 content expansion
# 1. Start with the orchestrator: prompts/content-expansion-phase8/orchestrator.md
# 2. It will guide you through individual prompts like:
#    - 01-faq-overhaul.md
#    - 02-blog-expansion.md
#    - ...
```

---

## Prompt Lifecycle

1. **Active prompts** live in `prompts/` organized by phase or topic
2. **Completed audits** are summarized in `.github/reports/{category}/`
3. **Reusable patterns** are extracted to `.github/prompts/` for org-wide use
4. **Archive** prompts only after findings are implemented and validated

---

## Related Files

- **[Reports Directory](.github/reports/)** — Findings from completed audits
- **[Tasks Directory](./tasks/)** — Action items extracted from prompts
- **[Specifications](../.github/specs/)** — Formal feature specifications
- **[Guidelines](./guidelines/)** — Design system and coding standards

---

## Notes for Contributors

- **Orchestrator pattern:** Use `orchestrator.md` to coordinate multi-step workflows
- **Naming:** Use descriptive kebab-case filenames (e.g., `01-faq-overhaul.md`)
- **Subdirectories:** Group related prompts by phase or feature
- **Keep it clean:** Archive or delete prompts after their audit is complete
- **Reference:** Link prompts from specifications and task lists

---

*Last updated: 2026-10-17*
*All prompts in this directory are repository-specific (portfolio project work).*
