/**
 * POST /api/reader/verifications — legacy alias for session creation
 *
 * The existing reader forms post { email, code } here. Verification and
 * session creation now live in one place (reader-session-create.ts, T017), so
 * this endpoint delegates to it rather than keeping a second, divergent copy
 * of the code-consume and cookie logic.
 *
 * Success is 201 Created with the HttpOnly session cookie. The session token
 * is never returned in the response body.
 */

export { default } from './reader-session-create';
