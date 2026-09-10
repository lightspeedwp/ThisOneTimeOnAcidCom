# 🔍 Bundler Compatibility & WordPress Readiness Audit

This prompt defines the scope and steps for auditing the Ash Shaw Makeup Portfolio codebase for compliance with the strict Figma Make bundler constraints and Headless WordPress migration requirements.

## 🎯 Objectives
1. Identify all instances of forbidden syntax in `.tsx` files (Arrow functions in JSX, destructuring, template literals).
2. Verify that `useBlogPosts` and other content hooks are called with memoized options to prevent flickering.
3. Check for any remaining hardcoded WordPress API URLs that should be abstracted.
4. Ensure all headings and labels follow the sentence case rule.

## 📋 Audit Steps

### Step 1: Syntax Audit
Scan all components in `/components/` for:
- [ ] Arrow functions used as props in JSX (e.g., `onClick={() => ...}`).
- [ ] Destructuring in function signatures or body (e.g., `const { x } = props`).
- [ ] Template literals in JSX (e.g., `className={`grid-${cols}`}`).
- [ ] Optional chaining (`?.`) and nullish coalescing (`??`) in component logic.

### Step 2: Hook Dependency Audit
- [ ] Verify that all calls to `useBlogPosts`, `usePortfolioEntries`, and `usePortfolioSections` use `useMemo` for their options objects.
- [ ] Check `useMockData.ts` and `useWordPress.ts` for stable dependency tracking.

### Step 3: WordPress Readiness
- [ ] Identify hardcoded `WP_API_URL` strings.
- [ ] Ensure `useContent.ts` facade correctly handles the `USE_WORDPRESS` toggle.

### Step 4: Content Standards
- [ ] Audit new Phase 7 content for sentence case compliance in headings.

## 🔗 References
- [Guidelines.md](../guidelines/Guidelines.md)
- [CHANGELOG.md](../CHANGELOG.md)
- [useWordPress.ts](../hooks/useWordPress.ts)
