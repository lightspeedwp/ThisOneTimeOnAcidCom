# Storybook stage one

This is a private, isolated catalogue for the approved first stage of the book-site review. It documents existing behaviour for foundations, Accordion, ChapterNav and ThemeToggleES5 only.

## Run locally

```bash
npm run storybook
npm run storybook:build
```

The static output is `.storybook-static/`, not the application `dist/` directory. Storybook uses its own React–Vite configuration in `.storybook/`; it does not mount the application entry, router, `RootLayout`, Sentry or Netlify configuration.

## Review matrix

Review every story in light and dark modes at the `narrow` (375px) and `wide` (1280px) viewports. The a11y panel is a finding aid, not accessibility certification.

- Foundations: computed values come from the production CSS entry; `.btn` examples are existing patterns. Font loading remains an unresolved limitation.
- Accordion: closed, open, multiple-open and long-content states; check activation, arrow navigation, Home/End, expanded semantics and collapsed focus boundaries.
- ChapterNav: empty, active, no-active and overflowing labels; callback examples are isolated from routing.
- ThemeToggleES5: initial light, initial dark and switching; check the `dark` class, `data-theme` and `localStorage.theme` state.

Do not add unpublished manuscript content, asset-dependent fixtures, new design tokens, application routes or preview overrides that hide production CSS behaviour.

## Handoff record

- Reviewed source: `e971ff39daf71c25224d2746d71817349dd0dfe2` (`origin/develop` on 11 November 2026).
- Runtime: Node `24.19.0`, npm `11.9.0`.
- Catalogue dependencies: Storybook `10.6.7`, `@storybook/react-vite` `10.6.7`, `@storybook/addon-a11y` `10.6.7`, Vite `8.3.4`.
- Verification: `npm run storybook:build` passed; `npm run storybook -- --ci` started successfully on port 6006. The generated output is ignored and remains outside `dist/`.
- Browser verification: system Chromium (`/usr/bin/chromium`) passed 26 story/viewport loads across 375px and 1280px, plus Accordion keyboard, ChapterNav active/overflow, ThemeToggle storage/document-state and Foundations fixture assertions.
- Application tooling proposal applied: `@vitejs/plugin-react@6.2.1` with Vite `8.3.4`; its additional transform peers remain optional. The application regression used the temporary Sentry-disabled config and private `.cache/style-verification/application-regression` output.
- No deployment, Sentry upload, router mount, protected guideline edit or theme-toggle stylesheet rename was performed.
