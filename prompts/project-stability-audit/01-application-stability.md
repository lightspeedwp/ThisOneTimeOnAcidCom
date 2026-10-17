# Sub-audit 1 — Application stability (config + entrypoint)

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/project-stability-audit/01-application-stability.md`

---

## Context

The Figma Make prototype sometimes publishes but renders a blank `#121212` screen. This sub-audit examines every config and entrypoint file to identify silent failures in the build pipeline.

---

## Step 1 — Audit config files

Read each file in full and verify:

### `/vite.config.ts`
- [ ] Tailwind V4 Vite plugin is configured correctly
- [ ] Build target is compatible with Figma Make bundler
- [ ] Resolve aliases (if any) match `tsconfig.json` paths
- [ ] No `import.meta.env` references (forbidden)
- [ ] Chunking/splitting strategy doesn't create files too large for the bundler
- [ ] No deprecated Vite options

### `/postcss.config.js`
- [ ] PostCSS plugins list matches Tailwind V4 requirements
- [ ] No conflicting plugins (e.g., duplicate autoprefixer)
- [ ] Plugin order is correct

### `/package.json`
- [ ] All dependencies referenced in code are listed
- [ ] No version conflicts between peer dependencies
- [ ] Scripts section has correct build/dev commands
- [ ] No deprecated packages that need updating

### `/tsconfig.json` and `/tsconfig.node.json`
- [ ] `compilerOptions.target` is compatible with the bundler
- [ ] `compilerOptions.jsx` is set to `react-jsx`
- [ ] `include` patterns cover all source files
- [ ] `exclude` patterns don't accidentally skip needed files
- [ ] Path aliases (if any) match Vite resolve config
- [ ] `strict` mode is enabled

---

## Step 2 — Audit entrypoint files

### `/index.html`
- [ ] Has `<div id="root"></div>` (or whatever ID `main.tsx` targets)
- [ ] Script tag points to `/main.tsx` (or correct entry)
- [ ] Meta viewport tag is present
- [ ] No inline scripts that could conflict with React hydration

### `/main.tsx`
- [ ] Imports CSS files in correct cascade order (globals.css must come first or include all others)
- [ ] Creates React root with `createRoot(document.getElementById('root'))`
- [ ] Wraps `<App />` in `<React.StrictMode>` (or documents why not)
- [ ] No `import.meta.env` usage
- [ ] Error boundary or fallback for root render failures

### `/App.tsx`
- [ ] Has a `default export` (required by Figma Make)
- [ ] Uses `<RouterProvider router={router} />` pattern
- [ ] Imports router from `/routes.ts`
- [ ] No forbidden syntax (optional chaining, nullish coalescing, etc.)
- [ ] Global context providers are wrapped correctly (ThemeProvider, etc.)

### `/routes.ts`
- [ ] Uses `createBrowserRouter()` from `react-router`
- [ ] Every route's `Component` import resolves to an existing file
- [ ] No circular import chains
- [ ] Catch-all `*` route exists for 404
- [ ] Root layout component wraps all child routes
- [ ] No `import.meta.env` in route definitions

---

## Step 3 — Blank screen diagnosis

Specifically investigate why the `#121212` background appears with no content:

1. [ ] Is `#121212` defined anywhere in CSS? (Check `globals.css`, `theme.css`, body styles)
2. [ ] Could the router fail silently, leaving only the body background?
3. [ ] Are there any uncaught errors in the route component chain?
4. [ ] Does the ErrorBoundary component render visible content, or could it show an empty state?
5. [ ] Could a missing CSS import cause all content to be `display: none` or `opacity: 0`?
6. [ ] Is the root div (`#root`) receiving any children?

---

## Output format

```markdown
## Findings

| File | Issue | Severity | Description |
|---|---|---|---|
| `/vite.config.ts` | ... | Critical/High/Medium/Low | ... |

## Blank screen root cause analysis

1. Most likely cause: ...
2. Contributing factors: ...
3. Recommended fix: ...
```
