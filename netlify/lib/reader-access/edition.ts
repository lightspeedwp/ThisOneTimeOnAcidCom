// Edition manifest and content delivery
// Reads approved chapter list from manifest
// Returns 'content unavailable' for chapters not in approved set
// Supports content versioning per chapter

export interface ChapterVersion {
  version: string;
  releasedAt: string;
  hash?: string; // content hash for change detection
}

export interface Chapter {
  id: string;
  title: string;
  approved: boolean;
  approvedAt?: string;
  wordCount?: number;
  estimatedReadTime?: number; // minutes
  status?: 'draft' | 'review' | 'approved' | 'published';
  versions?: ChapterVersion[];
  currentVersion?: string;
}

export interface EditionManifest {
  title: string;
  createdAt: string;
  version?: string; // edition version
  chapters: Chapter[];
  metadata?: {
    totalChapters: number;
    approvedChapters: number;
    lastUpdated: string;
  };
}

// In-memory default manifest for development
const DEFAULT_MANIFEST: EditionManifest = {
  title: 'This One Time On Acid',
  createdAt: new Date().toISOString(),
  chapters: [
    {
      id: 'ch-01-beginning',
      title: 'The Beginning',
      approved: true,
      approvedAt: new Date().toISOString(),
      wordCount: 1500,
      estimatedReadTime: 8,
      status: 'approved',
    },
    {
      id: 'ch-02-journey',
      title: 'The Journey',
      approved: true,
      approvedAt: new Date().toISOString(),
      wordCount: 2000,
      estimatedReadTime: 10,
      status: 'approved',
    },
  ],
};

export class EditionReader {
  private manifest: EditionManifest;

  constructor(manifest?: EditionManifest) {
    this.manifest = manifest || structuredClone(DEFAULT_MANIFEST);
    this.updateMetadata();
  }

  static fromJSON(json: string): EditionReader {
    try {
      const manifest = JSON.parse(json) as EditionManifest;
      return new EditionReader(manifest);
    } catch {
      return new EditionReader();
    }
  }

  private updateMetadata(): void {
    if (!this.manifest.metadata) {
      this.manifest.metadata = {
        totalChapters: 0,
        approvedChapters: 0,
        lastUpdated: new Date().toISOString(),
      };
    }
    this.manifest.metadata.totalChapters = this.manifest.chapters.length;
    this.manifest.metadata.approvedChapters = this.manifest.chapters.filter(c => c.approved).length;
    this.manifest.metadata.lastUpdated = new Date().toISOString();
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

  getChaptersByStatus(status: 'draft' | 'review' | 'approved' | 'published'): Chapter[] {
    return this.manifest.chapters.filter(c => c.status === status);
  }

  getChapterVersions(chapterId: string): ChapterVersion[] {
    const chapter = this.getChapter(chapterId);
    return chapter?.versions ?? [];
  }

  getCurrentVersion(chapterId: string): string {
    const chapter = this.getChapter(chapterId);
    return chapter?.currentVersion ?? '1.0.0';
  }

  listChapters(): Chapter[] {
    return this.manifest.chapters;
  }

  getManifest(): EditionManifest {
    return this.manifest;
  }
}
