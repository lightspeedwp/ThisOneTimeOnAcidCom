# Figma Make Prompt 1: Navigation Exposure — Exact Preview

**Status**: ✅ UNBLOCKED (Exact preview generated for approval)  
**Preview Date**: 2026-11-09  
**Source**: Prompt 1 Contract + Design Baseline (04-design-brief.md v1.1.2)  
**SC Reference**: SC-002 (Exact Prompt 1 preview includes all four elements: before/after structure, numbered implementation steps, acceptance criteria, non-changes list)

---

## 1. Before/After Navigation Structure

### BEFORE
```text
Public Sitemap & Navigation Menu
├── /home (Home)
├── /about (About)
├── /book (Book / Living Manuscript)
├── /speaking (Speaking) ← VISIBLE
├── /events (Events) ← VISIBLE
├── /media (Media) ← VISIBLE
└── /contact (Contact)

Meta: <meta name="robots" content="index, follow">
Robots.txt: Disallow: (none for these routes)
Sitemap: All routes included
```

### AFTER
```text
Public Sitemap & Navigation Menu
├── /home (Home)
├── /about (About)
├── /book (Book / Living Manuscript)
└── /contact (Contact)

Hidden Routes (accessible but not in menu):
├── /speaking (Meta: noindex, nofollow)
├── /events (Meta: noindex, nofollow)
└── /media (Meta: noindex, nofollow)

Enforcement Strategy (Blocking Decision 7 — approved Option A):
Meta: <meta name="robots" content="noindex, nofollow"> on each hidden route
Sitemap: /speaking, /events, /media excluded
Robots.txt: no Disallow rule for these routes (crawlers must read noindex)
```

---

## 2. Numbered Implementation Steps (File/Component Changes)

### Phase A: Figma Component Updates

1. **Open Figma Make project** and navigate to Navigation component (or Header component if combined)

2. **Locate navigation menu component** with current links:
   - Verify component contains: Home, About, Book, Speaking, Events, Media, Contact

3. **Remove three link components** from visible navigation:
   - Delete or hide "Speaking" link component
   - Delete or hide "Events" link component
   - Delete or hide "Media" link component

4. **Verify remaining visible links** in navigation menu:
   - Home (/home)
   - About (/about)
   - Book (/book)
   - Contact (/contact)

5. **Check responsive states** (desktop, tablet, mobile):
   - Desktop (≥1024px): Horizontal menu with 4 visible links
   - Tablet (768-1023px): Horizontal menu with 4 links (wrapping as needed)
   - Mobile (<768px): Hamburger menu drawer with 4 links

6. **Export navigation component** from Figma as updated design token

### Phase B: Route Enforcement Configuration

7. **Preserve route pages** at `/speaking`, `/events`, `/media` with noindex metadata:
   - Add Meta tag to each page: `<meta name="robots" content="noindex, nofollow">`
   - Keep internal documentation accessible at these paths

8. **Apply the approved enforcement strategy** (Blocking Decision 7, Option A):
   - Keep the noindex meta tag from step 7 on each hidden route
   - Exclude /speaking, /events and /media from sitemap.xml
   - Do not add robots.txt `Disallow` rules for these routes; crawlers must be able to fetch the pages to read the noindex directive

9. **Document enforcement for each route**:
   - /speaking: noindex meta + sitemap exclusion; no robots.txt Disallow
   - /events: noindex meta + sitemap exclusion; no robots.txt Disallow
   - /media: noindex meta + sitemap exclusion; no robots.txt Disallow

10. **Generate before/after screenshot comparison** showing navigation structure change

### Phase C: Quality Validation

11. **Validate all acceptance criteria** (see section 3 below)

12. **Verify no unintended changes** (see section 4: Non-changes list)

13. **Document any conflicts** with notation "⚠️ Conflict: [description]" if enforcement strategy conflicts with other configurations

14. **Prepare for Prompt 2B** (Navigation Design Specification will reference the updated 4-item navigation structure)

---

## 3. Acceptance Criteria

All criteria must be met before marking Prompt 1 complete (CR = Component Requirement):

**Figma Component Changes**:
- ✅ **CR-1.1**: Navigation component in Figma displays only four visible items: Home, About, Book, Contact
- ✅ **CR-1.2**: Speaking, Events, Media routes are hidden from navigation menu but remain accessible at `/speaking`, `/events`, `/media` endpoints
- ✅ **CR-1.3**: Responsive design preserved across all breakpoints (desktop ≥1024px, tablet 768-1023px, mobile <768px)

**Route Enforcement**:
- ✅ **CR-1.4**: Approved Blocking Decision 7 strategy (Option A: noindex meta + sitemap exclusion) is documented and applied
- ✅ **CR-1.5**: Hidden routes have Meta tag `<meta name="robots" content="noindex, nofollow">` added
- ✅ **CR-1.6**: robots.txt contains **no** `Disallow` rule matching /speaking, /events or /media, so crawlers can read the noindex directive
- ✅ **CR-1.7**: Sitemap.xml excludes hidden routes

**Documentation**:
- ✅ **CR-1.8**: Before/after navigation comparison screenshot generated and accessible
- ✅ **CR-1.9**: Implementation steps documented with exact file and component names
- ✅ **CR-1.10**: No enforcement conflicts documented; if conflicts exist, they are marked with ⚠️ notation and escalated for implementation-phase resolution

---

## 4. Non-Changes List (2–3 bullet points describing what is NOT changed)

- 🔵 **Route Functionality Preserved**: `/speaking`, `/events`, `/media` routes remain fully accessible and operational; no functionality is deleted. Only their visibility in the public navigation menu is removed. This allows internal documentation and any linked references to continue working.

- 🔵 **Route Architecture Unchanged**: The site structure and information architecture remain identical. No pages are deleted, no redirects are created, and no routes are consolidated. The only change is navigation menu visibility and search-engine-discoverability enforcement via noindex meta tags and sitemap exclusion (no robots.txt `Disallow` rules).

- 🔵 **Other Navigation Items Untouched**: All other routes (Home, About, Book, Contact) remain exactly as they are. No other navigation items are modified, no additional items are added, and no responsive breakpoint behavior is altered beyond ensuring the 4-item menu displays correctly.

---

## 5. Decision Dependencies

This prompt depends on **Blocking Decision 7: Route Enforcement Verification**.

| Decision | Options | Status | Impact on Prompt 1 |
| ---------- | --------- | -------- | ------------------- |
| **Decision 7** | Route Enforcement | ✅ **APPROVED** (2026-11-11) — Option A | Noindex meta tags + sitemap exclusion applied in section 2, step 8 |

The decision is recorded in [research.md](../research.md) and [BLOCKING_DECISIONS_PROPOSAL.md](../exports/BLOCKING_DECISIONS_PROPOSAL.md). No further selection is required.

**Enforcement-method note (resolved separately from the decision)**: earlier records described Option A as "Meta tags + Robots.txt + Sitemap". A robots.txt `Disallow` rule would stop crawlers reading the noindex directive, so this contract applies Option A as noindex meta + sitemap exclusion with no robots.txt `Disallow`. This clarification does not change the approved option.

---

## 6. Exact Prompt Text (Ready for Figma Make Execution)

With Blocking Decision 7 approved, the following exact text is prepared for Figma Make. Submission still requires the execution gates in [spec.md](../spec.md):

```text
Figma Make Prompt 1 (Navigation Exposure) — Decision 7 Option A applied

Goal:
Update the book website navigation component to hide Speaking, Events, and Media routes from the public navigation menu, footer links, HTML sitemap, and search-engine discovery, while preserving them as internally accessible noindex pages.

Changes:
- Remove Speaking, Events, Media links from visible navigation menu
- Remove Speaking, Events, Media links from footer navigation
- Remove Speaking, Events, Media entries from HTML sitemap (sitemap.xml)
- Add noindex meta tag to hidden route pages
- Apply search engine enforcement per Decision 7 Option A: noindex meta tags + sitemap exclusion; add no robots.txt Disallow rules for these routes
- Preserve Home, About, Book, Contact as visible navigation items
- Preserve direct URL access to hidden routes (retained for internal reference without public promotion)

Acceptance Criteria:
CR-1.1 through CR-1.10 (see section 3 above); CR-1.11: Footer links verified removed; CR-1.12: HTML sitemap excludes hidden routes

Reference:
- Author Decision: 03-author-decisions-launch-scope.md v1.3.0
- Design Baseline: 04-design-brief.md v1.1.2
- Blocking Decision 7 Selection: Option A (approved 2026-11-11)
```

---

## 7. Ready-for-Approval Checklist

Before submitting Prompt 1 to Figma Make, verify:

| Item | Status | Notes |
| ------ | -------- | ------- |
| Before/after navigation structure | ✅ Documented | Section 1 complete |
| Numbered implementation steps (14 steps) | ✅ Documented | Section 2 complete |
| All acceptance criteria defined | ✅ Documented | Section 3: CR-1.1 through CR-1.10 |
| Non-changes list (3 bullets) | ✅ Documented | Section 4 complete |
| Decision 7 dependency noted | ✅ Documented | Section 5 records approved Option A |
| Exact prompt text prepared | ✅ Ready | Section 6 includes the approved Decision 7 method |

**Preview Status**: ✅ **READY FOR APPROVAL**  
**Next Step**: Re-validate this contract against Decision 7, then execute Prompt 1 only once the execution gates in [spec.md](../spec.md) are cleared.

---

**Generated**: 2026-11-09 | **Convergence Task**: T053 (SC-002 compliance validation)
