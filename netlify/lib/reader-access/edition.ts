// Edition manifest and content delivery
// Reads approved chapter list from manifest
// Returns 'content unavailable' for chapters not in approved set

export interface Chapter {
  id: string;
  title: string;
  approved: boolean;
  approvedAt?: string;
  wordCount?: number;
  estimatedReadTime?: number; // minutes
}

export interface EditionManifest {
  title: string;
  createdAt: string;
  chapters: Chapter[];
}

// In-memory default manifest for development
const DEFAULT_MANIFEST: EditionManifest = {
  title: 'This One Time On Acid',
  createdAt: new Date().toISOString(),
  chapters: [
    {
      id: 'ch-01-beginning',
      title: 'The Beginning',
      approved: false,
      wordCount: 0,
      estimatedReadTime: 0,
    },
  ],
};

export class EditionReader {
  private manifest: EditionManifest;

  constructor(manifest?: EditionManifest) {
    this.manifest = manifest || DEFAULT_MANIFEST;
  }

  static fromJSON(json: string): EditionReader {
    try {
      const manifest = JSON.parse(json) as EditionManifest;
      return new EditionReader(manifest);
    } catch {
      return new EditionReader();
    }
  }

  isChapterApproved(chapterId: string): boolean {
    const chapter = this.manifest.chapters.find(c => c.id === chapterId);
    return chapter?.approved ?? false;
  }

  getChapter(chapterId: string): Chapter | null {
    return this.manifest.chapters.find(c => c.id === chapterId) ?? null;
  }

  getApprovedChapters(): Chapter[] {
    return this.manifest.chapters.filter(c => c.approved);
  }

  listChapters(): Chapter[] {
    return this.manifest.chapters;
  }

  getManifest(): EditionManifest {
    return this.manifest;
  }
}
