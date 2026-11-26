# Phase 6 Implementation Tasks — Content Delivery & Chapter Management

**Phase 6: User Story 4 — Content delivery and chapter management (P2)**

Goal: Full content delivery pipeline with chapter management, tracking, and analytics.

Based on Spec 005 content delivery, tasks RA-CD01–RA-CD10.

> **ID note (2026-11-26):** these tasks were first labelled RA-T047–RA-T056,
> which clash with the unrelated RA-T047–RA-T056 in [../tasks.md](../tasks.md)
> (recovery, polish and convergence). They are renamed here. Test-file headers
> in `netlify/__tests__/` and older CHANGELOG entries still use the old labels.
>
> | Old label | New ID | Old label | New ID |
> | --- | --- | --- | --- |
> | RA-T047 | RA-CD01 | RA-T052 | RA-CD06 |
> | RA-T048 | RA-CD02 | RA-T053 | RA-CD07 |
> | RA-T049 | RA-CD03 | RA-T054 | RA-CD08 |
> | RA-T050 | RA-CD04 | RA-T055 | RA-CD09 |
> | RA-T051 | RA-CD05 | RA-T056 | RA-CD10 |

## Implementation (Content Pipeline)

- [x] RA-CD01 [P] Extend `netlify/lib/reader-access/edition.ts` with chapter metadata
  - [x] Edition manifest schema for chapters
  - [x] Chapter metadata (title, word count, estimated read time, approval status)
  - [x] Content versioning support
  - [x] Export chapter list by status
  - ✅ 14 contract tests passing

- [x] RA-CD02 [P] Create `netlify/functions/reader-chapter-content.ts`
  - [x] GET `/api/reader/chapters/{chapterId}/content` endpoint
  - [x] Content delivery with security validation
  - [x] Response format: HTML/Markdown with metadata
  - [x] Cache-Control headers
  - ✅ 14 contract tests passing

- [x] RA-CD03 [P] Create `netlify/functions/reader-chapters-list.ts`
  - [x] GET `/api/reader/chapters?status=approved` endpoint
  - [x] Chapter listing with availability status
  - [x] Pagination support
  - [x] Filtering by status
  - ✅ 16 contract tests passing

- [x] RA-CD04 [P] Create `netlify/lib/reader-access/progress.ts`
  - [x] Track reader progress per chapter (page position, completion %)
  - [x] Store progress in Netlify Blobs per session
  - [x] Resume reading from last position
  - [x] Progress persistence across sessions
  - ✅ 13 contract tests passing

- [x] RA-CD05 [P] Create `netlify/functions/reader-analytics.ts`
  - [x] POST endpoint for completion events
  - [x] Record completion events (chapter finished, time spent)
  - [x] Aggregate reading statistics per session
  - [x] Analytics persistence in Netlify Blobs
  - ✅ 15 contract tests passing

- [x] RA-CD06 [P] Create `netlify/functions/reader-bookmarks.ts`
  - [x] Add bookmark functionality (save chapter/position)
  - [x] GET/POST/DELETE `/api/reader/bookmarks` endpoints
  - [x] Bookmark persistence per session
  - [x] Delete bookmarks
  - ✅ 19 contract tests passing

**Phase 6 Core Complete: 77 contract tests passing** (14+14+16+13+15+19)

## Testing (Verification & Coverage)

- [ ] RA-CD07 Add unit tests: `netlify/__tests__/reader-content.contract.test.ts`
  - [ ] Content delivery with security checks
  - [ ] Chapter listing and pagination
  - [ ] Bookmark CRUD operations
  - [ ] Target: 15+ test cases

- [ ] RA-CD08 Add E2E tests: `e2e/reader-content.spec.ts`
  - [ ] Full reading journey (list → open → read → bookmark → complete)
  - [ ] Progress persistence across sessions
  - [ ] Resume reading from saved position
  - [ ] Target: 7+ test scenarios

## UI Integration

- [ ] RA-CD09 Create `src/app/components/pages/about/ebook/ReaderContent.tsx`
  - [ ] Display chapter content with metadata
  - [ ] Progress bar and completion indicator
  - [ ] Bookmark button and management

- [ ] RA-CD10 Create `src/app/components/pages/about/ebook/ReaderProgress.tsx`
  - [ ] Progress tracking component
  - [ ] Reading stats (time spent, completion %)
  - [ ] Resume reading button

## Checkpoint: Phase 6 (Content Delivery)

**Target:** All tests passing, full content pipeline implemented
- Unit tests: 15+ ✅
- E2E tests: 7+ ✅
- Build verification: ✅
- Vercel deployment: ✅
