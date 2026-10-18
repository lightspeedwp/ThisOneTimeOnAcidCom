#!/usr/bin/env node

/**
 * Update FULL-CATALOGUE.json with recovery status from extraction manifest
 * Maps extraction outcomes to catalogue recovery status
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

/**
 * Read and parse a JSON file synchronously.
 *
 * Reading or parsing failures terminate the process with exit code 1.
 *
 * @returns {*} The parsed value.
 */
function loadJSON(filepath) {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  } catch (err) {
    console.error(`Failed to load ${filepath}: ${err.message}`);
    process.exit(1);
  }
}

/**
 * Overwrite recovered-assets/FULL-CATALOGUE.json using extraction and validation results.
 * Sampled assets use the extraction status for recovered/fallback; other outcomes become
 * pending. Unsampled assets receive pending status only if their status is falsy.
 * Set recovery notes and copy extraction timestamps, plus validation status and timestamp
 * when available; skipped validation uses a null timestamp and does not change recovery status.
 * Missing inputs or JSON read/parse errors terminate the process with exit code 1;
 * invalid data structure and catalogue write errors reject the promise for the CLI's
 * fatal-error handler.
 */
async function main() {
  console.log('Updating Catalogue Recovery Status\n');

  // Load manifests
  const manifestPath = path.join(projectRoot, 'recovered-assets', 'extraction-manifest.json');
  const validationPath = path.join(projectRoot, 'recovered-assets', 'validation-report.json');
  const cataloguePath = path.join(projectRoot, 'recovered-assets', 'FULL-CATALOGUE.json');

  if (!fs.existsSync(manifestPath)) {
    console.error(`ERROR: Extraction manifest not found: ${manifestPath}`);
    console.error('Run T012 (extract-figma-assets.js) first');
    process.exit(1);
  }

  if (!fs.existsSync(validationPath)) {
    console.error(`ERROR: Validation report not found: ${validationPath}`);
    console.error('Run T013 (validate-extracted-assets.js) first');
    process.exit(1);
  }

  if (!fs.existsSync(cataloguePath)) {
    console.error(`ERROR: FULL-CATALOGUE.json not found: ${cataloguePath}`);
    process.exit(1);
  }

  const manifest = loadJSON(manifestPath);
  const validation = loadJSON(validationPath);
  const catalogue = loadJSON(cataloguePath);

  console.log(`Processing ${manifest.assets.length} extracted assets\n`);

  // Create lookup for extraction and validation data
  const extractionLookup = {};
  const validationLookup = {};

  manifest.assets.forEach(asset => {
    extractionLookup[asset.catalogueId] = asset;
  });

  validation.assets.forEach(asset => {
    validationLookup[asset.catalogueId] = asset;
  });

  // Get all sampled asset IDs
  const sampledAssetIds = new Set(Object.keys(extractionLookup));

  // Update catalogue
  let updated = 0;
  let unchanged = 0;

  if (catalogue.assets && Array.isArray(catalogue.assets)) {
    catalogue.assets.forEach(asset => {
      if (sampledAssetIds.has(asset.catalogueId)) {
        // This asset was sampled
        const extraction = extractionLookup[asset.catalogueId];
        const validationData = validationLookup[asset.catalogueId];

        // Map extraction status to catalogue status
        let recoveryStatus = 'pending';
        if (extraction.recoveryStatus === 'recovered') {
          recoveryStatus = 'recovered';
        } else if (extraction.recoveryStatus === 'fallback') {
          recoveryStatus = 'fallback';
        } else if (extraction.recoveryStatus === 'failed') {
          recoveryStatus = 'pending';
        }

        // Build recovery notes
        let recoveryNotes = '';
        if (extraction.recoveryStatus === 'recovered') {
          recoveryNotes = `Extracted from Figma Make, dimensions ${extraction.dimensions.width}x${extraction.dimensions.height}, ` +
                         `file size ${(extraction.fileSize / 1024).toFixed(1)}KB, extraction time ${extraction.extractionTime_ms}ms`;
        } else if (extraction.recoveryStatus === 'fallback') {
          recoveryNotes = `Fallback: ${extraction.notes}`;
        } else {
          recoveryNotes = `Failed in Phase 1b: ${extraction.notes}`;
        }

        // Update asset
        asset.recoveryStatus = recoveryStatus;
        asset.recoveryNotes = recoveryNotes;
        asset.extractedAt = extraction.timestamp;

        if (validationData) {
          asset.validatedAt = validationData.status !== 'skipped' ? validation.validation_date : null;
          asset.validationStatus = validationData.status;
        }

        updated++;
        console.log(`✓ ${asset.catalogueId}: ${recoveryStatus}`);
      } else {
        // This asset was not sampled
        if (!asset.recoveryStatus) {
          asset.recoveryStatus = 'pending';
          asset.recoveryNotes = 'Sampled assets completed; full recovery planned for Phase 2';
          updated++;
          console.log(`→ ${asset.catalogueId}: pending (not sampled)`);
        } else {
          unchanged++;
        }
      }
    });
  }

  // Write updated catalogue
  fs.writeFileSync(cataloguePath, JSON.stringify(catalogue, null, 2));

  // Print summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('Catalogue Update Complete');
  console.log(`${'='.repeat(60)}`);
  console.log(`Updated:   ${updated}`);
  console.log(`Unchanged: ${unchanged}`);
  console.log(`\nCatalogue saved: ${cataloguePath}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
