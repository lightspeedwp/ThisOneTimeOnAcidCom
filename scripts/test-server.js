#!/usr/bin/env node
/**
 * Test HTTP server for Playwright E2E tests.
 * Serves the production build from dist/ with SPA fallback behavior.
 * Simulates Netlify's _redirects rules locally for routing validation.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');

/**
 * Handle file read completion and send response with correct content type.
 * @param {string} filePath - Path to the file being served
 * @param {error} err - File read error if any
 * @param {buffer} data - File contents
 * @param {object} res - HTTP response object
 */
const handleFileRead = (filePath, err, data, res) => {
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
const requestHandler = (req, res) => {
  let filePath = path.join(DIST_DIR, req.url);

  // Normalize path and prevent directory traversal
  filePath = path.normalize(filePath);
  if (!filePath.startsWith(DIST_DIR)) {
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
