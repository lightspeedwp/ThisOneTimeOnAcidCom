# Manual Archive Instructions - March 12, 2026

**Created:** March 12, 2026  
**Purpose:** Instructions for manually archiving task lists and deleting old reports  
**Note:** AI tools can only delete individual files, not directories. Use terminal/file manager for folder operations.

---

## 🚀 Quick Command Reference

### Option 1: Using Terminal (Recommended)

```bash
# Navigate to project root
cd /path/to/nova-news

# ============================================================================
# STEP 1: Archive Completed Task Lists
# ============================================================================

mv tasks/dark-mode-emergency-fixes.md tasks/archived/
mv tasks/dark-mode-implementation-checklist.md tasks/archived/
mv tasks/light-mode-deployment-checklist.md tasks/archived/
mv tasks/dev-tools-optimization-tasks.md tasks/archived/
mv tasks/CRITICAL-dark-mode-contrast-fixes.md tasks/archived/

# ============================================================================
# STEP 2: Archive Completed Reports
# ============================================================================

mv reports/alternating-sections-fix reports/archived/
mv reports/book-dark-mode-final-fix reports/archived/
mv reports/contrast-audit reports/archived/
mv reports/dark-mode-audit reports/archived/
mv reports/dark-mode-color-fix reports/archived/
mv reports/dark-mode-contrast-audit reports/archived/
mv reports/flawless-dark-mode reports/archived/
mv reports/light-gray-fix reports/archived/
mv reports/sitemap-dark-mode-update reports/archived/
mv reports/theme-styling-audit reports/archived/
mv reports/theme-toggle-rewire reports/archived/
mv reports/dev-tools-optimization reports/archived/

# ============================================================================
# STEP 3: Delete Old Archived Reports (>7 days)
# ============================================================================

rm -rf reports/archived/feature-work
rm -rf reports/archived/memory-reduction-v2
rm -rf reports/archived/music-page-creation
rm -rf reports/archived/production-launch-prep

# ============================================================================
# Verification
# ============================================================================

echo "✅ Archive complete!"
echo ""
echo "📋 Archived task lists:"
ls -1 tasks/archived/

echo ""
echo "📊 Archived reports:"
ls -1 reports/archived/

echo ""
echo "✅ Done! Now update /tasks/master-task-list.md"
```

---

## Option 2: Manual File Manager

### Step 1: Archive Task Lists

**Move these files** from `/tasks/` to `/tasks/archived/`:

1. ✅ `dark-mode-emergency-fixes.md`
2. ✅ `dark-mode-implementation-checklist.md`
3. ✅ `light-mode-deployment-checklist.md`
4. ✅ `dev-tools-optimization-tasks.md`
5. ✅ `CRITICAL-dark-mode-contrast-fixes.md`

### Step 2: Archive Reports

**Move these folders** from `/reports/` to `/reports/archived/`:

1. ✅ `alternating-sections-fix/`
2. ✅ `book-dark-mode-final-fix/`
3. ✅ `contrast-audit/`
4. ✅ `dark-mode-audit/`
5. ✅ `dark-mode-color-fix/`
6. ✅ `dark-mode-contrast-audit/`
7. ✅ `flawless-dark-mode/`
8. ✅ `light-gray-fix/`
9. ✅ `sitemap-dark-mode-update/`
10. ✅ `theme-styling-audit/`
11. ✅ `theme-toggle-rewire/`
12. ✅ `dev-tools-optimization/`

### Step 3: Delete Old Archived Reports

**Delete these folders** from `/reports/archived/` (archived >7 days ago):

1. ✅ `feature-work/`
2. ✅ `memory-reduction-v2/`
3. ✅ `music-page-creation/`
4. ✅ `production-launch-prep/`

---

## ✅ Final Verification Checklist

After completing the moves/deletes:

- [ ] Verify `/tasks/archived/` contains 10 files (5 new + 5 existing)
- [ ] Verify `/tasks/` only contains 10 active task lists
- [ ] Verify `/reports/archived/` contains 12 new folders
- [ ] Verify `/reports/` contains only 7 active report folders
- [ ] Update `/tasks/master-task-list.md` (see next section)

---

## 📝 Update Master Task List

After archiving, edit `/tasks/master-task-list.md`:

### Move These Entries to "Archived" Section

```markdown
## Archived (files in `/tasks/archived/`)

| Task list | Created | Completed | Archived | Notes |
|---|---|---|---|---|
| [dark-mode-emergency-fixes.md](./archived/dark-mode-emergency-fixes.md) | Mar 12, 2026 | Mar 12, 2026 | Mar 12, 2026 | 2 critical dark mode bugs fixed (blog polaroid + portfolio icon wrapper). Full scan showed 96% components already correct. |
| [dark-mode-implementation-checklist.md](./archived/dark-mode-implementation-checklist.md) | Mar 11, 2026 | Mar 12, 2026 | Mar 12, 2026 | Deployment checklist for dark mode v2.0.0 (54 components, 2,047 lines CSS). All critical bugs resolved. |
| [light-mode-deployment-checklist.md](./archived/light-mode-deployment-checklist.md) | Mar 11, 2026 | Mar 11, 2026 | Mar 12, 2026 | Light mode toggle deployed with WCAG AAA compliance. Ebook contrast enhanced (3.2:1 → 9.5:1 dark, 16.1:1 light). |
| [dev-tools-optimization-tasks.md](./archived/dev-tools-optimization-tasks.md) | Mar 8, 2026 | Mar 8, 2026 | Mar 12, 2026 | Schema.org integration in DetailTemplatePage complete. JSON-LD debugger added. |
| [CRITICAL-dark-mode-contrast-fixes.md](./archived/CRITICAL-dark-mode-contrast-fixes.md) | Mar 11, 2026 | Mar 11, 2026 | Mar 12, 2026 | Root cause fixed: ThemeProvider defaulting to dark. 35 contrast fixes applied. Production ready. |
```

### Remove From "Completed (pending archive)" Section

Delete these 5 entries that are now archived.

### Update "Remaining Active Reports" Section

Remove these 12 reports (now archived):
- `/reports/alternating-sections-fix/`
- `/reports/book-dark-mode-final-fix/`
- `/reports/contrast-audit/`
- `/reports/dark-mode-audit/`
- `/reports/dark-mode-color-fix/`
- `/reports/dark-mode-contrast-audit/`
- `/reports/flawless-dark-mode/`
- `/reports/light-gray-fix/`
- `/reports/sitemap-dark-mode-update/`
- `/reports/theme-styling-audit/`
- `/reports/theme-toggle-rewire/`
- `/reports/dev-tools-optimization/`

---

## 📊 Expected Final State

### `/tasks/` Directory (10 files)
```
animation-movement-tasks.md
animation-phase-1-deployment-checklist.md
book-website-tasks.md
design-system-expansion-tasks.md
ebook-audit-tasks.md
feature-work-expansion-tasks.md
master-task-list.md
modern-react-migration-tasks.md
REALISTIC-dark-mode-fix-plan.md (NOT COMPLETE - DO NOT ARCHIVE)
task-list.md
```

### `/tasks/archived/` Directory (10 files)
```
CRITICAL-dark-mode-contrast-fixes.md (NEW)
dark-mode-emergency-fixes.md (NEW)
dark-mode-implementation-checklist.md (NEW)
dev-tools-optimization-tasks.md (NEW)
hero-architecture-immediate-actions.md
light-mode-deployment-checklist.md (NEW)
memory-reduction-v2-tasks.md
music-page-creation-tasks.md
phosphor-migration-tasks.md
production-launch-prep-tasks.md
```

### `/reports/` Directory (7 folders)
```
2026-03-11-modern-react-migration/
animation-movement-audit/
archived/
book-website/
comprehensive-hero-architecture/
ebook-audit/
feature-work/
site-health-check/
```

### `/reports/archived/` Directory (12 folders + existing)
```
alternating-sections-fix/ (NEW)
book-dark-mode-final-fix/ (NEW)
contrast-audit/ (NEW)
dark-mode-audit/ (NEW)
dark-mode-color-fix/ (NEW)
dark-mode-contrast-audit/ (NEW)
dev-tools-optimization/ (NEW)
flawless-dark-mode/ (NEW)
light-gray-fix/ (NEW)
sitemap-dark-mode-update/ (NEW)
theme-styling-audit/ (NEW)
theme-toggle-rewire/ (NEW)
```

---

## 🎯 Next Steps After Archiving

1. ✅ Run git status to review changes
2. ✅ Commit with message: "chore: archive 5 completed task lists and 12 reports (March 12, 2026)"
3. ✅ Update project status docs if needed
4. ✅ Continue with Animation Phase 1 deployment (see `/tasks/animation-phase-1-deployment-checklist.md`)

---

**Created:** March 12, 2026  
**Status:** Ready to execute  
**Estimated Time:** 5-10 minutes

**Note:** This is a maintenance task following the guidelines in `/guidelines/Guidelines.md` section "Mandatory Folder Conventions".
