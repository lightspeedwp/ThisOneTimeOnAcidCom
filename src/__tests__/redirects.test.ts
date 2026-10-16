import { readFileSync, statSync } from 'fs';
import { resolve } from 'path';

describe('Netlify Redirects Configuration', () => {
  const redirectsPath = resolve(__dirname, '../../public/_redirects');

  describe('Redirect File Structure', () => {
    test('_redirects file exists as regular file (not directory)', () => {
      const stats = statSync(redirectsPath);
      expect(stats.isFile()).toBe(true);
      expect(stats.isDirectory()).toBe(false);
    });

    test('_redirects file is readable', () => {
      const content = readFileSync(redirectsPath, 'utf-8');
      expect(content).toBeDefined();
      expect(typeof content).toBe('string');
    });

    test('_redirects file has correct extension (no .tsx)', () => {
      const filename = redirectsPath.split('/').pop();
      expect(filename).toBe('_redirects');
      expect(filename).not.toMatch(/\.(tsx|ts|js|json)$/);
    });
  });

  describe('Redirect Content Format', () => {
    test('_redirects contains valid SPA redirect rule', () => {
      const content = readFileSync(redirectsPath, 'utf-8');
      expect(content).toContain('/*    /index.html   200');
    });

    test('_redirects has proper syntax structure', () => {
      const content = readFileSync(redirectsPath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));

      expect(lines.length).toBeGreaterThan(0);
      lines.forEach(line => {
        // Each rule should have pattern, destination, and status code
        const parts = line.trim().split(/\s+/);
        expect(parts.length).toBeGreaterThanOrEqual(2);
      });
    });

    test('_redirects ends with newline', () => {
      const content = readFileSync(redirectsPath, 'utf-8');
      expect(content).toMatch(/\n$/);
    });

    test('_redirects file not empty', () => {
      const content = readFileSync(redirectsPath, 'utf-8');
      const nonCommentLines = content
        .split('\n')
        .filter(line => line.trim() && !line.trim().startsWith('#'));
      expect(nonCommentLines.length).toBeGreaterThan(0);
    });
  });

  describe('SPA Fallback Configuration', () => {
    test('SPA fallback rule exists for /* pattern', () => {
      const content = readFileSync(redirectsPath, 'utf-8');
      expect(content).toMatch(/\/\*\s+\/index\.html/);
    });

    test('SPA fallback rule uses 200 status code', () => {
      const content = readFileSync(redirectsPath, 'utf-8');
      expect(content).toMatch(/\/\*\s+\/index\.html\s+200/);
    });
  });
});
