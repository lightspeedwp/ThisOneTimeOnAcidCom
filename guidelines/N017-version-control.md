# N017: Version Control & Git Workflow Guidelines

**Document ID:** N017  
**Category:** Organization (Version Control)  
**Authority:** D4 (N-Document Approvals); CLAUDE.md branch naming patterns  
**Last Updated:** 2026-11-09

## Purpose

Define Git workflow, branch naming conventions, commit standards, and pull request practices for ThisOneTimeOnAcidCom.

## Branch Naming

### Pattern

```typescript
{type}/{scope}-{title}
```typescript

### Types

- `feat/` — New feature
- `fix/` — Bug fix
- `docs/` — Documentation
- `refactor/` — Code refactoring
- `test/` — Test additions/updates
- `perf/` — Performance optimization
- `chore/` — Maintenance tasks

### Examples

```typescript
feat/book-detail-page          # New feature: book detail page
fix/form-validation-error      # Bug fix: form validation
docs/spec-001-governance       # Documentation: governance spec
refactor/state-management      # Refactoring: state management
test/book-service-coverage     # Test: increase coverage
perf/image-optimization        # Performance: optimize images
```typescript

### Forbidden Prefixes

❌ `claude/` — Reserved for Claude Code  
❌ `copilot/` — Reserved for GitHub Copilot  
❌ `main` or `develop` — Protected branches

### Validation

```bash
npm run validate:branch-name              # Validate current branch
npm run validate:branch-name -- --branch feat/my-feature  # Validate specific branch
```typescript

## Commit Message Format

### Structure

```typescript
{type}({scope}): {subject} — {brief rationale}

{detailed explanation if needed}

Relates to: TOA-{issue_number}
Co-Authored-By: {contributor} <email>
```typescript

### Example

```typescript
feat(book): Add book detail page with related recommendations

Implements the book detail page showing full book information,
chapter preview, and related book recommendations based on genre.

Relates to: TOA-123
Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```typescript

## Pull Request Workflow

### Pre-PR Checklist

- [ ] Branch name follows pattern
- [ ] Branch is up-to-date with develop
- [ ] All tests pass (`npm test`)
- [ ] Code is formatted (`npm run format`)
- [ ] No console warnings or errors
- [ ] Commit messages are descriptive

### PR Template

```markdown
## Summary
Brief description of changes

## Test Plan
- [ ] Manual testing completed
- [ ] Unit tests pass
- [ ] E2E tests pass

## Related Issues
Closes #123
Relates to: TOA-456
```typescript

## Commit Best Practices

### Atomic Commits

- One logical change per commit
- Each commit should be buildable and testable
- Small commits are easier to review and revert

### Commit Types

```typescript
feat:     Add new feature
fix:      Fix bug
docs:     Documentation changes
style:    Code style (formatting, etc.)
refactor: Refactor existing code
test:     Test additions/updates
perf:     Performance improvements
chore:    Maintenance, dependencies
```typescript

### Avoiding Issues

✅ Use descriptive messages  
✅ Reference related issues  
✅ Explain the "why" not just the "what"  
❌ Don't include unrelated changes  
❌ Don't make giant commits  
❌ Don't force push to shared branches

## Protected Branches

### `main`

- Production release branch
- Requires PR review and passing CI
- Only merge from `develop` or hotfix branches
- All releases tagged from main

### `develop`

- Integration branch for features
- All feature branches merge here
- CI must pass before merge
- Used for staging deployments

## Merging Strategy

### Feature Branch → Develop

```bash
git fetch origin
git checkout feat/my-feature
git rebase origin/develop          # Rebase to keep history clean
git push --force-with-lease        # Safe force push
# Create PR and merge via GitHub UI
```typescript

### Develop → Main (Release)

```bash
git fetch origin
git checkout main
git merge --no-ff origin/develop   # Merge commit for release history
git tag v1.2.3                     # Tag the release
git push origin main --tags
```typescript

## Lefthook Pre-Commit Hooks

Automatic checks before commit:

- Branch name validation
- Commit message linting
- Code formatting (Prettier)
- Linting (ESLint)
- Type checking (TypeScript)

Bypass with caution: `git commit --no-verify` (not recommended)

## Undoing Changes

### Before Commit

```bash
git restore path/to/file           # Discard uncommitted changes
git restore --staged path/to/file  # Unstage a file
```typescript

### After Commit

```bash
git revert HEAD                    # Create new commit that undoes last commit
git reset --soft HEAD~1            # Undo last commit, keep changes staged
git reset --hard HEAD~1            # Undo last commit, discard changes
```typescript

## See Also

- **CLAUDE.md:** Repository-specific branch naming
- **Guidelines.md:** Development workflow
- **N014:** Forms & Validation (commit examples)
