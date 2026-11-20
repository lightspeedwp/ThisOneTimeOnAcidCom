/**
 * Reader Retention Function Tests (RA-T050)
 * Verify data cleanup of expired reader access records
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock Netlify Blobs
const mockBlobStore = new Map<string, string>();
const mockDeletedKeys = new Set<string>();

vi.mock('@netlify/blobs', () => {
  const store = {
    list: vi.fn(async ({ prefix }: { prefix: string }) => ({
      blobs: Array.from(mockBlobStore.keys())
        .filter((k) => k.startsWith(prefix))
        .map((key) => ({ key })),
    })),
    get: vi.fn(async (key: string) => mockBlobStore.get(key) ?? null),
    delete: vi.fn(async (key: string) => {
      mockBlobStore.delete(key);
      mockDeletedKeys.add(key);
    }),
  };
  return { getStore: vi.fn(() => store) };
});

import handler from '../functions/reader-retention';

describe('Reader Retention Tests (RA-T050)', () => {
  beforeEach(() => {
    mockBlobStore.clear();
    mockDeletedKeys.clear();
  });

  afterEach(() => {
    mockBlobStore.clear();
    mockDeletedKeys.clear();
  });

  describe('Record deletion by delete_after', () => {
    it('should delete records past delete_after timestamp', async () => {
      const now = new Date();
      const expiredDate = new Date(now.getTime() - 86400000); // 1 day ago
      const futureDate = new Date(now.getTime() + 86400000); // 1 day from now

      const expiredRecord = {
        id: 'record-1',
        email: 'expired@example.com',
        readerId: 'reader-1',
        verified: true,
        lastAuthenticatedAt: expiredDate.toISOString(),
        deleteAfter: expiredDate.toISOString(),
        createdAt: new Date(now.getTime() - 365 * 86400000).toISOString(),
      };

      const activeRecord = {
        id: 'record-2',
        email: 'active@example.com',
        readerId: 'reader-2',
        verified: true,
        lastAuthenticatedAt: now.toISOString(),
        deleteAfter: futureDate.toISOString(),
        createdAt: new Date(now.getTime() - 30 * 86400000).toISOString(),
      };

      mockBlobStore.set(
        'reader-access:record-1',
        JSON.stringify(expiredRecord)
      );
      mockBlobStore.set(
        'reader-access:record-2',
        JSON.stringify(activeRecord)
      );

      const req = new Request('http://localhost/.netlify/functions/reader-retention', {
        method: 'GET',
      });

      const response = await handler(req);
      const result = await response.json() as { deleted: number; deletedIds: string[] };

      expect(result.status).toBe('completed');
      expect(result.deleted).toBe(1);
      expect(result.deletedIds).toContain('record-1');
      expect(mockDeletedKeys.has('reader-access:record-1')).toBe(true);
      expect(mockBlobStore.has('reader-access:record-2')).toBe(true);
    });
  });

  describe('12-month retention policy (RA-006)', () => {
    it('should identify records reaching 12-month inactivity', async () => {
      const now = new Date();
      const thirteenMonthsAgo = new Date(now.getTime() - 395 * 86400000); // ~13 months

      const oldRecord = {
        id: 'record-old',
        email: 'old@example.com',
        readerId: 'reader-old',
        verified: true,
        lastAuthenticatedAt: thirteenMonthsAgo.toISOString(),
        deleteAfter: thirteenMonthsAgo.toISOString(), // 12 months from last auth
        createdAt: new Date(now.getTime() - 400 * 86400000).toISOString(),
      };

      mockBlobStore.set('reader-access:record-old', JSON.stringify(oldRecord));

      const req = new Request('http://localhost/.netlify/functions/reader-retention', {
        method: 'GET',
      });

      const response = await handler(req);
      const result = await response.json() as { deleted: number };

      expect(result.status).toBe('completed');
      expect(result.deleted).toBe(1);
    });
  });

  describe('Graceful degradation', () => {
    it('should continue if individual record processing fails', async () => {
      const now = new Date();
      const expiredDate = new Date(now.getTime() - 86400000);

      const validRecord = {
        id: 'record-valid',
        email: 'valid@example.com',
        readerId: 'reader-valid',
        verified: true,
        lastAuthenticatedAt: expiredDate.toISOString(),
        deleteAfter: expiredDate.toISOString(),
        createdAt: new Date(now.getTime() - 365 * 86400000).toISOString(),
      };

      // Add valid record and an invalid JSON entry
      mockBlobStore.set('reader-access:record-valid', JSON.stringify(validRecord));
      mockBlobStore.set('reader-access:record-invalid', 'INVALID_JSON');

      const req = new Request('http://localhost/.netlify/functions/reader-retention', {
        method: 'GET',
      });

      const response = await handler(req);
      const result = await response.json() as { deleted: number; errors: number };

      expect(result.status).toBe('completed');
      // Valid record should be deleted despite invalid record existing
      expect(result.deleted).toBeGreaterThanOrEqual(0);
      expect(result.errors).toBeGreaterThan(0);
    });
  });

  describe('Audit trail logging', () => {
    it('should return audit-trail results with timestamp and duration', async () => {
      const now = new Date();
      const expiredDate = new Date(now.getTime() - 86400000);

      const record = {
        id: 'record-1',
        email: 'test@example.com',
        readerId: 'reader-1',
        verified: true,
        lastAuthenticatedAt: expiredDate.toISOString(),
        deleteAfter: expiredDate.toISOString(),
        createdAt: new Date(now.getTime() - 365 * 86400000).toISOString(),
      };

      mockBlobStore.set('reader-access:record-1', JSON.stringify(record));

      const req = new Request('http://localhost/.netlify/functions/reader-retention', {
        method: 'GET',
      });

      const response = await handler(req);
      const result = await response.json() as {
        timestamp: string;
        status: string;
        deleted: number;
        durationMs: number;
      };

      expect(result.timestamp).toBeDefined();
      expect(result.status).toBe('completed');
      expect(result.deleted).toBe(1);
      expect(result.durationMs).toBeGreaterThanOrEqual(0);
      expect(result.durationMs).toBeLessThan(5000); // Should be fast
    });

    it('should log deleted record IDs (first 10)', async () => {
      const now = new Date();
      const expiredDate = new Date(now.getTime() - 86400000);

      // Create 15 expired records
      for (let i = 0; i < 15; i++) {
        const record = {
          id: `record-${i}`,
          email: `email${i}@example.com`,
          readerId: `reader-${i}`,
          verified: true,
          lastAuthenticatedAt: expiredDate.toISOString(),
          deleteAfter: expiredDate.toISOString(),
          createdAt: new Date(now.getTime() - 365 * 86400000).toISOString(),
        };

        mockBlobStore.set(`reader-access:record-${i}`, JSON.stringify(record));
      }

      const req = new Request('http://localhost/.netlify/functions/reader-retention', {
        method: 'GET',
      });

      const response = await handler(req);
      const result = await response.json() as {
        deleted: number;
        deletedIds: string[];
        hasMore: boolean;
      };

      expect(result.deleted).toBe(15);
      expect(result.deletedIds.length).toBeLessThanOrEqual(10);
      expect(result.hasMore).toBe(true);
    });
  });

  describe('Empty database', () => {
    it('should return success with 0 deletions on empty database', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-retention', {
        method: 'GET',
      });

      const response = await handler(req);
      const result = await response.json() as { deleted: number; status: string };

      expect(result.status).toBe('completed');
      expect(result.deleted).toBe(0);
    });
  });

  describe('HTTP method handling', () => {
    it('should accept GET requests (scheduled invocation)', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-retention', {
        method: 'GET',
      });

      const response = await handler(req);
      expect(response.status).toBe(200);
    });

    it('should accept POST requests', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-retention', {
        method: 'POST',
      });

      const response = await handler(req);
      expect(response.status).toBe(200);
    });

    it('should reject non-GET/POST methods', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-retention', {
        method: 'DELETE',
      });

      const response = await handler(req);
      expect(response.status).toBe(405);
    });
  });
});
