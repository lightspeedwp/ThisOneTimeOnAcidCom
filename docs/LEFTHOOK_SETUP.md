# Lefthook Setup & Troubleshooting

This document covers installation, local configuration, troubleshooting, and rollback of Lefthook git hooks.

## Overview

Lefthook runs local Git validations to catch issues before they reach the remote repository:

- **`pre-commit`** — Validates journal markdown structure on staged files before each commit
- **`pre-push`** — Runs production build to ensure deployable code before pushing to remote

All hooks can be bypassed by git when needed (see **Bypassing Hooks** below).

## Installation

### Automatic (Recommended)

Lefthook installs automatically via npm's lifecycle script:

```bash
npm install
```

This runs `npm run postinstall`, which executes `lefthook install` and configures git hooks.

### Manual Installation

If the automatic installation doesn't create git hooks:

```bash
npx lefthook install
```

Verify hooks are installed:

```bash
ls -la .git/hooks/
```

You should see `pre-commit` and `pre-push` hook files.

## Validation Behaviour

### Pre-Commit: Journal Markdown Validation

Runs when committing changes to `src/content/**/*.md`:

```bash
npm run journal:validate
```

**What it checks:**
- Markdown frontmatter validity (YAML structure)
- Required fields (title, date, author)
- Link integrity within the journal

**Skip conditions:**
- Only runs on staged `.md` files in `src/content/`
- Automatically skipped during `git merge` or `git rebase`

**Example:**

```bash
# Valid commit — passes
git add src/content/post.md
git commit -m "Add new post"
# ✓ Pre-commit hook runs and passes

# Invalid commit — fails
git add src/content/broken.md  # Has malformed YAML
git commit -m "Add broken post"
# ✗ Hook blocks commit, shows validation errors
```

### Pre-Push: Production Build Verification

Runs `npm run build` before pushing to remote:

```bash
npm run build
```

**What it checks:**
- TypeScript compilation success
- Vite bundler output
- No build errors that would break deployment

**Skip conditions:**
- Skipped during rebase or merge operations
- Can be bypassed (see below)

**Example:**

```bash
git push origin my-feature
# ✗ Build fails
# Error: TypeScript compilation error in src/app/...
# Pushing blocked

# Fix the error
git add .
git commit -m "Fix TypeScript error"

# Retry push
git push origin my-feature
# ✓ Build passes, push succeeds
```

## Bypassing Hooks

### When It's Safe to Bypass

- **Work in progress (WIP):** saving intermediate changes before a refactor
- **CI validation:** pushing to a branch where CI runs additional checks
- **Emergency hotfixes:** urgent production fix where you're confident in the code

### How to Bypass

Use `--no-verify` with git commands:

```bash
# Skip pre-commit hook
git commit --no-verify -m "WIP: partial changes"

# Skip pre-push hook
git push --no-verify

# Skip both
git commit --no-verify -m "msg" && git push --no-verify
```

### Recommended Practice

**Never skip hooks without explicit reason.** If you find yourself repeatedly using `--no-verify`, the issue is usually upstream:

- **Broken build?** Fix it in your branch; do not skip the check
- **Slow validation?** Run it locally first to debug
- **False positives?** Report the issue in the repository

## Troubleshooting

### Hooks Not Running

**Problem:** You committed/pushed but hooks didn't run.

**Solutions:**

1. **Verify installation:**
   ```bash
   npx lefthook install
   ```

2. **Check hook files exist:**
   ```bash
   ls -la .git/hooks/ | grep -E "pre-commit|pre-push"
   ```
   
   Should show executable files like:
   ```
   -rwxr-xr-x  1 user  group  lefthook
   ```

3. **Check `.lefthook-local.yml` isn't disabling hooks:**
   ```bash
   cat .lefthook-local.yml 2>/dev/null || echo "No local overrides"
   ```

4. **Manually run a hook to test:**
   ```bash
   npx lefthook run pre-commit
   ```

### "Command Not Found" Error

**Problem:** Pre-commit or pre-push fails with `npm: command not found` or `tsx: command not found`.

**Solution:** Ensure dependencies are installed:

```bash
npm install
npx lefthook install
```

If still failing, try running the validation manually:

```bash
npm run journal:validate
npm run build
```

If manual run works but hook fails, reinstall lefthook:

```bash
rm -rf .git/hooks/pre-commit .git/hooks/pre-push
npx lefthook install
```

### Hook Runs but Validation Passes Locally, Fails in Hook

**Problem:** `npm run journal:validate` passes in terminal but fails in pre-commit hook.

**Likely cause:** Different working directory or environment.

**Solution:**

1. Check what files are actually staged:
   ```bash
   git diff --cached --name-only
   ```

2. Run validation on staged files explicitly:
   ```bash
   npm run journal:validate -- src/content/specific-file.md
   ```

3. Clear npm cache:
   ```bash
   npm cache clean --force
   npm install
   npx lefthook install
   ```

### Build Hook Slow or Timing Out

**Problem:** Pre-push build takes >30s or times out.

**Solution:**

1. Run build locally to benchmark:
   ```bash
   time npm run build
   ```

2. If consistently slow, consider using `--no-verify` for feature branches and relying on CI for final validation

3. Repo has no caching; build performs from scratch each push. This is intentional—it guarantees reproducibility.

## Rollback: Removing Lefthook

If Lefthook causes persistent issues and needs to be removed:

### 1. Uninstall Git Hooks

```bash
npx lefthook uninstall
```

### 2. Remove from Dependencies

```bash
npm uninstall lefthook
```

### 3. Remove Configuration Files

```bash
rm -f lefthook.yml .lefthook-local.yml
```

### 4. Restore Package.json

Remove the `postinstall` script from `package.json`:

```bash
npm run postinstall  # command will no longer exist
```

Edit `package.json` manually to remove the `postinstall` line if needed.

### 5. Verify Removal

```bash
npx lefthook version  # should fail (command not found)
ls -la .git/hooks/ | grep -c lefthook  # should return 0
```

## Configuration: Project vs Local Overrides

### Project Configuration (`lefthook.yml`)

Checked into Git, applies to all developers:

- Defines pre-commit and pre-push stages
- Specifies which commands run
- All team members use the same validation

### Local Overrides (`.lefthook-local.yml`)

**Not** checked into Git, per-developer:

```yaml
# .lefthook-local.yml (create manually if needed)
pre-commit:
  skip: true  # Disable pre-commit for this machine

pre-push:
  commands:
    build:
      skip: true  # Disable build check for this machine
```

Use local overrides only when you have a specific reason (e.g., different system setup).

## Viewing Hook Logs

Lefthook stores recent run logs in `.lefthook/`:

```bash
ls -la .lefthook/
cat .lefthook/lefthook.log | tail -50  # Last 50 lines
```

View what hooks ran on your last commit/push:

```bash
grep -E "pre-commit|pre-push" .lefthook/lefthook.log | tail -20
```

## Performance Notes

- **Pre-commit:** Runs only on changed `.md` files—typically < 500ms
- **Pre-push:** Runs full `npm run build`—typically 10-20s depending on machine
- Both hooks can be skipped with `--no-verify` if needed for rapid iteration

## Further Reading

- **Lefthook docs:** https://lefthook.dev/
- **Project guidelines:** [guidelines/Guidelines.md](../guidelines/Guidelines.md)
- **Build script:** See `npm run build` in `package.json`
- **Validation script:** See `npm run journal:validate` in `package.json`
