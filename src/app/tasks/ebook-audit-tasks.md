# Ebook Audit Tasks

These tasks address the gaps identified during the Ebook Reader audit detailed in `/reports/ebook-audit/findings.md`.

- [x] **Document the Ebook Components**: Create `/guidelines/components/EbookPage.md` to document the architecture, props, swipe logic, spread layout logic, and responsive behaviors of the ebook reader components.
- [x] **Document Settings & Preferences**: Add documentation for `/utils/ebookPreferences.ts` covering how user configurations (font scaling, themes) are stored and applied.
- [x] **Review Ebook CSS Architecture**: Verify that the split CSS files (`ebook-base.css`, `ebook-drawer.css`, etc.) fully comply with the BEM naming conventions as stated in `Guidelines.md`, and document these specific BEM blocks in the new component guideline.
- [x] **Accessibility Verification**: The ebook reader has a lot of custom keyboard navigation and ARIA labeling. Run a quick check to verify that all these implementations still meet the WCAG 2.1 AA requirements mapped in `accessibility-report-feb-2025.md`.
- [x] **Update Master Task List**: Ensure this task list is tracked in `/tasks/master-task-list.md`.