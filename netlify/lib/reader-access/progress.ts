/**
 * @fileoverview Reading progress tracking library
 * RA-T050: Reading Progress Tracking
 * Spec: Phase 6
 *
 * Tracks:
 * - Current page position per chapter
 * - Completion percentage
 * - Time spent reading
 * - Last read timestamp
 * - Persistent storage in Netlify Blobs
 */

import { getStore } from '@netlify/blobs';

const store = getStore({ name: 'reader-progress', consistency: 'strong' });

export interface ReaderProgress {
  sessionId: string;
  chapterId: string;
  position: number; // current page/position
  completion: number; // 0-100 percentage
  timeSpent: number; // seconds
  lastRead: string; // ISO timestamp
  startedAt: string; // ISO timestamp
  resumedCount: number; // times resumed
}

export interface ProgressStats {
  totalTimeSpent: number; // seconds across all chapters
  chaptersStarted: number;
  chaptersCompleted: number;
  averageCompletionTime: number; // seconds
  lastActivityAt: string; // ISO timestamp
}

// Storage key builder
function getProgressKey(sessionId: string, chapterId: string): string {
  return `progress:${sessionId}:${chapterId}`;
}

function getStatsKey(sessionId: string): string {
  return `progress-stats:${sessionId}`;
}

// Store or update reading progress for a chapter
export async function saveProgress(progress: ReaderProgress): Promise<void> {
  const key = getProgressKey(progress.sessionId, progress.chapterId);
  await store.set(key, JSON.stringify(progress));
}

// Retrieve reading progress for a chapter
export async function getProgress(sessionId: string, chapterId: string): Promise<ReaderProgress | null> {
  const key = getProgressKey(sessionId, chapterId);
  const data = await store.get(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as ReaderProgress;
  } catch {
    return null;
  }
}

// Resume reading: increment resume count and update timestamp
export async function resumeReading(sessionId: string, chapterId: string): Promise<ReaderProgress | null> {
  const progress = await getProgress(sessionId, chapterId);
  if (!progress) return null;

  const updated: ReaderProgress = {
    ...progress,
    lastRead: new Date().toISOString(),
    resumedCount: progress.resumedCount + 1,
  };

  await saveProgress(updated);
  return updated;
}

// Delete progress for a chapter
export async function deleteProgress(sessionId: string, chapterId: string): Promise<void> {
  const key = getProgressKey(sessionId, chapterId);
  await store.delete(key);
}

// Get or create reading progress
export async function getOrCreateProgress(
  sessionId: string,
  chapterId: string,
  totalPages?: number,
): Promise<ReaderProgress> {
  let progress = await getProgress(sessionId, chapterId);

  if (!progress) {
    const now = new Date().toISOString();
    progress = {
      sessionId,
      chapterId,
      position: 0,
      completion: 0,
      timeSpent: 0,
      lastRead: now,
      startedAt: now,
      resumedCount: 0,
    };
    await saveProgress(progress);
  }

  return progress;
}

// Update position and completion
export async function updatePosition(
  sessionId: string,
  chapterId: string,
  position: number,
  completion: number,
  timeSpent: number,
): Promise<ReaderProgress | null> {
  const progress = await getProgress(sessionId, chapterId);
  if (!progress) return null;

  const updated: ReaderProgress = {
    ...progress,
    position,
    completion: Math.min(100, Math.max(0, completion)),
    timeSpent: Math.max(progress.timeSpent, timeSpent),
    lastRead: new Date().toISOString(),
  };

  await saveProgress(updated);
  return updated;
}

// Get session-wide reading statistics
export async function getProgressStats(sessionId: string): Promise<ProgressStats | null> {
  const key = getStatsKey(sessionId);
  const data = await store.get(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as ProgressStats;
  } catch {
    return null;
  }
}

// Calculate and store session statistics
export async function calculateProgressStats(sessionId: string): Promise<ProgressStats> {
  const now = new Date().toISOString();

  // In production, would query all progress entries for the session
  // For now, return default stats
  const stats: ProgressStats = {
    totalTimeSpent: 0,
    chaptersStarted: 0,
    chaptersCompleted: 0,
    averageCompletionTime: 0,
    lastActivityAt: now,
  };

  const key = getStatsKey(sessionId);
  await store.set(key, JSON.stringify(stats));
  return stats;
}

// Mark chapter as completed
export async function markChapterComplete(sessionId: string, chapterId: string): Promise<ReaderProgress | null> {
  const progress = await getProgress(sessionId, chapterId);
  if (!progress) return null;

  const updated: ReaderProgress = {
    ...progress,
    completion: 100,
    lastRead: new Date().toISOString(),
  };

  await saveProgress(updated);
  return updated;
}

// Get all progress for a session
export async function getAllSessionProgress(sessionId: string): Promise<ReaderProgress[]> {
  // In production, would query by prefix: progress:{sessionId}:*
  // For MVP, return empty array (pagination over all keys is expensive)
  return [];
}
