# Claude Cloud Environment — ThisOneTimeOnAcid

This directory documents the cloud environment configuration for `lightspeedwp/ThisOneTimeOnAcidCom`.

## Environment Summary

**Name:** `ThisOneTimeOnAcid`  
**Network Policy:** Trusted (no explicit outbound restrictions beyond proxy)  
**Runtime:** Node 22.x, npm 10.x  
**Package Manager:** npm (with package-lock.json)  
**Base Directory:** Repository root

---

## Setup & Dependencies

### Dependency Installation

The environment installs development dependencies reproducibly:

```bash
npm ci --include=dev
```

This command:
- Reads `package-lock.json` (exact pinned versions)
- Installs to `node_modules/`
- Does not modify `package-lock.json`
- Suitable for CI/CD and fresh sessions

### Reproducible Validation

After setup, validate the environment:

```bash
npm run build
```

This confirms:
- Vite build succeeds
- All dependencies resolve correctly
- No missing transitive dependencies
- Output lands in `dist/`

---

## Execution Environment

### Available Node & npm

- **Node:** v22.22.0 (or environment default)
- **npm:** 10.9.4 (or environment default)
- **Shell:** bash/sh

### Working Directory

`/home/user/thisonetimeonacidcom` (or `$CLAUDE_PROJECT_DIR` in hooks)

### Build Output

- **Vite build output:** `dist/` (published to Netlify)
- **Source:** `src/`, `guidelines/`, config files (not git-ignored)

---

## Deployment Configuration

### Netlify Deployment

- **Build command:** `npm run build` (from `package.json`)
- **Publish directory:** `dist/`
- **Configuration:** `src/app/netlify.toml` (deployment settings, headers, redirects)

**Note:** A nested `netlify.toml` exists at `src/app/netlify.toml`. This is the active configuration; the root-level Vite config references the same build command.

### Environment Variables

**Baseline (no cloud-specific env vars initially):**

The environment does not require custom environment variables for basic build/dev operations. If future features require credentials or configuration:

1. Document them in this file with `[REDACTED]` placeholders
2. Store sensitive values in cloud environment settings (not version control)
3. Reference them in `.env.local` or equivalent (git-ignored)

---

## Local Setup Parity

Sessions created in this cloud environment inherit:

- ✓ This `.claude/` configuration
- ✓ Shared agents, skills, hooks
- ✓ Settings from `.claude/settings.json` (unless overridden via `.claude/settings.local.json`)
- ✓ Local `CLAUDE_PROJECT_DIR` expansion in hook scripts
- ✗ User-specific `.claude/settings.local.json` (each session starts fresh)
- ✗ Credentials from `~/.claude/` (use cloud environment settings instead)

**Implication:** Cloud sessions use shared settings from this repository; personal configuration must be stored in the cloud environment interface or passed as environment variables.

---

## Validation & Troubleshooting

### Fresh Session Smoke Test

After environment initialization:

```bash
cd "$CLAUDE_PROJECT_DIR"
npm ci --include=dev
npm run build
echo "✓ Cloud environment validated"
```

### Missing Dependencies

If `npm ci` reports unmet dependencies:

1. Check `package-lock.json` is committed
2. Verify Node version matches `package.json` (no `engines` pin currently set)
3. Confirm network access to npm registry (Trusted policy should allow this)

### Build Failures

If `npm run build` fails:

1. Check `vite.config.ts` for build configuration
2. Verify all CSS, component and data imports resolve
3. Inspect `dist/` logs for bundler errors

### Netlify Deployment Issues

- **Preview status:** Netlify Pages checks are separate from cloud setup
- **Headers/redirects:** Configure in `src/app/netlify.toml`
- **Environment secrets:** Set in Netlify dashboard (not in this repository)

---

## Network Access

**Trusted network policy permits:**

- ✓ npm registry (npmjs.com, registry.npmjs.org)
- ✓ GitHub (git clone, git push, gh CLI)
- ✓ Netlify API (deploy previews, status checks)
- ✓ Public package registries

**Not included (request separately if needed):**

- Linear API (for issue integration)
- Slack webhooks (for notifications)
- Custom internal services

---

## Maintenance & Updates

### Updating Dependencies

To update pinned versions:

```bash
npm update [package-name]  # or npm update (all)
npm ci                      # verify new lockfile
npm run build              # smoke test
git add package-lock.json
git commit -m "chore: update dependencies"
```

### Rotating Secrets

If credentials (API keys, tokens) are added:

1. Document in this file (with `[REDACTED]` marker)
2. Add to `.gitignore` if stored locally
3. Store sensitive values only in cloud environment settings
4. Test credential validity on fresh session

### Scaling Resources

The cloud environment resource allocation (CPU, memory, disk) is managed through the environment configuration interface, not this file. If build/validation times increase:

1. Monitor build logs for bottlenecks
2. Request higher allocation through environment settings
3. Document decision and reasoning in a follow-up PR

---

## References

- [Claude Documentation: Cloud Environments](https://code.claude.com/docs/en/cloud-environments)
- [ThisOneTimeOnAcidCom: Setup & Validation](../docs/claude-configuration.md)
- [Project Guidelines](../guidelines/README.md)
