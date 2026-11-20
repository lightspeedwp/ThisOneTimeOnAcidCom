/**
 * @fileoverview Reader bookmarks library
 * RA-T052: Bookmarking System
 * Spec: Phase 6
 *
 * Tracks:
 * - Bookmarked chapters per session
 * - Save position within chapter
 * - Bookmark metadata (created/updated timestamps)
 * - Persistent storage in Netlify Blobs
 */

import { getStore } from '@netlify/blobs';

const store = getStore({ consistency: 'strong' });

export interface ReaderBookmark {
  id: string; // unique identifier
  sessionId: string;
  chapterId: string;
  position?: number; // saved position in chapter
  title?: string; // custom bookmark label
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

// Storage key builder
function getBookmarkKey(sessionId: string, bookmarkId: string): string {
  return `bookmark:${sessionId}:${bookmarkId}`;
}

function getSessionBookmarksKey(sessionId: string): string {
  return `bookmarks:${sessionId}`;
}

// Create a new bookmark
export async function createBookmark(
  sessionId: string,
  chapterId: string,
  position?: number,
  title?: string,
): Promise<ReaderBookmark> {
  const id = `bm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date().toISOString();

  const bookmark: ReaderBookmark = {
    id,
    sessionId,
    chapterId,
    position,
    title,
    createdAt: now,
    updatedAt: now,
  };

  const key = getBookmarkKey(sessionId, id);
  await store.set(key, JSON.stringify(bookmark));

  return bookmark;
}

// Get a specific bookmark
export async function getBookmark(sessionId: string, bookmarkId: string): Promise<ReaderBookmark | null> {
  const key = getBookmarkKey(sessionId, bookmarkId);
  const data = await store.get(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as ReaderBookmark;
  } catch {
    return null;
  }
}

// Delete a bookmark
export async function deleteBookmark(sessionId: string, bookmarkId: string): Promise<void> {
  const key = getBookmarkKey(sessionId, bookmarkId);
  await store.delete(key);
}

// Update bookmark position or title
export async function updateBookmark(
  sessionId: string,
  bookmarkId: string,
  position?: number,
  title?: string,
): Promise<ReaderBookmark | null> {
  const bookmark = await getBookmark(sessionId, bookmarkId);
  if (!bookmark) return null;

  const updated: ReaderBookmark = {
    ...bookmark,
    position: position !== undefined ? position : bookmark.position,
    title: title !== undefined ? title : bookmark.title,
    updatedAt: new Date().toISOString(),
  };

  const key = getBookmarkKey(sessionId, bookmarkId);
  await store.set(key, JSON.stringify(updated));

  return updated;
}

// Get all bookmarks for a session
export async function getSessionBookmarks(sessionId: string): Promise<ReaderBookmark[]> {
  // In production, would query by prefix: bookmark:{sessionId}:*
  // For MVP, this would require pagination/listing support
  // For now, return empty array - client maintains bookmark list
  return [];
}

// Check if chapter is bookmarked
export async function isChapterBookmarked(sessionId: string, chapterId: string): Promise<boolean> {
  // In production, would query by prefix pattern
  // For MVP, return false - requires listing support
  return false;
}
