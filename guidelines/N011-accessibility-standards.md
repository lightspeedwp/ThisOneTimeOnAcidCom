# N011: Accessibility Standards

**Purpose:** WCAG 2.2 AAA compliance targets, implementation patterns, and detailed accessibility requirements.

**Authority:** D4 (N-Document Approvals); D3 (Design Authority: WCAG 2.2 AAA)

---

## WCAG 2.2 AAA Targets

### Perceivable

**Color Contrast:**
- Normal text: 7:1 ratio (AAA)
- Large text (18pt+): 4.5:1 ratio (AAA)
- Graphical elements: 3:1 ratio (AAA)

**Text Sizing:**
- Minimum 16px for body text
- Allow 200% zoom without content loss
- Adjustable spacing (2x default)

### Operable

**Keyboard Support:**
- All functionality available via keyboard
- Logical tab order (top-to-bottom, left-to-right)
- No keyboard traps
- Focus indicators visible (3:1 contrast)

**Touch Targets:**
- Minimum 44×44px (WCAG 2.5.5)
- Adequate spacing between targets

### Understandable

**Language Clarity:**
- Primary language marked in HTML
- Clear, simple language (8th-grade reading level)
- Abbreviations explained
- Predictable navigation

### Robust

**Standards Compliance:**
- Valid HTML per W3C
- Semantic HTML5 usage
- Proper ARIA roles
- No circular reference chains

---

## Implementation Checklist

- [ ] Color contrast tested (WebAIM Contrast Checker)
- [ ] Keyboard navigation tested (Tab through all elements)
- [ ] Screen reader tested (NVDA, JAWS, VoiceOver)
- [ ] Zoom tested at 200%
- [ ] Mobile accessibility verified
- [ ] All form fields have labels
- [ ] Error messages provide suggestions
- [ ] Focus indicators visible
- [ ] Alt text for all images
- [ ] Captions for video

See [N002: Accessibility Checklist](#) for full checklist.

---

**Authority:** D4 (N-Document Approvals) | D3 (WCAG 2.2 AAA)  
**Last Updated:** 2026-11-09  
**Related:** [N002: Accessibility Checklist](#) · [N001: Design Token Reference](#)
