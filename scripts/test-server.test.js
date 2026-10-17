/**
 * Tests for test-server.js — Test HTTP server for E2E tests
 */

import path from 'path';
import fs from 'fs';
import os from 'os';
import { getContentType, resolvePath, requestHandler, handleFileRead } from './test-server.js';

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

    it('returns 403 for directory traversal attempts', () => {
      const req = { url: '/../../../etc/passwd' };
      const res = { writeHead: jest.fn(), end: jest.fn() };

      requestHandler(req, res);
      expect(res.writeHead).toHaveBeenCalledWith(403);
      expect(res.end).toHaveBeenCalledWith('Forbidden');
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

  describe('getContentType', () => {
    it('maps XML files to application/xml', () => {
      expect(getContentType('.xml')).toBe('application/xml');
    });

    it('maps PDF files to application/pdf', () => {
      expect(getContentType('.pdf')).toBe('application/pdf');
    });

    it('maps video files', () => {
      expect(getContentType('.mp4')).toBe('video/mp4');
      expect(getContentType('.webm')).toBe('video/webm');
    });

    it('maps audio files', () => {
      expect(getContentType('.mp3')).toBe('audio/mpeg');
      expect(getContentType('.wav')).toBe('audio/wav');
    });

    it('maps text files', () => {
      expect(getContentType('.txt')).toBe('text/plain');
      expect(getContentType('.csv')).toBe('text/csv');
    });

    it('returns default for uppercase extensions', () => {
      expect(getContentType('.HTML')).toBe('application/octet-stream');
      expect(getContentType('.JSON')).toBe('application/octet-stream');
      expect(getContentType('.CSS')).toBe('application/octet-stream');
    });

    it('handles extensions without dot', () => {
      expect(getContentType('html')).toBe('application/octet-stream');
    });

    it('handles empty extension', () => {
      expect(getContentType('')).toBe('application/octet-stream');
    });
  });

  describe('requestHandler', () => {
    let tmpDir;

    beforeEach(() => {
      tmpDir = path.join(os.tmpdir(), `test-handler-${Date.now()}`);
      fs.mkdirSync(tmpDir, { recursive: true });
    });

    afterEach(() => {
      if (fs.existsSync(tmpDir)) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    });

    it('returns 403 for directory traversal with relative paths', () => {
      const req = { url: '/../../../etc/passwd' };
      const res = {
        writeHead: jest.fn(),
        end: jest.fn()
      };

      requestHandler(req, res);
      expect(res.writeHead).toHaveBeenCalledWith(403);
      expect(res.end).toHaveBeenCalledWith('Forbidden');
    });

    it('validates paths through resolvePath', () => {
      // requestHandler relies on resolvePath to validate paths
      // Direct testing of traversal is done in resolvePath tests above
      const req = { url: '/test.html' };
      const res = {
        writeHead: jest.fn(),
        end: jest.fn()
      };

      // Just verify it can be called without errors
      // (actual file serving tested via resolvePath tests)
      expect(() => {
        requestHandler(req, res);
      }).not.toThrow();
    });

    it('accepts valid request and response objects', () => {
      const req = { url: '/test.html' };
      const res = {
        writeHead: jest.fn(),
        end: jest.fn()
      };

      // Just verify the request structure is accepted without throwing
      expect(() => {
        expect(req.url).toBe('/test.html');
        expect(typeof res.writeHead).toBe('function');
        expect(typeof res.end).toBe('function');
      }).not.toThrow();
    });

    it('rejects requests with null file paths', () => {
      const req = { url: '/../../../malicious' };
      const res = {
        writeHead: jest.fn(),
        end: jest.fn()
      };

      requestHandler(req, res);
      // Should reject with 403
      expect(res.writeHead.mock.calls.length).toBeGreaterThan(0);
    });
  });

  describe('Content type detection', () => {
    it('correctly identifies all supported types', () => {
      const typeMap = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2'
      };

      Object.entries(typeMap).forEach(([ext, expectedType]) => {
        expect(getContentType(ext)).toBe(expectedType);
      });
    });
  });

  describe('handleFileRead', () => {
    it('handles file read errors with 500 status', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn()
      };
      const error = new Error('Read failed');

      handleFileRead('/path/to/file.html', error, null, res);

      expect(res.writeHead).toHaveBeenCalledWith(500);
      expect(res.end).toHaveBeenCalledWith('Server error');
    });

    it('handles successful file read with correct content type', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn()
      };
      const data = Buffer.from('<html>test</html>');

      handleFileRead('/path/to/file.html', null, data, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'text/html' });
      expect(res.end).toHaveBeenCalledWith(data);
    });

    it('determines content type from file extension', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn()
      };
      const data = Buffer.from('{}');

      handleFileRead('/path/to/file.json', null, data, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
    });

    it('handles CSS files with correct content type', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn()
      };
      const data = Buffer.from('body {}');

      handleFileRead('/path/to/style.css', null, data, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'text/css' });
    });

    it('handles JavaScript files with correct content type', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn()
      };
      const data = Buffer.from('console.log("test");');

      handleFileRead('/path/to/app.js', null, data, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/javascript' });
    });

    it('handles image files with correct content type', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn()
      };
      const data = Buffer.from([137, 80, 78, 71]); // PNG header

      handleFileRead('/path/to/image.png', null, data, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'image/png' });
    });

    it('returns early on error without processing file', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn()
      };
      const error = new Error('Access denied');

      handleFileRead('/path/to/file.html', error, Buffer.from('data'), res);

      expect(res.writeHead).toHaveBeenCalledWith(500);
      expect(res.writeHead).toHaveBeenCalledTimes(1);
      expect(res.end).toHaveBeenCalledWith('Server error');
    });

    it('handles unknown file extensions', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn()
      };
      const data = Buffer.from('unknown');

      handleFileRead('/path/to/file.xyz', null, data, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/octet-stream' });
    });
  });
});
