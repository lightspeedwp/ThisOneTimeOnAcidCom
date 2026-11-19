// Storage adapter for reader-access feature
// Implements atomic consume-once operation for verification codes
// Uses Netlify Blobs for persistence

export interface StorageAdapter {
  // Store and retrieve verification codes with single-use guarantee
  consumeCode(codeHash: string): Promise<boolean>;

  // Manage reader access records
  getReaderRecord(email: string): Promise<any>;
  updateReaderRecord(email: string, data: any): Promise<void>;

  // Manage device sessions
  createSession(email: string, sessionId: string): Promise<void>;
  deleteSession(sessionId: string): Promise<void>;
}
