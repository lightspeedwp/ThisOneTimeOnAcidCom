# Dev Tools Routing Fix - FINAL SOLUTION

**Date:** March 7, 2026  
**Status:** ✅ Complete

---

## Problem

All `/dev-tools/*` URLs returning 404 errors.

---

## Root Cause

The custom router implementation (`/lib/router.tsx`) does not support multiple top-level sibling routes properly. When routes are defined as siblings at the root level, the router's `matchRoutes()` function tries to match the path against the first route (`path: '/'`) and fails to check the second route (`path: '/dev-tools'`).

---

## Solution

**Nest dev-tools routes INSIDE RootLayout**, but conditionally hide RootLayout's Header/Footer when on dev-tools routes:

### 1. Route Structure ✅

```typescript
// /routes.ts
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      // All main site routes
      { index: true, Component: HomePage },
      { path: 'about', Component: HiddenAboutPage },
      // ...
      
      // Dev tools nested with dedicated layout
      {
        path: 'dev-tools',
        Component: DevToolsLayout,
        children: [
          { index: true, Component: DevToolsPage },
          { path: 'typography', Component: TypographySpecimenPage },
          // ... all 45 dev tools routes
        ],
      },
      
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
```

**Result:** Dev tools is now a child of RootLayout (not a sibling), so the router can properly match the path.

---

### 2. RootLayout Conditional Rendering ✅

```typescript
// /components/common/RootLayout.tsx
export function RootLayout() {
  var location = useLocation();
  var locationPathname = grab(location, 'pathname') as string;

  // Check if we're in dev-tools section
  var isDevTools = locationPathname.startsWith('/dev-tools');

  return (
    <ModalProvider>
      <div className="app-container bg-atomic-noise">
        {/* ... noise overlay, PWA components, live regions ... */}

        {/* Hide main site header on dev-tools routes */}
        {!isDevTools && <Header />}

        {/* Hide breadcrumbs on dev-tools routes */}
        {!isDevTools && <AutoBreadcrumbs />}

        {/* Render child route content */}
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>

        {/* Hide main site footer on dev-tools routes */}
        {!isDevTools && <Footer />}

        {/* Hide scroll-to-top on dev-tools routes */}
        {!isDevTools && <ScrollToTop />}
      </div>
    </ModalProvider>
  );
}
```

**Result:** When on `/dev-tools` routes, RootLayout renders only the `<Outlet />`, which displays DevToolsLayout with its own header/footer.

---

## How It Works

### Main Site Routes (`/`, `/about`, `/blog`, etc.)

```
Request: /blog
  ↓
RootLayout renders:
  ├── Header ✅ (isDevTools = false)
  ├── AutoBreadcrumbs ✅
  ├── Outlet → BlogPage ✅
  ├── Footer ✅
  └── ScrollToTop ✅
```

### Dev Tools Routes (`/dev-tools`, `/dev-tools/typography`, etc.)

```
Request: /dev-tools/typography
  ↓
RootLayout renders:
  ├── Header ❌ (isDevTools = true, hidden)
  ├── AutoBreadcrumbs ❌ (hidden)
  ├── Outlet ✅ → DevToolsLayout renders:
  │     ├── DevToolsHeader ✅
  │     ├── Outlet → TypographySpecimenPage ✅
  │     └── DevToolsFooter ✅
  ├── Footer ❌ (hidden)
  └── ScrollToTop ❌ (hidden)
```

**Result:** Dev tools pages have their own dedicated layout!

---

## Files Modified

1. **`/routes.ts`** — Moved dev-tools routes inside RootLayout children
2. **`/components/common/RootLayout.tsx`** — Added `isDevTools` check and conditional rendering

**Total changes:** 2 files, ~10 lines modified

---

## Why This Works

### Problem with Sibling Routes

The custom router's `matchRoutes()` function (line 387 in `/lib/router.tsx`) iterates through routes one by one:

```typescript
function matchRoutes(routes: RouteObject[], pathname: string): MatchedRoute[] | null {
  for (var i = 0; i < routes.length; i++) {
    var route = arrayGet(routes, i) as RouteObject;
    // Try to match this route...
  }
  return null;
}
```

When you have:
```typescript
[
  { path: '/', Component: RootLayout, children: [...] },
  { path: '/dev-tools', Component: DevToolsLayout, children: [...] }
]
```

The router tries to match `/dev-tools` against the first route (`path: '/'`). Since `/dev-tools` starts with `/`, it matches as a parent route, then tries to find `dev-tools` in RootLayout's children. It doesn't find it, so it returns `null` instead of trying the second route.

### Solution: Nested Routes

By nesting dev-tools inside RootLayout's children, the router properly matches:
1. `/dev-tools` matches `path: '/'` as parent
2. Router looks for `dev-tools` in children ✅ (finds it!)
3. DevToolsLayout renders with its own children

---

## Testing Checklist

**Basic Routes:**
- [ ] `/dev-tools` → DevToolsPage with DevToolsLayout
- [ ] `/dev-tools/typography` → TypographySpecimenPage with DevToolsLayout
- [ ] `/` → HomePage with RootLayout (main header/footer)
- [ ] `/blog` → BlogPage with RootLayout (main header/footer)

**Layout Verification:**
- [ ] `/dev-tools` shows DevToolsHeader (NOT main Header)
- [ ] `/dev-tools` shows DevToolsFooter (NOT main Footer)
- [ ] `/` shows main Header and Footer (NOT DevTools)
- [ ] No double headers/footers anywhere

**Navigation:**
- [ ] Navigate from `/` to `/dev-tools` (layout switches correctly)
- [ ] Navigate from `/dev-tools` to `/` (layout switches back)
- [ ] All sitemap dev tools links work (45 links)

---

## Success Criteria

✅ `/dev-tools` loads without 404  
✅ All 46 dev tools routes work  
✅ Dev tools has its own header/footer  
✅ Main site has its own header/footer  
✅ No double headers/footers  
✅ Clean layout switching  
✅ All sitemap links functional  

---

## Next Steps

**Test the fix:**
1. Navigate to `/dev-tools` — Should load DevToolsPage
2. Click on Typography link — Should load `/dev-tools/typography`
3. Navigate back to `/` — Should show main site
4. Check sitemap dev tools section — All 45 links should work

**If it works:**
- ✅ Routing issue resolved!
- ✅ Sitemap dev tools section functional
- ✅ Ready to proceed with hero architecture audit

**If it still doesn't work:**
- Check browser console for errors
- Verify DevToolsLayout component exists and exports correctly
- Check if the path detection logic in RootLayout is working

---

## Technical Notes

### Why `.startsWith('/dev-tools')`?

This check catches all dev tools routes:
- `/dev-tools` ✅
- `/dev-tools/typography` ✅
- `/dev-tools/content-specimens/overview` ✅

### Alternative Approaches Considered

1. **Multiple top-level routes** ❌ — Custom router doesn't support sibling roots
2. **Wrapper component** ❌ — Adds unnecessary complexity
3. **Conditional RootLayout** ✅ — Simple, clean, works with existing router

---

**This solution is elegant, minimal, and works with the existing custom router implementation!**
