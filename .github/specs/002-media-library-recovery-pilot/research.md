# Research: Phase 1b Asset Recovery Technical Decisions

**Date**: 2026-10-18 | **Status**: Resolved for T012–T015 implementation

---

## Unknown 1: Figma API Rate-Limit Handling

**Research Question**: How should extraction scripts enforce the Figma API rate limit (10 requests/minute) with 5 concurrent requests?

**Decision**: Token Bucket + Exponential Backoff

**Rationale**:
- Figma API rate limit: 10 requests/minute per endpoint/seat (documented in API Tier)
- With 5 concurrent requests, a naive delay between requests would serialize execution and waste parallelism
- Token bucket enforces the per-minute rate globally across all concurrent requests
- Exponential backoff (2s, 4s, 8s, 16s) handles transient failures (503, 429 with Retry-After)
- Combination allows safe concurrency within rate limits

**Alternatives Considered**:
1. Simple `sleep(6000ms)` between requests → Too slow; only ~10 req/min even with concurrency
2. Sliding window rate limiter → More complex; token bucket is simpler for this scale
3. No rate limiting, rely on API 429 → Fragile; could lose work mid-extraction if hitting limits unexpectedly

**Implementation**:
- Use Node.js native timer queue (no external library)
- Shared token bucket: 1 token = 1 API call; refill at 10 tokens/minute
- On 429 or 503 response: Parse Retry-After header, apply exponential backoff, retry up to 4 times
- On persistent failure (4 retries exhausted): Mark asset as `"fallback"`, log error

**Reference**: `.env` variables FIGMA_API_RATE_LIMIT_PER_MINUTE (default 10) and FIGMA_CONCURRENT_REQUESTS (default 5)

---

## Unknown 2: PNG Dimension Extraction Library

**Research Question**: Which Node.js library should extract PNG dimensions for validation?

**Decision**: No external library; use PNG magic bytes + manual header parsing

**Rationale**:
- Figma API returns dimensions in export response metadata (no file read needed)
- PNG file header is simple: magic bytes `89 50 4E 47` (hex) followed by IHDR chunk with width/height
- Parsing ~50 bytes is faster than importing a full image library
- Avoids dependencies for a one-off validation task

**Alternatives Considered**:
1. `jimp` → 30KB+ dependency; slow (~1s per image); overkill for dimension-only extraction
2. `sharp` → 20MB+ native binding; requires system libvips; too heavy for CLI tool
3. `probe-image-size` → 20KB; lightweight but external dependency for simple parsing

**Implementation**:
- Utility function: read first 50 bytes of PNG, parse IHDR chunk (bytes 16–24 = width, 24–28 = height)
- Validate magic bytes: `89 50 4E 47`
- Return dimensions or error if file is corrupted
- Optional: If file size >100MB, add streaming PNG chunk reader (low priority for Phase 1b)

---

## Unknown 3: Concurrent Request Queuing Strategy

**Research Question**: How should the extraction script queue asset exports when concurrent limit is reached?

**Decision**: Async Queue with Backpressure Handling

**Rationale**:
- 5 concurrent requests + 10 req/min rate limit means average 1.2s per request
- Job queue allows waiting tasks to be queued without blocking the event loop
- Backpressure (queue max size) prevents memory overflow if extraction bottlenecks

**Implementation**:
- Use Node.js native `Promise.all()` with concurrency limit (simple pattern)
- Alternative: Import `p-queue` (4KB) if queue management becomes complex
- Pseudocode:
  ```javascript
  const queue = []
  const active = new Set()
  for (const asset of assets) {
    queue.push(asset)
    processQueue()
  }
  async function processQueue() {
    while (queue.length > 0 && active.size < FIGMA_CONCURRENT_REQUESTS) {
      const asset = queue.shift()
      active.add(extract(asset))
    }
  }
  ```
- Benefit: Stays within rate limits, respects concurrency cap

---

## Unknown 4: Error Recovery Taxonomy

**Research Question**: Which Figma API errors are retryable vs. permanent?

**Decision**: Classification Table (per HTTP status code)

| Status | Error | Retryable? | Action |
|--------|-------|------------|--------|
| 401 | Unauthorized | No | Log "Invalid API token"; fall back to Unsplash; mark "fallback" |
| 403 | Forbidden | No | Log "Access denied to Make project"; mark "failed"; manual intervention |
| 404 | Asset not found | No | Asset removed from Make; fall back to Unsplash; mark "fallback" |
| 429 | Rate limited | Yes | Parse Retry-After; exponential backoff; retry up to 4 times |
| 500–503 | Server error | Yes | Exponential backoff; retry up to 4 times |
| Timeout | Network timeout | Yes | Exponential backoff; retry up to 4 times |
| ECONNREFUSED | Network refused | Yes | Exponential backoff; retry up to 4 times |

**Implementation**:
- Log all errors with timestamp, status code, asset ID, retry count
- After 4 failed retries: Mark as "fallback" (Unsplash) or "failed" (no fallback)
- Document error logs in extraction-manifest.json `notes` field

---

## Unknown 5: Figma Make Project Structure

**Research Question**: How are 56 assets organized in the Figma Make project?

**Decision**: Pending T011 Completion

**Status**: test-figma-access.js (T011 deliverable) validates project structure. Once T011 completes, document:
- File structure: Single file or multiple files?
- Asset organization: Top-level frames, components, or nested groups?
- Naming convention: How does figmaAssetId (40-char hash) map to asset location?
- Metadata availability: Are alt text, dimensions stored in Figma?

**Placeholder**: See PHASE1B_RECOVERY_PROMPT.md § Known Data Sources

---

## Conclusion

All five unknowns are resolved for T012 implementation:
1. ✅ Rate limiting: Token bucket + exponential backoff
2. ✅ PNG parsing: Native header parsing (no dependency)
3. ✅ Concurrency: Async queue with Promise.all
4. ✅ Error handling: Classification table per HTTP status
5. ⏳ Figma Make structure: Validated during T011; documented by T012 start

**Ready to Implement**: T012 extraction script can proceed with these decisions.

---

## References

- Figma API Documentation: https://www.figma.com/developers/api (rate limits, node exports)
- HTTP Status Codes: https://httpwg.org/specs/rfc9110.html
- PNG File Format: https://www.w3.org/TR/png/ (IHDR chunk structure)
- test-figma-access.js: Existing Figma API connectivity test (T011 output)
