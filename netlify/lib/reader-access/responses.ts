// JSON response helpers for reader-access functions
// Set Cache-Control: no-store for all responses
// Never reveal whether an email is known

export interface ReaderState {
  state:
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
  message?: string;
  expiresAt?: string;
}

export function createResponse(
  state: ReaderState,
  statusCode: number = 200
): Response {
  return new Response(JSON.stringify(state), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

export function createErrorResponse(error: string): Response {
  return createResponse(
    { state: 'provider-failure', message: error },
    500
  );
}
