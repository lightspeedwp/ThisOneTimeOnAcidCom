# Phase 6 Implementation Tasks — Content Delivery & Chapter Management

**Phase 6: User Story 4 — Content delivery and chapter management (P2)**

Goal: Full content delivery pipeline with chapter management, tracking, and analytics.

Based on Spec 005 RA-T047–RA-T056

## Implementation (Content Pipeline)

- [ ] RA-T047 [P] Extend `netlify/lib/reader-access/edition.ts` with chapter metadata
  - [ ] Edition manifest schema for chapters
  - [ ] Chapter metadata (title, word count, estimated read time, approval status)
  - [ ] Content versioning support
  - [ ] Export chapter list by status

- [ ] RA-T048 [P] Create `netlify/functions/reader-chapter-content.ts`
  - [ ] GET `/api/reader/chapters/{chapterId}/content` endpoint
  - [ ] Content delivery with security validation
  - [ ] Response format: HTML/Markdown with metadata
  - [ ] Cache-Control headers

- [ ] RA-T049 [P] Create `netlify/functions/reader-chapters-list.ts`
  - [ ] GET `/api/reader/chapters?status=approved` endpoint
  - [ ] Chapter listing with availability status
  - [ ] Pagination support
  - [ ] Filtering by status

- [ ] RA-T050 [P] Create `netlify/lib/reader-access/progress.ts`
  - [ ] Track reader progress per chapter (page position, completion %)
  - [ ] Store progress in Netlify Blobs per session
  - [ ] Resume reading from last position
  - [ ] Progress persistence across sessions

- [ ] RA-T051 [P] Create `netlify/functions/reader-progress.ts`
  - [ ] POST/GET endpoints for progress tracking
  - [ ] Record completion events (chapter finished, time spent)
  - [ ] Aggregate reading statistics

- [ ] RA-T052 [P] Create `netlify/functions/reader-bookmarks.ts`
  - [ ] Add bookmark functionality (save chapter/position)
  - [ ] GET/POST `/api/reader/bookmarks` endpoints
  - [ ] Bookmark persistence per session
  - [ ] Delete bookmarks

## Testing (Verification & Coverage)

- [ ] RA-T053 Add unit tests: `netlify/__tests__/reader-content.contract.test.ts`
  - [ ] Content delivery with security checks
  - [ ] Chapter listing and pagination
  - [ ] Bookmark CRUD operations
  - [ ] Target: 15+ test cases

- [ ] RA-T054 Add E2E tests: `e2e/reader-content.spec.ts`
  - [ ] Full reading journey (list → open → read → bookmark → complete)
  - [ ] Progress persistence across sessions
  - [ ] Resume reading from saved position
  - [ ] Target: 7+ test scenarios

## UI Integration

- [ ] RA-T055 Create `src/app/components/pages/about/ebook/ReaderContent.tsx`
  - [ ] Display chapter content with metadata
  - [ ] Progress bar and completion indicator
  - [ ] Bookmark button and management

- [ ] RA-T056 Create `src/app/components/pages/about/ebook/ReaderProgress.tsx`
  - [ ] Progress tracking component
  - [ ] Reading stats (time spent, completion %)
  - [ ] Resume reading button

## Checkpoint: Phase 6 (Content Delivery) 

**Target:** All tests passing, full content pipeline implemented
- Unit tests: 15+ ✅
- E2E tests: 7+ ✅
- Build verification: ✅
- Vercel deployment: ✅
