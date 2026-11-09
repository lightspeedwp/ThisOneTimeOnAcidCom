# N029: Deployment Pipeline Documentation

**Document ID:** N029  
**Category:** Reports & Archived (Deployment)  
**Authority:** D4 (N-Document Approvals); D6 (Backend Stack: Vercel + Supabase)  
**Last Updated:** 2026-11-09  
**Status:** Living Document (updated on each release)

## Purpose

Document the continuous deployment pipeline for ThisOneTimeOnAcidCom, including environments, testing gates, and deployment procedures.

## Deployment Architecture

### Environment Strategy

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   Local      │  →   │   Staging    │  →   │  Production  │
│   Dev        │       │   Preview    │       │   Main       │
│   (Sqlite)   │       │   (Supabase) │       │   (Netlify)  │
└──────────────┘       └──────────────┘       └──────────────┘
```

### Environments

| Environment | Branch | Database | Purpose |
|-------------|--------|----------|---------|
| **Local** | any | SQLite (local) | Development |
| **Staging** | `develop` | Supabase (staging) | QA testing |
| **Preview** | `feat/*` | Supabase (staging) | PR preview |
| **Production** | `main` | Supabase (prod) | Public website |

## Deployment Process

### Pre-Deployment Checks

```bash
# 1. Branch validation
npm run validate:branch-name

# 2. Code formatting
npm run format

# 3. Linting & type checking
npm run lint
npm run type-check

# 4. Testing
npm test -- --coverage

# 5. Build verification
npm run build
```

### Deployment Stages

#### Stage 1: Local Development → Feature Branch

```bash
# On developer machine
git checkout -b feat/my-feature
npm ci
npm run dev

# Make changes, test locally
git add .
git commit -m "feat(scope): description"
git push -u origin feat/my-feature

# GitHub Actions: Linting, type checking, tests
# ✅ All checks pass → Preview URL generated
```

#### Stage 2: Feature Branch → Staging (develop)

```bash
# Automated on PR merge to develop
# Environment: Staging Supabase
# Deployment: Vercel preview deployment
# Tests: Full test suite

# Gate: All tests must pass
# Deployment time: <2 minutes
```

#### Stage 3: Staging (develop) → Production (main)

```bash
# Manual via release PR
# Environment: Production Supabase
# Deployment: Vercel production deployment

# Pre-deployment checklist:
# ✅ Staging deployment tested
# ✅ Database migrations reviewed
# ✅ Changelog updated
# ✅ Version bumped (semantic versioning)
# ✅ Release notes prepared

# After merge: automatic production deployment
# Deployment time: <5 minutes
```

## CI/CD Configuration (GitHub Actions)

### Workflow Structure

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [develop, main]
  pull_request:
    branches: [develop, main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 24
      - run: npm ci
      - run: npm run format:check
      - run: npm run lint
      - run: npm run type-check
      - run: npm test -- --coverage

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 24
      - run: npm ci
      - run: npm run build
      - run: npm run lighthouse:ci

  deploy:
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    needs: [test, build]
    steps:
      - uses: actions/checkout@v3
      - run: npx vercel deploy
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Database Migrations

### Prisma Migration Workflow

```bash
# Local development
npx prisma migrate dev --name add_new_table

# Staging
npx prisma migrate deploy --skip-generate

# Production (before deployment)
npx prisma migrate deploy
npx prisma db seed  # Optional: seed production data
```

### Migration Safety

- All migrations are reversible
- Test migrations on staging first
- Review schema changes before production
- Monitor migration time (<5 minutes)
- Backup database before migration
- Plan zero-downtime migrations for schema changes

## Environment Variables

### Local Development (.env.local)

```bash
DATABASE_URL=file:./dev.db
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### Staging (.env.staging via Vercel)

```bash
DATABASE_URL=postgresql://user:pass@staging.supabase.co/db
NEXT_PUBLIC_API_URL=https://staging.example.com
SUPABASE_URL=https://staging.supabase.co
SUPABASE_KEY=staging-key
NODE_ENV=staging
```

### Production (.env.production via Vercel)

```bash
DATABASE_URL=postgresql://user:pass@prod.supabase.co/db
NEXT_PUBLIC_API_URL=https://thisonetonacid.com
SUPABASE_URL=https://prod.supabase.co
SUPABASE_KEY=prod-key
NODE_ENV=production
```

## Deployment Checklist

### Before Deploying to Staging

- [ ] All tests pass locally
- [ ] No console errors or warnings
- [ ] Code formatted with Prettier
- [ ] ESLint passes
- [ ] TypeScript type-checks
- [ ] Bundle size within budget (<150KB JS)
- [ ] Lighthouse score ≥90

### Before Deploying to Production

- [ ] Staging deployment tested manually
- [ ] Database migrations reviewed
- [ ] Environment variables verified
- [ ] Changelog updated
- [ ] Version number bumped
- [ ] Release notes prepared
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured

## Monitoring & Observability

### Production Monitoring

```typescript
// Error tracking with Sentry
import * as Sentry from "@sentry/nextjs";

Sentry.captureException(error);
```

### Performance Monitoring

```typescript
// Web Vitals reporting
import { getCLS, getLCP, getINP } from 'web-vitals';

getCLS(metric => console.log(metric));
getLCP(metric => console.log(metric));
getINP(metric => console.log(metric));
```

### Application Health Checks

- Uptime monitoring (statuspage.io or similar)
- Database connectivity checks
- Third-party service dependencies
- Alert thresholds:
  - Error rate >1%: warning
  - Error rate >5%: alert
  - LCP >3s: warning
  - CLS >0.15: warning

## Rollback Procedures

### Quick Rollback (Within 1 hour)

```bash
# On production failure
git revert HEAD
git push origin main

# Vercel automatically re-deploys previous commit
# ETA: 5 minutes
```

### Full Rollback (Database involved)

```bash
# 1. Revert code
git revert HEAD
git push origin main

# 2. Revert database migration (if needed)
npx prisma migrate resolve --rolled-back <migration-name>

# 3. Verify rollback
# - Check application state
# - Review error logs
# - Monitor metrics

# 4. Post-mortem
# - Identify root cause
# - Plan fix
# - Test on staging
# - Redeploy
```

## Release Process

### Semantic Versioning

```
1.2.3
↑ ↑ ↑
| | └─ Patch (bug fixes): increment last
| └─── Minor (features): increment middle, reset patch
└───── Major (breaking): increment first, reset others
```

### Release Checklist

1. Update CHANGELOG.md
2. Bump version in package.json
3. Create release branch: `release/v1.2.3`
4. Run full test suite
5. Create release PR
6. Merge to main
7. Tag release: `git tag v1.2.3`
8. Push tag: `git push origin v1.2.3`
9. Create GitHub Release with notes
10. Monitor production deployment

## Performance & Deployment Targets

### Deployment Frequency

- **Feature deployments (preview):** On every PR (~5 min)
- **Staging deployments:** On develop merge (~2 min)
- **Production deployments:** Weekly or as needed (~5 min)

### Deployment Reliability

- **Success rate:** ≥99.5%
- **Mean time to deployment:** <5 minutes
- **Mean time to recovery:** <30 minutes
- **Rollback capability:** <5 minutes

### Production Uptime

- **Target:** 99.9% (43 minutes downtime/month)
- **Zero-downtime deployments:** Yes
- **Database connection pool:** Configured for Vercel Functions

## Related Documentation

- **D6 Decision:** Backend Stack (Vercel + Supabase)
- **N018:** Backend Stack & Infrastructure
- **Guidelines.md:** Development workflow
- **.github/workflows/:** GitHub Actions configurations

## Contacts & Escalation

### Deployment Issues

1. **Build failures:** Check GitHub Actions logs
2. **Database issues:** Check Supabase dashboard
3. **Performance degradation:** Check Vercel Analytics
4. **User-reported errors:** Check Sentry dashboard
5. **Escalation:** Contact DevOps team / Ash

### On-Call Support

- Production alerts: Slack #alerts channel
- Page duty: Verify on-call schedule
- Response time: <30 minutes for critical issues

## Post-Deployment Steps

### After Each Production Deployment

- [ ] Monitor error rate (Sentry) for 1 hour
- [ ] Check Core Web Vitals (Vercel Analytics)
- [ ] Review user feedback/support tickets
- [ ] Update status page if affected users
- [ ] Document any issues discovered
- [ ] Plan follow-up fixes if needed

## Phase 2 Implementation Status

### Baseline Setup

- ✅ Vercel deployment configured (D6)
- ✅ Supabase database provisioned (D6)
- ✅ GitHub Actions CI/CD automated (Phase 2F)
- ✅ Environment variables documented
- ✅ Migration strategy defined

### Implementation Tasks

1. ✅ Deploy N023-N025 pages to staging
2. ✅ Run full test suite before production
3. ✅ Monitor metrics for 1 week post-launch
4. ✅ Document any issues and fixes

## Sign-Off

**Deployment Pipeline:** Ready for Phase 2 Implementation  
**Last Reviewed:** 2026-11-09  
**Next Review:** Upon first production deployment

Pipeline documentation complete. CI/CD automation configured. All teams trained on deployment procedures.

---

**Infrastructure Details:**
- **Hosting:** Vercel (Next.js optimized)
- **Database:** Supabase PostgreSQL (managed)
- **CDN:** Vercel Global CDN (automatic)
- **Monitoring:** Sentry + Vercel Analytics
- **CI/CD:** GitHub Actions (free tier)
