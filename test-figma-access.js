#!/usr/bin/env node

/**
 * T011: Figma Make Project Access Validation Test Script
 *
 * Tests Figma API connectivity, authentication, and asset export capabilities
 * for the media library recovery pilot.
 *
 * Usage: node test-figma-access.js
 *
 * Environment variables required:
 * - FIGMA_API_TOKEN: Personal access token from figma.com/developers/api#auth
 * - FIGMA_MAKE_FILE_KEY: File key for the Make project containing 56 assets
 * - FIGMA_TEAM_ID (optional): Team ID if assets are in a team file
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const FIGMA_API_BASE = 'api.figma.com';
const FIGMA_API_VERSION = 'v1';
const CONFIG = {
  token: process.env.FIGMA_API_TOKEN || '',
  fileKey: process.env.FIGMA_MAKE_FILE_KEY || '',
  teamId: process.env.FIGMA_TEAM_ID || '',
  exportFormat: process.env.FIGMA_EXPORT_FORMAT || 'png',
  exportScale: process.env.FIGMA_EXPORT_SCALE || '2',
  exportQuality: process.env.FIGMA_EXPORT_QUALITY || 'high',
};

// Pilot assets for testing (subset from recovered-assets/pilot-selection.json)
const PILOT_ASSETS = [
  {
    catalogueId: 'toa-heroImage1',
    figmaAssetId: 'f4a28f747d49fc9d37311b17f513b62e2b95a73e',
    priority: 'CRITICAL',
    category: 'Homepage Hero',
  },
  {
    catalogueId: 'toa-jungleImage1',
    figmaAssetId: '7afa71c7ec4457a1c1983db257703a6c92a9cce7',
    priority: 'HIGH',
    category: 'Festival Portfolio - Jungle Festival Koh Phangan',
  },
];

// Test results tracker
const results = {
  timestamp: new Date().toISOString(),
  tests: [],
  metrics: {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    totalResponseTime: 0,
    avgResponseTime: 0,
  },
  errors: [],
};

/**
 * Make HTTPS request to Figma API
 */
function figmaRequest(method, endpoint, queryParams = {}) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    // Build query string
    const query = new URLSearchParams(queryParams).toString();
    const path = `/${FIGMA_API_VERSION}${endpoint}${query ? `?${query}` : ''}`;

    const options = {
      hostname: FIGMA_API_BASE,
      port: 443,
      path,
      method,
      headers: {
        'X-Figma-Token': CONFIG.token,
        'Content-Type': 'application/json',
        'User-Agent': 'TOA-Media-Library-Recovery-Pilot/1.0',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const responseTime = Date.now() - startTime;
        results.metrics.totalRequests += 1;
        results.metrics.totalResponseTime += responseTime;

        try {
          const parsed = data ? JSON.parse(data) : null;
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: parsed,
            responseTime,
          });
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

/**
 * Test 1: Validate authentication with GET /v1/me
 */
async function testAuthentication() {
  const testName = 'Authentication (GET /v1/me)';
  console.log(`\n✓ Running: ${testName}`);

  try {
    const response = await figmaRequest('GET', '/me');

    if (response.status === 200 && response.body.id) {
      results.metrics.successfulRequests += 1;
      results.tests.push({
        name: testName,
        status: 'PASS',
        details: {
          userId: response.body.id,
          email: response.body.email,
          responseTime: response.responseTime,
        },
      });
      console.log(`  ✓ Authentication successful: ${response.body.email}`);
      console.log(`  ✓ Response time: ${response.responseTime}ms`);
      return true;
    } else {
      throw new Error(`Unexpected status ${response.status}`);
    }
  } catch (e) {
    results.metrics.failedRequests += 1;
    results.tests.push({
      name: testName,
      status: 'FAIL',
      error: e.message,
    });
    results.errors.push(`Authentication failed: ${e.message}`);
    console.log(`  ✗ Error: ${e.message}`);
    return false;
  }
}

/**
 * Test 2: Validate Make project access with GET /v1/files/{fileKey}
 */
async function testMakeProjectAccess() {
  const testName = 'Make Project Access (GET /v1/files/{fileKey})';
  console.log(`\n✓ Running: ${testName}`);

  if (!CONFIG.fileKey) {
    results.tests.push({
      name: testName,
      status: 'SKIP',
      reason: 'FIGMA_MAKE_FILE_KEY not set',
    });
    console.log(`  ⊘ Skipped: FIGMA_MAKE_FILE_KEY environment variable not set`);
    return false;
  }

  try {
    const response = await figmaRequest('GET', `/files/${CONFIG.fileKey}`);

    if (response.status === 200 && response.body.name) {
      results.metrics.successfulRequests += 1;

      const fileInfo = {
        name: response.body.name,
        key: response.body.key,
        version: response.body.version,
        lastModified: response.body.lastModified,
        documentCount: response.body.document ? 1 : 0,
        componentCount: response.body.components ? Object.keys(response.body.components).length : 0,
        responseTime: response.responseTime,
      };

      results.tests.push({
        name: testName,
        status: 'PASS',
        details: fileInfo,
      });
      console.log(`  ✓ File accessed: ${response.body.name}`);
      console.log(`  ✓ Last modified: ${response.body.lastModified}`);
      console.log(`  ✓ Response time: ${response.responseTime}ms`);
      return true;
    } else {
      throw new Error(`Unexpected status ${response.status}: ${response.body?.error || 'Unknown error'}`);
    }
  } catch (e) {
    results.metrics.failedRequests += 1;
    results.tests.push({
      name: testName,
      status: 'FAIL',
      error: e.message,
    });
    results.errors.push(`Make project access failed: ${e.message}`);
    console.log(`  ✗ Error: ${e.message}`);
    return false;
  }
}

/**
 * Test 3: Test asset node fetch with GET /v1/files/{fileKey}/nodes
 */
async function testAssetNodeFetch() {
  const testName = 'Asset Node Fetch (GET /v1/files/{fileKey}/nodes)';
  console.log(`\n✓ Running: ${testName}`);

  if (!CONFIG.fileKey) {
    results.tests.push({
      name: testName,
      status: 'SKIP',
      reason: 'FIGMA_MAKE_FILE_KEY not set',
    });
    console.log(`  ⊘ Skipped: Cannot fetch nodes without fileKey`);
    return false;
  }

  try {
    // Query for first pilot asset
    const nodeId = PILOT_ASSETS[0].figmaAssetId;
    const response = await figmaRequest('GET', `/files/${CONFIG.fileKey}/nodes`, {
      ids: nodeId,
    });

    if (response.status === 200 && response.body.nodes) {
      const nodeData = response.body.nodes[nodeId];
      if (!nodeData) {
        throw new Error(`Node ${nodeId} not found in response`);
      }

      results.metrics.successfulRequests += 1;

      const nodeInfo = {
        nodeId: nodeId.substring(0, 8) + '...',
        nodeFound: true,
        nodeHasData: !!nodeData,
        totalNodes: Object.keys(response.body.nodes).length,
        responseTime: response.responseTime,
      };

      results.tests.push({
        name: testName,
        status: 'PASS',
        details: nodeInfo,
      });
      console.log(`  ✓ Node fetched: ${nodeId.substring(0, 8)}...`);
      console.log(`  ✓ Nodes returned: ${Object.keys(response.body.nodes).length}`);
      console.log(`  ✓ Response time: ${response.responseTime}ms`);
      return true;
    } else {
      throw new Error(`Unexpected status ${response.status}`);
    }
  } catch (e) {
    results.metrics.failedRequests += 1;
    results.tests.push({
      name: testName,
      status: 'FAIL',
      error: e.message,
    });
    results.errors.push(`Asset node fetch failed: ${e.message}`);
    console.log(`  ✗ Error: ${e.message}`);
    return false;
  }
}

/**
 * Test 4: Test asset export endpoint (images export)
 */
async function testAssetExport() {
  const testName = 'Asset Export (GET /v1/files/{fileKey}/images)';
  console.log(`\n✓ Running: ${testName}`);

  if (!CONFIG.fileKey) {
    results.tests.push({
      name: testName,
      status: 'SKIP',
      reason: 'FIGMA_MAKE_FILE_KEY not set',
    });
    console.log(`  ⊘ Skipped: Cannot export without fileKey`);
    return false;
  }

  try {
    const nodeId = PILOT_ASSETS[0].figmaAssetId;
    const response = await figmaRequest('GET', `/files/${CONFIG.fileKey}/images`, {
      ids: nodeId,
      format: CONFIG.exportFormat,
      scale: CONFIG.exportScale,
    });

    if (response.status === 200 && response.body.images) {
      const imageNodeIds = Object.keys(response.body.images);
      const firstExportUrl = response.body.images[imageNodeIds[0]];

      if (!firstExportUrl || typeof firstExportUrl !== 'string') {
        throw new Error('Export URLs are missing or invalid in response');
      }

      results.metrics.successfulRequests += 1;

      const exportInfo = {
        format: CONFIG.exportFormat,
        scale: CONFIG.exportScale,
        exportedNodeCount: imageNodeIds.length,
        sampleUrl: firstExportUrl.substring(0, 50) + '...',
        urlIsValid: firstExportUrl.startsWith('https://'),
        responseTime: response.responseTime,
      };

      results.tests.push({
        name: testName,
        status: 'PASS',
        details: exportInfo,
      });
      console.log(`  ✓ Export endpoint working: ${CONFIG.exportFormat} format`);
      console.log(`  ✓ Export URLs received: ${imageNodeIds.length}`);
      console.log(`  ✓ URL format valid: ${firstExportUrl.startsWith('https://')}`);
      console.log(`  ✓ Response time: ${response.responseTime}ms`);
      return true;
    } else {
      throw new Error(`Unexpected status ${response.status}: ${response.body?.err}`);
    }
  } catch (e) {
    results.metrics.failedRequests += 1;
    results.tests.push({
      name: testName,
      status: 'FAIL',
      error: e.message,
    });
    results.errors.push(`Asset export test failed: ${e.message}`);
    console.log(`  ✗ Error: ${e.message}`);
    return false;
  }
}

/**
 * Test 5: Rate limiting analysis
 */
async function testRateLimiting() {
  const testName = 'Rate Limiting Analysis';
  console.log(`\n✓ Running: ${testName}`);

  try {
    // Make several rapid requests to observe rate limit headers
    const requests = [];
    for (let i = 0; i < 3; i++) {
      requests.push(figmaRequest('GET', '/me'));
    }

    const responses = await Promise.all(requests);
    const rateLimitHeaders = responses.map((r) => ({
      rateLimit: r.headers['x-ratelimit-reset'],
      remaining: r.headers['x-ratelimit-remaining'],
    }));

    results.metrics.successfulRequests += responses.filter((r) => r.status === 200).length;
    results.tests.push({
      name: testName,
      status: 'PASS',
      details: {
        requestsSuccessful: responses.filter((r) => r.status === 200).length,
        avgResponseTime: Math.round(
          responses.reduce((sum, r) => sum + r.responseTime, 0) / responses.length
        ),
        rateLimitInfo: rateLimitHeaders[0],
      },
    });
    console.log(`  ✓ Rate limit: ${rateLimitHeaders[0].rateLimit || 'Unknown'}`);
    console.log(`  ✓ Requests remaining: ${rateLimitHeaders[0].remaining || 'Unknown'}`);
  } catch (e) {
    results.metrics.failedRequests += 1;
    results.tests.push({
      name: testName,
      status: 'FAIL',
      error: e.message,
    });
    results.errors.push(`Rate limiting analysis failed: ${e.message}`);
    console.log(`  ✗ Error: ${e.message}`);
  }
}

/**
 * Generate extraction time estimates
 */
function estimateExtractionTime() {
  const avgResponseTime = results.metrics.totalResponseTime / results.metrics.totalRequests || 0;
  const estimatedTimePerAsset = avgResponseTime + 500; // Add 500ms for download/processing

  return {
    avgApiResponseTime: Math.round(avgResponseTime),
    estimatedPerAsset: Math.round(estimatedTimePerAsset),
    totalPhase2Estimate: {
      '56-assets': `${Math.round((estimatedTimePerAsset * 56) / 1000 / 60)} minutes`,
      '10-assets-pilot': `${Math.round((estimatedTimePerAsset * 10) / 1000 / 60)} minutes`,
    },
  };
}

/**
 * Generate and save test report
 */
async function generateReport() {
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('FIGMA MAKE PROJECT ACCESS VALIDATION - TEST REPORT');
  console.log('═══════════════════════════════════════════════════════════════');

  const testSummary = {
    passed: results.tests.filter((t) => t.status === 'PASS').length,
    failed: results.tests.filter((t) => t.status === 'FAIL').length,
    skipped: results.tests.filter((t) => t.status === 'SKIP').length,
  };

  const extraction = estimateExtractionTime();

  results.metrics.avgResponseTime = Math.round(
    results.metrics.totalResponseTime / results.metrics.totalRequests
  );

  console.log(`\nTest Results: ${testSummary.passed} passed, ${testSummary.failed} failed, ${testSummary.skipped} skipped`);
  console.log(`Total API Requests: ${results.metrics.totalRequests}`);
  console.log(`Average Response Time: ${results.metrics.avgResponseTime}ms`);
  console.log(`\nExtraction Time Estimates:`);
  console.log(`  Per asset: ~${extraction.estimatedPerAsset}ms`);
  console.log(`  Pilot (10 assets): ~${extraction.totalPhase2Estimate['10-assets-pilot']}`);
  console.log(`  Full catalogue (56 assets): ~${extraction.totalPhase2Estimate['56-assets']}`);

  if (results.errors.length > 0) {
    console.log(`\n⚠ Errors encountered:`);
    results.errors.forEach((e) => console.log(`  - ${e}`));
  }

  // Save detailed report as JSON
  const reportPath = path.join(__dirname, '.github', 'reports', 'toa-media-library', 'T011-figma-access-test.json');
  const reportDir = path.dirname(reportPath);

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const fullReport = {
    ...results,
    summary: testSummary,
    extraction,
  };

  fs.writeFileSync(reportPath, JSON.stringify(fullReport, null, 2));
  console.log(`\n✓ Detailed report saved: ${reportPath}`);

  return fullReport;
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🔧 T011: Figma Make Project Access Validation');
  console.log(`📅 Timestamp: ${new Date().toISOString()}`);
  console.log(`\n📋 Configuration:`);
  console.log(`  FIGMA_API_TOKEN: ${CONFIG.token ? 'SET' : 'NOT SET'}`);
  console.log(`  FIGMA_MAKE_FILE_KEY: ${CONFIG.fileKey ? 'SET' : 'NOT SET'}`);
  console.log(`  FIGMA_TEAM_ID: ${CONFIG.teamId || 'NOT SET'}`);
  console.log(`  Export Format: ${CONFIG.exportFormat}`);
  console.log(`  Export Scale: ${CONFIG.exportScale}x`);

  if (!CONFIG.token) {
    console.log('\n❌ Fatal: FIGMA_API_TOKEN not set. Please set this environment variable.');
    process.exit(1);
  }

  console.log('\n🧪 Running tests...\n');

  try {
    // Run tests sequentially
    await testAuthentication();
    await testMakeProjectAccess();
    await testAssetNodeFetch();
    await testAssetExport();
    await testRateLimiting();

    // Generate final report
    const report = await generateReport();

    // Exit with appropriate code
    // Treat critical test SKIPs (missing required config) as failures
    const criticalTests = ['Authentication', 'Make Project Access'];
    const hasCriticalSkips = results.tests
      .filter((t) => criticalTests.some((c) => t.name.includes(c)))
      .some((t) => t.status === 'SKIP');
    const hasFailures = results.tests.some((t) => t.status === 'FAIL') || hasCriticalSkips;
    process.exit(hasFailures ? 1 : 0);
  } catch (e) {
    console.error('❌ Fatal error:', e.message);
    process.exit(1);
  }
}

main();
