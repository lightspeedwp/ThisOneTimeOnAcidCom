# Continuation Prompt: Reader Access System - Phase 6+

**Last Updated:** 2026-11-19  
**Latest Completed Phase:** Phase 5 (Truthful Feedback & Newsletter Separation)  
**Latest Merged PR:** #624

---

## 🎯 Continuation Context

This prompt guides continuation of the **Reader Access System** (Spec 005) in ThisOneTimeOnAcidCom. All Phases 1-5 are complete and merged to `main`. This document outlines the remaining work and establishes the workflow for future phases.

### Current System State
- ✅ Phase 1-2: Infrastructure & foundational layer (merged)
- ✅ Phase 3-4: Session management & UI controls (merged)
- ✅ Phase 5: Truthful feedback & newsletter separation (merged)
- 📋 Phase 6+: Ready for planning (see below)

---

## 📋 Phase 6: Content Delivery & Chapter Management

**Goal:** Implement full content delivery pipeline with chapter management, tracking, and analytics.

### Scope (RA-T047–RA-T056)

**RA-T047: Edition Content Structure**
- Create edition manifest schema for chapters and content
- Implement chapter metadata (title, word count, estimated read time, approval status)
- Add content versioning support
- Files: `netlify/lib/reader-access/edition.ts` (extend existing)

**RA-T048: Chapter Content API**
- GET `/api/reader/chapters/{chapterId}/content` endpoint
- Content delivery with security validation
- Response format: HTML/Markdown with metadata
- Files: `netlify/functions/reader-chapter-content.ts` (new)

**RA-T049: Chapter List & Discovery**
- GET `/api/reader/chapters?status=approved` endpoint
- Chapter listing with availability status
- Pagination support
- Files: `netlify/functions/reader-chapters-list.ts` (new)

**RA-T050: Reading Progress Tracking**
- Track reader progress per chapter (page position, completion %)
- Store progress in Netlify Blobs per session
- Resume reading from last position
- Files: `netlify/lib/reader-access/progress.ts` (new), `netlify/functions/reader-progress.ts` (new)

**RA-T051: Chapter Completion Events**
- Record completion events (chapter finished, time spent)
- Aggregate reading statistics
- Files: `netlify/functions/reader-analytics.ts` (new)

**RA-T052: Bookmarking System**
- Add bookmark functionality (save chapter/position)
- GET/POST `/api/reader/bookmarks` endpoints
- Files: `netlify/functions/reader-bookmarks.ts` (new)

**RA-T053-T056: Testing & UI Integration**
- Contract tests for all Phase 6 endpoints (15+ test cases)
- E2E tests for chapter reading flow
- ReaderContent React component for displaying chapter content
- ReaderProgress component for progress tracking

### Key Files to Edit/Create
```
netlify/lib/reader-access/edition.ts          (extend)
netlify/lib/reader-access/progress.ts         (new)
netlify/functions/reader-chapter-content.ts   (new)
netlify/functions/reader-chapters-list.ts     (new)
netlify/functions/reader-progress.ts          (new)
netlify/functions/reader-analytics.ts         (new)
netlify/functions/reader-bookmarks.ts         (new)
netlify/__tests__/reader-content.contract.test.ts (new)
e2e/reader-content.spec.ts                    (new)
src/app/components/pages/about/ebook/ReaderContent.tsx (new)
src/app/components/pages/about/ebook/ReaderProgress.tsx (new)
```

---

## 🔄 Branching Strategy

**Branch naming pattern:** `{type}/{scope}-{title}`

### Phase 6 Branches
```
feat/reader-content-delivery         (RA-T047-T052: Content pipeline)
feat/reader-progress-tracking        (RA-T050-T051: Progress & analytics)
feat/reader-chapter-discovery        (RA-T049: Chapter listing)
```

### Rules
1. **Base branch:** Always branch from `main` (not `develop`)
2. **Branch lifetime:** One feature branch per epic (RA-T047-T049 together if small, separate if large)
3. **Naming:** Follow `{type}/{scope}-{title}` pattern
4. **Validation:** Run `npm run validate:branch-name -- --branch <name>` before push

---

## 🔀 PR Strategy

### Before Opening PR
1. **Local validation:**
   ```bash
   npm run validate:branch-name -- --branch feat/your-branch
   npm run build
   npm test
   ```

2. **Commit message format:**
   - Use clear, conventional commits (feat:, fix:, docs:, test:)
   - Reference task IDs (RA-T047, etc.)
   - Include rationale in body

3. **File organization:**
   - Handlers in `netlify/functions/`
   - Library code in `netlify/lib/reader-access/`
   - React components in `src/app/components/`
   - Tests co-located or in `netlify/__tests__/` and `e2e/`

### PR Template
- **Title:** `Phase 6 RA-T047–T049: Content delivery & chapter management`
- **Description:** Follow canonical PR template from `lightspeedwp/.github`
- **Checklist:**
  - [ ] All tests passing (unit + E2E)
  - [ ] Changelog updated for Phase 6 work
  - [ ] Vercel preview deployed and working
  - [ ] No new console warnings/errors
  - [ ] Newsletter separation maintained

### Merge Criteria
- ✅ All CI checks passing (GitHub Actions, Vercel, CodeRabbit)
- ✅ Code review approved (if required by org policy)
- ✅ No merge conflicts with main
- ✅ Changelog entry added
- ✅ 80%+ test coverage on new code

---

## 📝 Changelog Management

**Location:** `CHANGELOG.md` (Keep a Changelog format)

### Phase 6 Entry Template
```markdown
### Added

- **Specification 005 Phase 6: Content Delivery & Chapter Management** — 
  Implemented chapter content delivery with progress tracking, bookmarking, 
  and reading analytics. Added chapter listing with availability status, 
  resume-from-position functionality, and completion tracking per session. 
  Created 7 new Netlify Functions handlers and comprehensive test coverage 
  (15+ unit tests, 7+ E2E tests).
```

---

## 🧪 Testing Requirements

### Unit Tests (Target: 15+ new tests)
- Content delivery with security checks
- Progress persistence and retrieval
- Bookmark CRUD operations
- Reading analytics event recording
- Pagination in chapter listing

### E2E Tests (Target: 7+ new tests)
- Full reading journey (list → open → read → bookmark → complete)
- Progress persistence across sessions
- Resume reading from saved position
- Completion event tracking
- Bookmark management flow

### File Locations
```
netlify/__tests__/reader-content.contract.test.ts
netlify/__tests__/reader-progress.contract.test.ts
e2e/reader-content.spec.ts
e2e/reader-bookmarks.spec.ts
```

---

## 🚀 Starting Phase 6

### Step 1: Create Branch
```bash
git checkout main
git pull origin main
git checkout -b feat/reader-content-delivery
```

### Step 2: Create Task Breakdown
Create `.claude/phase-6-tasks.md` with detailed task breakdown:
```markdown
# Phase 6 Implementation Tasks

## RA-T047–T052: Content Delivery Pipeline
- [ ] RA-T047: Edition content structure
- [ ] RA-T048: Chapter content API
- [ ] RA-T049: Chapter listing & discovery
- [ ] RA-T050: Progress tracking
- [ ] RA-T051: Completion events
- [ ] RA-T052: Bookmarking system
- [ ] RA-T053: Content tests
- [ ] RA-T054: Chapter discovery tests
- [ ] RA-T055: Progress tracking tests
- [ ] RA-T056: UI integration
```

### Step 3: Implementation Order
1. **RA-T047:** Edition content structure (extend existing edition.ts)
2. **RA-T048:** Chapter content API handler
3. **RA-T049:** Chapter listing handler
4. **RA-T050–T051:** Progress tracking library & handler
5. **RA-T052:** Bookmarking handler
6. **RA-T053–T056:** Tests & UI components

### Step 4: Testing Strategy
- Write contract tests alongside handlers
- E2E tests after UI components
- Verify no regression in Phases 1-5 functionality

### Step 5: PR & Merge
1. Commit with clear messages (one per epic)
2. Open PR to `main`
3. Run all validations
4. Update CHANGELOG.md
5. Request review
6. Merge when approved

---

## 🎓 Key Principles (Carry Forward)

1. **Truthful messaging:** No unverified claims about data, tracking, or communication
2. **Newsletter separation:** Reader system never subscribes or sends emails
3. **Privacy-first:** Track only what's necessary, store securely
4. **Atomic operations:** Use Netlify Blobs for atomic session/progress updates
5. **Defensive tests:** Contract + E2E tests verify every handler
6. **Clear copy:** Transparent UI about what data is collected

---

## 📚 Reference Files

- **Spec 005:** `.github/specs/005-reader-access/`
- **Phase 1-5 handlers:** `netlify/functions/reader-*.ts`
- **Library code:** `netlify/lib/reader-access/`
- **UI components:** `src/app/components/pages/about/ebook/`
- **Tests:** `netlify/__tests__/reader-*.test.ts`, `e2e/reader-*.spec.ts`
- **Config:** `CHANGELOG.md`, `.claude/phase-6-tasks.md`

---

## ✅ Ready to Start?

When you're ready to begin Phase 6:

1. Use this prompt as your guide
2. Create the branch: `feat/reader-content-delivery`
3. Create `.claude/phase-6-tasks.md` for task tracking
4. Begin with RA-T047 (content structure)
5. Follow the testing & PR strategy above
6. Update this prompt after Phase 6 completes

**Good luck! 🚀**
