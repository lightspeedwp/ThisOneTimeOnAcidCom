# 🤖 Prompt: Bundler Compatibility Final Verification Audit

## 🎯 Objective
Verify that the codebase is 100% compliant with the Figma Make bundler constraints following the v8.2.1 stability refactor. Ensure no arrow functions, destructuring, or template literals exist in JSX or core hooks, and that all hook options are memoized to prevent flickering.

## 🛠️ Scope
- `hooks/useContent.ts` (Unified facade)
- `components/pages/portfolio/PortfolioMainPage.tsx` (IIFE checks)
- `hooks/useWordPress.ts` (API URL and response handling)
- `components/sections/BlogPreviewSection.tsx` (Secondary check)

## 📋 Steps
1. **Scan `hooks/useContent.ts`** for arrow functions in `useEffect` and `setTimeout`, and destructuring in the mock simulation logic.
2. **Scan `PortfolioMainPage.tsx`** for IIFE arrow functions and `let` usage in loops.
3. **Verify `useWordPress.ts`** for the placeholder API URL and any remaining modern syntax.
4. **Cross-reference findings** against the v8.2.1 changelog claims.

## 📚 References
- [Guidelines.md](../Guidelines.md) (Bundler Compatibility Rules)
- [CHANGELOG.md](../CHANGELOG.md) (v8.2.1 claims)
- [audit-report-march-3-2026.md](../reports/bundler-compatibility/audit-report-march-3-2026.md) (Previous findings)

## 📤 Output
- A report in `/reports/bundler-compatibility/verification-report-v8.2.1.md`
- Updates to the master task list in `/tasks/task-list.md`
