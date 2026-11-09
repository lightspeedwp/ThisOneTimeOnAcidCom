# N002: Accessibility Checklist

**Purpose:** WCAG 2.2 AAA compliance guide and audit checklist for ensuring inclusive design across all components and pages.

**Authority:** D4 (N-Document Approvals); D3 (Design Authority: WCAG 2.2 AAA target)

---

## Overview

This checklist ensures all content and components meet WCAG 2.2 Level AAA accessibility standards:
- Perceivable: Content visible to all users
- Operable: Full keyboard navigation support
- Understandable: Clear language and predictable behavior
- Robust: Compatible with assistive technologies

**Compliance Target:** Level AAA (enhanced accessibility)  
**Related Guidelines:** See N011: Accessibility Standards for detailed implementation patterns.

---

## Content Checklist

### Perceivable

#### Color & Contrast
- [ ] **Contrast Ratio:** Minimum 7:1 for normal text, 4.5:1 for large text (AAA)
- [ ] **Color Alone:** No critical information conveyed by color alone (use patterns, icons, text)
- [ ] **Focus Indicators:** Visual focus must be 3:1 contrast with adjacent colors
- [ ] **Dark Mode:** All contrast ratios maintained in dark mode

#### Text & Typography
- [ ] **Font Size:** Minimum 16px for body text; never smaller than 14px
- [ ] **Line Height:** Minimum 1.5 for normal text, 1.3 for headings
- [ ] **Text Spacing:** Users can adjust spacing to 2x without loss of content
- [ ] **Language:** Primary language marked in HTML; language changes indicated

#### Images & Icons
- [ ] **Alt Text:** Descriptive alt text for all images (decorative images: `alt=""`; complex images: detailed description)
- [ ] **Icon Labels:** All icons have associated text or aria-label
- [ ] **Images of Text:** Avoid text in images; use real text instead

#### Media
- [ ] **Captions:** All video has synchronized captions (burned-in or standard captions)
- [ ] **Transcripts:** Audio-only content has full transcript
- [ ] **Audio Description:** Complex video has audio description track

### Operable

#### Keyboard Navigation
- [ ] **Tab Order:** Logical tab order (top→bottom, left→right)
- [ ] **Focus Trap:** Modal dialogs trap focus until closed
- [ ] **Skip Links:** Skip navigation link present and functional
- [ ] **Keyboard Only:** All functionality available via keyboard
- [ ] **No Keyboard Trap:** Users can exit any element using keyboard alone

#### Navigation & Structure
- [ ] **Consistent Navigation:** Navigation appears in consistent location across pages
- [ ] **Breadcrumbs:** Site structure clear via breadcrumbs or heading hierarchy
- [ ] **Page Titles:** Each page has unique, descriptive title
- [ ] **Landmarks:** Proper use of semantic HTML5: `<header>`, `<nav>`, `<main>`, `<footer>`

#### Forms & Input
- [ ] **Labels:** All form inputs have associated `<label>` elements
- [ ] **Error Messages:** Clear error messages linked to form fields
- [ ] **Error Recovery:** Users can correct errors and resubmit
- [ ] **Autofill:** Form fields support browser autofill

### Understandable

#### Language & Clarity
- [ ] **Reading Level:** Content at 8th-grade reading level (Flesch Reading Ease)
- [ ] **Abbreviations:** Abbreviated terms explained on first use
- [ ] **Jargon:** Technical terms either avoided or explained
- [ ] **Consistency:** Terminology consistent throughout site

#### Predictability
- [ ] **Navigation Consistency:** Navigation location and labels consistent
- [ ] **Component Behavior:** Interactions behave as expected
- [ ] **Auto-Submit:** No auto-submission of forms
- [ ] **New Windows:** Links opening new windows/tabs are identified

#### Help & Feedback
- [ ] **Error Suggestions:** Error messages provide suggestions for correction
- [ ] **Help Available:** Help and documentation accessible
- [ ] **Success Feedback:** Confirmations clear and understandable

### Robust

#### HTML & Standards
- [ ] **Valid HTML:** W3C validation passes with no errors
- [ ] **Semantic HTML:** Proper use of heading hierarchy, lists, regions
- [ ] **ARIA:** ARIA roles/properties used correctly (only when HTML is insufficient)
- [ ] **Consistency:** Consistent code patterns across application

#### Assistive Technology
- [ ] **Screen Reader:** Content tested with screen readers (NVDA, JAWS, VoiceOver)
- [ ] **Speech Input:** Controls operable via speech input
- [ ] **Browser Zoom:** Content readable at 200% zoom
- [ ] **Mobile Accessibility:** Tested with mobile screen readers

---

## Component-Level Checklist

### Buttons
- [ ] Minimum 44×44px touch target
- [ ] Clear focus state (3:1 contrast)
- [ ] Descriptive button text (avoid "Click here")
- [ ] Disabled state visible and explained

### Links
- [ ] Underlined or sufficient color contrast
- [ ] Focus state visible
- [ ] Descriptive link text
- [ ] External links indicated

### Forms
- [ ] Associated labels for all inputs
- [ ] Error messages tied to fields
- [ ] Success confirmation provided
- [ ] Help text for complex fields

### Navigation
- [ ] Keyboard accessible
- [ ] Current page indicated
- [ ] Skip links present
- [ ] Menu keyboard support (arrow keys)

### Images
- [ ] Descriptive alt text
- [ ] Decorative images hidden from screen readers
- [ ] Complex images have longer description
- [ ] Text in images is readable at 200% zoom

### Video/Audio
- [ ] Captions for all video
- [ ] Audio description track
- [ ] Player controls keyboard accessible
- [ ] Transcript provided

---

## Audit Process

### Manual Audit (Monthly)
1. Test with keyboard only
2. Test with screen reader (NVDA or VoiceOver)
3. Test at 200% zoom
4. Check color contrast with Contrast Analyzer
5. Verify heading hierarchy
6. Test form error handling

### Automated Testing
- Run axe DevTools scan
- Run Lighthouse accessibility audit
- Validate HTML with W3C validator
- Test with WAVE browser extension

### User Testing
- Conduct testing with users who have disabilities
- Gather feedback on readability and navigation
- Document issues and create remediation plan

---

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Axe DevTools](https://www.deque.com/axe/devtools/)
- [NVDA Screen Reader](https://www.nvaccess.org/)

---

## Sign-Off

- [ ] **Development:** All items checked before PR
- [ ] **Review:** Accessibility reviewer verifies checklist
- [ ] **QA:** QA tests with screen reader and keyboard
- [ ] **Deployment:** Lighthouse audit ≥90 before production

---

**Authority:** D4 (N-Document Approvals) | D3 (WCAG 2.2 AAA target)  
**Last Updated:** 2026-11-09  
**Related:** N011: Accessibility Standards · N001: Design Token Reference · N003: Component Documentation
