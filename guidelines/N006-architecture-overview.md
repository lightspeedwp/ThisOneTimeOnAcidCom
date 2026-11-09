# N006: Architecture Overview

**Purpose:** System design, tech stack decisions, and architectural patterns for This One Time On Acid.

**Authority:** D4 (N-Document Approvals); D6 (Backend Stack)

---

## Tech Stack

### Frontend
- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Variables
- **Components:** Headless UI + Custom components
- **Forms:** React Hook Form + Zod validation
- **State:** React Context + hooks (or Zustand if needed)

### Backend
- **Serverless:** Vercel Functions (AWS Lambda)
- **Database:** Supabase PostgreSQL
- **ORM:** Prisma
- **API Layer:** tRPC with Next.js API routes
- **Authentication:** NextAuth.js or Supabase Auth
- **File Storage:** Supabase Storage (PostgreSQL-backed)

### DevOps & Deployment
- **Hosting:** Vercel
- **Repository:** GitHub
- **CI/CD:** GitHub Actions
- **Database Hosting:** Supabase
- **Environment:** Development, Staging, Production

### Monitoring & Analytics
- **Error Tracking:** Sentry
- **Performance:** Vercel Analytics + Lighthouse CI
- **User Analytics:** PostHog or Plausible
- **Logs:** Vercel Logs

---

## Architecture Diagram

```
Client (Browser)
  ↓
  [Next.js Frontend - React/TypeScript/Tailwind]
  ├─ Static Pages (SSG)
  ├─ Dynamic Pages (SSR/ISR)
  └─ API Routes (tRPC endpoints)
  ↓
  [Vercel Edge Network]
  ├─ Global CDN for static assets
  └─ Automatic HTTPS
  ↓
  [Vercel Functions - Serverless]
  ├─ API endpoints (tRPC)
  ├─ Authentication middleware
  └─ Third-party integrations
  ↓
  [Supabase PostgreSQL Database]
  ├─ Schema & migrations
  ├─ Real-time subscriptions
  └─ Row-level security (RLS)
  ↓
  [External Services]
  ├─ Email (SendGrid/Resend)
  ├─ Payments (Stripe)
  └─ Analytics (PostHog)
```

---

## Core Principles

1. **Type Safety:** TypeScript throughout
2. **Server-Driven:** Prefer server rendering (SSR/SSG/ISR)
3. **Real-Time Ready:** Database subscriptions for live updates
4. **Scalable:** Serverless functions, database replication
5. **Secure:** Environment variables, RLS, HTTPS only
6. **Accessible:** WCAG 2.2 AAA compliance

---

## Related Documentation

See [N018: Backend Stack & Integration Patterns](#) for detailed backend architecture.

---

**Authority:** D4 (N-Document Approvals) | D6 (Backend Stack Authority)  
**Last Updated:** 2026-11-09
