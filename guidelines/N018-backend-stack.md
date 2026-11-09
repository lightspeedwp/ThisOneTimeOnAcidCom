# N018: Backend Stack & Infrastructure Guidelines

**Document ID:** N018  
**Category:** Organization (Backend Stack)  
**Authority:** D6 (Backend Stack: Vercel Functions + Supabase + tRPC); D4 (N-Document Approvals)  
**Last Updated:** 2026-11-09

## Purpose

Define backend architecture, infrastructure choices, and integration patterns for ThisOneTimeOnAcidCom using Vercel Functions, Supabase PostgreSQL, and tRPC.

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 14+ (App Router) | React framework with SSR/SSG |
| API | tRPC | Type-safe RPC between client and server |
| Compute | Vercel Functions | Serverless API endpoints |
| Database | Supabase PostgreSQL | Managed PostgreSQL with PostgREST |
| ORM | Prisma | Type-safe database client |
| Auth | Supabase Auth | User authentication and sessions |
| Storage | Supabase Storage | File uploads and CDN delivery |

## Architecture Overview

```
┌─────────────────────────┐
│   Next.js Client App    │
│  (App Router + React)   │
└────────┬────────────────┘
         │ tRPC calls
         ↓
┌─────────────────────────┐
│  Vercel Functions       │
│  (Serverless API)       │
└────────┬────────────────┘
         │ Prisma queries
         ↓
┌─────────────────────────┐
│  Supabase PostgreSQL    │
│  (Managed Database)     │
└─────────────────────────┘
```

## Vercel Functions

### Function Structure

```typescript
// api/trpc/[trpc].ts
import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '~/server/routers/_app';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});
```

### Environment Variables

```bash
DATABASE_URL=postgresql://user:pass@db.supabase.co/db
NEXT_PUBLIC_API_URL=https://app.example.com
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_KEY=public-anon-key
```

## Supabase Integration

### Database Setup

- PostgreSQL 15+ for reliability and performance
- Row-level security (RLS) policies for data isolation
- Automatic timestamps on all records
- Foreign key constraints for referential integrity

### Authentication Flow

```typescript
// 1. User signs up/logs in
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password',
});

// 2. Session stored in HTTP-only cookie via Supabase client
// 3. tRPC middleware validates session on protected procedures
// 4. Automatic token refresh before expiration
```

### File Storage

```typescript
// Upload file to Supabase Storage
const { data, error } = await supabase.storage
  .from('book-covers')
  .upload(`${bookId}/cover.jpg`, file);

// Access via CDN URL
const publicUrl = supabase.storage
  .from('book-covers')
  .getPublicUrl(`${bookId}/cover.jpg`).data.publicUrl;
```

## Prisma ORM

### Schema Modeling

```prisma
model Book {
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  published DateTime @default(now())
  chapters  Chapter[]
  author    Author   @relation(fields: [authorId], references: [id])
  authorId  String
}

model Chapter {
  id     String @id @default(cuid())
  title  String
  book   Book   @relation(fields: [bookId], references: [id], onDelete: Cascade)
  bookId String
}
```

### Database Queries

```typescript
// Create with relations
const book = await prisma.book.create({
  data: {
    title: 'The Jungle Book',
    slug: 'jungle-book',
    author: {
      connect: { id: authorId },
    },
  },
});

// Query with relations
const books = await prisma.book.findMany({
  include: { author: true, chapters: true },
  orderBy: { published: 'desc' },
  take: 10,
});
```

## tRPC Procedures

### Query Definition

```typescript
export const bookRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await prisma.book.findUnique({
        where: { id: input.id },
        include: { author: true },
      });
    }),
});
```

### Protected Mutation

```typescript
export const protectedRouter = router({
  createBook: protectedProcedure
    .input(bookSchema)
    .mutation(async ({ input, ctx }) => {
      return await prisma.book.create({
        data: {
          ...input,
          authorId: ctx.session.userId,
        },
      });
    }),
});
```

## Error Handling

### tRPC Error Codes

```typescript
// Throw structured errors
throw new TRPCError({
  code: 'NOT_FOUND',
  message: 'Book not found',
});

// Client receives
{
  data: null,
  error: {
    message: 'Book not found',
    code: 'NOT_FOUND',
  }
}
```

## Deployment

### Vercel Deployment

```bash
# Environment variables configured in Vercel dashboard
# Automatic deployments on git push

# Deploy preview on PR
git push origin feat/my-feature  # Auto-deploys to preview URL

# Production deployment
git push origin main             # Deploys to production
```

### Database Migrations

```bash
# Create migration
npx prisma migrate dev --name add_chapters

# Apply to production
npx prisma migrate deploy
```

## Performance & Scaling

### Caching Strategies

- Next.js ISR (Incremental Static Regeneration) for books
- tRPC query invalidation on mutations
- Database query optimization with indexes
- CDN caching for static assets

### Monitoring

- Error tracking via Sentry
- Performance monitoring via Vercel Analytics
- Database query logging for slow queries
- Real-time alerts for deployment issues

## Security Practices

- Never commit `.env.local` with secrets
- Use Supabase RLS for row-level access control
- Validate all user input with Zod schemas
- Implement rate limiting on public endpoints
- Use CORS to restrict cross-origin requests
- Refresh tokens before expiration

## See Also

- **N006:** Architecture Overview (high-level structure)
- **N013:** State Management (tRPC patterns)
- **N008:** Content Model (database schema)
- Constitution IV: Protected Content & Data Rules
