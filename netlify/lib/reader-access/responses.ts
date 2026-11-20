// JSON response helpers for reader-access functions
// Set Cache-Control: no-store for all responses
// Never reveal whether an email is known

export type ReaderStateType =
  | 'request-pending'
  | 'request-received'
  | 'delivery-uncertain'
  | 'verified'
  | 'code-invalid'
  | 'code-expired'
  | 'code-used'
  | 'limited'
  | 'provider-failure'
  | 'content-unavailable';

export interface ReaderResponse {
  state: ReaderStateType;
  message?: string;
  expiresAt?: string;
  sessionId?: string;
  chapterId?: string;
  content?: string;
}

const NO_CACHE_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export function createResponse(
  body: ReaderResponse,
  statusCode: number = 200
): Response {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: NO_CACHE_HEADERS,
  });
}

// State-specific response builders
export const responses = {
  pending: (): ReaderResponse => ({
    state: 'request-pending',
  }),

  received: (expiresAt: string): ReaderResponse => ({
    state: 'request-received',
    expiresAt,
  }),

  uncertain: (): ReaderResponse => ({
    state: 'delivery-uncertain',
  }),

  verified: (sessionId: string, expiresAt: string): ReaderResponse => ({
    state: 'verified',
    sessionId,
    expiresAt,
  }),

  invalid: (): ReaderResponse => ({
    state: 'code-invalid',
  }),

  expired: (): ReaderResponse => ({
    state: 'code-expired',
  }),

  used: (): ReaderResponse => ({
    state: 'code-used',
  }),

  limited: (): ReaderResponse => ({
    state: 'limited',
  }),

  error: (message: string): ReaderResponse => ({
    state: 'provider-failure',
    message,
  }),

  unavailable: (): ReaderResponse => ({
    state: 'content-unavailable',
  }),

  content: (chapterId: string, content: string): ReaderResponse => ({
    state: 'verified',
    chapterId,
    content,
  }),
};

export function createErrorResponse(error: string, statusCode = 500): Response {
  return createResponse(responses.error(error), statusCode);
}

export function createJsonResponse(body: ReaderResponse, statusCode = 200): Response {
  return createResponse(body, statusCode);
}
