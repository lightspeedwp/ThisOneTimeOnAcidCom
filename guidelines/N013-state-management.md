# N013: State Management Guidelines

**Document ID:** N013  
**Category:** Organization (State Management)  
**Authority:** D4 (N-Document Approvals); D6 (Backend Stack: Vercel Functions + Supabase + tRPC)  
**Last Updated:** 2026-11-09

## Purpose

Define state management patterns and tooling for ThisOneTimeOnAcidCom frontend and backend, ensuring predictable data flow and testability.

## Frontend State Management

### Client-Side State (React Context + Hooks)

- Use React Context for UI state (theme, modals, sidebar open/close)
- Lift state to nearest common ancestor to minimize re-renders
- Use custom hooks to encapsulate stateful logic
- Memoize expensive computations with useMemo

### Server State (tRPC + Supabase)

- Treat server-fetched data as read-only until mutation
- Use tRPC queries for data fetching (automatic caching, refetching)
- Use tRPC mutations for create/update/delete operations
- Implement proper error handling and loading states

### URL State (Next.js Router)

- Store filter, pagination, and sort state in query parameters
- Enable bookmarkable states and browser back/forward navigation
- Use shallow routing for rapid updates without full page navigation

## Backend State Management

### Database State (Supabase PostgreSQL)

- Use Prisma ORM for type-safe database queries
- Implement transactional operations for multi-step updates
- Use database constraints to enforce data integrity
- Implement row-level security (RLS) policies

### Server-Side Sessions (Vercel Functions)

- Use Supabase Auth for user session management
- Store authentication tokens in httpOnly cookies
- Implement automatic token refresh before expiration
- Validate session on each protected endpoint

## Data Fetching Patterns

```typescript
// Preferred: tRPC query with automatic caching
const { data, isLoading } = trpc.useTRPCQuery(['book.getById', bookId]);

// Mutation with optimistic updates
const { mutate } = trpc.useTRPCMutation('book.update', {
  onSuccess: () => trpc.invalidateQueries(['book.list']),
});
```

## State Boundaries

| Layer | Technology | Scope | Lifetime |
|-------|-----------|-------|----------|
| UI | React Context | Temporary UI state | Session |
| Client Cache | tRPC cache | Server data copies | Until invalidation |
| Server | Supabase Auth | User sessions | Until logout |
| Database | PostgreSQL | Persistent records | Indefinite |

## See Also

- **N006:** Architecture Overview (Next.js + Supabase integration)
- **N008:** Content Model (database schema)
- **Guidelines.md:** Development workflow
