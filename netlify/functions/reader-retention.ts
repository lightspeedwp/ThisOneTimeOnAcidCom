/**
 * Reader Access Data Retention
 *
 * Scheduled function (daily) to delete ReaderAccessRecord entries past delete_after timestamp.
 * Maps to RA-006 (retention policy): Delete after 12 months without authenticated use.
 *
 * Policy:
 * - Scan all ReaderAccessRecord entries in Netlify Blobs
 * - Delete entries where delete_after < NOW
 * - Run daily via Netlify scheduled function
 * - Log deletions for audit trail
 * - Graceful failure: continue if one record fails
 *
 * @handler daily scheduled background function
 */

import { getStore } from '@netlify/blobs';

// Netlify scheduled function: runs once a day (RA-T050).
export const config = { schedule: '@daily' };

interface ReaderAccessRecord {
  id: string;
  email: string;
  readerId: string;
  verified: boolean;
  lastAuthenticatedAt: string;
  deleteAfter: string;
  createdAt: string;
  metadata?: {
    deleteScheduledAt?: string;
  };
}

const KEYS = {
  record: (recordId: string) => `reader-access:${recordId}`,
};

export default async function handler(req: Request): Promise<Response> {
  const startTime = Date.now();
  const now = new Date();

  try {
    // This is a scheduled function (Netlify background invocation)
    // The request method will be GET from the scheduler
    const isScheduledInvocation =
      req.url.includes('.netlify/functions/') &&
      (req.method === 'GET' || req.method === 'POST');

    if (!isScheduledInvocation && req.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    let deletedCount = 0;
    let errorCount = 0;
    const deletedIds: string[] = [];

    // Scan all records with prefix 'reader-access:'
    // Note: Netlify Blobs list() doesn't support filtering by value,
    // so we enumerate all and check delete_after locally
    const store = getStore({ name: 'reader-access', consistency: 'strong' });

    try {
      const { blobs } = await store.list({
        prefix: 'reader-access:',
      });

      for (const blob of blobs) {
        try {
          const recordJson = await store.get(blob.key, { type: 'text' });
          if (!recordJson) continue;

          const record: ReaderAccessRecord = JSON.parse(recordJson);
          const deleteAfter = new Date(record.deleteAfter);

          // If record has passed its delete_after window, delete it
          if (deleteAfter < now) {
            await store.delete(blob.key);
            deletedCount++;
            deletedIds.push(record.id);
          }
        } catch (recordError) {
          // Log error but continue processing other records
          errorCount++;
          console.error(`Failed to process record ${blob.key}:`, recordError);
        }
      }
    } catch (listError) {
      console.error('Failed to list records:', listError);
      // If we can't list, return error but don't silently fail
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Failed to scan retention records',
          timestamp: now.toISOString(),
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return audit-trail result
    const result = {
      timestamp: now.toISOString(),
      status: 'completed',
      deleted: deletedCount,
      errors: errorCount,
      durationMs: Date.now() - startTime,
      deletedIds: deletedIds.slice(0, 10), // Log first 10 deleted IDs
      hasMore: deletedIds.length > 10,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';

    return new Response(
      JSON.stringify({
        status: 'error',
        message: errorMsg,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
