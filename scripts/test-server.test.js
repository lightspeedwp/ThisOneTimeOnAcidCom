/**
 * Tests for test-server.js — Test HTTP server for E2E tests
 */

import path from 'path';
import fs from 'fs';
import os from 'os';
import { startServer } from './test-server.js';
import { handleFileRead, createRequestHandler } from './lib/test-server-handler.js';

describe('test-server', () => {
  describe('startServer', () => {
    it('is a function', () => {
      expect(typeof startServer).toBe('function');
    });
  });

  describe('createRequestHandler', () => {
    it('creates a request handler function', () => {
      const tmpDir = path.join(os.tmpdir(), `test-handler-${Date.now()}`);
      fs.mkdirSync(tmpDir, { recursive: true });

      try {
        const handler = createRequestHandler(tmpDir);
        expect(typeof handler).toBe('function');
      } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    });

    it('handler accepts request and response objects', () => {
      const tmpDir = path.join(os.tmpdir(), `test-handler-${Date.now()}`);
      fs.mkdirSync(tmpDir, { recursive: true });
      const indexPath = path.join(tmpDir, 'index.html');
      fs.writeFileSync(indexPath, '<html></html>');

      try {
        const handler = createRequestHandler(tmpDir);
        const req = { url: '/' };
        const res = { writeHead: jest.fn(), end: jest.fn() };

        expect(() => {
          handler(req, res);
        }).not.toThrow();
      } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    });
  });

  describe('handleFileRead', () => {
    it('handles successful file reads', () => {
      const res = { writeHead: jest.fn(), end: jest.fn() };
      const data = Buffer.from('<html></html>');

      handleFileRead('test.html', null, data, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'text/html' });
      expect(res.end).toHaveBeenCalledWith(data);
    });

    it('handles file read errors', () => {
      const res = { writeHead: jest.fn(), end: jest.fn() };
      const error = new Error('File not found');

      handleFileRead('test.html', error, null, res);

      expect(res.writeHead).toHaveBeenCalledWith(500);
      expect(res.end).toHaveBeenCalledWith('Server error');
    });

    it('sets correct content type for HTML files', () => {
      const res = { writeHead: jest.fn(), end: jest.fn() };
      const data = Buffer.from('<html></html>');

      handleFileRead('index.html', null, data, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'text/html' });
    });

    it('sets correct content type for CSS files', () => {
      const res = { writeHead: jest.fn(), end: jest.fn() };
      const data = Buffer.from('body {}');

      handleFileRead('style.css', null, data, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'text/css' });
    });

    it('sets correct content type for JavaScript files', () => {
      const res = { writeHead: jest.fn(), end: jest.fn() };
      const data = Buffer.from('console.log("test");');

      handleFileRead('app.js', null, data, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/javascript' });
    });

    it('sets correct content type for JSON files', () => {
      const res = { writeHead: jest.fn(), end: jest.fn() };
      const data = Buffer.from('{}');

      handleFileRead('data.json', null, data, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
    });

    it('defaults to application/octet-stream for unknown types', () => {
      const res = { writeHead: jest.fn(), end: jest.fn() };
      const data = Buffer.from('binary data');

      handleFileRead('file.unknown', null, data, res);

      expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/octet-stream' });
    });
  });
});
