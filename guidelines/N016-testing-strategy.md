# N016: Testing Strategy Guidelines

**Document ID:** N016  
**Category:** Organization (Testing)  
**Authority:** D4 (N-Document Approvals); Constitution VII (Jest ESM, Playwright E2E, Bats shell tests)  
**Last Updated:** 2026-11-09

## Purpose

Define testing approach across unit, integration, and end-to-end testing for ThisOneTimeOnAcidCom with emphasis on reliability and maintainability.

## Testing Pyramid

```typescript
        E2E (Playwright)          5-10% of tests
      Integration Tests           20-30% of tests
    Unit Tests (Jest)            60-70% of tests
```typescript

## Unit Tests (Jest with @swc/core)

### Test Structure

```typescript
describe('BookService', () => {
  describe('getBook', () => {
    it('should fetch a book by slug', async () => {
      const book = await bookService.getBook('jungle-book');
      expect(book.title).toBe('The Jungle Book');
    });

    it('should return null for non-existent book', async () => {
      const book = await bookService.getBook('non-existent');
      expect(book).toBeNull();
    });
  });
});
```typescript

### Coverage Targets

- Statements: ≥80%
- Branches: ≥75%
- Functions: ≥80%
- Lines: ≥80%

### Running Tests

```bash
npm test                                    # Run all tests
npm test -- --watch                         # Watch mode
npm test -- --coverage                      # Coverage report
npm test -- scripts/_tests_/test-*.js      # Run specific test file
```typescript

## Integration Tests

### API Testing

```typescript
// Test tRPC endpoints with actual database
describe('book.getById', () => {
  it('should return book with related data', async () => {
    const caller = createCaller({ session: user });
    const book = await caller.book.getById({ id: bookId });
    expect(book.chapters).toHaveLength(5);
    expect(book.author).toBeDefined();
  });
});
```typescript

### Database Testing

- Use test database fixtures for consistency
- Wrap tests in transactions that rollback after test
- Test with realistic data volumes

## End-to-End Tests (Playwright)

### E2E Test Examples

```typescript
test('user can read a book and add to journal', async ({ page }) => {
  // Navigate to book
  await page.goto('/book/jungle-book');
  await expect(page.locator('h1')).toContainText('The Jungle Book');

  // Add to reading list
  await page.click('button:has-text("Add to Reading")');
  await expect(page.locator('[data-testid="toast"]')).toContainText('Added');

  // Navigate to journal
  await page.click('a[href="/journal"]');
  await expect(page).toHaveURL('/journal');
});
```typescript

### Running Playwright Tests

```bash
npm test -- --grep "playwright" # Run only E2E tests
npx playwright show-report      # View test report
```typescript

## Shell Script Testing (Bats)

### Build Verification

```bash
#!/usr/bin/env bats

@test "build succeeds" {
  npm run build
}

@test "build output contains bundle.js" {
  [ -f dist/bundle.js ]
}
```typescript

## Test Scenarios

### Happy Path Testing

- Test primary user flows end-to-end
- Verify success conditions and UI feedback

### Error Handling

- Test validation errors with invalid input
- Test 404 errors for missing resources
- Test network failures gracefully

### Edge Cases

- Boundary values (empty strings, max length)
- Concurrent operations
- Timeout scenarios
- Mobile viewport handling

## CI/CD Integration

- All tests run on PR creation
- Tests must pass before merge
- Coverage reports generate on each run
- Performance benchmarks tracked over time

## Test Maintenance

- Update tests when requirements change
- Remove flaky tests or make them deterministic
- Keep test data realistic and minimal
- Use data factories for complex objects

## See Also

- **N003:** Component Library (testable component patterns)
- **Guidelines.md:** Development workflow and Spec Kit regression testing
- Constitution VII: Testing Infrastructure requirements
