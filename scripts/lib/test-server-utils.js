/**
 * Test HTTP server utilities for Playwright E2E tests.
 * Serves the production build from dist/ with SPA fallback behavior.
 * Simulates Netlify's _redirects rules locally for routing validation.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';

let DIST_DIR = path.join(process.cwd(), 'dist');

/**
 * Set the DIST_DIR for serving files (used for testing).
 * @param {string} distPath - Path to the dist directory
 */
export const setDistDir = (distPath) => {
  DIST_DIR = distPath;
};

/**
 * Get the current DIST_DIR.
 * @returns {string} The dist directory path
 */
export const getDistDir = () => DIST_DIR;

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

  const contentType = contentTypes[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(data);
};

/**
 * Handle HTTP requests: serve files from dist/ with SPA fallback.
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */
export const requestHandler = (req, res) => {
  let filePath = path.join(DIST_DIR, req.url);

  // Normalize path and prevent directory traversal
  filePath = path.normalize(filePath);
  const relativePath = path.relative(DIST_DIR, filePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Check if it's a directory - serve index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If file doesn't exist, fall back to index.html (SPA behavior)
  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  // Read and serve the file
  fs.readFile(filePath, (err, data) => handleFileRead(filePath, err, data, res));
};

/**
 * Create and return the HTTP server.
 * @returns {http.Server} The configured HTTP server
 */
export const createServer = () => {
  return http.createServer(requestHandler);
};
