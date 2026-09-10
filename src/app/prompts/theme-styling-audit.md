# Theme Styling Audit & Enhancement Prompt

**Created:** March 11, 2026  
**Purpose:** Comprehensive audit and enhancement of light/dark mode theme styling  
**Status:** Ready to execute  

---

## Objective

Conduct a thorough audit of all light and dark mode styles across the entire codebase to ensure:
1. **Complete theme coverage** - All components properly styled in both modes
2. **Consistent design language** - Cohesive visual identity across modes
3. **WCAG compliance** - Maintain accessibility standards
4. **Polish and refinement** - Elevate visual quality to production excellence

---

## Scope

### Files to Audit

1. **Theme Files (Primary)**
   - `/styles/themes/dark.css` (400+ lines)
   - `/styles/themes/light.css` (265+ lines)

2. **Component CSS Files** (~87 files)
   - All files in `/styles/blocks/`
   - All files in `/styles/sections/`
   - All files in `/styles/ui/`

3. **Global Styles**
   - `/styles/globals.css`

---

## Audit Checklist

### 1. Header & Navigation ✅

**Current Status:**
- [x] Header background (dark: `rgba(15, 15, 15, 0.95)`, light: `rgba(255, 255, 255, 0.95)`)
- [x] Logo color (dark: `#F6F2EB`, light: `#1A1A1A`)
- [x] Nav links (dark: muted, light: `#4A4A4A`)
- [x] Hover states (dark: neon pink, light: `#D4008C`)
- [x] Mobile menu (dark/light)
- [ ] Mega menus review needed

**Action Items:**
- Review mega menu contrast in both modes
- Verify dropdown shadows work in both modes
- Check focus indicators on all interactive elements

---

### 2. Footer ✅

**Current Status:**
- [x] Background (dark: atomic black, light: neutral-50)
- [x] Text colors (dark: white, light: dark text)
- [x] Link colors and hover states
- [x] Social icons contrast

**Action Items:**
- Verify all footer links readable in both modes
- Check copyright text visibility

---

### 3. Buttons & CTAs

**Current Status:**
- [x] Primary button gradients (both modes)
- [x] Hover states defined
- [ ] Secondary buttons - need review
- [ ] Ghost buttons - need review
- [ ] Disabled states - need review

**Action Items:**
- Audit all button variants (`primary`, `secondary`, `ghost`, `outline`, `text`)
- Verify hover, focus, active, and disabled states
- Ensure consistent gradient usage
- Check button text contrast ratios

---

### 4. Cards & Panels

**Current Status:**
- [ ] Blog cards - need audit
- [ ] Portfolio cards - need audit
- [ ] Video cards - need audit
- [ ] Podcast cards - need audit
- [ ] Event cards - need audit

**Action Items:**
- Audit all card backgrounds (elevated panels)
- Check card border colors
- Verify card hover states
- Review card shadows in both modes
- Ensure tag/category badges readable

---

### 5. Forms & Inputs

**Current Status:**
- [ ] Input backgrounds - need review
- [ ] Input borders - need review
- [ ] Input text colors - need review
- [ ] Placeholder text - need review
- [ ] Focus states - need review
- [ ] Error states - need review
- [ ] Success states - need review

**Action Items:**
- Audit all form input types (text, textarea, select, checkbox, radio)
- Verify focus rings visible and accessible
- Check validation state colors
- Ensure label contrast
- Review disabled input styling

---

### 6. Typography & Text

**Current Status:**
- [x] Primary text: dark `#F6F2EB` (14.8:1), light `#1A1A1A` (16.1:1)
- [x] Secondary text: dark `#CFC7BB` (10.2:1), light `#4A4A4A` (9.7:1)
- [x] Tertiary text: dark `#9C9488`, light `#6B6B6B`
- [ ] Heading hierarchy - need audit
- [ ] Link styles - need review
- [ ] Code blocks - need review

**Action Items:**
- Verify all heading levels (h1-h6) in both modes
- Check link color and hover states
- Audit code block styling
- Review blockquote styling
- Ensure proper emphasis (strong, em) visibility

---

### 7. Lists & Navigation Elements

**Current Status:**
- [ ] Unordered lists - need review
- [ ] Ordered lists - need review
- [ ] Definition lists - need review
- [ ] Breadcrumbs - need review
- [ ] Pagination - need review
- [ ] Table of contents - need review

**Action Items:**
- Audit list marker colors
- Check breadcrumb separators and links
- Verify pagination active/inactive states
- Review nested list indentation and contrast

---

### 8. Tables

**Current Status:**
- [ ] Table headers - need review
- [ ] Table rows - need review
- [ ] Table borders - need review
- [ ] Striped rows - need review
- [ ] Hover states - need review

**Action Items:**
- Audit table header background and text
- Check alternating row colors
- Verify table border visibility
- Review hover state for interactive tables
- Ensure cell padding and readability

---

### 9. Modals & Overlays

**Current Status:**
- [ ] Modal backgrounds - need review
- [ ] Modal borders - need review
- [ ] Close buttons - need review
- [ ] Overlay/backdrop - need review
- [ ] Modal shadows - need review

**Action Items:**
- Verify modal backdrop opacity
- Check modal content contrast
- Audit close button visibility
- Review modal header/footer styling
- Ensure keyboard focus trap visible

---

### 10. Alerts & Notifications

**Current Status:**
- [ ] Success alerts - need review
- [ ] Warning alerts - need review
- [ ] Error alerts - need review
- [ ] Info alerts - need review

**Action Items:**
- Define alert background colors for both modes
- Verify alert icon visibility
- Check alert text contrast
- Review alert border and shadow
- Ensure alert close button accessible

---

### 11. Badges & Tags

**Current Status:**
- [ ] Category badges - need review
- [ ] Tag chips - need review
- [ ] Status badges - need review
- [ ] Count badges - need review

**Action Items:**
- Audit all badge background colors
- Check badge text contrast (minimum 4.5:1)
- Verify badge borders
- Review badge hover states (if interactive)
- Ensure consistent sizing

---

### 12. Icons & Graphics

**Current Status:**
- [x] Phosphor icons using currentColor
- [ ] SVG graphics - need review
- [ ] Icon buttons - need review
- [ ] Decorative icons - need review

**Action Items:**
- Verify icon color inheritance
- Check icon button backgrounds
- Audit decorative icon visibility
- Review icon sizes in both modes
- Ensure icon hover states

---

### 13. Borders & Dividers

**Current Status:**
- [x] Primary border: dark `#333333`, light `#E5E5E5`
- [x] Divider color: dark `#222222`, light `#F0F0F0`
- [ ] Section dividers - need review
- [ ] Content separators - need review

**Action Items:**
- Audit all horizontal rules (hr)
- Check vertical dividers
- Verify border usage consistency
- Review border weights (1px vs 2px)

---

### 14. Shadows & Depth

**Current Status:**
- [x] Shadow levels defined (sm, md, lg, xl)
- [ ] Card shadows - need review
- [ ] Button shadows - need review
- [ ] Dropdown shadows - need review
- [ ] Modal shadows - need review

**Action Items:**
- Verify shadow visibility in both modes
- Check shadow colors (dark vs light adjustments)
- Audit elevation hierarchy consistency
- Review hover shadow effects

---

### 15. Backgrounds & Surfaces

**Current Status:**
- [x] Base background: dark `#0F0F0F`, light `#FFFFFF`
- [x] Elevated surface: dark `#1A1A1A`, light `#FAFAFA`
- [x] Hover surface: dark `#242424`, light `#F5F5F5`
- [ ] Panel backgrounds - need review
- [ ] Section backgrounds - need review

**Action Items:**
- Audit all section backgrounds
- Check panel/card backgrounds
- Verify sidebar backgrounds
- Review hero section backgrounds
- Ensure surface hierarchy consistent

---

### 16. Gradients

**Current Status:**
- [x] Primary gradient: Cyberpunk (pink→blue)
- [x] Secondary gradients defined
- [ ] Button gradients - need review
- [ ] Hero gradients - need review
- [ ] Background gradients - need review

**Action Items:**
- Verify gradient visibility in both modes
- Check gradient text (background-clip: text)
- Audit gradient button hover states
- Review gradient opacity in light mode
- Ensure gradient accessibility

---

### 17. Animations & Transitions

**Current Status:**
- [x] 26 keyframe animations defined
- [x] prefers-reduced-motion support
- [ ] Transition durations - need review
- [ ] Hover animations - need review

**Action Items:**
- Verify transition smoothness
- Check animation performance
- Audit hover effect timings
- Review loading state animations
- Ensure reduced motion fallbacks

---

### 18. Special Components

#### 18.1 Ebook Reader

**Current Status:**
- [x] Dark mode: 9.5:1 to 12.6:1 contrast
- [x] Light mode: 16.1:1 to 21:1 contrast
- [x] Page backgrounds optimized
- [ ] Page turn animations - need review
- [ ] TOC drawer - need review

**Action Items:**
- Verify ebook controls visibility
- Check page number contrast
- Audit chapter headings
- Review progress indicator
- Ensure bookmark UI accessible

#### 18.2 Lightbox/Gallery

**Current Status:**
- [ ] Lightbox backdrop - need review
- [ ] Image borders - need review
- [ ] Navigation arrows - need review
- [ ] Close button - need review
- [ ] Thumbnail grid - need review

**Action Items:**
- Audit lightbox backdrop opacity
- Check navigation arrow visibility
- Verify close button contrast
- Review thumbnail hover states
- Ensure keyboard focus visible

#### 18.3 Video Player

**Current Status:**
- [ ] Player controls - need review
- [ ] Progress bar - need review
- [ ] Volume slider - need review
- [ ] Fullscreen button - need review

**Action Items:**
- Audit player control visibility
- Check progress bar contrast
- Verify hover states on controls
- Review loading spinner
- Ensure focus indicators

#### 18.4 Search & Filters

**Current Status:**
- [ ] Search input - need review
- [ ] Filter buttons - need review
- [ ] Active filter states - need review
- [ ] Clear filters button - need review

**Action Items:**
- Verify search input styling
- Check filter pill backgrounds
- Audit active/inactive states
- Review dropdown filter styling
- Ensure clear button visible

#### 18.5 Tabs & Accordions

**Current Status:**
- [ ] Tab buttons - need review
- [ ] Active tab indicator - need review
- [ ] Tab panel content - need review
- [ ] Accordion headers - need review
- [ ] Accordion expand icons - need review

**Action Items:**
- Audit tab button styling
- Check active tab underline/border
- Verify accordion header contrast
- Review expand/collapse icons
- Ensure focus states visible

---

### 19. Scrollbars

**Current Status:**
- [ ] Scrollbar track - need review
- [ ] Scrollbar thumb - need review
- [ ] Scrollbar hover - need review

**Action Items:**
- Define custom scrollbar styles for both modes
- Verify scrollbar visibility
- Check scrollbar width consistency
- Review hover states

---

### 20. Text Selection

**Current Status:**
- [ ] Selection background - need review
- [ ] Selection text color - need review

**Action Items:**
- Define `::selection` for both modes
- Ensure selection contrast meets WCAG
- Verify selection visibility on neon backgrounds

---

## Enhancement Opportunities

### Visual Polish

1. **Consistent Elevation System**
   - Define clear elevation levels (0-5)
   - Map shadows to elevation consistently
   - Apply across all cards/panels

2. **Refined Hover States**
   - Subtle scale transforms (1.02)
   - Shadow depth increase
   - Border glow effects (dark mode)
   - Smooth transitions (200-300ms)

3. **Focus Indicators**
   - Neon pink glow in dark mode
   - Dark pink solid in light mode
   - 3px width, 4px offset
   - Consistent across all focusable elements

4. **Loading States**
   - Skeleton loaders with proper colors
   - Spinner animations
   - Progress indicators
   - Shimmer effects

5. **Empty States**
   - Proper messaging
   - Icon visibility
   - CTA button styling
   - Background contrast

---

## WCAG Compliance Requirements

### Text Contrast

| Element | Dark Mode | Light Mode | Target |
|---------|-----------|------------|--------|
| Primary text | 14.8:1+ | 16.1:1+ | AAA (7:1) |
| Secondary text | 10.2:1+ | 9.7:1+ | AAA (7:1) |
| Large text | 6.5:1+ | 7.0:1+ | AA (4.5:1) |
| UI controls | 4.5:1+ | 4.5:1+ | AA (3:1) |
| Focus indicators | 3:1+ | 3:1+ | AA (3:1) |

### Interactive Elements

- **Hover states:** Clear visual change
- **Focus states:** 3px outline, 4px offset
- **Active states:** Distinct from hover
- **Disabled states:** Obvious (50% opacity or grayed)

### Color Usage

- **Never color alone:** Use icons/text/patterns
- **Sufficient contrast:** All text 4.5:1 minimum
- **Consistent meaning:** Same colors = same function
- **Accessible palettes:** Test with color-blind simulators

---

## Testing Checklist

### Visual Testing

- [ ] All pages in dark mode
- [ ] All pages in light mode
- [ ] Toggle between modes on each page
- [ ] Check all interactive elements in both modes
- [ ] Verify all hover states
- [ ] Test all focus states

### Contrast Testing

- [ ] Run contrast checker on all text
- [ ] Verify all UI controls meet 3:1
- [ ] Check all focus indicators meet 3:1
- [ ] Test with color-blind simulator

### Cross-Browser Testing

- [ ] Chrome (dark/light)
- [ ] Firefox (dark/light)
- [ ] Safari (dark/light)
- [ ] Edge (dark/light)

### Device Testing

- [ ] Desktop 1920px (dark/light)
- [ ] Desktop 1440px (dark/light)
- [ ] Tablet 768px (dark/light)
- [ ] Mobile 375px (dark/light)

---

## Implementation Strategy

### Phase 1: Foundation (Core Elements)

1. Complete button audit and fixes
2. Complete form/input audit and fixes
3. Complete card/panel audit and fixes
4. Complete typography audit and fixes

**Estimated Time:** 2-3 hours  
**Priority:** HIGH  

### Phase 2: Components (UI Elements)

1. Complete table audit and fixes
2. Complete list/navigation audit and fixes
3. Complete badge/tag audit and fixes
4. Complete modal/overlay audit and fixes

**Estimated Time:** 2-3 hours  
**Priority:** MEDIUM  

### Phase 3: Special Features (Complex Components)

1. Complete ebook reader polish
2. Complete lightbox/gallery polish
3. Complete video player polish
4. Complete search/filter polish

**Estimated Time:** 2-3 hours  
**Priority:** MEDIUM  

### Phase 4: Polish (Final Touches)

1. Implement enhanced hover states
2. Add loading states
3. Add empty states
4. Refine scrollbars
5. Optimize text selection

**Estimated Time:** 1-2 hours  
**Priority:** LOW  

---

## Success Criteria

### Quality Metrics

- [ ] **100% coverage:** All components styled in both modes
- [ ] **WCAG AA:** All text meets 4.5:1 minimum contrast
- [ ] **Consistency:** Design language cohesive across modes
- [ ] **Polish:** Production-quality visual refinement
- [ ] **Performance:** No visual jank or flash on theme toggle

### User Experience

- [ ] **Seamless switching:** No jarring transitions
- [ ] **Intuitive:** Mode differences feel natural
- [ ] **Accessible:** All features usable in both modes
- [ ] **Delightful:** Subtle animations enhance experience

### Technical

- [ ] **BEM architecture:** All styles follow conventions
- [ ] **No inline styles:** All styling via CSS classes
- [ ] **Maintainable:** Clear organization and documentation
- [ ] **Performant:** Efficient CSS, minimal specificity

---

## Reporting

After completion, create:

1. **Audit Report:** `/reports/theme-styling-audit/findings.md`
   - All issues found
   - All fixes applied
   - Before/after comparisons
   - WCAG compliance verification

2. **Enhancement Summary:** `/reports/theme-styling-audit/enhancements.md`
   - Visual polish improvements
   - New features added
   - Performance optimizations

3. **Testing Results:** `/reports/theme-styling-audit/testing.md`
   - Visual testing results
   - Contrast testing results
   - Cross-browser results
   - Device testing results

4. **Task List:** `/tasks/theme-styling-tasks.md`
   - Actionable checklist
   - Priority assignments
   - Progress tracking

---

## Notes

- Follow strict BEM architecture
- No Tailwind utility classes
- No inline styles (except CSS custom properties for animations)
- All changes must maintain ES5 bundler compliance
- Document all significant changes in code comments
- Create visual regression screenshots before/after major changes

---

**Prompt Ready:** ✅ Yes  
**Estimated Total Time:** 7-11 hours  
**Complexity:** Medium-High  
**Impact:** High (Production Polish)
