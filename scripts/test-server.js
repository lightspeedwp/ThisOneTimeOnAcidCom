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
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '../dist');

const requestHandler = createRequestHandler(DIST_DIR);
const server = http.createServer(requestHandler);

/**
 * Start the test server and log connection details.
 */
server.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  console.log(`Serving from: ${DIST_DIR}`);
  console.log('SPA fallback enabled: all routes fall back to index.html');
});

process.on('SIGINT', () => {
  console.log('Test server stopped');
  process.exit(0);
});
