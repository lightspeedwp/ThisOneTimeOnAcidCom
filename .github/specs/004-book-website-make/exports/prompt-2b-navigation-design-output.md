# Prompt 2B Output: Navigation Design

**Date**: 2026-11-20
**Execution model**: SC-004 (Claude direct execution)
**Contract**: [`contracts/prompt-2b-navigation-design.md`](../contracts/prompt-2b-navigation-design.md)
**Inputs**: [Prompt 1 output](./prompt-1-navigation-exposure-output.md) (8 items), [design tokens v2.0.0](./design-tokens.css)
**Executable spec**: [`navigation-component.types.ts`](./navigation-component.types.ts)
**Status**: ✅ Delivered and validated. ⏳ Repository implementation not authorised by this output.

---

## 1. Menu recovery strategy

**Current state.** `src/app/components/common/Header.tsx` has no inline navigation. Every width shows a `[ ≡ ] Menu` button that opens one full-screen overlay containing all links. Desktop visitors need two actions to reach any page.

**Recovered design (hybrid responsive + stateful).**

| Breakpoint | Width      | Pattern                                                              | State                           |
| ---------- | ---------- | -------------------------------------------------------------------- | ------------------------------- |
| Desktop    | ≥1024px    | Inline link row in the header                                        | Stateless                       |
| Tablet     | 768–1023px | Inline link row below the logo bar; wraps to a second line if needed | Stateless                       |
| Mobile     | <768px     | Toggle button + side drawer with backdrop                            | `drawerReducer` (closed ⇄ open) |

Only mobile carries open/closed state, so most of the header becomes simple CSS layout. The state machine is small and pure, so it can be unit-tested without a browser.

### Conflicts (⚠️)

| ID       | Conflict                                                                                            | Resolution                                                                                                                        |
| -------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| ⚠️ C2B-1 | The contract assumes 4 links (Home, About, Book, Contact).                                          | Use the 8 links from Prompt 1 (see Prompt 1 ⚠️ C1-2). The component is data-driven, so a later cut to 4 needs only a data change. |
| ⚠️ C2B-2 | The contract SCSS sample uses `max-width: 768px`, which overlaps the tablet range at exactly 768px. | Use `max-width: 767.98px` for mobile and `min-width: 768px` for tablet.                                                           |
| ⚠️ C2B-3 | The contract asks for a 3-line hamburger icon. The live header uses the visible text `[ ≡ ] Menu`.  | Keep the visible text label: it matches the brand's bracket style and is clearer than an icon alone.                              |
| ⚠️ C2B-4 | Pink link text is 2.91:1 on the light theme's cream (fails AA).                                     | Light hover/active keep dark text; state is shown with the pink underline and weight (Prompt 2A §3).                              |

---

## 2. Component interface

Full definitions live in [`navigation-component.types.ts`](./navigation-component.types.ts). Summary:

```typescript
interface NavItem {
  readonly label: string; // exact text from bookSiteData.nav
  readonly href: string; // registered route
}

interface NavigationProps {
  readonly currentPath: string;
  readonly items?: readonly NavItem[]; // default: PRIMARY_NAV_ITEMS (8)
  readonly ariaLabel?: string; // default: 'Main navigation'
  readonly onNavigate?: (href: string) => void;
}

type DrawerEvent =
  | { type: "TOGGLE" }
  | { type: "ESCAPE" }
  | { type: "BACKDROP_CLICK" }
  | { type: "LINK_ACTIVATED" }
  | { type: "ROUTE_CHANGED" }
  | { type: "BREAKPOINT_CHANGED"; breakpoint: Breakpoint };

function drawerReducer(state: DrawerState, event: DrawerEvent): DrawerState;
function resolveActiveHref(
  pathname: string,
  items?: readonly NavItem[],
): string | null;
```

The contract's `isActive` and `isHidden` fields on `NavItem` were dropped on purpose:

- **Active** is derived from the path by `resolveActiveHref`. Storing it on the item lets it go stale.
- **Hidden** routes are never passed to the component. `assertNoHiddenRoutes` guards this in tests and dev builds.

### Active-link rules (`resolveActiveHref`)

| Path                       | Active item    | Why                                                                      |
| -------------------------- | -------------- | ------------------------------------------------------------------------ |
| `/`                        | Home           | Exact match only for `/`                                                 |
| `/journal/my-post`         | Journal        | Whole-segment prefix                                                     |
| `/journalism`              | none           | Not a whole segment (the current `startsWith` logic would wrongly match) |
| `/read-the-book`           | Read the Draft | Registered alias for the same page                                       |
| `/the-book/?ref=x`         | The Book       | Query and trailing slash ignored                                         |
| `/media`, `/events/launch` | none           | Hidden routes never highlight an item                                    |

---

## 3. State and variant matrix

Colours are token names from `design-tokens.css`. Dark values are approved; light values are pending (Prompt 2A §4).

| Breakpoint | State                 | Visual treatment                                                                                              | Dark                            | Light (⚠️ pending)              |
| ---------- | --------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------- |
| All        | Default               | Inter 500, 16px; no underline                                                                                 | Cream `#F6F2EB`                 | Deepest `#0B0B10`               |
| All        | Hover                 | Colour change **and** 2px underline, 6px offset                                                               | Pink text + pink underline      | Dark text + pink underline      |
| All        | Focus-visible         | 2px outline, 3px offset (in addition to hover styles)                                                         | Pink ring                       | Deepest ring                    |
| All        | Active (current page) | Weight 600 + 2px underline + `aria-current="page"`                                                            | Pink text + pink underline      | Dark text + pink underline      |
| Desktop    | Layout                | Single row, 24px gap, right of logo                                                                           | —                               | —                               |
| Tablet     | Layout                | Row below logo bar, 16px gap, may wrap                                                                        | —                               | —                               |
| Mobile     | Closed                | Toggle `[ ≡ ] Menu`, `aria-expanded="false"`                                                                  | —                               | —                               |
| Mobile     | Open                  | Drawer from the right, 80vw (max 320px); backdrop; links stacked; toggle `[ X ] Menu`, `aria-expanded="true"` | Surface `#0B0B10`, backdrop 70% | Surface `#F6F2EB`, backdrop 50% |
| Mobile     | Link in drawer        | Full-width row, min-height 44px, same hover/focus/active rules                                                | —                               | —                               |

Every state change is visible **without colour**: hover adds an underline, active adds weight and an underline, focus adds an outline. This meets CR-2B.2 and the design register's hover-emphasis rule.

---

## 4. CSS structure

Uses the unsuffixed aliases from `design-tokens.css`, so theme switching needs no extra rules.

```css
.nav__list {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: var(--font-ui);
  font-size: var(--font-ui-size-16);
  font-weight: var(--font-ui-weight-500);
}

.nav__link {
  color: var(--nav-link-color);
  text-decoration: none;
  text-underline-offset: var(--nav-underline-offset);
  text-decoration-thickness: var(--nav-underline-thickness);
  transition:
    color var(--nav-transition),
    text-decoration-color var(--nav-transition);
}

.nav__link:hover {
  color: var(--nav-link-color-hover);
  text-decoration-line: underline;
  text-decoration-color: var(--nav-underline-active);
}

.nav__link:focus-visible {
  outline: var(--nav-focus-ring-width) solid var(--nav-focus-ring);
  outline-offset: var(--nav-focus-ring-offset);
}

.nav__link[aria-current="page"] {
  color: var(--nav-link-color-active);
  font-weight: var(--font-ui-weight-600);
  text-decoration-line: underline;
  text-decoration-color: var(--nav-underline-active);
}

/* Tablet: row below the logo bar, may wrap */
@media (min-width: 768px) and (max-width: 1023.98px) {
  .nav__list {
    flex-wrap: wrap;
    gap: 8px 16px;
  }
}

/* Inline nav from tablet up; drawer pieces hidden */
@media (min-width: 768px) {
  .nav__toggle,
  .nav__backdrop {
    display: none;
  }
}

/* Mobile: drawer */
@media (max-width: 767.98px) {
  .nav__drawer {
    position: fixed;
    inset: 0 0 0 auto;
    width: min(80vw, 320px);
    background: var(--nav-surface);
    transform: translateX(100%);
    transition: transform 250ms ease;
  }
  .nav__drawer[data-state="open"] {
    transform: translateX(0);
  }
  .nav__drawer[data-state="closed"] {
    visibility: hidden;
  } /* removes links from tab order */
  .nav__backdrop {
    position: fixed;
    inset: 0;
    background: var(--nav-overlay-bg);
  }
  .nav__list {
    flex-direction: column;
    gap: 0;
  }
  .nav__link {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 0 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav__drawer,
  .nav__link {
    transition: none;
  }
}
```

`visibility: hidden` on the **closed drawer** is correct: it removes the links from the accessibility tree and tab order. Hidden _routes_ are different: they are never rendered at all.

---

## 5. Behaviour wiring

The component dispatches `DrawerEvent`s and acts on the resulting `focusTarget`.

| Trigger                                   | Event                | Result                                           |
| ----------------------------------------- | -------------------- | ------------------------------------------------ |
| Toggle click / Enter / Space              | `TOGGLE`             | Open → focus first link; or close → focus toggle |
| Escape key while open                     | `ESCAPE`             | Close → focus toggle                             |
| Backdrop click                            | `BACKDROP_CLICK`     | Close → focus toggle                             |
| Link click                                | `LINK_ACTIVATED`     | Close; RootLayout moves focus to `#main-content` |
| Router path change                        | `ROUTE_CHANGED`      | Close (covers back/forward)                      |
| `matchMedia('(min-width: 768px)')` change | `BREAKPOINT_CHANGED` | Close if the layout leaves mobile                |

While the drawer is open:

- Set `inert` on `#main-content` and the footer, so Tab stays inside the header and drawer.
- Lock page scroll (`overflow: hidden` on `<html>`), restoring it on close.
- The backdrop is `aria-hidden="true"` and is not focusable.

---

## 6. Accessibility checklist (WCAG 2.2 AA)

- [x] One `<nav aria-label="Main navigation">` landmark wraps the list for every breakpoint (no duplicate nav for desktop and mobile)
- [x] Link text is descriptive and unchanged from the current labels
- [x] Hover, active and focus each have a non-colour cue (1.4.1)
- [x] Dark link text 17.59:1; pink hover/active 6.05:1 (1.4.3)
- [x] Focus ring 6.05:1 dark; deepest ring on cream 17.59:1 light (1.4.11, 2.4.7)
- [x] Focus is not hidden by the drawer or sticky header (2.4.11): drawer moves focus inside itself
- [x] `aria-current="page"` on the active link
- [x] Toggle exposes `aria-expanded`, `aria-controls="mobile-menu"` and a state-specific `aria-label` (`toggleAria`)
- [x] Escape closes and returns focus to the toggle; Tab is contained while open (`inert`)
- [x] Drawer links and toggle are at least 44×44px (exceeds 2.5.8's 24px minimum)
- [x] Backdrop `aria-hidden="true"`
- [x] Hidden routes are not rendered (not merely visually hidden)
- [x] Reduced-motion preference removes slide and colour transitions

---

## 7. Implementation notes

- **Source data**: keep reading `bookSiteData.nav`. `PRIMARY_NAV_ITEMS` in the spec file mirrors it for tests only.
- **Do not reuse** `src/app/data/mock/ui/navigation.ts` or `ui/sitemap.ts` (WP-02: legacy sources).
- **Existing pieces to keep**: theme toggle, cursor-effects toggle, social links in the drawer, the stretchy logo.
- **Replace** `isCurrentPage` in `Header.tsx` with `resolveActiveHref` (fixes the `/journalism` prefix bug and the `/read-the-book` alias).
- **Tests to add when implemented**: port the 22 assertions used to validate this spec (§8) into Vitest; add a Playwright check for Escape, focus return and Tab containment at 375px, plus inline links visible at 1024px and 1280px.

---

## 8. Acceptance criteria

| ID      | Criterion                                                        | Result                  | Evidence                                      |
| ------- | ---------------------------------------------------------------- | ----------------------- | --------------------------------------------- |
| CR-2B.1 | Only approved visible items                                      | ✅ Pass (with ⚠️ C2B-1) | 8 items from Prompt 1; `assertNoHiddenRoutes` |
| CR-2B.2 | Default, hover, active styled; hover underlined; not colour-only | ✅ Pass                 | §3 matrix, §4 CSS                             |
| CR-2B.3 | Horizontal desktop, hamburger/drawer mobile                      | ✅ Pass                 | §1 table; inline ≥768px, drawer <768px        |
| CR-2B.4 | Inter for navigation links                                       | ✅ Pass                 | `--font-ui` (Inter) 16px, weights 500/600     |
| CR-2B.5 | Mobile drawer overlay and interaction documented                 | ✅ Pass                 | §4, §5, `drawerReducer`                       |
| CR-2B.6 | Breakpoints 1024px and 768px specified                           | ✅ Pass                 | `BREAKPOINTS`; §4 media queries (⚠️ C2B-2)    |

### Validation run

- `npx tsc --noEmit --strict --target es2019 navigation-component.types.ts` → no errors
- A one-off in-session check (not committed) ran 22 assertions with `tsx`, covering every row of the §2 active-link table, every drawer event in §5 (plus Escape while closed), breakpoint edges (767/768/1024px), the 8-item count and the hidden-route guard → all passed
