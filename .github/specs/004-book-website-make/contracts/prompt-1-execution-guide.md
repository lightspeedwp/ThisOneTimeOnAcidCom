# Figma Make Prompt 1: Navigation Exposure — Execution Guide

**Status**: ✅ UNBLOCKED & READY TO EXECUTE  
**Scope**: Update navigation component to hide Speaking, Events, and Media routes from public sitemap  
**Approval Gate**: Gates 1, 2 ✅ COMPLETE  
**Decision Dependency**: Blocking Decision 7 (Route Enforcement Verification) → **Selected Option A** ✅

---

## Executive Summary

Update the ThisOneTimeOnAcidCom Figma navigation component to:
- Remove /speaking, /events, /media from the visible navigation menu
- Keep these routes accessible internally (accessible at URLs, but not discoverable via search)
- Apply route enforcement using **Option A** (Meta tags + Robots.txt + Sitemap.xml exclusion)
- Preserve responsive navigation states across desktop, tablet, and mobile

**Outcome**: Navigation component shows only 4 visible items (Home, About, Book, Contact) while hidden routes remain accessible with noindex enforcement.

---

## The Work

### 1. Update Navigation Component in Figma

**Current state** (before):
- Navigation menu displays: Home, About, Book, Speaking, Events, Media, Contact
- Robots.txt: No exclusions
- Sitemap.xml: Includes all routes
- Meta tags: `<meta name="robots" content="index, follow">` (default)

**Target state** (after):
- Navigation menu displays: Home, About, Book, Contact
- Speaking, Events, Media removed from visible menu
- Responsive states preserved:
  - Desktop (≥1024px): Horizontal menu
  - Tablet (768-1023px): Horizontal menu with wrapping
  - Mobile (<768px): Hamburger menu with drawer

### 2. Implement Route Enforcement (Decision 7 Option A)

Apply **all three enforcement methods** for /speaking, /events, /media:

#### A. Meta Tags (on each hidden route page)
Add to page header:
```html
<meta name="robots" content="noindex, nofollow">
```text
This tells search engines: "Don't index this page and don't follow links from it."

#### B. Robots.txt Rules
Add to robots.txt:
```text
User-agent: *
Disallow: /speaking
Disallow: /events
Disallow: /media
```text
This tells crawlers: "Don't crawl these routes."

#### C. Sitemap.xml Exclusion
Remove these entries from sitemap.xml:
- `<loc>https://thisonetimeonacid.com/speaking</loc>`
- `<loc>https://thisonetimeonacid.com/events</loc>`
- `<loc>https://thisonetimeonacid.com/media</loc>`

This tells search engines: "These routes are not part of our public site map."

---

## Acceptance Criteria

All of these must be true when complete:

✅ **CR-1.1**: Navigation component in Figma shows ONLY these 4 items:
- Home (/)
- About (/about)
- Book (/book)
- Contact (/contact)

✅ **CR-1.2**: Hidden routes (/speaking, /events, /media) are:
- NOT visible in navigation menu
- Still accessible at their URLs (not deleted)
- Marked with noindex meta tags

✅ **CR-1.3**: All three enforcement methods are applied:
- ✓ Meta tag: `<meta name="robots" content="noindex, nofollow">`
- ✓ Robots.txt: Disallow /speaking, /events, /media
- ✓ Sitemap.xml: Excludes /speaking, /events, /media

✅ **CR-1.4**: Responsive design preserved for:
- Desktop navigation (horizontal menu)
- Tablet navigation (horizontal with wrapping)
- Mobile navigation (hamburger + drawer)

✅ **CR-1.5**: Only /speaking, /events, /media removed:
- No other navigation links changed
- No accidental deletions of other routes
- All other routes remain visible and functional

✅ **CR-1.6**: Before/after comparison available:
- Screenshot of navigation BEFORE (with all 7 items)
- Screenshot of navigation AFTER (with 4 items)
- Visual comparison shows the three removed items clearly

---

## Step-by-Step Execution

### Phase 1: Navigation Component Update (Figma)

1. Open ThisOneTimeOnAcidCom Figma file
2. Locate the navigation component (typically named "Navigation", "Header", or "Nav Bar")
3. Find the link items:
   - Home (/)
   - About (/about)
   - Book (/book)
   - Speaking (/speaking) ← **REMOVE THIS**
   - Events (/events) ← **REMOVE THIS**
   - Media (/media) ← **REMOVE THIS**
   - Contact (/contact)
4. Delete the three hidden route components
5. Verify responsive states still work (desktop, tablet, mobile)
6. Generate BEFORE screenshot (before removing routes)
7. Take AFTER screenshot (after removing routes)

### Phase 2: Route Enforcement Implementation

1. **Meta Tag Application**:
   - Add `<meta name="robots" content="noindex, nofollow">` to:
     - /speaking page header
     - /events page header
     - /media page header

2. **Robots.txt Update**:
   - Add three Disallow rules:
     ```
     Disallow: /speaking
     Disallow: /events
     Disallow: /media
     ```

3. **Sitemap.xml Update**:
   - Remove three `<loc>` entries:
     - `https://thisonetimeonacid.com/speaking`
     - `https://thisonetimeonacid.com/events`
     - `https://thisonetimeonacid.com/media`

### Phase 3: Validation

1. ✅ Confirm navigation menu shows only 4 items (Home, About, Book, Contact)
2. ✅ Verify /speaking, /events, /media are still accessible at their URLs
3. ✅ Verify noindex meta tags present on hidden pages
4. ✅ Verify Robots.txt has three Disallow rules
5. ✅ Verify Sitemap.xml excludes three hidden routes
6. ✅ Test responsive states (desktop/tablet/mobile navigation)
7. ✅ Generate before/after comparison

---

## Error Handling

**Issue: Hidden routes still appear in navigation menu**
- Verify component structure in Figma (routes may be in child components)
- Check if component instance is overriding the main component
- Regenerate with explicit route identifiers: "/speaking", "/events", "/media"

**Issue: Enforcement strategy conflicts with other configs**
- Document the conflict with ⚠️ notation
- Mark for resolution in implementation phase
- Do not ignore—flag for team review

**Issue: Responsive states broken after changes**
- Check that link removal didn't affect layout calculations
- Re-test menu collapse/expand on mobile
- Verify breakpoint triggers (768px, 1024px) still work

---

## Reference Documents

| Document | Version | Purpose |
| ---------- | --------- | --------- |
| 03-author-decisions-launch-scope.md | v1.3.0 | Source for Speaking/Events/Media exclusion |
| 04-design-brief.md | v1.1.2 | Design baseline & responsive breakpoints |
| 06-website-reading-prd.md | v1.1.1 | Implementation guidance |
| Blocking Decision 7 | Resolved → Option A | Route enforcement method (Meta + Robots.txt + Sitemap.xml) |

---

## Deliverables

When Prompt 1 execution is complete, provide:

1. **Updated Figma Component**
   - Navigation shows 4 items only (Home, About, Book, Contact)
   - Responsive states intact

2. **Route Enforcement Rules**
   - Meta tags documented for each hidden route
   - Robots.txt rules listed
   - Sitemap.xml entries identified for removal

3. **Before/After Comparison**
   - Screenshot showing original navigation (7 items)
   - Screenshot showing updated navigation (4 items)
   - Visual diff highlighting removed routes

4. **Validation Report**
   - Checklist confirming all 6 acceptance criteria met
   - Any conflicts or issues documented with ⚠️ notation

---

## Success Definition

✅ **Prompt 1 is complete when**:
- Navigation component updated in Figma (4 visible items)
- All three enforcement methods applied (meta tags + robots.txt + sitemap.xml)
- Before/after comparison generated
- All acceptance criteria (CR-1.1 through CR-1.6) verified
- No unintended side effects (other navigation items intact)
- Team can review and approve the changes

---

## Next Steps (After Prompt 1)

Once Prompt 1 is complete:
- **Prompt 2A** can execute independently (Design System Baseline Export)
- **Prompt 2B** can execute independently (Navigation Design Specification)
- **Prompt 3A** can execute independently (Reader Access Copy & Forms)

Prompts 3B and 3C are also unblocked and ready when needed.
