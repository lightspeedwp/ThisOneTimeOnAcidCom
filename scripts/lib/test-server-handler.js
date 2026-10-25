/**
 * test-server-handler.js — Reusable HTTP handler for test server.
 * Serves files from dist/ with SPA fallback behavior.
 * @module scripts/lib/test-server-handler
 */

import fs from 'fs';
import path from 'path';

/**
 * Handle file read completion and send response with correct content type.
 * @param {string} filePath - Path to the file being served
 * @param {Error} err - File read error if any
 * @param {Buffer} data - File contents
 * @param {object} res - HTTP response object
 */
export const handleFileRead = (filePath, err, data, res) => {
  if (err) {
    res.writeHead(500);
    res.end('Server error');
    return;
  }

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
 * @param {string} distDir - Directory to serve files from
 * @returns {function} Request handler function
 */
export const createRequestHandler = (distDir) => {
  return (req, res) => {
    const pathname = req.url.split(/[?#]/, 1)[0];
    let filePath = path.join(distDir, pathname);

    // Normalize path and prevent directory traversal
    filePath = path.normalize(filePath);
    const relativePath = path.relative(distDir, filePath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    // Check if it's a directory - serve index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    // If file doesn't exist, return 404 for assets, or fall back to index.html for routes (SPA behavior)
    if (!fs.existsSync(filePath)) {
      const pathname = new URL(`http://localhost${req.url}`).pathname;
      const ext = path.extname(pathname);
      const isAsset = /\.(js|css|png|jpg|gif|svg|woff|woff2|json|map)$/i.test(ext);
      if (isAsset) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      filePath = path.join(distDir, 'index.html');
    }

    // Read and serve the file
    fs.readFile(filePath, (err, data) => handleFileRead(filePath, err, data, res));
  };
};
