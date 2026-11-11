# Figma Make Prompt 1: Navigation Exposure

**Status**: ✅ UNBLOCKED  
**Priority**: P1  
**Prompt ID**: 1  
**Type**: navigation-exposure

---

## Specification

### Goal

Update the navigation component to hide Speaking, Events, and Media routes from the public sitemap while preserving them as noindex pages (internal documentation remains accessible at /speaking, /events, /media with proper noindex tags).

### Context

From 03-author-decisions-launch-scope.md (v1.3.0):
> "Speaking/Events/Media are approved as design baseline for site architecture but excluded from public navigation and sitemap per author direction. These routes preserve internal documentation but are not discoverable via search engines."

### Exact Changes

**Before**:
- Public sitemap includes: /home, /about, /book, /speaking, /events, /media, /contact, ...
- Navigation component displays links to all routes
- Meta tags: `<meta name="robots" content="index, follow">`

**After**:
- Public sitemap includes: /home, /about, /book, /contact, ...
- Navigation component displays: /home, /about, /book, /contact (Speaking/Events/Media hidden)
- Route enforcement for /speaking, /events, /media:
  - Option A (Recommended): Meta tags + Robots.txt + Sitemap.xml exclusion
  - Option B (Alternative): Robots.txt only
  - Option C (Alternative): Meta tags only
  - Option D (Alternative): Sitemap.xml filtering only
  
  *(Selected from Blocking Decision 7: Route Enforcement Verification)*

**No Changes To**:
- Functionality (routes remain accessible, not deleted)
- Route architecture (/speaking, /events, /media still exist)
- Internal links (documentation remains present internally)

### Component Specification

**Navigation Component** (name: `Navigation` or `Header` in Figma):

- **Visible Links** (display in menu):
  - Home (/)
  - About (/about)
  - Book (/book)
  - Contact (/contact)

- **Hidden Links** (not in menu):
  - Speaking (/speaking)
  - Events (/events)
  - Media (/media)

- **Responsive States**:
  - Desktop (≥1024px): Horizontal menu, all visible links shown
  - Tablet (768-1023px): Horizontal menu with possible wrapping
  - Mobile (<768px): Hamburger menu, all visible links in drawer

### Figma Make Instructions

1. **Locate navigation component** in Figma file
2. **Remove links** for /speaking, /events, /media from navigation menu
3. **Preserve route pages** (/speaking, /events, /media) with noindex metadata
4. **Document enforcement strategy** for each route (based on Decision 7 selection):
   - Add Meta tag: `<meta name="robots" content="noindex, nofollow">`
   - Add Robots.txt rule: `Disallow: /speaking` (per option selected)
   - Update sitemap.xml to exclude /speaking, /events, /media (per option selected)
5. **Generate before/after comparison** showing navigation structure change

### Acceptance Criteria

✅ **CR-1.1**: Navigation component in Figma shows only approved visible items (Home, About, Book, Contact)

✅ **CR-1.2**: Speaking, Events, Media routes are hidden from navigation menu but pages remain accessible at /speaking, /events, /media

✅ **CR-1.3**: Enforcement strategy matches selected option from Blocking Decision 7:
- Meta tags present on hidden pages
- Robots.txt rules documented (if Option A or B selected)
- Sitemap.xml excludes /speaking, /events, /media (if Option A or D selected)

✅ **CR-1.4**: Responsive navigation design preserved for desktop, tablet, mobile breakpoints

✅ **CR-1.5**: No other navigation changes introduced (only removal of three routes)

✅ **CR-1.6**: Before/after comparison shows navigation structure change clearly

### Error Handling

**If /speaking, /events, /media appear in menu after generation**:
- Verify routes were identified correctly in Figma component
- Check component nesting (link may be in child component)
- Regenerate with explicit route names: "/speaking", "/events", "/media"

**If enforcement strategy conflicts with other site configurations**:
- Document conflict with notation "⚠️ Conflict: [description]"
- Mark for resolution in implementation phase
- Do not proceed without noting conflict

### Reference Documents

- Source: 03-author-decisions-launch-scope.md (v1.3.0)
- Related: Blocking Decision 7 (Route Enforcement Verification)
- Design Baseline: 04-design-brief.md (v1.1.2)
- Implementation Guide: 06-website-reading-prd.md (v1.1.1)

### Dependencies

- None (Prompt 1 can execute independently)

### Next Prompts

- Prompt 2A (Design System Baseline Export) — No dependency on Prompt 1
- Prompt 2B (Navigation Design Specification) — Should follow Prompt 1 to reflect visible items only

---

## Validation Checklist

Before marking Prompt 1 as complete, verify:

- [ ] Navigation component updated in Figma
- [ ] Hidden routes removed from visible menu
- [ ] Responsive states preserved (desktop, tablet, mobile)
- [ ] Enforcement strategy documented for /speaking, /events, /media
- [ ] Before/after screenshots generated
- [ ] No other navigation items accidentally removed
- [ ] All acceptance criteria (CR-1.1 through CR-1.6) met
- [ ] Conflicts (if any) documented with ⚠️ notation
