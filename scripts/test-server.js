#!/usr/bin/env node
/**
 * Test HTTP server for Playwright E2E tests.
 * Serves the production build from dist/ with SPA fallback behavior.
 * Simulates Netlify's _redirects rules locally for routing validation.
 */

import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequestHandler } from './lib/test-server-handler.js';

const PORT = process.env.PORT || 3000;

/**
 * Start the test server.
 *
 * @param {number} [port=PORT] - Port to listen on
 * @returns {http.Server} The created server instance
 */
export function startServer(port = PORT) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const DIST_DIR = path.join(__dirname, '../dist');
  const requestHandler = createRequestHandler(DIST_DIR);
  const server = http.createServer(requestHandler);

  server.listen(port, () => {
    console.log(`Test server running at http://localhost:${port}`);
    console.log(`Serving from: ${DIST_DIR}`);
    console.log('SPA fallback enabled: routes fall back to index.html, missing assets return 404');
  });

  return server;
}

// Only start the server if this is the entry point
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const server = startServer();

  process.on('SIGINT', () => {
    console.log('Test server stopped');
    server.close(() => {
      process.exit(0);
    });
  });
}
