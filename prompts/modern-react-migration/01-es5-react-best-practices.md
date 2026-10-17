---
title: "ES5 React Best Practices Audit"
filename: "/prompts/modern-react-migration/01-es5-react-best-practices.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
prompt_type: "sub-prompt"
parent_orchestrator: "/prompts/modern-react-migration/00-ORCHESTRATOR.md"
estimated_duration: "45 minutes"
output_report: "/reports/2026-03-11-modern-react-migration/01-es5-react-best-practices.md"
---

# Sub-Prompt 01: ES5 React Best Practices Audit

## Purpose

Audit all React components for best practices **within ES5 constraints** imposed by the Figma Make bundler. This audit identifies opportunities to improve React patterns while respecting the strict bundler limitations.

**CRITICAL:** This is NOT about migrating to modern JSX. We are STAYING in ES5 but improving React patterns within those constraints.

---

## Scope

Scan ALL `.tsx` files in the following directories:

```
/components/
/pages/
/App.tsx
/lib/
/utils/
/hooks/
```

---

## Audit Checklist

### 1. Hook Usage Patterns

**Check for:**
- ✅ Proper useEffect cleanup (return functions for subscriptions/timers)
- ✅ Dependency arrays are complete (no missing dependencies)
- ✅ useState initial values are appropriate
- ✅ Custom hooks follow naming convention (`use*`)
- ❌ useState with complex objects (should use useReducer)
- ❌ useEffect without dependency array (infinite loops)
- ❌ Missing cleanup in useEffect (memory leaks)

**Document:**
- Components with improper hook usage
- Missing dependency warnings
- Opportunities to extract custom hooks

---

### 2. PropTypes and TypeScript Interfaces

**Check for:**
- ✅ All components have TypeScript interfaces for props
- ✅ JSDoc comments above component functions
- ✅ Proper typing for children props
- ❌ Any components (should be specific types)
- ❌ Missing prop interfaces
- ❌ Inconsistent prop naming

**Document:**
- Components missing TypeScript interfaces
- Components with `any` types
- Opportunities to create shared interfaces

---

### 3. State Management Patterns

**Check for:**
- ✅ Appropriate state location (local vs. lifted)
- ✅ useReducer for complex state
- ✅ Proper state initialization
- ❌ Prop drilling (passing props through 3+ levels)
- ❌ Duplicate state across components
- ❌ State updates that depend on previous state without updater function

**Document:**
- Components with prop drilling issues
- Opportunities to lift state
- Complex state that should use useReducer

---

### 4. React.createElement Patterns (ES5 Constraint)

**Check for:**
- ✅ Proper element nesting
- ✅ Key props on list items
- ✅ Event handlers properly bound
- ❌ Inline function creation in render (performance)
- ❌ Missing keys in lists
- ❌ Improper event handler binding

**Document:**
- Components with missing keys
- Inline functions that should be useCallback
- Event handler binding issues

---

### 5. Component Composition

**Check for:**
- ✅ Single Responsibility Principle (one job per component)
- ✅ Proper component splitting (not too large)
- ✅ Reusable components extracted
- ❌ God components (>300 lines)
- ❌ Duplicate UI patterns
- ❌ Tightly coupled components

**Document:**
- Components that should be split
- Duplicate patterns that should be extracted
- Opportunities for composition

---

### 6. Performance Patterns

**Check for:**
- ✅ useMemo for expensive calculations
- ✅ useCallback for event handlers passed to children
- ✅ React.memo for pure components
- ❌ Unnecessary re-renders
- ❌ Missing memoization
- ❌ Large lists without virtualization

**Document:**
- Components that need memoization
- Expensive calculations that should use useMemo
- Event handlers that should use useCallback

---

### 7. Error Handling

**Check for:**
- ✅ Error boundaries for component trees
- ✅ Try/catch in async operations
- ✅ Loading states
- ✅ Error states
- ❌ Uncaught promise rejections
- ❌ Missing error boundaries
- ❌ No loading indicators

**Document:**
- Components missing error handling
- Async operations without try/catch
- Missing loading/error states

---

### 8. Accessibility Within React

**Check for:**
- ✅ Semantic HTML elements
- ✅ ARIA attributes where needed
- ✅ Focus management
- ✅ Keyboard event handlers
- ❌ Divs where semantic elements should be used
- ❌ Missing ARIA labels
- ❌ No keyboard support

**Document:**
- Components with accessibility issues
- Missing ARIA attributes
- Keyboard navigation gaps

---

## Report Structure

Save findings to: `/reports/2026-03-11-modern-react-migration/01-es5-react-best-practices.md`

Use this template:

```markdown
---
title: "ES5 React Best Practices Audit Report"
filename: "/reports/2026-03-11-modern-react-migration/01-es5-react-best-practices.md"
created: "2026-03-11"
completed: "[DATE]"
version: "1.0.0"
status: "complete"
auditor: "AI Assistant"
related_prompt: "/prompts/modern-react-migration/01-es5-react-best-practices.md"
---

# ES5 React Best Practices Audit Report

**Audit Date:** [DATE]  
**Files Scanned:** [NUMBER] `.tsx` files  
**Issues Found:** [NUMBER] total issues

---

## Executive Summary

[2-3 paragraphs summarizing key findings]

**Critical Issues (P0):** [NUMBER]  
**High Priority (P1):** [NUMBER]  
**Medium Priority (P2):** [NUMBER]  
**Low Priority (P3):** [NUMBER]

---

## 1. Hook Usage Patterns

### ✅ Compliant Components ([NUMBER])
- [List components following best practices]

### ❌ Issues Found ([NUMBER])

#### Missing useEffect Cleanup
**File:** `/components/example/Component.tsx`  
**Line:** 45  
**Issue:** useEffect sets up event listener but doesn't return cleanup function  
**Priority:** P1  
**Fix:** Add return function to remove listener

[Continue for each issue category...]

---

## 2. PropTypes and TypeScript Interfaces

[Same structure as above]

---

## 3. State Management Patterns

[Same structure as above]

---

## 4. React.createElement Patterns

[Same structure as above]

---

## 5. Component Composition

[Same structure as above]

---

## 6. Performance Patterns

[Same structure as above]

---

## 7. Error Handling

[Same structure as above]

---

## 8. Accessibility Within React

[Same structure as above]

---

## Recommendations

### Immediate Actions (P0)
1. [Actionable item]
2. [Actionable item]

### High Priority (P1)
1. [Actionable item]
2. [Actionable item]

### Improvements (P2)
1. [Actionable item]
2. [Actionable item]

### Documentation (P3)
1. [Actionable item]
2. [Actionable item]

---

## Statistics

| Category | Total Files | Issues Found | Compliant |
|----------|-------------|--------------|-----------|
| Hook Usage | [N] | [N] | [N] |
| TypeScript | [N] | [N] | [N] |
| State Mgmt | [N] | [N] | [N] |
| createElement | [N] | [N] | [N] |
| Composition | [N] | [N] | [N] |
| Performance | [N] | [N] | [N] |
| Error Handling | [N] | [N] | [N] |
| Accessibility | [N] | [N] | [N] |

---

## Next Steps

1. Extract actionable items into task list
2. Prioritize fixes by severity
3. Update component guidelines with patterns found
4. Schedule remediation work

---

**Audit Completed:** [DATE]  
**Report Status:** Complete
```

---

## Success Criteria

This audit is COMPLETE when:

- [x] All `.tsx` files scanned
- [x] All 8 categories audited
- [x] Report saved to `/reports/2026-03-11-modern-react-migration/01-es5-react-best-practices.md`
- [x] YAML frontmatter status set to "complete"
- [x] Statistics section filled with accurate counts

---

## Related Documentation

**Parent Orchestrator:** [00-ORCHESTRATOR.md](./00-ORCHESTRATOR.md)

**Related Guidelines:**
- [Guidelines.md](../../guidelines/Guidelines.md) - Main project guidelines
- [Component Guidelines](../../guidelines/overview-components.md) - Component patterns
- [Bundler Constraints](../../guidelines/Guidelines.md#bundler-compatibility-rules-figma-make)

---

**Last Updated:** March 11, 2026  
**Maintained By:** Development Team
