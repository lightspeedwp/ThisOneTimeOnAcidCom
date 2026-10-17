#!/usr/bin/env node
/**
 * Test HTTP server for Playwright E2E tests.
 * Serves the production build from dist/ with SPA fallback behavior.
 * Simulates Netlify's _redirects rules locally for routing validation.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000;

let _distDir;
function getDistDir() {
  if (!_distDir) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    _distDir = path.join(__dirname, '../dist');
  }
  return _distDir;
}

const CONTENT_TYPES = {
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
  '.xml': 'application/xml',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.txt': 'text/plain',
  '.csv': 'text/csv',
};

/**
 * Get the content type for a file extension.
 * @param {string} ext - File extension
 * @returns {string} MIME type
 */
export function getContentType(ext) {
  return CONTENT_TYPES[ext] || 'application/octet-stream';
}

/**
 * Resolve the final file path to serve, handling directories and fallbacks.
 * @param {string} requestPath - The requested URL path
 * @param {string} distDir - The distribution directory (optional, defaults to getDistDir())
 * @returns {string} The final file path to serve
 */
export function resolvePath(requestPath, distDir = null) {
  const dir = distDir || getDistDir();
  let filePath = path.join(dir, requestPath);

  // Normalize path and prevent directory traversal
  filePath = path.normalize(filePath);
  const relativePath = path.relative(dir, filePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return null; // Forbidden
  }

  // Check if it's a directory - serve index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If file doesn't exist, fall back to index.html (SPA behavior)
  if (!fs.existsSync(filePath)) {
    filePath = path.join(dir, 'index.html');
  }

  return filePath;
}

/**
 * Handle file read completion and send response with correct content type.
 * @param {string} filePath - Path to the file being served
 * @param {error} err - File read error if any
 * @param {buffer} data - File contents
 * @param {object} res - HTTP response object
 */
export const handleFileRead = (filePath, err, data, res) => {
  if (err) {
    res.writeHead(500);
    res.end('Server error');
    return;
  }

  // Set appropriate content type
  const ext = path.extname(filePath);
  const contentType = getContentType(ext);

  res.writeHead(200, { 'Content-Type': contentType });
  res.end(data);
};

/**
 * Handle HTTP requests: serve files from dist/ with SPA fallback.
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */
export const requestHandler = (req, res) => {
  const filePath = resolvePath(req.url, getDistDir());

  if (filePath === null) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Read and serve the file
  fs.readFile(filePath, (err, data) => handleFileRead(filePath, err, data, res));
};

/**
 * Main function to start the test server.
 */
function main() {
  const server = http.createServer(requestHandler);
  const distDir = getDistDir();

  server.listen(PORT, () => {
    console.log(`Test server running at http://localhost:${PORT}`);
    console.log(`Serving from: ${distDir}`);
    console.log('SPA fallback enabled: all routes fall back to index.html');
  });

  process.on('SIGINT', () => {
    console.log('Test server stopped');
    process.exit(0);
  });
}

// Run main only if this script is invoked directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { main };
