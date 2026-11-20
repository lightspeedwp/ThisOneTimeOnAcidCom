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

export interface CompletionEvent {
  id: string;
  sessionId: string;
  chapterId: string;
  timeSpent: number;
  completedAt: string;
  deviceType?: string;
  referrerSource?: string;
}

// Storage key builder
function getProgressKey(sessionId: string, chapterId: string): string {
  return `progress:${sessionId}:${chapterId}`;
}

function getStatsKey(sessionId: string): string {
  return `progress-stats:${sessionId}`;
}

function getEventKey(sessionId: string, eventId: string): string {
  return `event:${sessionId}:${eventId}`;
}

function getSessionEventsKey(sessionId: string): string {
  return `events:${sessionId}`;
}

// Get all progress records for a session (used for aggregation)
export async function getAllSessionProgress(sessionId: string): Promise<ReaderProgress[]> {
  // Note: This is a simplified implementation that stores progress IDs in a list
  // In production, would use proper querying/listing from Netlify Blobs
  const listKey = `progress-list:${sessionId}`;
  const listData = await store.get(listKey);

  if (!listData) return [];

  try {
    const chapterIds: string[] = JSON.parse(listData);
    const progressRecords: ReaderProgress[] = [];

    for (const chapterId of chapterIds) {
      const progress = await getProgress(sessionId, chapterId);
      if (progress) {
        progressRecords.push(progress);
      }
    }

    return progressRecords;
  } catch {
    return [];
  }
}

// Store or update reading progress for a chapter
export async function saveProgress(progress: ReaderProgress): Promise<void> {
  const key = getProgressKey(progress.sessionId, progress.chapterId);
  await store.set(key, JSON.stringify(progress));

  // Track this chapter in the session's progress list
  const listKey = `progress-list:${progress.sessionId}`;
  const listData = await store.get(listKey);
  const chapterIds: string[] = listData ? JSON.parse(listData) : [];

  if (!chapterIds.includes(progress.chapterId)) {
    chapterIds.push(progress.chapterId);
    await store.set(listKey, JSON.stringify(chapterIds));
  }
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

// Record a completion event
export async function recordCompletionEvent(
  sessionId: string,
  chapterId: string,
  timeSpent: number,
  deviceType?: string,
  referrerSource?: string,
): Promise<CompletionEvent> {
  const eventId = `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const completedAt = new Date().toISOString();

  const event: CompletionEvent = {
    id: eventId,
    sessionId,
    chapterId,
    timeSpent,
    completedAt,
    deviceType,
    referrerSource,
  };

  const eventKey = getEventKey(sessionId, eventId);
  await store.set(eventKey, JSON.stringify(event));

  // Add to session's event list
  const listKey = getSessionEventsKey(sessionId);
  const listData = await store.get(listKey);
  const eventIds: string[] = listData ? JSON.parse(listData) : [];
  eventIds.push(eventId);
  await store.set(listKey, JSON.stringify(eventIds));

  return event;
}

// Calculate and store session statistics
export async function calculateProgressStats(sessionId: string): Promise<ProgressStats> {
  const now = new Date().toISOString();

  // Get all progress records for this session and aggregate
  const progressRecords = await getAllSessionProgress(sessionId);

  let totalTimeSpent = 0;
  let chaptersCompleted = 0;

  for (const progress of progressRecords) {
    totalTimeSpent += progress.timeSpent;
    if (progress.completion === 100) {
      chaptersCompleted++;
    }
  }

  const stats: ProgressStats = {
    totalTimeSpent,
    chaptersStarted: progressRecords.length,
    chaptersCompleted,
    averageCompletionTime: progressRecords.length > 0 ? Math.round(totalTimeSpent / progressRecords.length) : 0,
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

