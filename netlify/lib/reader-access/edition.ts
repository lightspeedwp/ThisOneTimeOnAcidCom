// Edition manifest and content delivery
// Reads approved chapter list from manifest
// Returns 'content unavailable' for chapters not in approved set

export interface EditionManifest {
  chapters: Array<{
    id: string;
    title: string;
    approved: boolean;
    approvedAt?: string;
  }>;
}

export class EditionReader {
  private manifest: EditionManifest;

  constructor(manifest: EditionManifest) {
    this.manifest = manifest;
  }

  isChapterApproved(chapterId: string): boolean {
    const chapter = this.manifest.chapters.find((c) => c.id === chapterId);
    return chapter?.approved ?? false;
  }

  getApprovedChapters(): string[] {
    return this.manifest.chapters
      .filter((c) => c.approved)
      .map((c) => c.id);
  }

  async loadChapter(chapterId: string): Promise<string | null> {
    if (!this.isChapterApproved(chapterId)) {
      return null; // Content unavailable
    }
    // Load from netlify/functions/protected-content/{chapterId}.md
    throw new Error('loadChapter: Not implemented');
  }
}
