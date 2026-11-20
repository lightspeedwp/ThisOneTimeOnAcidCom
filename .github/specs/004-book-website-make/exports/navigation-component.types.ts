/**
 * Navigation component specification — Prompt 2B (SC-004 Claude direct execution)
 *
 * Executable TypeScript spec for the recovered book-site navigation. It is a
 * reference for implementation, not imported by the app. It compiles standalone:
 *   npx tsc --noEmit --strict --target es2019 navigation-component.types.ts
 *
 * Inputs:
 *   - Prompt 1 output: 8 visible items, Speaking/Events/Media removed
 *   - Prompt 2A output: design-tokens.css (unsuffixed --nav-* aliases)
 *   - Contract: contracts/prompt-2b-navigation-design.md (CR-2B.1–CR-2B.6)
 *
 * Menu recovery strategy (hybrid responsive + stateful):
 *   - desktop (≥1024px): inline link row — no drawer state
 *   - tablet (768–1023px): inline link row that may wrap to a second line
 *   - mobile (<768px): toggle button + overlay drawer driven by drawerReducer
 */

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

/** One primary navigation destination. Hidden routes are never NavItems. */
export interface NavItem {
  /** Visible link text. Must match bookSiteData.nav exactly (no renaming). */
  readonly label: string;
  /** Registered route path, starting with "/". */
  readonly href: string;
}

/**
 * Primary navigation after Prompt 1, in the retained relative order.
 * Source of truth at runtime stays bookSiteData.nav; this mirrors it for the spec.
 */
export const PRIMARY_NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "The Book", href: "/the-book" },
  { label: "Read the Draft", href: "/read-the-draft" },
  { label: "About Ash", href: "/about-ash" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
  { label: "Waitlist", href: "/waitlist" },
  { label: "Search", href: "/search" },
] as const;

/** Routes retained at direct URLs but never rendered as navigation links. */
export const HIDDEN_ROUTES: readonly string[] = [
  "/speaking",
  "/events",
  "/media",
] as const;

/**
 * Registered aliases that should highlight a primary item.
 * '/read-the-book' renders ReadDraftPage (src/app/routes.ts), so it maps to
 * '/read-the-draft'. Aliases are never added to the menu themselves (WP-02).
 */
export const ROUTE_ALIASES: Readonly<Record<string, string>> = {
  "/read-the-book": "/read-the-draft",
};

/* ------------------------------------------------------------------ */
/* Responsive                                                          */
/* ------------------------------------------------------------------ */

export type Breakpoint = "mobile" | "tablet" | "desktop";

/** Minimum widths in CSS pixels. Mobile is everything below tablet. */
export const BREAKPOINTS = { tablet: 768, desktop: 1024 } as const;

export function breakpointForWidth(width: number): Breakpoint {
  if (width >= BREAKPOINTS.desktop) return "desktop";
  if (width >= BREAKPOINTS.tablet) return "tablet";
  return "mobile";
}

/** Only the mobile layout uses the stateful drawer. */
export function usesDrawer(bp: Breakpoint): boolean {
  return bp === "mobile";
}

/* ------------------------------------------------------------------ */
/* Active link                                                         */
/* ------------------------------------------------------------------ */

/**
 * Return the href of the primary item that represents the current path, or null.
 *
 * Rules:
 *  1. Strip query, hash and a trailing slash; resolve registered aliases.
 *  2. "/" is active only on an exact match.
 *  3. Other items match exactly or as a whole-segment prefix
 *     ("/journal" matches "/journal/my-post" but not "/journalism").
 *  4. Hidden routes never produce an active item.
 *  5. If several items match, the longest href wins.
 */
export function resolveActiveHref(
  pathname: string,
  items: readonly NavItem[] = PRIMARY_NAV_ITEMS,
): string | null {
  let path = pathname.split(/[?#]/)[0] || "/";
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  path = ROUTE_ALIASES[path] ?? path;

  let best: string | null = null;
  for (const item of items) {
    const href = item.href;
    const matches =
      href === "/"
        ? path === "/"
        : path === href || path.startsWith(href + "/");
    if (matches && (best === null || href.length > best.length)) best = href;
  }
  return best;
}

/* ------------------------------------------------------------------ */
/* Drawer state (mobile only)                                          */
/* ------------------------------------------------------------------ */

export type DrawerStatus = "closed" | "open";

/** Where focus should go after a transition. The component performs the move. */
export type FocusTarget = "none" | "first-link" | "toggle";

export interface DrawerState {
  readonly status: DrawerStatus;
  readonly focusTarget: FocusTarget;
}

export type DrawerEvent =
  | { readonly type: "TOGGLE" }
  | { readonly type: "ESCAPE" }
  | { readonly type: "BACKDROP_CLICK" }
  /** samePath: the link points at the page already shown, so no route change follows. */
  | { readonly type: "LINK_ACTIVATED"; readonly samePath: boolean }
  | { readonly type: "ROUTE_CHANGED" }
  | { readonly type: "BREAKPOINT_CHANGED"; readonly breakpoint: Breakpoint };

export const INITIAL_DRAWER_STATE: DrawerState = {
  status: "closed",
  focusTarget: "none",
};

/**
 * Pure transition function for the mobile drawer.
 *
 * - Opening moves focus to the first link.
 * - Escape, backdrop click and the toggle close the drawer and return focus to the toggle.
 * - Following a link to another page, or any route change, closes without moving
 *   focus, because RootLayout moves focus to #main-content when the pathname changes.
 * - Following a link to the current page closes and returns focus to the toggle:
 *   the pathname does not change, so RootLayout does not move focus, and the
 *   focused link would otherwise disappear with the drawer.
 * - Growing past mobile closes the drawer so it cannot stay open behind the inline row.
 */
export function drawerReducer(
  state: DrawerState,
  event: DrawerEvent,
): DrawerState {
  switch (event.type) {
    case "TOGGLE":
      return state.status === "open"
        ? { status: "closed", focusTarget: "toggle" }
        : { status: "open", focusTarget: "first-link" };
    case "ESCAPE":
    case "BACKDROP_CLICK":
      return state.status === "open"
        ? { status: "closed", focusTarget: "toggle" }
        : state;
    case "LINK_ACTIVATED":
      if (state.status !== "open") return state;
      return event.samePath
        ? { status: "closed", focusTarget: "toggle" }
        : { status: "closed", focusTarget: "none" };
    case "ROUTE_CHANGED":
      return state.status === "open"
        ? { status: "closed", focusTarget: "none" }
        : state;
    case "BREAKPOINT_CHANGED":
      return usesDrawer(event.breakpoint) || state.status === "closed"
        ? state
        : { status: "closed", focusTarget: "none" };
  }
}

/* ------------------------------------------------------------------ */
/* Component contract                                                  */
/* ------------------------------------------------------------------ */

export interface NavigationProps {
  /** Current location pathname (from the router). */
  readonly currentPath: string;
  /** Defaults to PRIMARY_NAV_ITEMS. Must never contain HIDDEN_ROUTES. */
  readonly items?: readonly NavItem[];
  /** Accessible name for the <nav> landmark. */
  readonly ariaLabel?: string;
  /** Client-side navigation handler; falls back to normal anchor behaviour. */
  readonly onNavigate?: (href: string) => void;
}

/** Attributes the toggle button must expose in each drawer state. */
export interface ToggleAria {
  readonly "aria-expanded": boolean;
  readonly "aria-controls": string;
  readonly "aria-label": string;
}

export const DRAWER_ID = "mobile-menu";

export function toggleAria(status: DrawerStatus): ToggleAria {
  const open = status === "open";
  return {
    "aria-expanded": open,
    "aria-controls": DRAWER_ID,
    "aria-label": open ? "Close menu" : "Open menu",
  };
}

/** Guard used in tests and dev builds: hidden routes must not leak into the menu. */
export function assertNoHiddenRoutes(items: readonly NavItem[]): void {
  const leaked = items.filter((i) => HIDDEN_ROUTES.includes(i.href));
  if (leaked.length > 0) {
    throw new Error(
      "Hidden routes in navigation: " + leaked.map((i) => i.href).join(", "),
    );
  }
}
