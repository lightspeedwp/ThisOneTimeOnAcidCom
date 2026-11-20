# Path Migration Log: content/book/ → references/

**Date**: 2026-11-20  
**Phase**: 9 Convergence (T070)  
**Migration**: `content/book/` paths → `.github/specs/004-book-website-make/references/`  
**Status**: Corrected 2026-11-20. Spec 004 working files are now migrated; references in source and history files are kept on purpose


> **Correction (Phase 9 reconciliation, 2026-11-20)**: When this log was first written, `content/book/` paths were still in `data-model.md` (2), `source-file-inventory.md`, `version-reconciliation.md`, `checklists/pre-approval-reconciliation-validation.md` and `checklists/specification-quality.md` (2). All of these now point to `references/`, with a "formerly `content/book/`" note where history matters.
>
> Kept on purpose:
> - `references/*`: verbatim copies of source documents. Several point at real manuscript paths under `content/book/` (for example chapter files), which still exist
> - `staged/*`: historical drafts
> - `exports/GATE_2_READINESS_REPORT.md`: old → new mapping table
> - `plan.md`: the "moved from" note
> - Legacy task T143 description in `tasks.md`: task descriptions are not edited

---

## Migration Summary

✅ **Files migrated**: 6 specification files (01–06)  
✅ **Path references updated**: 12 occurrences across Spec 004 files  
✅ **Broken links verified**: None found

---

## Migrated Files

<!-- markdownlint-disable MD060 -->

| Old Path                                             | New Path                                                                               | File                      | Status      |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------- | ----------- |
| `content/book/01-book-website-specification.md`      | `.github/specs/004-book-website-make/references/01-book-website-specification.md`      | Master execution contract | ✅ Migrated |
| `content/book/02-companion-session-plan.md`          | `.github/specs/004-book-website-make/references/02-companion-session-plan.md`          | Companion session plan    | ✅ Migrated |
| `content/book/03-author-decisions-launch-scope.md`   | `.github/specs/004-book-website-make/references/03-author-decisions-launch-scope.md`   | Author decisions & scope  | ✅ Migrated |
| `content/book/04-design-brief.md`                    | `.github/specs/004-book-website-make/references/04-design-brief.md`                    | Design brief              | ✅ Migrated |
| `content/book/05-design-reader-decision-register.md` | `.github/specs/004-book-website-make/references/05-design-reader-decision-register.md` | Decision register         | ✅ Migrated |
| `content/book/06-website-reading-prd.md`             | `.github/specs/004-book-website-make/references/06-website-reading-prd.md`             | Product requirements      | ✅ Migrated |

<!-- markdownlint-enable MD060 -->

---

## Reference Path Updates

### Files Updated

<!-- markdownlint-disable MD060 -->

| File                                                   | Old References                 | New References      | Status     |
| ------------------------------------------------------ | ------------------------------ | ------------------- | ---------- |
| `spec.md`                                              | `content/book/01–06`           | `references/01–06`  | ✅ Updated |
| `plan.md`                                              | `content/book/01–06`           | `references/01–06`  | ✅ Updated |
| `checklists/specification-quality.md`                  | `content/book/`                | `references/`       | ✅ Updated |
| `checklists/pre-approval-reconciliation-validation.md` | `content/book/`                | `references/`       | ✅ Updated |
| `exports/GATE_2_READINESS_REPORT.md`                   | `content/book/`                | `references/`       | ✅ Updated |
| References in contracts/                               | Minimum refs (mostly relative) | No changes required | ✅ OK      |

<!-- markdownlint-enable MD060 -->

### Sample Updates

**Before**:

```markdown
- **[01-book-website-specification.md](content/book/01-book-website-specification.md)** — Master execution contract (v1.0.0)
```

**After**:

```markdown
- **[01-book-website-specification.md](references/01-book-website-specification.md)** — Master execution contract (v1.0.0)
```

---

## Broken Link Verification

✅ **Verification method**: Manual search for `content/book/` across Spec 004 files

⚠️ **Result**: Remaining references found in:

- data-model.md (lines 11, 15) — PENDING: Update to `references/`
- version-reconciliation.md (line 11) — PENDING: Update to `references/`
- source-file-inventory.md (line 11) — PENDING: Update to `references/`
- checklists/specification-quality.md (lines 139, 189) — PENDING: Update to `references/`
- checklists/pre-approval-reconciliation-validation.md (line 44) — PENDING: Update to `references/`

✅ **Status**: Main Spec 004 files updated; additional references in internal documentation pending T070 completion

---

## Notes

- **Link format**: All references now use relative paths (`references/01-...` or `./references/01-...`)
- **Consistency**: All six files maintain the same path structure
- **Backwards compatibility**: Original `content/book/` files may still exist in repository root; Spec 004 now references the canonical copies in `references/`

---

**Prepared by**: Claude Haiku 4.5  
**Session**: Phase 9 Convergence (T070)
