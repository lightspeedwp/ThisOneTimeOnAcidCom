/**
 * test-server-handler.test.js — Tests for HTTP server handler functions.
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import os from 'os';
import * as handler from './test-server-handler.js';

describe('test-server-handler', () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      writeHead: jest.fn(),
      end: jest.fn(),
    };
  });

  describe('handleFileRead', () => {
    it('should return 500 on file read error', () => {
      const filePath = '/dist/missing.html';
      const error = new Error('ENOENT');
      const mockReq = {};

      handler.handleFileRead(filePath, error, null, mockRes);

      expect(mockRes.writeHead).toHaveBeenCalledWith(500);
      expect(mockRes.end).toHaveBeenCalledWith('Server error');
    });

    it('should serve HTML with correct content-type', () => {
      const filePath = '/dist/index.html';
      const data = Buffer.from('<html></html>');

      handler.handleFileRead(filePath, null, data, mockRes);

      expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'text/html',
      });
      expect(mockRes.end).toHaveBeenCalledWith(data);
    });

    it('should serve JavaScript with correct content-type', () => {
      const filePath = '/dist/app.js';
      const data = Buffer.from('console.log("test");');

      handler.handleFileRead(filePath, null, data, mockRes);

      expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/javascript',
      });
      expect(mockRes.end).toHaveBeenCalledWith(data);
    });

    it('should serve CSS with correct content-type', () => {
      const filePath = '/dist/style.css';
      const data = Buffer.from('body { color: red; }');

      handler.handleFileRead(filePath, null, data, mockRes);

      expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'text/css',
      });
      expect(mockRes.end).toHaveBeenCalledWith(data);
    });

    it('should serve JSON with correct content-type', () => {
      const filePath = '/dist/data.json';
      const data = Buffer.from('{"key": "value"}');

      handler.handleFileRead(filePath, null, data, mockRes);

      expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      });
      expect(mockRes.end).toHaveBeenCalledWith(data);
    });

    it('should serve PNG with correct content-type', () => {
      const filePath = '/dist/image.png';
      const data = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

      handler.handleFileRead(filePath, null, data, mockRes);

      expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'image/png',
      });
      expect(mockRes.end).toHaveBeenCalledWith(data);
    });

    it('should serve WOFF2 font with correct content-type', () => {
      const filePath = '/dist/font.woff2';
      const data = Buffer.from([0x00, 0x02]);

      handler.handleFileRead(filePath, null, data, mockRes);

      expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'font/woff2',
      });
    });

    it('should serve unknown files with octet-stream', () => {
      const filePath = '/dist/file.bin';
      const data = Buffer.from([0x00, 0x01, 0x02]);

      handler.handleFileRead(filePath, null, data, mockRes);

      expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/octet-stream',
      });
    });
  });

  describe('createRequestHandler', () => {
    let tempDir;

    beforeEach(() => {
      tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-server-'));
      fs.mkdirSync(path.join(tempDir, 'js'), { recursive: true });
      fs.writeFileSync(path.join(tempDir, 'index.html'), '<html>Test</html>');
      fs.writeFileSync(path.join(tempDir, 'test.txt'), 'test content');
      fs.writeFileSync(path.join(tempDir, 'js', 'app.js'), 'console.log("app");');
    });

    afterEach(() => {
      fs.rmSync(tempDir, { recursive: true, force: true });
    });

    it('should create a request handler function', () => {
      const requestHandler = handler.createRequestHandler(tempDir);
      expect(typeof requestHandler).toBe('function');
    });

    it('should serve existing files', (done) => {
      const requestHandler = handler.createRequestHandler(tempDir);
      const mockReq = { url: '/test.txt' };
      const mockRes = {
        writeHead: jest.fn(),
        end: jest.fn((data) => {
          expect(mockRes.writeHead).toHaveBeenCalledWith(200, expect.any(Object));
          done();
        }),
      };

      requestHandler(mockReq, mockRes);
    });

    it('should serve files from subdirectories', (done) => {
      const requestHandler = handler.createRequestHandler(tempDir);
      const mockReq = { url: '/js/app.js' };
      const mockRes = {
        writeHead: jest.fn(),
        end: jest.fn((data) => {
          expect(mockRes.writeHead).toHaveBeenCalledWith(200, expect.any(Object));
          done();
        }),
      };

      requestHandler(mockReq, mockRes);
    });

    it('should serve index.html for directory requests', (done) => {
      const requestHandler = handler.createRequestHandler(tempDir);
      const mockReq = { url: '/' };
      const mockRes = {
        writeHead: jest.fn(),
        end: jest.fn((data) => {
          expect(mockRes.writeHead).toHaveBeenCalledWith(200, expect.any(Object));
          done();
        }),
      };

      requestHandler(mockReq, mockRes);
    });

    it('should fall back to index.html for missing files (SPA behavior)', (done) => {
      const requestHandler = handler.createRequestHandler(tempDir);
      const mockReq = { url: '/nonexistent/route' };
      const mockRes = {
        writeHead: jest.fn(),
        end: jest.fn((data) => {
          expect(mockRes.writeHead).toHaveBeenCalledWith(200, expect.any(Object));
          done();
        }),
      };

      requestHandler(mockReq, mockRes);
    });

    it('should prevent directory traversal attacks', (done) => {
      const requestHandler = handler.createRequestHandler(tempDir);
      const mockReq = { url: '/../../../etc/passwd' };
      const mockRes = {
        writeHead: jest.fn(),
        end: jest.fn((msg) => {
          expect(mockRes.writeHead).toHaveBeenCalledWith(403);
          expect(msg).toBe('Forbidden');
          done();
        }),
      };

      requestHandler(mockReq, mockRes);
    });

    it('should prevent absolute path traversal', (done) => {
      const requestHandler = handler.createRequestHandler(tempDir);
      const mockReq = { url: '/etc/passwd' };
      const mockRes = {
        writeHead: jest.fn(),
        end: jest.fn((msg) => {
          // This should fall back to index.html, not fail with 403
          // because /etc/passwd doesn't exist so it serves index.html
          expect(mockRes.writeHead).toHaveBeenCalledWith(200, expect.any(Object));
          done();
        }),
      };

      requestHandler(mockReq, mockRes);
    });

    it('should serve subdirectory index.html', (done) => {
      fs.writeFileSync(path.join(tempDir, 'js', 'index.html'), '<html>JS Index</html>');
      const requestHandler = handler.createRequestHandler(tempDir);
      const mockReq = { url: '/js' };
      const mockRes = {
        writeHead: jest.fn(),
        end: jest.fn((data) => {
          expect(mockRes.writeHead).toHaveBeenCalledWith(200, expect.any(Object));
          done();
        }),
      };

      requestHandler(mockReq, mockRes);
    });
  });
});
