#!/usr/bin/env node
/**
 * Test HTTP server for Playwright E2E tests.
 * Serves the production build from dist/ with SPA fallback behavior.
 * Simulates Netlify's _redirects rules locally for routing validation.
 */

import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequestHandler } from './lib/test-server-handler.js';

const PORT = process.env.PORT || 3000;

/**
 * Map file extensions to content types.
 * @param {string} ext - File extension (with dot, e.g. '.html')
 * @returns {string} MIME type
 */
export function getContentType(ext) {
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
  };
  return contentTypes[ext] || 'application/octet-stream';
}

/**
 * Resolve a URL path to a file path in the given directory.
 * Handles directory traversal protection and SPA fallback.
 * @param {string} urlPath - URL path from request
 * @param {string} baseDir - Base directory to resolve in
 * @returns {string} Resolved file path or index.html for SPA fallback
 */
export function resolvePath(urlPath, baseDir) {
  let filePath = path.join(baseDir, urlPath);

  // Normalize path and prevent directory traversal
  filePath = path.normalize(filePath);
  const relativePath = path.relative(baseDir, filePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return null; // Not in allowed directory
  }

  // Check if it's a directory - serve index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If file doesn't exist, check if it's an asset or route
  if (!fs.existsSync(filePath)) {
    const pathname = new URL(`http://localhost${urlPath}`).pathname;
    const ext = path.extname(pathname);
    const isAsset = /\.(js|css|png|jpg|gif|svg|woff|woff2|json|map)$/i.test(ext);
    if (!isAsset) {
      // For routes, fall back to index.html (SPA behavior)
      filePath = path.join(baseDir, 'index.html');
    }
  }

  return filePath;
}

/**
 * Create and export the request handler for testing.
 * @param {string} distDir - Directory to serve files from
 * @returns {function} Request handler function
 */
export const requestHandler = (distDir) => {
  return createRequestHandler(distDir);
};

/**
 * Start the test server.
 *
 * @param {number} [port=PORT] - Port to listen on
 * @returns {http.Server} The created server instance
 */
export function startServer(port = PORT) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const DIST_DIR = path.join(__dirname, '../dist');
  const handler = createRequestHandler(DIST_DIR);
  const server = http.createServer(handler);

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
