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

/**
 * Read trimmed key=value entries, ignoring blank lines and lines starting with #.
 * Values retain quotes and inline comments; later duplicate keys replace earlier ones.
 *
 * @returns {Object} Parsed entries, or an empty object if the file is absent.
 * @throws {Error} If an existing file cannot be read.
 */
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

// Strict environment variable validation
function parsePositiveInteger(str, varName, defaultValue) {
  const value = str || String(defaultValue);
  if (!/^[1-9]\d*$/.test(value)) {
    console.error(`ERROR: ${varName} must be a positive integer, got: ${value}`);
    process.exit(1);
  }
  const parsed = parseInt(value, 10);
  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    console.error(`ERROR: ${varName} must be a safe positive integer, got: ${parsed}`);
    process.exit(1);
  }
  return parsed;
}

const RATE_LIMIT = parsePositiveInteger(env.FIGMA_API_RATE_LIMIT_PER_MINUTE, 'FIGMA_API_RATE_LIMIT_PER_MINUTE', '10');
const CONCURRENCY = parsePositiveInteger(env.FIGMA_CONCURRENT_REQUESTS, 'FIGMA_CONCURRENT_REQUESTS', '5');

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
  /**
   * Start with a full token bucket.
   *
   * @param {number} tokensPerMinute - Bucket capacity and refill rate per minute.
   */
  constructor(tokensPerMinute) {
    this.tokensPerMinute = tokensPerMinute;
    this.tokensPerSecond = tokensPerMinute / 60;
    this.tokens = tokensPerMinute;
    this.lastRefillTime = Date.now();
  }

  /**
   * Wait until a token is available, then consume it from the shared bucket.
   * A nonpositive refill rate cannot replenish an exhausted bucket.
   */
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

/**
 * Send an HTTPS GET with the configured Figma token and optional header overrides.
 * Request errors reject the promise; HTTP error statuses do not.
 *
 * @param {Object} headers - Additional headers; may override the default headers.
 * @returns {Promise<{status: number, headers: Object, data: string}>} HTTP status,
 *   response headers, and unparsed body, including for non-success responses.
 */
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

    const req = https.get(url, options, (res) => {
      let data = '';

      // Check for successful status code
      if (res.statusCode < 200 || res.statusCode >= 300) {
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          reject(new Error(`HTTP ${res.statusCode}: ${data.substring(0, 100)}`));
        });
        return;
      }

      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data }));
      res.on('error', reject);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout (10s)'));
    });
    req.on('error', reject);
  });
}

/**
 * Stream an HTTPS response to filepath, creating or overwriting the file.
 * The parent directory must exist; HTTP status codes and redirects are not handled.
 * Request errors reject the promise after scheduling deletion of the destination;
 * destination stream errors are not handled here.
 *
 * @returns {Promise<void>} Resolves when the destination stream finishes writing.
 */
async function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    const req = https.get(url, { timeout: 10000 }, (res) => {
      // Check for successful status code
      if (res.statusCode < 200 || res.statusCode >= 300) {
        file.destroy();
        fs.unlink(filepath, () => {});
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      res.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
      res.on('error', (err) => {
        file.destroy();
        fs.unlink(filepath, () => {});
        reject(err);
      });
    });

    req.on('timeout', () => {
      req.destroy();
      file.destroy();
      fs.unlink(filepath, () => {});
      reject(new Error('Download timeout (10s)'));
    });
    req.on('error', (err) => {
      file.destroy();
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

/**
 * Read pixel dimensions after checking the first four PNG signature bytes and
 * a minimum length of 24 bytes; does not validate the full PNG structure.
 *
 * @returns {{width: number, height: number}|null} Header dimensions, or null
 *   when the header check fails or the file cannot be read.
 */
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

/**
 * Download one Figma image fill at its original dimensions, with up to four attempts and
 * delays of 2, 4, and 8 seconds before retries. API requests use the shared limiter.
 * Errors caught during an attempt are recorded as notes and retried; failures
 * appending the result to manifest.assets reject the promise.
 * Creates category directories and overwrites output files; files failing the
 * PNG header check are deleted.
 *
 * @param {Object} asset - Selection entry with catalogueId, figmaAssetId (the
 *   image reference hash from a figma:asset/ import, not a REST node ID),
 *   portfolio_category (used for the output directory), and originalFilename.
 * @param {RateLimiter} rateLimiter - Limiter shared by extraction workers.
 * @param {Object} manifest - Its assets array receives a result with elapsed time
 *   in milliseconds, pixel dimensions, byte size, and a path relative to the project.
 * @returns {Promise<boolean>} True if a downloaded file passes the PNG header
 *   check; false after all attempts fail. No fallback asset is produced.
 */
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
      // Catalogue IDs come from figma:asset/<hash>.png imports. Confirm each hash
      // is an imageRef by resolving it in the documented image-fill URL map.
      const imageRef = asset.figmaAssetId;
      const imagesUrl = `https://api.figma.com/v1/files/${encodeURIComponent(FIGMA_MAKE_FILE_KEY)}/images`;
      await rateLimiter.waitForToken();
      const imagesRes = await fetchAPI(imagesUrl);

      if (imagesRes.status === 429) {
        lastError = 'Rate limited';
        continue;
      }
      if (imagesRes.status !== 200) {
        lastError = `API error: ${imagesRes.status}`;
        continue;
      }

      const imagesData = JSON.parse(imagesRes.data);
      const images = imagesData.meta && imagesData.meta.images;
      if (!images || typeof images[imageRef] !== 'string' || !images[imageRef]) {
        lastError = 'Image reference not found in file images';
        continue;
      }

      // Download file
      const categoryDir = path.join(projectRoot, 'recovered-assets',
        asset.portfolio_category.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
      fs.mkdirSync(categoryDir, { recursive: true });

      const outPath = path.join(categoryDir, asset.originalFilename);
      await downloadFile(images[imageRef], outPath);

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

/**
 * Extract all three pilot-selection tiers with a shared limiter and worker pool,
 * then overwrite recovered-assets/extraction-manifest.json with results and totals.
 * Per-asset failures count toward the failed total without stopping other assets.
 * Input read/parse errors, invalid selection structure, and manifest write errors
 * reject the promise for the CLI's fatal-error handler.
 */
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
  /**
   * Drain the shared selection index, updating manifest results and summary counts.
   * Caught extraction errors increment the failed count and processing continues.
   */
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
