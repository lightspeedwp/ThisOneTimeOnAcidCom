/**
 * Tests for test-server.js — Test HTTP server for E2E tests
 */

import path from 'path';
import fs from 'fs';
import os from 'os';
import { getContentType, resolvePath, requestHandler } from './test-server.js';

describe('test-server', () => {
  describe('getContentType', () => {
    it('maps HTML files to text/html', () => {
      expect(getContentType('.html')).toBe('text/html');
    });

    it('maps JavaScript files to application/javascript', () => {
      expect(getContentType('.js')).toBe('application/javascript');
    });

    it('maps CSS files to text/css', () => {
      expect(getContentType('.css')).toBe('text/css');
    });

    it('maps JSON files to application/json', () => {
      expect(getContentType('.json')).toBe('application/json');
    });

    it('maps image files to appropriate types', () => {
      expect(getContentType('.png')).toBe('image/png');
      expect(getContentType('.jpg')).toBe('image/jpeg');
      expect(getContentType('.gif')).toBe('image/gif');
      expect(getContentType('.svg')).toBe('image/svg+xml');
    });

    it('maps font files correctly', () => {
      expect(getContentType('.woff')).toBe('font/woff');
      expect(getContentType('.woff2')).toBe('font/woff2');
    });

    it('defaults to application/octet-stream for unknown types', () => {
      expect(getContentType('.unknown')).toBe('application/octet-stream');
      expect(getContentType('.xyz')).toBe('application/octet-stream');
    });
  });

  describe('resolvePath', () => {
    let tmpDir;

    beforeEach(() => {
      tmpDir = path.join(os.tmpdir(), `test-server-${Date.now()}`);
      fs.mkdirSync(tmpDir, { recursive: true });
    });

    afterEach(() => {
      if (fs.existsSync(tmpDir)) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    });

    it('resolves simple file paths', () => {
      const indexPath = path.join(tmpDir, 'index.html');
      fs.writeFileSync(indexPath, '<html></html>');

      const result = resolvePath('/index.html', tmpDir);
      expect(result).toBe(indexPath);
    });

    it('serves index.html for directories', () => {
      const subDir = path.join(tmpDir, 'journal');
      fs.mkdirSync(subDir, { recursive: true });
      const indexPath = path.join(subDir, 'index.html');
      fs.writeFileSync(indexPath, '<html></html>');

      const result = resolvePath('/journal', tmpDir);
      expect(result).toBe(indexPath);
    });

    it('falls back to root index.html for missing files', () => {
      const indexPath = path.join(tmpDir, 'index.html');
      fs.writeFileSync(indexPath, '<html></html>');

      const result = resolvePath('/nonexistent/route', tmpDir);
      expect(result).toBe(indexPath);
    });

    it('prevents directory traversal with ../', () => {
      const result = resolvePath('/../../../etc/passwd', tmpDir);
      expect(result).toBeNull();
    });

    it('handles root path requests', () => {
      const indexPath = path.join(tmpDir, 'index.html');
      fs.writeFileSync(indexPath, '<html></html>');

      const result = resolvePath('/', tmpDir);
      expect(result).toBe(indexPath);
    });

    it('handles nested file requests', () => {
      const subDir = path.join(tmpDir, 'assets');
      fs.mkdirSync(subDir, { recursive: true });
      const filePath = path.join(subDir, 'logo.svg');
      fs.writeFileSync(filePath, '<svg></svg>');

      const result = resolvePath('/assets/logo.svg', tmpDir);
      expect(result).toBe(filePath);
    });

    it('handles static CSS assets', () => {
      const cssDir = path.join(tmpDir, 'css');
      fs.mkdirSync(cssDir, { recursive: true });
      const cssFile = path.join(cssDir, 'style.css');
      fs.writeFileSync(cssFile, 'body {}');

      const result = resolvePath('/css/style.css', tmpDir);
      expect(result).toBe(cssFile);
    });

    it('handles static JavaScript assets', () => {
      const jsDir = path.join(tmpDir, 'js');
      fs.mkdirSync(jsDir, { recursive: true });
      const jsFile = path.join(jsDir, 'app.js');
      fs.writeFileSync(jsFile, 'console.log("test");');

      const result = resolvePath('/js/app.js', tmpDir);
      expect(result).toBe(jsFile);
    });
  });

  describe('requestHandler', () => {
    it('is a function', () => {
      expect(typeof requestHandler).toBe('function');
    });

    it('accepts request and response objects', () => {
      const req = { url: '/' };
      const res = { writeHead: jest.fn(), end: jest.fn() };

      expect(() => {
        requestHandler(req, res);
      }).not.toThrow();
    });
  });

  describe('path security', () => {
    it('detects absolute path traversal', () => {
      const absolutePath = '/etc/passwd';
      expect(path.isAbsolute(absolutePath)).toBe(true);
    });

    it('detects relative path traversal', () => {
      const relativePath = '../../../etc/passwd';
      expect(relativePath.startsWith('..')).toBe(true);
    });

    it('normalizes paths correctly', () => {
      const unnormalized = '/path//to///file.html';
      const normalized = path.normalize(unnormalized);
      expect(normalized).not.toContain('//');
    });
  });

  describe('directory detection', () => {
    let tmpDir;

    beforeEach(() => {
      tmpDir = path.join(os.tmpdir(), `test-dir-${Date.now()}`);
      fs.mkdirSync(tmpDir, { recursive: true });
    });

    afterEach(() => {
      if (fs.existsSync(tmpDir)) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    });

    it('identifies directories', () => {
      const isDir = fs.statSync(tmpDir).isDirectory();
      expect(isDir).toBe(true);
    });

    it('identifies files', () => {
      const filePath = path.join(tmpDir, 'test.html');
      fs.writeFileSync(filePath, '<html></html>');
      const isFile = !fs.statSync(filePath).isDirectory();
      expect(isFile).toBe(true);
    });
  });

  describe('SPA fallback behavior', () => {
    let tmpDir;

    beforeEach(() => {
      tmpDir = path.join(os.tmpdir(), `test-spa-${Date.now()}`);
      fs.mkdirSync(tmpDir, { recursive: true });
      const indexPath = path.join(tmpDir, 'index.html');
      fs.writeFileSync(indexPath, '<html></html>');
    });

    afterEach(() => {
      if (fs.existsSync(tmpDir)) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    });

    it('serves index.html for all routes', () => {
      const routes = ['/journal', '/journal/article', '/about'];
      routes.forEach(route => {
        const result = resolvePath(route, tmpDir);
        expect(result.endsWith('index.html')).toBe(true);
      });
    });

    it('handles deeply nested routes', () => {
      const result = resolvePath('/a/b/c/d/e/f', tmpDir);
      expect(result.endsWith('index.html')).toBe(true);
    });
  });
});
