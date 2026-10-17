# Sub-audit F — Package Health

**Date:** 2026-09-10
**Prompt:** `src/app/prompts/codebase-consistency-audit/orchestrator.md`

---

## Findings

| ID | Item | Severity | Description |
|---|---|---|---|
| F-01 | `typescript ^6.0.3` | 🟠 High | Unpinned `^` version on TypeScript 6 — a major version jump. TypeScript 6 may have breaking changes. Pin to exact version. |
| F-02 | `@phosphor-icons/react ^2.1.10` | 🟡 Medium | Unpinned `^` version — icon additions between minor versions can cause bundle size creep and unexpected icon names changing. Pin it. |
| F-03 | Duplicate entries in `dependencies` | 🟢 Low | Many packages appear twice: once as `"pkg": "version"` and once as `"pkg@version": "npm:pkg@version"`. This is a pnpm alias deduplication pattern — not a bug, but it inflates the dependency list. |
| F-04 | `react` / `react-dom` in `peerDependencies` only | 🟡 Medium | React 18.3.1 is correctly specified but only as `peerDependencies` with `optional: true`. In some CI environments this may not install React. Verify the build environment always provides React 18. |
| F-05 | `react-router 7.13.0` | ✅ Pass | React Router v7 installed. Confirm no `react-router-dom` duplicate — there is none. |
| F-06 | `motion 12.23.24` | ✅ Pass | Motion (formerly Framer Motion) is current. |
| F-07 | `lucide-react 0.487.0` | 🟡 Medium | **Zero imports found** in any `.tsx`/`.ts` file. Previous audit (phosphor-migration) completed. Safe to remove. |
| F-08 | `vite 6.3.5` | ✅ Pass | Pinned via pnpm override. |
| F-09 | `tailwindcss 4.1.12` | ✅ Pass | Tailwind v4 — correct for this project. |
| F-10 | `react-slick`, `@popperjs/core`, `react-popper` | 🟡 Medium | **Zero imports found** in any source file. These appear unused — candidates for removal. |
| F-11 | `fs`, `path`, `sharp`, `glob` in `dependencies` | 🟡 Medium | Node.js build utilities — should be in `devDependencies`, not `dependencies`. |
| F-12 | `netlify.toml` uses `npm run build` | 🟡 Medium | Project uses pnpm (evidenced by `pnpm.overrides` in `package.json`). Build command should be `pnpm run build` to ensure the correct package manager is invoked in CI. |

## Accepted Exceptions

| Item | Reason |
|---|---|
| Pnpm alias entries (e.g. `"clsx@2.1.1": "npm:clsx@2.1.1"`) | Pnpm deduplication pattern — not a bug |
| `react` / `react-dom` in `peerDependencies` | Documented project pattern |

## Recommended Actions

- **F-01:** Pin `"typescript": "6.0.3"` (remove `^`)
- **F-02:** Pin `"@phosphor-icons/react": "2.1.10"` (remove `^`)
- **F-04/F-07/F-10:** Confirm unused packages and remove: `lucide-react`, `react-slick`, `@popperjs/core`, `react-popper`
- **F-11:** Move `fs`, `path`, `sharp`, `glob` to `devDependencies`
- **F-12:** Update `netlify.toml` build command from `npm run build` → `pnpm run build`
