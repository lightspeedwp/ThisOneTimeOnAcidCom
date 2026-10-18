#!/usr/bin/env node

/**
 * Validate extracted assets from Figma
 * Verifies file integrity, dimensions, and format against extraction manifest and catalogue
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Get PNG dimensions from file header
function getPNGDimensions(filepath) {
  try {
    const data = fs.readFileSync(filepath);

    // PNG magic bytes: 89 50 4E 47
    if (data[0] !== 0x89 || data[1] !== 0x50 || data[2] !== 0x4E || data[3] !== 0x47) {
      return null;
    }

    // IHDR chunk contains dimensions at bytes 16-24
    if (data.length < 24) return null;

    const width = data.readUInt32BE(16);
    const height = data.readUInt32BE(20);

    return { width, height };
  } catch {
    return null;
  }
}

// Validate file
function validateFile(filepath) {
  const errors = [];
  const warnings = [];

  // Check file exists
  if (!fs.existsSync(filepath)) {
    return { status: 'failed', errors: ['File does not exist'], warnings: [] };
  }

  // Get file stats
  let stats;
  try {
    stats = fs.statSync(filepath);
  } catch (err) {
    return { status: 'failed', errors: [err.message], warnings: [] };
  }

  const fileSize = stats.size;

  // Check file size
  if (fileSize === 0) {
    errors.push('File is empty (0 bytes)');
  }
  if (fileSize < 1024) {
    warnings.push(`File is very small (${fileSize} bytes)`);
  }
  if (fileSize > 10 * 1024 * 1024) {
    errors.push(`File exceeds maximum size (${fileSize} bytes > 10MB)`);
  }

  // Get PNG dimensions
  const dims = getPNGDimensions(filepath);

  if (!dims) {
    errors.push('Invalid PNG format or corrupted file');
  }

  const status = errors.length > 0 ? 'failed' : (warnings.length > 0 ? 'warning' : 'valid');

  return { status, fileSize, dimensions: dims, errors, warnings };
}

// Load manifests
function loadJSON(filepath) {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  } catch (err) {
    console.error(`Failed to load ${filepath}: ${err.message}`);
    process.exit(1);
  }
}

// Create catalogue lookup
function createCatalogeLookup(catalogue) {
  const lookup = {};

  if (catalogue.assets && Array.isArray(catalogue.assets)) {
    catalogue.assets.forEach(asset => {
      if (asset.catalogueId) {
        lookup[asset.catalogueId] = asset;
      }
    });
  }

  return lookup;
}

// Main validation
async function main() {
  console.log('Validating Extracted Assets\n');

  // Load manifests
  const manifestPath = path.join(projectRoot, 'recovered-assets', 'extraction-manifest.json');
  const cataloguePath = path.join(projectRoot, 'recovered-assets', 'FULL-CATALOGUE.json');

  if (!fs.existsSync(manifestPath)) {
    console.error(`ERROR: Extraction manifest not found: ${manifestPath}`);
    console.error('Run T012 (extract-figma-assets.js) first');
    process.exit(1);
  }

  const manifest = loadJSON(manifestPath);
  const catalogue = loadJSON(cataloguePath);
  const catalogueLookup = createCatalogeLookup(catalogue);

  console.log(`Validating ${manifest.assets.length} extracted assets\n`);

  const validationReport = {
    validation_date: new Date().toISOString(),
    total_assets: manifest.assets.length,
    valid: 0,
    warnings: 0,
    failed: 0,
    assets: []
  };

  // Validate each asset
  for (const asset of manifest.assets) {
    const validation = {
      catalogueId: asset.catalogueId,
      exportedPath: asset.exportedPath,
      recoveryStatus: asset.recoveryStatus,
      status: 'unknown',
      fileSize: asset.fileSize,
      dimensions: asset.dimensions,
      catalogueDimensions: null,
      notes: [],
      errors: [],
      warnings: []
    };

    // Skip validation for fallback and failed assets
    if (asset.recoveryStatus !== 'recovered') {
      validation.status = 'skipped';
      validation.notes.push(`Skipped (${asset.recoveryStatus}): ${asset.notes}`);
      validationReport.assets.push(validation);
      continue;
    }

    // Validate recovered assets
    if (!asset.exportedPath) {
      validation.status = 'failed';
      validation.errors.push('No exported path');
      validationReport.failed++;
      validationReport.assets.push(validation);
      continue;
    }

    const fullPath = path.join(projectRoot, asset.exportedPath);
    const fileValidation = validateFile(fullPath);

    validation.status = fileValidation.status;
    validation.fileSize = fileValidation.fileSize;
    validation.dimensions = fileValidation.dimensions;
    validation.errors = fileValidation.errors;
    validation.warnings = fileValidation.warnings;

    // Compare dimensions against catalogue
    const catalogueAsset = catalogueLookup[asset.catalogueId];
    if (catalogueAsset && catalogueAsset.dimensions) {
      validation.catalogueDimensions = catalogueAsset.dimensions;

      if (validation.dimensions) {
        if (validation.dimensions.width !== catalogueAsset.dimensions.width ||
            validation.dimensions.height !== catalogueAsset.dimensions.height) {
          validation.warnings.push(
            `Dimension mismatch: extracted ${validation.dimensions.width}x${validation.dimensions.height}, ` +
            `catalogue expects ${catalogueAsset.dimensions.width}x${catalogueAsset.dimensions.height}`
          );
          if (validation.status === 'valid') {
            validation.status = 'warning';
          }
        }
      }
    }

    // Update summary
    if (validation.status === 'valid') {
      validationReport.valid++;
    } else if (validation.status === 'warning') {
      validationReport.warnings++;
    } else if (validation.status === 'failed') {
      validationReport.failed++;
    }

    validationReport.assets.push(validation);

    // Log result
    const icon = validation.status === 'valid' ? '✓' : validation.status === 'warning' ? '⚠' : '✗';
    console.log(`${icon} ${asset.catalogueId} (${validation.status})`);
    if (validation.errors.length > 0) {
      validation.errors.forEach(err => console.log(`  Error: ${err}`));
    }
    if (validation.warnings.length > 0) {
      validation.warnings.forEach(warn => console.log(`  Warning: ${warn}`));
    }
  }

  // Calculate recovery rate (only counting validated recovered assets)
  const recoveredCount = validationReport.assets.filter(
    a => a.recoveryStatus === 'recovered' && a.status === 'valid'
  ).length;
  const totalRecovered = validationReport.assets.filter(a => a.recoveryStatus === 'recovered').length;

  if (totalRecovered > 0) {
    validationReport.recovery_validation_rate = (recoveredCount / totalRecovered) * 100;
    validationReport.meets_recovery_quality_target = validationReport.recovery_validation_rate >= 100;
  }

  // Write report
  const reportPath = path.join(projectRoot, 'recovered-assets', 'validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(validationReport, null, 2));

  // Print summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('Validation Complete');
  console.log(`${'='.repeat(60)}`);
  console.log(`Valid:       ${validationReport.valid}`);
  console.log(`Warnings:    ${validationReport.warnings}`);
  console.log(`Failed:      ${validationReport.failed}`);
  console.log(`Skipped:     ${validationReport.total_assets - validationReport.valid - validationReport.warnings - validationReport.failed}`);

  if (validationReport.recovery_validation_rate !== undefined) {
    console.log(`\nRecovery Validation Rate: ${validationReport.recovery_validation_rate.toFixed(1)}%`);
    console.log(`Meets Quality Target: ${validationReport.meets_recovery_quality_target ? 'YES ✓' : 'NO ✗'}`);
  }

  console.log(`\nReport saved: ${reportPath}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
