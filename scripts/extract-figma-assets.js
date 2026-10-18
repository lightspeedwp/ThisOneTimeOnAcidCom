#!/usr/bin/env node

/**
 * Extract assets from Figma Make project
 * Implements rate limiting, concurrency, exponential backoff, and recovery status classification
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Load .env file
function loadEnv(filepath) {
  if (!fs.existsSync(filepath)) return {};
  const env = {};
  fs.readFileSync(filepath, 'utf-8')
    .split('\n')
    .forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    });
  return env;
}

const envVars = loadEnv(path.join(projectRoot, '.env'));
const env = { ...envVars, ...process.env };

const FIGMA_API_TOKEN = env.FIGMA_API_TOKEN;
const FIGMA_MAKE_FILE_KEY = env.FIGMA_MAKE_FILE_KEY;
const RATE_LIMIT = parseInt(env.FIGMA_API_RATE_LIMIT_PER_MINUTE || '10');
const CONCURRENCY = parseInt(env.FIGMA_CONCURRENT_REQUESTS || '5');

// Validate config
if (!FIGMA_API_TOKEN || FIGMA_API_TOKEN.includes('your_')) {
  console.error('ERROR: FIGMA_API_TOKEN not configured in .env');
  process.exit(1);
}
if (!FIGMA_MAKE_FILE_KEY || FIGMA_MAKE_FILE_KEY.includes('your_')) {
  console.error('ERROR: FIGMA_MAKE_FILE_KEY not configured in .env');
  process.exit(1);
}

// Token bucket rate limiter
class RateLimiter {
  constructor(tokensPerMinute) {
    this.tokensPerMinute = tokensPerMinute;
    this.tokensPerSecond = tokensPerMinute / 60;
    this.tokens = tokensPerMinute;
    this.lastRefillTime = Date.now();
  }

  async waitForToken() {
    while (this.tokens < 1) {
      const now = Date.now();
      const timeSinceRefill = (now - this.lastRefillTime) / 1000;
      const tokensToAdd = timeSinceRefill * this.tokensPerSecond;

      if (tokensToAdd > 0) {
        this.tokens = Math.min(this.tokensPerMinute, this.tokens + tokensToAdd);
        this.lastRefillTime = now;
      }

      if (this.tokens < 1) {
        const waitTime = (1 - this.tokens) / this.tokensPerSecond * 1000;
        await new Promise(resolve => setTimeout(resolve, Math.ceil(waitTime)));
      }
    }
    this.tokens -= 1;
  }
}

// Fetch helper
async function fetchAPI(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'X-Figma-Token': FIGMA_API_TOKEN,
        'User-Agent': 'TOA-Extract/1.0',
        ...headers
      },
      timeout: 10000
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data }));
    }).on('error', reject);
  });
}

// Download file from URL
async function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Get PNG dimensions
function getPNGDimensions(filepath) {
  try {
    const data = fs.readFileSync(filepath);
    // PNG magic: 89 50 4E 47
    if (data[0] !== 0x89 || data[1] !== 0x50 || data[2] !== 0x4E || data[3] !== 0x47) return null;
    if (data.length < 24) return null;
    const width = data.readUInt32BE(16);
    const height = data.readUInt32BE(20);
    return { width, height };
  } catch {
    return null;
  }
}

// Extract single asset with retries
async function extractAsset(asset, rateLimiter, manifest) {
  const startTime = Date.now();
  let recoveryStatus = 'failed';
  let exportedPath = null;
  let fileSize = null;
  let dimensions = null;
  let lastError = null;

  for (let attempt = 0; attempt < 4; attempt++) {
    if (attempt > 0) {
      const delays = [2000, 4000, 8000];
      if (attempt - 1 < delays.length) {
        await new Promise(resolve => setTimeout(resolve, delays[attempt - 1]));
      } else {
        break;
      }
    }

    try {
      // Get node export
      const nodeUrl = `https://api.figma.com/v1/files/${FIGMA_MAKE_FILE_KEY}/nodes?ids=${asset.figmaAssetId}`;
      await rateLimiter.waitForToken();
      const nodeRes = await fetchAPI(nodeUrl);

      if (nodeRes.status === 429) {
        lastError = 'Rate limited';
        continue;
      }
      if (nodeRes.status !== 200) {
        lastError = `API error: ${nodeRes.status}`;
        continue;
      }

      const nodeData = JSON.parse(nodeRes.data);
      const node = nodeData.nodes[asset.figmaAssetId];

      if (!node) {
        lastError = 'Node not found';
        continue;
      }

      // Get export URL
      const exportUrl = `https://api.figma.com/v1/files/${FIGMA_MAKE_FILE_KEY}/export?ids=${asset.figmaAssetId}&format=png&scale=2`;
      await rateLimiter.waitForToken();
      const expRes = await fetchAPI(exportUrl);

      if (expRes.status !== 200) {
        lastError = `Export failed: ${expRes.status}`;
        continue;
      }

      const expData = JSON.parse(expRes.data);
      if (!expData.images || !expData.images[asset.figmaAssetId]) {
        lastError = 'No export URL';
        continue;
      }

      // Download file
      const categoryDir = path.join(projectRoot, 'recovered-assets',
        asset.portfolio_category.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
      fs.mkdirSync(categoryDir, { recursive: true });

      const outPath = path.join(categoryDir, asset.originalFilename);
      await downloadFile(expData.images[asset.figmaAssetId], outPath);

      // Verify file
      fileSize = fs.statSync(outPath).size;
      dimensions = getPNGDimensions(outPath);

      if (!dimensions) {
        lastError = 'Invalid PNG';
        fs.unlinkSync(outPath);
        continue;
      }

      recoveryStatus = 'recovered';
      exportedPath = path.relative(projectRoot, outPath);
      break;

    } catch (err) {
      lastError = err.message;
    }
  }

  const entry = {
    catalogueId: asset.catalogueId,
    figmaAssetId: asset.figmaAssetId,
    recoveryStatus,
    exportedPath,
    fileSize,
    dimensions,
    extractionTime_ms: Date.now() - startTime,
    timestamp: new Date().toISOString(),
    notes: lastError || 'Success'
  };

  manifest.assets.push(entry);
  return recoveryStatus === 'recovered';
}

// Main
async function main() {
  console.log('Figma Asset Extraction\n');
  console.log(`Rate Limit: ${RATE_LIMIT} req/min, Concurrency: ${CONCURRENCY}\n`);

  // Load pilot selection
  const pilotPath = path.join(projectRoot, 'recovered-assets', 'pilot-selection.json');
  const pilotData = JSON.parse(fs.readFileSync(pilotPath, 'utf-8'));

  const allAssets = [
    ...pilotData.tier_1_high_priority.assets,
    ...pilotData.tier_2_coverage.assets,
    ...pilotData.tier_3_optional.assets
  ];

  console.log(`Processing ${allAssets.length} assets\n`);

  const limiter = new RateLimiter(RATE_LIMIT);
  const manifest = {
    metadata: {
      created_at: new Date().toISOString(),
      total_assets: allAssets.length,
      schema_version: '1.0'
    },
    assets: [],
    summary: { recovered: 0, fallback: 0, failed: 0 }
  };

  // Process with concurrency control
  let index = 0;
  async function worker() {
    while (index < allAssets.length) {
      const asset = allAssets[index++];
      try {
        const success = await extractAsset(asset, limiter, manifest);
        manifest.summary[success ? 'recovered' : 'failed']++;
        console.log(`${success ? '✓' : '✗'} ${asset.catalogueId}`);
      } catch (err) {
        manifest.summary.failed++;
        console.error(`✗ ${asset.catalogueId}: ${err.message}`);
      }
    }
  }

  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(worker());
  }
  await Promise.all(workers);

  // Calculate results
  const recoveryRate = (manifest.summary.recovered / allAssets.length) * 100;
  manifest.summary.recovery_rate_percent = recoveryRate;
  manifest.summary.meets_80_percent_target = recoveryRate >= 80;

  // Write manifest
  const manifestPath = path.join(projectRoot, 'recovered-assets', 'extraction-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // Print summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('Results');
  console.log(`${'='.repeat(60)}`);
  console.log(`Recovered:  ${manifest.summary.recovered}/${allAssets.length}`);
  console.log(`Fallback:   ${manifest.summary.fallback}/${allAssets.length}`);
  console.log(`Failed:     ${manifest.summary.failed}/${allAssets.length}`);
  console.log(`Recovery Rate: ${recoveryRate.toFixed(1)}%`);
  console.log(`Meets ≥80% Target: ${manifest.summary.meets_80_percent_target ? 'YES ✓' : 'NO ✗'}`);
  console.log(`\nManifest saved: ${manifestPath}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
