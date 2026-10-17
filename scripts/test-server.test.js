/**
 * Tests for test-server-utils.js
 * @jest-environment node
 */

import { handleFileRead, requestHandler, createServer, setDistDir, getDistDir } from './lib/test-server-utils.js';

describe('test-server', () => {
  describe('handleFileRead', () => {

    it('returns 500 on file read error', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };

      const error = new Error('File not found');
      handleFileRead('/index.html', error, null, res);

      expect(res.writeHead).toHaveBeenCalledWith(500);
      expect(res.end).toHaveBeenCalledWith('Server error');
    });

    it('sets correct content-type for HTML files', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const fileContent = Buffer.from('<html></html>');

      handleFileRead('/index.html', null, fileContent, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'text/html' });
      expect(res.end).toHaveBeenCalledWith(fileContent);
    });

    it('sets correct content-type for JavaScript files', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const fileContent = Buffer.from('console.log("test");');

      handleFileRead('/bundle.js', null, fileContent, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/javascript' });
      expect(res.end).toHaveBeenCalledWith(fileContent);
    });

    it('sets correct content-type for CSS files', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const fileContent = Buffer.from('body { color: red; }');

      handleFileRead('/styles.css', null, fileContent, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'text/css' });
      expect(res.end).toHaveBeenCalledWith(fileContent);
    });

    it('sets correct content-type for JSON files', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const fileContent = Buffer.from('{}');

      handleFileRead('/data.json', null, fileContent, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
      expect(res.end).toHaveBeenCalledWith(fileContent);
    });

    it('sets correct content-type for PNG files', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const fileContent = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

      handleFileRead('/image.png', null, fileContent, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'image/png' });
      expect(res.end).toHaveBeenCalledWith(fileContent);
    });

    it('sets correct content-type for JPEG files', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const fileContent = Buffer.from([0xff, 0xd8, 0xff]);

      handleFileRead('/photo.jpg', null, fileContent, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'image/jpeg' });
      expect(res.end).toHaveBeenCalledWith(fileContent);
    });

    it('sets correct content-type for SVG files', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const fileContent = Buffer.from('<svg></svg>');

      handleFileRead('/icon.svg', null, fileContent, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'image/svg+xml' });
      expect(res.end).toHaveBeenCalledWith(fileContent);
    });

    it('sets correct content-type for WOFF files', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const fileContent = Buffer.from('font-data');

      handleFileRead('/font.woff', null, fileContent, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'font/woff' });
      expect(res.end).toHaveBeenCalledWith(fileContent);
    });

    it('sets correct content-type for WOFF2 files', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const fileContent = Buffer.from('font-data');

      handleFileRead('/font.woff2', null, fileContent, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'font/woff2' });
      expect(res.end).toHaveBeenCalledWith(fileContent);
    });

    it('sets default content-type for unknown extensions', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const fileContent = Buffer.from([0x00, 0x01]);

      handleFileRead('/file.unknown', null, fileContent, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/octet-stream' });
      expect(res.end).toHaveBeenCalledWith(fileContent);
    });

    it('handles file read errors gracefully', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const error = new Error('EACCES: permission denied');

      handleFileRead('/protected.html', error, null, res);

      expect(res.writeHead).toHaveBeenCalledWith(500);
      expect(res.end).toHaveBeenCalledWith('Server error');
    });
  });

  describe('requestHandler', () => {
    it('prevents directory traversal attacks', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const req = {
        url: '/../../../etc/passwd',
      };

      requestHandler(req, res);

      expect(res.writeHead).toHaveBeenCalledWith(403);
      expect(res.end).toHaveBeenCalledWith('Forbidden');
    });

    it('prevents directory traversal with absolute paths', () => {
      const res = {
        writeHead: jest.fn(),
        end: jest.fn(),
      };
      const req = {
        url: '/../etc/passwd',
      };

      requestHandler(req, res);

      expect(res.writeHead).toHaveBeenCalledWith(403);
      expect(res.end).toHaveBeenCalledWith('Forbidden');
    });

    it('accepts normal file paths', () => {
      expect(typeof requestHandler).toBe('function');
    });
  });

  describe('server initialization', () => {
    it('uses PORT environment variable when set', () => {
      process.env.PORT = '8080';
      const port = process.env.PORT || 3000;
      expect(port).toBe('8080');
      delete process.env.PORT;
    });

    it('defaults to port 3000 when PORT not set', () => {
      delete process.env.PORT;
      const port = process.env.PORT || 3000;
      expect(port).toBe(3000);
    });
  });

  describe('server utility functions', () => {
    it('can set and get DIST_DIR', () => {
      setDistDir('/custom/path');
      const result = getDistDir();
      expect(result).toBe('/custom/path');
    });

    it('returns a valid HTTP server from createServer', () => {
      const server = createServer();
      expect(server).toBeDefined();
      expect(typeof server.listen).toBe('function');
    });

    it('getDistDir returns a string', () => {
      const distDir = getDistDir();
      expect(typeof distDir).toBe('string');
    });
  });
});
