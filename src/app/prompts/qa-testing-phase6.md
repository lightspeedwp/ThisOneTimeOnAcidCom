# QA Testing Prompt — Content Expansion Phase 6

**Created:** March 2, 2026  
**Version:** 1.0.0  
**Type:** QA Testing & Verification  
**Parent Task List:** [content-expansion-phase6-tasks.md](../tasks/content-expansion-phase6-tasks.md)  
**Prerequisites:** All Content Expansion Phase 6 implementation tasks complete ✅

---

## Objective

Perform comprehensive QA testing on the expanded content from Phase 6:
- 18 blog posts (7 new)
- 11 videos (10 new)
- 38 portfolio entries (18 new)
- 40 sticker designs (13 new)

Verify rendering, accessibility, performance, mobile responsiveness, and data integrity across all content types.

---

## Scope

This prompt covers **7 testing categories** with specific test procedures:

1. **Content Rendering Tests** — Visual verification of new content
2. **Functional Tests** — Search, filters, pagination, lightbox
3. **Accessibility Tests** — Keyboard, screen reader, color contrast
4. **Performance Tests** — Lighthouse, image optimization, build
5. **Mobile Responsiveness Tests** — Breakpoints, touch gestures
6. **Data Integrity Tests** — TypeScript, unique IDs, valid dates
7. **Cross-Content Integration Tests** — Global search, analytics, SEO, Schema.org

---

## Testing Environment

**Prerequisites:**
- Development server running (`npm run dev`)
- Browser DevTools open (Console, Network, Lighthouse tabs)
- TypeScript compiler available (`npm run type-check`)
- Build tools available (`npm run build`, `npm run verify`)

**Browsers to Test:**
- Chrome (primary)
- Firefox
- Safari (if on macOS)
- Edge (optional)

**Devices/Viewports:**
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1440px (standard)
- Desktop Wide: 1920px (Full HD)

---

## Test Procedures

### Category 1: Content Rendering Tests

#### Test 1.1: Portfolio Page Rendering

**Route:** `/portfolio`

**Steps:**
1. Navigate to `/portfolio`
2. Count total portfolio entries displayed
3. Verify new "Editorial & experimental" category exists
4. Check category filter shows correct count per category
5. Verify responsive grid layout (mobile 1 col, tablet 2 col, desktop 3-4 col)

**Expected Results:**
- ✅ 38 total portfolio entries displayed
- ✅ "Editorial & experimental" category visible in filters
- ✅ Grid adapts correctly at breakpoints
- ✅ All images load (Unsplash or placeholder)
- ✅ No console errors

**Pass/Fail Criteria:**
- PASS: All entries render, new category visible, no errors
- FAIL: Missing entries, category not found, console errors, layout broken

---

#### Test 1.2: Portfolio Featured Entries

**Routes:** `/portfolio`, `/` (homepage)

**Steps:**
1. Filter portfolio by "Featured" or check featured section
2. Count featured entries
3. Verify new featured entries present:
   - "Cyborg renaissance" (editorial)
   - "Vortex tribal fusion" (festival)
   - "Boom Festival cosmic connection" (festival)
4. Check featured badge styling (neon pink glow)
5. Visit homepage → verify Featured Section displays new entries

**Expected Results:**
- ✅ 6 featured entries total (3 new)
- ✅ Featured badge visible on cards
- ✅ Homepage Featured Section shows new portfolio work
- ✅ Featured entries appear in correct chronological order

**Pass/Fail Criteria:**
- PASS: All featured entries visible with badges, homepage section populated
- FAIL: Missing featured entries, badges not rendering, homepage section empty

---

#### Test 1.3: Stickers Page Rendering

**Route:** `/stickers`

**Steps:**
1. Navigate to `/stickers`
2. Count total stickers displayed in grid
3. Verify new theme categories visible:
   - Sacred geometry
   - Festival phrases
   - Neurodivergent pride
   - Cycling & endurance
   - Six Cats & branding
   - Berlin scene
4. Check responsive grid layout (mobile 2 col, tablet 3 col, desktop 4 col)
5. Verify random highlight feature in hero section (should show 1 random sticker)

**Expected Results:**
- ✅ 40 total stickers displayed
- ✅ 7 new theme categories visible
- ✅ Grid adapts correctly at breakpoints
- ✅ Random highlight rotates on page reload
- ✅ No console errors

**Pass/Fail Criteria:**
- PASS: All stickers render, new themes visible, responsive layout correct
- FAIL: Missing stickers, themes not found, layout broken

---

#### Test 1.4: Blog Page Rendering

**Route:** `/blog`

**Steps:**
1. Navigate to `/blog`
2. Count total blog posts displayed (with pagination)
3. Verify new blog posts visible in list:
   - "The dancefloor gave me everything"
   - "Neon revelations"
   - "Six Cats: the green garden"
   - "Twenty-three years"
   - "Berlin calling"
   - "Eighty-six hours"
   - "The artist's lifestyle"
4. Check backdated dates (2020-2024 range)
5. Verify category badges on cards

**Expected Results:**
- ✅ 18 total blog posts (across all pages)
- ✅ 7 new posts visible with correct dates
- ✅ Category badges render correctly
- ✅ Excerpt text displays
- ✅ "Read more" buttons functional

**Pass/Fail Criteria:**
- PASS: All 18 posts accessible, dates correct, no rendering issues
- FAIL: Missing posts, incorrect dates, broken pagination

---

#### Test 1.5: Videos Page Rendering

**Route:** `/videos`

**Steps:**
1. Navigate to `/videos`
2. Count total video entries displayed
3. Verify new videos visible:
   - "Origin Festival 2023: twenty-four hours of magic"
   - "Cycling 300km from Berlin to Solipse Festival"
   - "Ambidextrous fluoro face painting"
   - "My life as a makeup artist and cyclist"
   - "Building a portfolio site with modern web tools"
   - "Aquarian moon rising documentary" (Part 1 & 2)
   - "Seven days at Boom Festival 2022"
   - "UV makeup meets Muay Thai: Koh Phangan memories"
4. Check featured badges (Origin Festival, 300km cycle)
5. Verify category filters functional

**Expected Results:**
- ✅ 11 total videos displayed
- ✅ 10 new videos visible
- ✅ 2 videos marked as featured
- ✅ Video thumbnails load
- ✅ Category filter shows correct counts

**Pass/Fail Criteria:**
- PASS: All videos render, featured status correct, filters work
- FAIL: Missing videos, featured badges incorrect, category filters broken

---

### Category 2: Functional Tests

#### Test 2.1: Portfolio Lightbox

**Route:** `/portfolio`

**Steps:**
1. Click any portfolio entry card
2. Verify lightbox opens with full-size image
3. Test keyboard controls:
   - Arrow Right → next entry
   - Arrow Left → previous entry
   - Escape → close lightbox
4. Test mouse controls:
   - Click prev/next buttons
   - Click close button (X)
   - Click outside image → close
5. Test mobile swipe gestures (if on touch device)

**Expected Results:**
- ✅ Lightbox opens smoothly
- ✅ Keyboard navigation works
- ✅ Mouse controls functional
- ✅ Close on Escape and outside click
- ✅ Swipe gestures work on mobile

**Pass/Fail Criteria:**
- PASS: All controls functional, no focus traps, smooth transitions
- FAIL: Keyboard navigation broken, close button non-functional, focus trapped

---

#### Test 2.2: Stickers Theme Filtering

**Route:** `/stickers`

**Steps:**
1. Click "All stickers" → verify 40 stickers display
2. Click "Sacred geometry" → verify 3 stickers display
3. Click "Festival phrases" → verify 3 stickers display
4. Click "Neurodivergent pride" → verify 2 stickers display
5. Click "Cycling & endurance" → verify 2 stickers display
6. Click "Berlin scene" → verify 1 sticker displays
7. Click "Six Cats & branding" → verify 1 sticker displays
8. Verify active theme button has visual highlight

**Expected Results:**
- ✅ Filter counts match expected values
- ✅ Active theme button highlighted (neon pink border)
- ✅ Filtered stickers display correctly
- ✅ No console errors during filtering

**Pass/Fail Criteria:**
- PASS: All theme filters return correct counts, UI updates properly
- FAIL: Incorrect counts, filters not working, active state not visible

---

#### Test 2.3: Stickers Search Functionality

**Route:** `/stickers`

**Steps:**
1. Type "flower" in search box → verify "Flower of life mandala" displays
2. Type "ADHD" → verify "ADHD brain on fire" and "Wired different" display
3. Type "Berlin" → verify "Berlin calling" displays
4. Type "cycling" → verify 2 cycling stickers display
5. Type "xyz123" (nonsense) → verify empty state message displays
6. Clear search → verify all 40 stickers return

**Expected Results:**
- ✅ Search is case-insensitive
- ✅ Searches both label and alt text
- ✅ Results update in real-time (debounced)
- ✅ Empty state shows helpful message
- ✅ Clear search restores full list

**Pass/Fail Criteria:**
- PASS: Search functional, case-insensitive, empty state correct
- FAIL: Search broken, case-sensitive, no empty state, stale results

---

#### Test 2.4: Blog Search & Filtering

**Route:** `/blog`

**Steps:**
1. Test search: type "dancefloor" → verify "The dancefloor gave me everything" displays
2. Test search: type "Berlin" → verify "Berlin calling" displays
3. Test category filter: click "Tutorials" → verify filtered list
4. Test tag filter: click any tag → verify filtered list
5. Test combined filters: search + category → verify results
6. Test pagination: click page 2 (if available) → verify next page loads

**Expected Results:**
- ✅ Search returns correct results
- ✅ Category filter works
- ✅ Tag filter works
- ✅ Combined filters work together
- ✅ Pagination updates correctly
- ✅ URL updates with query params

**Pass/Fail Criteria:**
- PASS: All search/filter combinations work, pagination functional
- FAIL: Search broken, filters not applying, pagination errors

---

#### Test 2.5: Video Category Filtering

**Route:** `/videos`

**Steps:**
1. Click "All" category → verify 11 videos display
2. Click "Festival" category → verify 3 festival videos display
3. Click "Tutorial" category → verify 2 tutorial videos display
4. Click "Cycling" category → verify 2 cycling videos display
5. Click "Documentary" category → verify 3 documentary videos display
6. Click "Web Development" category → verify 1 web dev video displays

**Expected Results:**
- ✅ Category counts match expected values
- ✅ Filter updates video list correctly
- ✅ Active category highlighted
- ✅ No console errors

**Pass/Fail Criteria:**
- PASS: All category filters return correct counts
- FAIL: Incorrect counts, filters not working

---

### Category 3: Accessibility Tests

#### Test 3.1: Keyboard Navigation — Portfolio

**Route:** `/portfolio`

**Steps:**
1. Press Tab repeatedly → verify focus moves through:
   - Header navigation
   - Category filters
   - Portfolio cards
   - Footer links
2. Verify focus indicators visible (3px neon pink glow)
3. Press Enter on a portfolio card → verify lightbox opens
4. In lightbox:
   - Press Arrow Right → next entry
   - Press Arrow Left → previous entry
   - Press Escape → lightbox closes
5. Verify focus returns to original card after closing lightbox

**Expected Results:**
- ✅ Tab order logical and sequential
- ✅ Focus indicators visible (3px neon pink)
- ✅ Enter key activates cards
- ✅ Lightbox keyboard controls work
- ✅ Focus management correct (no focus traps)

**Pass/Fail Criteria:**
- PASS: Full keyboard access, visible focus, no traps
- FAIL: Focus indicators invisible, keyboard controls broken, focus trapped

---

#### Test 3.2: Screen Reader Testing

**Tool:** macOS VoiceOver, NVDA (Windows), or JAWS

**Steps:**
1. Enable screen reader
2. Navigate to `/portfolio`
3. Verify screen reader announces:
   - Page title
   - Total portfolio count
   - Category filter labels
   - Portfolio card titles and descriptions
   - Image alt text
4. Open lightbox → verify screen reader announces:
   - "Lightbox opened"
   - Current image title
   - Navigation controls ("Next", "Previous", "Close")
5. Navigate to `/stickers` → verify alt text for all sticker images

**Expected Results:**
- ✅ All content announced correctly
- ✅ ARIA labels present where needed
- ✅ Image alt text descriptive
- ✅ Interactive controls labeled
- ✅ Heading hierarchy correct (H1 → H2 → H3)

**Pass/Fail Criteria:**
- PASS: Screen reader announces all content, ARIA labels correct
- FAIL: Missing alt text, unlabeled controls, incorrect heading hierarchy

---

#### Test 3.3: Color Contrast Verification

**Tool:** Browser DevTools (Elements > Color Picker)

**Steps:**
1. Check body text on dark background:
   - Select any paragraph text
   - Inspect computed color
   - Verify contrast ratio ≥ 4.5:1 (WCAG AA)
2. Check neon headings on dark background:
   - Verify contrast ratio ≥ 7:1 (AAA if possible)
3. Check focus indicators:
   - Verify 3px neon pink outline visible against all backgrounds
4. Switch to light mode → repeat checks
5. Test reduced motion mode:
   - Enable in OS settings (`prefers-reduced-motion: reduce`)
   - Verify animations suppressed/simplified

**Expected Results:**
- ✅ Body text: ≥4.5:1 contrast (AA)
- ✅ Neon headings: ≥7:1 contrast (AAA)
- ✅ Focus indicators: 3px visible on all backgrounds
- ✅ Light mode: All ratios maintained
- ✅ Reduced motion: Animations disabled

**Pass/Fail Criteria:**
- PASS: All contrast ratios meet WCAG AA/AAA, reduced motion works
- FAIL: Contrast ratios below thresholds, focus indicators invisible

---

### Category 4: Performance Tests

#### Test 4.1: Lighthouse Audit — Portfolio Page

**Route:** `/portfolio`

**Steps:**
1. Open Chrome DevTools → Lighthouse tab
2. Select "Desktop" mode
3. Check "Performance", "Accessibility", "Best Practices", "SEO"
4. Click "Generate report"
5. Review scores

**Expected Results:**
- ✅ Performance: ≥95
- ✅ Accessibility: 100
- ✅ Best Practices: ≥90
- ✅ SEO: ≥90

**Pass/Fail Criteria:**
- PASS: Performance ≥95, Accessibility = 100
- FAIL: Performance <95, Accessibility <100

**Repeat for:**
- `/stickers` (target: same scores)
- `/blog` (target: same scores)
- `/videos` (target: same scores)

---

#### Test 4.2: Image Optimization

**Route:** `/portfolio`

**Steps:**
1. Open Chrome DevTools → Network tab
2. Filter by "Img"
3. Reload page
4. Inspect image requests:
   - Verify Unsplash images load at appropriate sizes
   - Check image format (WebP preferred)
   - Verify lazy loading (images below fold load on scroll)
5. Scroll down → verify below-fold images load
6. Check for loading states (skeletons or spinners)

**Expected Results:**
- ✅ Images served at correct dimensions (not oversized)
- ✅ Modern formats used (WebP/AVIF)
- ✅ Lazy loading working (images load on demand)
- ✅ Loading states visible during fetch

**Pass/Fail Criteria:**
- PASS: Optimized sizes, modern formats, lazy loading works
- FAIL: Oversized images, no lazy loading, no loading states

---

#### Test 4.3: Build Verification

**Commands:**
```bash
npm run type-check  # TypeScript compilation
npm run build       # Production build
npm run verify      # Link checker + env validation
```

**Steps:**
1. Run `npm run type-check` → verify no TypeScript errors
2. Run `npm run build` → verify build completes successfully
3. Check build output for warnings
4. Run `npm run verify` → verify all links valid
5. Compare bundle size before/after Phase 6 (optional)

**Expected Results:**
- ✅ TypeScript: 0 errors
- ✅ Build: Success, no errors
- ✅ Warnings: None or minimal
- ✅ Links: All valid (no 404s)

**Pass/Fail Criteria:**
- PASS: Clean build, no errors, all links valid
- FAIL: TypeScript errors, build failures, broken links

---

### Category 5: Mobile Responsiveness Tests

#### Test 5.1: Portfolio Grid Breakpoints

**Viewports:**
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px
- Desktop Wide: 1920px

**Steps:**
1. Set viewport to 375px (mobile)
   - Verify 1 column grid
   - Check card spacing (16px gap)
2. Set viewport to 768px (tablet)
   - Verify 2 column grid
   - Check gap increases to 24px
3. Set viewport to 1440px (desktop)
   - Verify 3-4 column grid
   - Check gap increases to 32px
4. Set viewport to 1920px (desktop wide)
   - Verify 4-5 column grid
   - Check max-width container applies

**Expected Results:**
- ✅ Grid adapts smoothly at breakpoints
- ✅ Column counts correct
- ✅ Gap spacing adjusts correctly
- ✅ No horizontal scroll
- ✅ Images maintain aspect ratio

**Pass/Fail Criteria:**
- PASS: Smooth breakpoint transitions, correct column counts, no overflow
- FAIL: Broken layouts, horizontal scroll, incorrect columns

---

#### Test 5.2: Stickers Grid Breakpoints

**Viewports:** Same as Test 5.1

**Steps:**
1. Mobile (375px): Verify 2 column grid
2. Tablet (768px): Verify 3 column grid
3. Desktop (1440px): Verify 4 column grid
4. Desktop Wide (1920px): Verify 4 column grid (same as desktop)
5. Check theme filter buttons:
   - Mobile: Horizontal scroll
   - Desktop: Flex wrap

**Expected Results:**
- ✅ Grid columns correct at all breakpoints
- ✅ Theme filters scroll horizontally on mobile
- ✅ Theme filters wrap on desktop
- ✅ No layout breaks

**Pass/Fail Criteria:**
- PASS: Correct column counts, filters functional on all viewports
- FAIL: Incorrect columns, filters broken on mobile

---

#### Test 5.3: Lightbox Mobile Gestures

**Device:** Touch-enabled device or Chrome DevTools touch emulation

**Steps:**
1. Open portfolio lightbox on mobile
2. Test swipe gestures:
   - Swipe left → next entry
   - Swipe right → previous entry
3. Test close button:
   - Verify large touch target (48x48px minimum)
   - Tap close button → lightbox closes
4. Test outside tap → verify lightbox closes
5. Test pinch-to-zoom → verify disabled in lightbox

**Expected Results:**
- ✅ Swipe gestures work smoothly
- ✅ Close button has large touch target
- ✅ Outside tap closes lightbox
- ✅ Pinch-to-zoom disabled
- ✅ Mobile nav buttons visible (bottom placement)

**Pass/Fail Criteria:**
- PASS: All touch gestures work, large touch targets, zoom disabled
- FAIL: Swipe broken, small touch targets, zoom interferes

---

### Category 6: Data Integrity Tests

#### Test 6.1: TypeScript Type Checking

**Command:**
```bash
npm run type-check
```

**Steps:**
1. Run type-check command
2. Review output for errors
3. If errors found, identify affected files:
   - `/data/mock/portfolio/*.ts`
   - `/data/mock/images/sticker-graphics.ts`
   - `/data/mock/ui/stickers-page.ts`
4. Fix type errors and re-run

**Expected Results:**
- ✅ 0 TypeScript errors
- ✅ All types match interface definitions
- ✅ No `any` types used (unless explicitly allowed)

**Pass/Fail Criteria:**
- PASS: Clean type-check, 0 errors
- FAIL: Type errors present

---

#### Test 6.2: Unique ID Verification

**Files to Check:**
- `/data/mock/portfolio/editorial.ts`
- `/data/mock/portfolio/uv-makeup.ts`
- `/data/mock/portfolio/festivals.ts`
- `/data/mock/portfolio/thailand.ts`
- `/data/mock/images/sticker-graphics.ts`

**Steps:**
1. Open each file
2. Extract all `id` fields
3. Check for duplicates:
   ```javascript
   // Portfolio IDs
   const portfolioIds = allPortfolioWork.map(entry => entry.id);
   const uniqueIds = new Set(portfolioIds);
   console.log(portfolioIds.length === uniqueIds.size ? 'All unique' : 'Duplicates found');
   ```
4. Repeat for sticker IDs
5. Verify all IDs follow naming convention:
   - Portfolio: kebab-case descriptive IDs (e.g., "neon-warehouse-nights")
   - Stickers: kebab-case descriptive IDs (e.g., "flower-of-life")

**Expected Results:**
- ✅ All IDs unique (no duplicates)
- ✅ IDs follow naming convention
- ✅ 38 unique portfolio IDs
- ✅ 40 unique sticker IDs

**Pass/Fail Criteria:**
- PASS: All IDs unique and correctly formatted
- FAIL: Duplicate IDs found, incorrect naming convention

---

#### Test 6.3: Date Validation

**Files to Check:**
- `/data/mock/portfolio/*.ts`
- `/data/mock/blog/posts.ts`
- `/data/mock/videos/entries.ts`

**Steps:**
1. Extract all `date` or `publishedAt` fields
2. Verify ISO 8601 format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ssZ`
3. Check date ranges:
   - Blog posts: Should span 2020-2025
   - Videos: Should span 2019-2025
   - Portfolio: Should span 2019-2024
4. Verify chronological order makes sense (optional)

**Expected Results:**
- ✅ All dates in valid ISO 8601 format
- ✅ Dates within expected ranges
- ✅ No future dates (beyond March 2, 2026)
- ✅ Backdated content historically accurate

**Pass/Fail Criteria:**
- PASS: All dates valid, ranges correct
- FAIL: Invalid date formats, dates out of range

---

#### Test 6.4: Required Fields Verification

**Data Structure Check:**

**Portfolio entries must have:**
- `id` (string)
- `slug` (string)
- `title` (string, sentence case)
- `category` (string array)
- `images` (array with at least 1 image)
- `location` (string)
- `date` (ISO 8601 string)
- `description` (string)
- `featured` (boolean, optional)

**Sticker entries must have:**
- `id` (string)
- `label` (string, sentence case)
- `src` (string, Unsplash or figma:asset)
- `alt` (string, descriptive)

**Steps:**
1. Open each data file
2. Inspect first and last entries
3. Verify all required fields present
4. Check for empty strings or null values
5. Verify sentence case compliance

**Expected Results:**
- ✅ All required fields present
- ✅ No empty strings or nulls
- ✅ Sentence case for titles/labels
- ✅ Descriptive alt text for images

**Pass/Fail Criteria:**
- PASS: All fields present and valid
- FAIL: Missing fields, empty values, incorrect case

---

### Category 7: Cross-Content Integration Tests

#### Test 7.1: Global Search

**Route:** `/search`

**Steps:**
1. Navigate to global search (`/search` or use header search)
2. Search for new blog post: "dancefloor"
   - Verify "The dancefloor gave me everything" appears in results
3. Search for new video: "ambidextrous"
   - Verify "Ambidextrous fluoro face painting" appears
4. Search for new portfolio entry: "Berghain"
   - Verify "Neon warehouse nights" (Berghain) appears
5. Search for new sticker: "ADHD"
   - Verify "ADHD brain on fire" and "Wired different" appear
6. Test combined results → verify all content types displayed

**Expected Results:**
- ✅ Global search indexes all content types
- ✅ Results from blog, videos, portfolio, stickers appear
- ✅ Search is case-insensitive
- ✅ Results link to correct detail pages
- ✅ Result count displayed

**Pass/Fail Criteria:**
- PASS: All content types searchable, results link correctly
- FAIL: Missing content types, search broken, incorrect links

---

#### Test 7.2: Analytics Tracking

**Route:** `/dev-tools/analytics`

**Steps:**
1. Visit multiple new content pages:
   - `/blog/the-dancefloor-gave-me-everything`
   - `/videos/origin-festival-2023`
   - `/portfolio/cyborg-renaissance`
2. Open Analytics Dashboard (`/dev-tools/analytics`)
3. Verify new content tracked:
   - Blog views increment
   - Video plays increment
   - Portfolio views increment
4. Check localStorage data structure:
   ```javascript
   const analytics = JSON.parse(localStorage.getItem('ash-shaw-analytics') || '{}');
   console.log(analytics);
   ```
5. Verify data visualization charts render correctly

**Expected Results:**
- ✅ New content tracked in localStorage
- ✅ View counts increment correctly
- ✅ Analytics dashboard displays data
- ✅ Charts render without errors

**Pass/Fail Criteria:**
- PASS: All content tracked, dashboard displays data
- FAIL: Tracking broken, dashboard errors, no data

---

#### Test 7.3: SEO Metadata Verification

**Routes:** Any new content detail page

**Steps:**
1. Visit `/blog/the-dancefloor-gave-me-everything`
2. Open DevTools → Elements tab
3. Inspect `<head>` section
4. Verify meta tags:
   - `<title>` contains post title
   - `<meta name="description">` present
   - `<meta property="og:title">` (Open Graph)
   - `<meta property="og:description">`
   - `<meta property="og:image">`
   - `<meta name="twitter:card">`
   - `<meta name="twitter:title">`
5. Repeat for video and portfolio detail pages
6. Verify `setSEO()` utility called in `useEffect`

**Expected Results:**
- ✅ `setSEO()` called on all detail pages
- ✅ Title, description, OG tags present
- ✅ Twitter Card tags present
- ✅ Dynamic content (title, description) correct
- ✅ Images referenced correctly

**Pass/Fail Criteria:**
- PASS: All meta tags present and correct
- FAIL: Missing tags, incorrect content, `setSEO()` not called

---

#### Test 7.4: Schema.org Structured Data

**Routes:** Any new content detail page

**Steps:**
1. Visit `/blog/neon-revelations`
2. View page source (`Ctrl+U` or `Cmd+U`)
3. Search for `<script type="application/ld+json">`
4. Verify `BlogPosting` JSON-LD present:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "BlogPosting",
     "headline": "Neon revelations",
     "author": { "@type": "Person", "name": "Ash Shaw" },
     "datePublished": "2023-08-12",
     ...
   }
   ```
5. Repeat for video pages → verify `VideoObject`
6. Repeat for portfolio pages → verify `VisualArtwork`
7. Test with Google Rich Results Validator:
   - https://search.google.com/test/rich-results
   - Paste page URL
   - Verify no errors

**Expected Results:**
- ✅ Blog posts: `BlogPosting` schema
- ✅ Videos: `VideoObject` schema
- ✅ Portfolio: `VisualArtwork` schema
- ✅ Google validator: No errors
- ✅ All required fields present

**Pass/Fail Criteria:**
- PASS: Schema present on all pages, validator clean
- FAIL: Missing schema, validator errors

---

## Success Criteria Summary

### Critical Tests (Must Pass)

- [x] Test 1.1: Portfolio page renders 38 entries ✅
- [x] Test 1.3: Stickers page renders 40 entries ✅
- [x] Test 1.4: Blog page renders 18 posts ✅
- [x] Test 1.5: Videos page renders 11 videos ✅
- [ ] Test 3.1: Keyboard navigation functional
- [ ] Test 3.2: Screen reader accessible
- [ ] Test 4.3: Build verification passes
- [ ] Test 6.1: TypeScript type-check clean

### High Priority Tests (Should Pass)

- [ ] Test 2.1: Portfolio lightbox functional
- [ ] Test 2.2: Stickers theme filtering works
- [ ] Test 2.3: Stickers search functional
- [ ] Test 2.4: Blog search/filtering works
- [ ] Test 4.1: Lighthouse scores ≥95 performance, 100 accessibility
- [ ] Test 5.1: Portfolio grid breakpoints correct
- [ ] Test 5.2: Stickers grid breakpoints correct
- [ ] Test 6.2: All IDs unique
- [ ] Test 6.3: All dates valid
- [ ] Test 7.1: Global search includes new content

### Medium Priority Tests (Nice to Have)

- [ ] Test 1.2: Featured entries display correctly
- [ ] Test 2.5: Video category filtering works
- [ ] Test 3.3: Color contrast meets WCAG AA/AAA
- [ ] Test 4.2: Image optimization effective
- [ ] Test 5.3: Mobile gestures functional
- [ ] Test 6.4: All required fields present
- [ ] Test 7.2: Analytics tracking new content
- [ ] Test 7.3: SEO metadata correct
- [ ] Test 7.4: Schema.org structured data valid

---

## Reporting Format

After completing tests, create a report in `/reports/qa-testing-phase6/` with:

**Filename:** `qa-report.md`

**Structure:**
```markdown
# QA Testing Report — Content Expansion Phase 6

**Date:** March 2, 2026
**Tester:** [Name]
**Environment:** [Browser + Version]

---

## Executive Summary

- Tests Run: [X] / [Total]
- Tests Passed: [X]
- Tests Failed: [X]
- Critical Issues: [X]
- Overall Status: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL

---

## Test Results by Category

### Category 1: Content Rendering
- Test 1.1: ✅ PASS
- Test 1.2: ✅ PASS
- ...

### Category 2: Functional Tests
- Test 2.1: ✅ PASS
- ...

[Continue for all 7 categories]

---

## Issues Found

### Critical Issues
- [List any critical issues found]

### High Priority Issues
- [List high priority issues]

### Medium/Low Priority Issues
- [List medium/low priority issues]

---

## Recommendations

- [List any recommendations for improvements]
- [Suggest fixes for failed tests]
- [Note any edge cases discovered]

---

## Screenshots

[Include screenshots of:
- Portfolio page (38 entries)
- Stickers page (40 entries)
- Lightbox examples
- Mobile layouts
- Lighthouse scores]

---

## Next Steps

- [ ] Fix critical issues
- [ ] Re-test failed tests
- [ ] Update documentation
- [ ] Deploy to staging
```

---

## Estimated Time

**Total testing time:** 2-3 hours

**Breakdown:**
- Content Rendering: 30 min
- Functional Tests: 30 min
- Accessibility Tests: 30 min
- Performance Tests: 20 min
- Mobile Tests: 20 min
- Data Integrity: 15 min
- Cross-Content: 15 min

---

## Related Files

**Task List:** [content-expansion-phase6-tasks.md](../tasks/content-expansion-phase6-tasks.md)  
**Reports Directory:** `/reports/qa-testing-phase6/`  
**Guidelines:** [Guidelines.md](../guidelines/Guidelines.md)

---

**Prompt Version:** 1.0.0  
**Created:** March 2, 2026  
**Status:** Ready for execution
