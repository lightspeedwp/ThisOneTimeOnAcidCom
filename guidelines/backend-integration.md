# Backend Stack & Integration Patterns (N018)

**Version:** 1.0.0  
**Status:** Canonical Reference  
**Last Updated:** 2026-10-25

---

## Canonical Backend Stack

- **Serverless:** Vercel Functions (AWS Lambda)
- **Database:** Supabase PostgreSQL
- **API Layer:** tRPC with Next.js
- **ORM:** Prisma
- **Deployment:** Vercel + GitHub Actions (planned backend deployment); Netlify (current static SPA host)

---

## API Patterns

- RESTful endpoints for public data
- tRPC procedures for type-safe client calls
- Database transactions for multi-step operations

---

## Integration Points

- Authentication via Supabase
- Database queries via Prisma ORM
- Serverless functions for background jobs

---

**Last Updated:** 2026-10-25
