# Cross-Instance Device Limit Race Condition Analysis

**Branch**: `fix/session-creation-race-condition`  
**Issue**: Session creation can bypass the 2-device limit when multiple Netlify Functions instances receive the same email's verification code simultaneously.

---

## Problem Statement

**Location**: `netlify/lib/reader-access/session-service.ts` lines 129-141

The device-limit check follows a **check-then-act pattern** that is not atomic across instances:

```typescript
// Step 1: Check (instance A and B both see this)
const activeSessions = await listSessionsByEmail(email);
const activeCount = activeSessions.filter(
  (s) => isSessionActive(s, now) && s.deviceId !== deviceId
).length;

// Step 2: Act (both instances proceed if activeCount < 2)
if (activeCount >= MAX_CONCURRENT_DEVICES) {
  throw error; // 409
}

// Step 3: Create (both instances create a session)
await storeSession(session);
```

**Race Scenario** (MAX_CONCURRENT_DEVICES = 2):
1. Reader has 1 active device
2. Instance A processes verification code for device 2 → sees activeCount = 1 → passes check
3. Instance B processes same code for device 3 → sees activeCount = 1 → passes check
4. Both instances call `storeSession()` → reader now has 3 active sessions (overflow)

**Root Cause**: `serialiseByEmail()` queue (line 87-98) only serializes within a single function instance. Cross-instance coordination requires atomic storage operations.

---

## Current Serialisation (Instance-Level)

```typescript
// Lines 87-99: Per-email creation queue
const creationQueues = new Map<string, Promise<unknown>>();

function serialiseByEmail<T>(email: string, task: () => Promise<T>): Promise<T> {
  const previous = creationQueues.get(key) ?? Promise.resolve();
  const run = previous.then(task, task);
  // ... returns run once previous completes
}
```

**Limitation** (documented at lines 83-86):
> "Netlify Blobs offers no compare-and-swap through this adapter, so two separate function instances can still race. A conditional write (ETag onlyIfMatch on a per-email counter) would be needed to close that."

---

## Netlify Blobs Conditional Write Support

### Findings:

1. **Version Mismatch**: 
   - `package.json` specifies `^11.1.6`
   - Installed version is `6.5.0`
   - This creates uncertainty about which features are available

2. **`onlyIfNew` Support**:
   - Already used for verification code consumption (`store.ts` line 192)
   - Comment states: "Netlify Blobs applies that condition server-side"
   - API: `store.set(key, value, { onlyIfNew: true })` returns `{ modified: boolean }`
   - **Status**: Already working in codebase ✅

3. **Missing Features** (not found in v6.5.0 SDK):
   - `onlyIfMatch` (ETag-based conditional write)
   - `compareAndSwap`
   - Any form of compare-or-increment

4. **TypeScript Definitions** (v6.5.0):
   - `set()` only accepts `metadata` in options
   - No conditional write signatures visible
   - Wrapper in `blobs.ts` adds `onlyIfNew` interface (custom)

---

## Proposed Solutions

### Option A: Device Slot Lock with `onlyIfNew` ✅ Recommended

**Mechanism**: Atomic lock acquisition before session creation

```typescript
// Before session creation:
const deviceLockKey = `device-slot-lock:${email}:${deviceId}`;
const lockResult = await store.set(deviceLockKey, JSON.stringify({
  lockedAt: now.toISOString(),
  deviceFingerprint: deviceId
}), { onlyIfNew: true });

if (!lockResult.modified) {
  // Lock already exists; another instance is creating this device's session
  // Retry or return 409
  throw new SessionCreationError('device_already_creating_session', 409);
}

// Lock acquired; now safe to:
// 1. Check device count (may have changed)
// 2. Create session
// 3. Release lock (delete deviceLockKey)
```

**Pros**:
- Uses existing Netlify Blobs feature (`onlyIfNew`)
- Already proven in codebase for code consumption
- Atomic at storage level
- Works across instances

**Cons**:
- Must handle lock release (cleanup on success/failure)
- Adds extra storage write
- Need retry logic for race on lock acquisition itself

### Option B: Per-Email Creation Counter with `onlyIfMatch`

**Requires**: `onlyIfMatch` conditional write (not currently available in v6.5.0)

```typescript
// Get current counter with ETag
const { data: counterStr, etag } = await store.getWithMetadata(
  `device-counter:${email}`,
  { type: 'text' }
);
const counter = parseInt(counterStr) || 0;

// Only update if ETag matches (counter hasn't changed)
const result = await store.set(
  `device-counter:${email}`,
  String(counter + 1),
  { onlyIfMatch: etag }
);

if (!result.modified) {
  // Counter changed between read and write; retry
}
```

**Pros**:
- Single point of coordination per email
- Cleaner than device locks

**Cons**:
- **Not supported** in Netlify Blobs v6.5.0
- Would require SDK upgrade to v11.1.6
- Introduces retry loops

### Option C: Upgrade Netlify Blobs & Use Conditional Writes

**Action**: Update `package.json` to resolve the version mismatch

```json
{
  "@netlify/blobs": "^11.1.6"  // Currently: ^11.1.6
}
```

**Investigation needed**:
- Run `npm install` to sync v11.1.6
- Check if v11.1.6 adds `onlyIfMatch` or similar
- Validate TypeScript definitions
- Test existing code for compatibility

**Risk**: Major version upgrade may break existing functionality

### Option D: Accept the Race & Document it

**Mitigation**:
- Acknowledge 2-device limit is "best-effort" in distributed system
- Add monitoring to detect overflow
- Implement client-side device selection before creation
- Document in CHANGELOG as known limitation

**Not Recommended**: Violates FR-006 and SC-004 (100% enforcement)

---

## Recommended Path Forward

1. **Immediate** (This Session):
   - Verify `onlyIfNew` works reliably in current v6.5.0
   - Test device lock pattern with mock Blobs
   - Document approach in `session-service.ts`

2. **Short-term** (Next Sprint):
   - Implement device slot lock (Option A)
   - Add integration tests for concurrent instance scenarios
   - Monitor production for lock contention

3. **Medium-term** (Future):
   - Track Netlify Blobs v11.1.6 release status
   - Evaluate upgrade path if `onlyIfMatch` becomes available
   - Consider migration to Netlify Key-Value if it supports compare-and-swap

---

## Test Cases to Validate Solution

```typescript
// Concurrent creation from 2 instances
it('prevents device overflow under concurrent requests', async () => {
  // Instance A
  const promise1 = createSessionFromVerification(
    'reader@example.com',
    '123456',
    fingerprintDevice1
  );
  
  // Instance B (simulated with separate store context)
  const promise2 = createSessionFromVerification(
    'reader@example.com',
    '123456',
    fingerprintDevice2
  );
  
  const [result1, result2] = await Promise.allSettled([promise1, promise2]);
  
  // Exactly one succeeds; other gets 409 or retry
  assert(result1.status === 'fulfilled' XOR result2.status === 'fulfilled');
});
```

---

## References

- **Spec**: `.github/specs/006-reader-access-session-mgmt/spec.md` (FR-006, SC-004)
- **Contract**: `.github/specs/006-reader-access-session-mgmt/contracts/session-api.md` §5
- **Implementation**: `netlify/lib/reader-access/session-service.ts` lines 83-141
- **Verification Code Example**: `netlify/lib/reader-access/store.ts` lines 180-200 (uses `onlyIfNew`)
- **Netlify Blobs Docs**: https://docs.netlify.com/api/get-started/#blobs
- **Blobs SDK**: npm `@netlify/blobs` (current: 6.5.0, specified: ^11.1.6)
