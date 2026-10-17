/**
 * test-server.test.js — Tests for the test HTTP server.
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { startServer } from './test-server.js';

describe('test-server', () => {
  let server;

  afterEach(() => {
    if (server) {
      server.close();
    }
  });

  it('exports startServer function', () => {
    expect(typeof startServer).toBe('function');
  });

  it('creates an HTTP server', () => {
    server = startServer(0); // Port 0 lets OS choose an available port
    expect(server).toBeDefined();
    expect(typeof server.listen).toBe('function');
    expect(typeof server.close).toBe('function');
  });

  it('server can listen on port', (done) => {
    server = startServer(0);

    server.on('listening', () => {
      const address = server.address();
      expect(address.port).toBeGreaterThan(0);
      done();
    });
  });

  it('server closes properly', (done) => {
    server = startServer(0);

    server.on('listening', () => {
      server.close(() => {
        expect(true).toBe(true); // Successfully closed
        server = null;
        done();
      });
    });
  });

  it('server has request handler', (done) => {
    server = startServer(0);

    server.on('listening', () => {
      expect(server.listeners('request').length).toBeGreaterThan(0);
      done();
    });
  });
});
