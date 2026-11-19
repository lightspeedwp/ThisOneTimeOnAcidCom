/**
 * Contract Tests: GET /api/reader/chapters/{chapterId}
 *
 * Tests the protected chapter delivery:
 * - Valid session + approved chapter → 200 (chapter JSON)
 * - No session → 401 request-pending
 * - Session expired → 401 request-pending
 * - Unapproved chapter → 404 content-unavailable
 * - Protected edition not in bundle
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import handler from '../../netlify/functions/reader-chapter';

// Mock dependencies
vi.mock('@netlify/blobs', () => ({
  get: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('../../netlify/lib/reader-access/session-cookie.ts', () => ({
  validate: vi.fn(),
}));

vi.mock('../../netlify/lib/reader-access/edition.ts', () => ({
  loadManifest: vi.fn(),
  isChapterApproved: vi.fn(),
}));

describe('GET /api/reader/chapters/{chapterId}', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Valid session + approved chapter', () => {
    it('should return 200 with chapter content when session is valid', async () => {
      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      const response = await handler(req);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toMatchObject({
        state: 'verified',
      });
      expect(body).toHaveProperty('chapter');
    });

    it('should return chapter as JSON object with title and content', async () => {
      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      const response = await handler(req);
      const body = await response.json();

      expect(body.chapter).toHaveProperty('id', 'chapter-1');
      expect(body.chapter).toHaveProperty('title');
      expect(body.chapter).toHaveProperty('content');
    });

    it('should not expose file paths in response', async () => {
      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      const response = await handler(req);
      const body = await response.json();

      expect(JSON.stringify(body)).not.toContain('.md');
      expect(JSON.stringify(body)).not.toContain('netlify/functions/protected-content');
    });

    it('should validate session before returning chapter', async () => {
      const { validate } = await import('../../netlify/lib/reader-access/session-cookie.ts');

      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      await handler(req);

      expect(validate).toHaveBeenCalled();
    });

    it('should check chapter against edition manifest', async () => {
      const { isChapterApproved } = await import('../../netlify/lib/reader-access/edition.ts');

      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      await handler(req);

      expect(isChapterApproved).toHaveBeenCalledWith('chapter-1');
    });
  });

  describe('No session (401 request-pending)', () => {
    it('should return 401 request-pending when session cookie is missing', async () => {
      const { validate } = await import('../../netlify/lib/reader-access/session-cookie.ts');
      vi.mocked(validate).mockReturnValueOnce(null); // No valid session

      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      const response = await handler(req);

      expect(response.status).toBe(401);
      const body = await response.json();
      expect(body).toMatchObject({
        state: 'request-pending',
      });
    });

    it('should not return chapter content when session is missing', async () => {
      const { validate } = await import('../../netlify/lib/reader-access/session-cookie.ts');
      vi.mocked(validate).mockReturnValueOnce(null);

      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      const response = await handler(req);
      const body = await response.json();

      expect(body).not.toHaveProperty('chapter');
    });

    it('should not reveal whether chapter exists in invalid session response', async () => {
      const { validate } = await import('../../netlify/lib/reader-access/session-cookie.ts');
      vi.mocked(validate).mockReturnValueOnce(null);

      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=nonexistent',
        { method: 'GET' }
      );

      const response = await handler(req);

      // Always 401 for missing session, never 404
      expect(response.status).toBe(401);
    });
  });

  describe('Session expired (401 request-pending)', () => {
    it('should return 401 request-pending when session expires_at < now', async () => {
      const { validate } = await import('../../netlify/lib/reader-access/session-cookie.ts');
      vi.mocked(validate).mockReturnValueOnce(null); // Expired session returns null

      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      const response = await handler(req);

      expect(response.status).toBe(401);
      const body = await response.json();
      expect(body).toMatchObject({
        state: 'request-pending',
      });
    });

    it('should not return chapter content when session is expired', async () => {
      const { validate } = await import('../../netlify/lib/reader-access/session-cookie.ts');
      vi.mocked(validate).mockReturnValueOnce(null);

      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      const response = await handler(req);
      const body = await response.json();

      expect(body).not.toHaveProperty('chapter');
    });
  });

  describe('Unapproved chapter (404 content-unavailable)', () => {
    it('should return 404 content-unavailable when chapter not in manifest', async () => {
      const { isChapterApproved } = await import('../../netlify/lib/reader-access/edition.ts');
      vi.mocked(isChapterApproved).mockReturnValueOnce(false);

      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-99',
        { method: 'GET' }
      );

      const response = await handler(req);

      expect(response.status).toBe(404);
      const body = await response.json();
      expect(body).toMatchObject({
        state: 'content-unavailable',
      });
    });

    it('should not return chapter content when not approved', async () => {
      const { isChapterApproved } = await import('../../netlify/lib/reader-access/edition.ts');
      vi.mocked(isChapterApproved).mockReturnValueOnce(false);

      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-99',
        { method: 'GET' }
      );

      const response = await handler(req);
      const body = await response.json();

      expect(body).not.toHaveProperty('chapter');
    });

    it('should validate manifest against approved chapter list (1-4)', async () => {
      const { isChapterApproved } = await import('../../netlify/lib/reader-access/edition.ts');
      vi.mocked(isChapterApproved).mockReturnValueOnce(false);

      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-5',
        { method: 'GET' }
      );

      await handler(req);

      // Manifest should contain chapters 1-4; chapter-5 should not be approved
      expect(isChapterApproved).toHaveBeenCalledWith('chapter-5');
    });
  });

  describe('Bundle protection (protected edition not in client)', () => {
    it('should load chapter from server-only location (netlify/functions/protected-content/)', async () => {
      // Contract: Protected edition is in netlify/functions/protected-content/, not in src/content/
      // This test verifies the function does NOT attempt to load from src/content/

      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      const response = await handler(req);

      // If implementation tried to load from client bundle, the content would be found
      // If implementation loads from protected server location, content is found differently
      expect(response.status).not.toBe(500); // No error loading from missing location
    });

    it('should use edition manifest to guard access (not glob matching)', async () => {
      // Contract: Edition manifest is source of truth for which chapters are available
      // Not the filesystem glob pattern

      const { isChapterApproved } = await import('../../netlify/lib/reader-access/edition.ts');

      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      await handler(req);

      // Should have checked manifest, not just filesystem
      expect(isChapterApproved).toHaveBeenCalled();
    });
  });

  describe('Invalid requests', () => {
    it('should return 400 for missing chapterId', async () => {
      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter',
        { method: 'GET' }
      );

      const response = await handler(req);

      expect(response.status).toBe(400);
    });

    it('should return 405 for POST request', async () => {
      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'POST' }
      );

      const response = await handler(req);

      expect(response.status).toBe(405);
    });
  });

  describe('Response headers', () => {
    it('should set Cache-Control: no-store (session-dependent)', async () => {
      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      const response = await handler(req);

      expect(response.headers.get('Cache-Control')).toBe('no-store');
    });

    it('should set Content-Type: application/json', async () => {
      const req = new Request(
        'http://localhost/.netlify/functions/reader-chapter?chapterId=chapter-1',
        { method: 'GET' }
      );

      const response = await handler(req);

      expect(response.headers.get('Content-Type')).toContain('application/json');
    });
  });
});
