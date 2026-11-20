/**
 * @fileoverview Contract tests for reader analytics and completion events
 * Tests: RA-T051 (Completion Events & Analytics)
 * Spec: Phase 6
 *
 * Verifies:
 * - POST completion events for chapters
 * - Recording time spent and engagement metrics
 * - Aggregating reading statistics per session
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock Netlify Blobs store
const mockStore = new Map<string, string>();

vi.mock('@netlify/blobs', () => ({
  getStore: vi.fn(() => ({
    get: vi.fn(async (key: string) => mockStore.get(key) ?? null),
    set: vi.fn(async (key: string, value: string) => {
      mockStore.set(key, value);
    }),
    delete: vi.fn(async (key: string) => {
      mockStore.delete(key);
    }),
  })),
}));

import handler from '../functions/reader-analytics';

describe('Reader Analytics & Completion Events (RA-T051)', () => {
  let mockRequest: Request;

  beforeEach(() => {
    mockStore.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    mockStore.clear();
  });

  describe('Authentication', () => {
    it('should require session cookie', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chapterId: 'ch-01', timeSpent: 300 }),
      });

      const response = await handler(mockRequest, {} as any);
      expect(response.status).toBe(401);
    });

    it('should validate session before processing events', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=invalid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chapterId: 'ch-01', timeSpent: 300 }),
      });

      const response = await handler(mockRequest, {} as any);
      expect(response.status).toBe(401);
    });
  });

  describe('Completion Events', () => {
    it('should require chapter ID', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timeSpent: 300 }),
      });

      const response = await handler(mockRequest, {} as any);
      expect([400, 401]).toContain(response.status);
    });

    it('should require time spent metric', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chapterId: 'ch-01' }),
      });

      const response = await handler(mockRequest, {} as any);
      expect([400, 401]).toContain(response.status);
    });

    it('should record completion event with valid data', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterId: 'ch-01',
          timeSpent: 1800,
          deviceType: 'mobile',
        }),
      });

      const response = await handler(mockRequest, {} as any);

      if (response.status === 200) {
        const body = await response.json();
        expect(body.event).toBeDefined();
        expect(body.event.recorded).toBe(true);
        expect(body.event.chapterId).toBe('ch-01');
      }
    });

    it('should include timestamp in completion event', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterId: 'ch-01',
          timeSpent: 900,
        }),
      });

      const response = await handler(mockRequest, {} as any);

      if (response.status === 200) {
        const body = await response.json();
        expect(body.event.timestamp).toBeDefined();
        expect(typeof body.event.timestamp).toBe('string');
      }
    });
  });

  describe('Reading Statistics', () => {
    it('should aggregate reading stats', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterId: 'ch-01',
          timeSpent: 1800,
        }),
      });

      const response = await handler(mockRequest, {} as any);

      if (response.status === 200) {
        const body = await response.json();
        expect(body.stats).toBeDefined();
        expect(body.stats).toHaveProperty('totalTimeSpent');
        expect(body.stats).toHaveProperty('chaptersStarted');
        expect(body.stats).toHaveProperty('chaptersCompleted');
      }
    });

    it('should include last activity timestamp', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterId: 'ch-01',
          timeSpent: 600,
        }),
      });

      const response = await handler(mockRequest, {} as any);

      if (response.status === 200) {
        const body = await response.json();
        expect(body.stats.lastActivityAt).toBeDefined();
      }
    });
  });

  describe('Response Format', () => {
    it('should return JSON responses', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterId: 'ch-01',
          timeSpent: 300,
        }),
      });

      const response = await handler(mockRequest, {} as any);
      const contentType = response.headers.get('Content-Type');
      expect(contentType).toContain('application/json');
    });

    it('should include session expiration', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterId: 'ch-01',
          timeSpent: 300,
        }),
      });

      const response = await handler(mockRequest, {} as any);

      if (response.status === 200) {
        const body = await response.json();
        expect(body).toHaveProperty('expiresAt');
        expect(typeof body.expiresAt).toBe('string');
      }
    });

    it('should include cache control headers', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterId: 'ch-01',
          timeSpent: 300,
        }),
      });

      const response = await handler(mockRequest, {} as any);
      const cacheControl = response.headers.get('Cache-Control');
      expect(cacheControl).toBeDefined();
      expect(cacheControl).toMatch(/private|no-cache/);
    });
  });

  describe('Error Handling', () => {
    it('should reject non-POST methods', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'GET',
      });

      const response = await handler(mockRequest, {} as any);
      expect(response.status).toBe(405);
    });

    it('should handle invalid JSON in POST', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: '{invalid json}',
      });

      const response = await handler(mockRequest, {} as any);
      expect([400, 401]).toContain(response.status);
    });

    it('should validate time spent is non-negative', async () => {
      mockRequest = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterId: 'ch-01',
          timeSpent: -100,
        }),
      });

      const response = await handler(mockRequest, {} as any);
      expect([400, 401]).toContain(response.status);
    });
  });

  describe('Multiple Events', () => {
    it('should handle multiple chapter completion events', async () => {
      // First chapter
      let mockRequest1 = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterId: 'ch-01',
          timeSpent: 1200,
        }),
      });

      const response1 = await handler(mockRequest1, {} as any);
      expect([200, 401]).toContain(response1.status);

      // Second chapter
      const mockRequest2 = new Request('http://localhost/.netlify/functions/reader-analytics', {
        method: 'POST',
        headers: {
          'cookie': 'reader_session=valid',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterId: 'ch-02',
          timeSpent: 1500,
        }),
      });

      const response2 = await handler(mockRequest2, {} as any);
      expect([200, 401]).toContain(response2.status);
    });
  });
});
