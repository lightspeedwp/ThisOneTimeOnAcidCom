---
name: "Test Execution Skill"
description: "Executes and validates tests for ThisOneTimeOnAcidCom portfolio site."
type: "skill"
category: "quality"
enabled: true
tags: ["testing", "validation", "qa", "playwright"]
---

# Test Execution Skill

## Purpose

Execute tests and validate test coverage for portfolio site functionality and quality.

## Current Test Status

**⚠️ Note:** No test runner is currently configured in `package.json`. The repository has no `test` script available.

When a test suite is established, this skill will support:

## Planned Test Types

### Unit Tests
- Component logic and hooks
- Utility functions
- Data transformations

### Integration Tests
- Component interactions
- Routing and navigation
- Data flow and state management

### E2E Tests (Playwright)
- User workflows
- Navigation paths
- Portfolio content display
- Responsive behavior
- Dark mode rendering

### Content Tests
- Link integrity validation
- Image asset loading
- Mock data correctness
- Metadata completeness

## When to Use

- **Before PR:** Run tests locally to validate changes
- **On PR:** Automated test execution in CI
- **Before Release:** Ensure no regressions
- **After Dependency Update:** Validate compatibility

## Test Coverage Areas

- Core navigation and routing
- Portfolio content display
- Responsive layouts (mobile, tablet, desktop)
- Dark mode implementation
- Accessibility compliance
- Performance thresholds

## Test Strategy

Until a test suite is established:

1. **Manual Testing** – Use browser for QA
2. **Build Validation** – Use build skill to catch errors
3. **Linting** – Use validation skill for code quality
4. **Type Checking** – TypeScript compiler validates types

## Future Implementation

When tests are added:

1. Define test scope and coverage goals
2. Set up test runner (Vitest, Playwright, etc.)
3. Create test structure and fixtures
4. Add test scripts to package.json
5. Integrate with CI/CD pipeline

## Testing Resources

- [Playwright](https://playwright.dev/) – E2E testing framework
- [Vitest](https://vitest.dev/) – Unit test runner (if added)
- `guidelines/Guidelines.md` – Testing requirements
- `CONTRIBUTING.md` – Testing conventions

## Related Skills

- [Build Validation Skill](../build/SKILL.md)
- [Validation Skill](../validate/SKILL.md)

---

*Test execution and quality validation for portfolio site. Currently in planning stage.*
