# Reports Directory

Central location for audit reports, validation findings, and metrics analysis
from repository governance, audits, and feature implementation.

---

## Organization

Reports are organized by category in subdirectories:

```text
.github/reports/
├── audit/          ← Audits: code review, security, compliance, architecture analysis
├── validation/ ← Validation: specification validation, requirements quality,
test coverage
├── metrics/        ← Metrics: analytics, performance measurements, trend analysis
└── README.md       ← This file

```text

---

## Naming Convention

Report files follow this pattern:

```text
{YYYY-MM-DD}-{topic}.md

```text

**Examples:**

- `2026-10-17-path-inventory.md` — Path analysis report (audit category)
- `2026-10-17-spec-quality-checklist.md` — Requirements quality verification (validation category)
- `2026-10-15-test-coverage-analysis.md` — Test coverage metrics (metrics category)

**Guidelines:**

- Use ISO 8601 date format (YYYY-MM-DD) for chronological sorting
- Use lowercase, hyphens for word separation
- Place file in appropriate category subdirectory
- Include author or team if not obvious from context
- Reference related issues, PRs, or specifications in the report

---

## Report Categories

### `audit/`

Code reviews, security audits, compliance checks, architecture analysis, and
quality assessments.

**Common topics:**

- Security code review
- Architecture assessment
- Test suite audit
- Dependency audit
- Accessibility audit
- Performance audit

### `validation/`

Specification validation, requirements quality checks, test coverage analysis,
and integration validation.

**Common topics:**

- Specification quality checklist
- Requirements validation
- Test coverage report
- Integration test results
- CI/CD validation

### `metrics/`

Analytics, performance measurements, trend analysis, and quantitative metrics.

**Common topics:**

- Test coverage metrics
- Build performance metrics
- Bundle size analysis
- Deployment frequency metrics
- Quality metrics trends

---

## How to Reference Reports

### In PR descriptions or comments

```markdown
See the analysis in `.github/reports/audit/2026-10-17-security-review.md`

```text

### In specifications

```markdown
Findings documented in `.github/reports/validation/2026-10-17-spec-quality.md`

```text

### In task checklists

```markdown

- [x] Validate against audit report: `.github/reports/audit/2026-10-15-architecture-review.md`

```text

---

## Related Files

- **[Specification Catalog](../specs/CATALOG.md)** — Index of all active specifications
- **[Tasks directory](../../tasks/)** — Project task tracking and checklists
- **[Guidelines](../../guidelines/)** — Design and development standards

---

*Last updated: 2026-10-17*
