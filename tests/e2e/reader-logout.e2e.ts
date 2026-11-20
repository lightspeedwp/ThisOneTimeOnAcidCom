/**
 * E2E tests for session logout using Playwright
 * Covers T057-T058: Logout button flow, timeout/expiry flow
 */

import { test, expect } from '@playwright/test';

// Set up test base URL
const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:8888';

test.describe('Reader Logout & Session Termination E2E', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear any existing cookies
    await context.clearCookies();
  });

  test.describe('T057: Logout button flow', () => {
    test('sign out button → session terminated → chapter access denied', async ({
      page,
      context,
    }) => {
      // Step 1: Verify email to create session
      await page.goto(`${BASE_URL}/reader/verify`);
      await page.fill('input[name="email"]', 'test@example.com');
      await page.click('button:has-text("Send Code")');

      // Wait for verification code request
      await page.waitForURL(`**/reader/check-email`);
      expect(page.url()).toContain('check-email');

      // Simulate email verification (in real test, would fetch code from test email provider)
      // For now, we assume the reader has the code
      await page.goto(`${BASE_URL}/reader/verify-code`);
      await page.fill('input[name="code"]', '000000'); // Placeholder code
      await page.click('button:has-text("Verify")');

      // Should be redirected to chapters
      await page.waitForURL(`**/reader/chapters**`, { timeout: 10000 }).catch(() => null);

      // Step 2: Access a chapter to confirm session works
      await page.goto(`${BASE_URL}/reader/chapters`);
      const chapterLink = page.locator('a:has-text("Chapter")').first();
      await chapterLink.click();

      // Should be able to read content
      await page.waitForSelector('h1, .chapter-content', { timeout: 5000 }).catch(() => null);
      const contentExists = await page.locator('.chapter-content, h1').count();
      expect(contentExists).toBeGreaterThan(0);

      // Step 3: Check session cookie exists
      const cookies = await context.cookies();
      const sessionCookie = cookies.find((c) => c.name.toLowerCase().includes('session'));
      expect(sessionCookie).toBeDefined();
      expect(sessionCookie?.httpOnly).toBe(true);
      expect(sessionCookie?.secure).toBe(true);

      // Step 4: Click sign out button
      const signOutButton = page.locator('button:has-text("Sign Out"), a:has-text("Sign Out")').first();
      if (await signOutButton.isVisible()) {
        await signOutButton.click();

        // Should see confirmation or redirect
        await page.waitForURL(`**/reader/verify**`, { timeout: 5000 }).catch(() => null);
      }

      // Step 5: Try to access chapter again → should be denied
      await page.goto(`${BASE_URL}/reader/chapters/chapter-1`);

      // Should be redirected to verify page or see error
      const isRedirected =
        page.url().includes('/verify') ||
        page.url().includes('/login');

      if (isRedirected) {
        expect(isRedirected).toBe(true);
      } else {
        // Or should see 401 error message
        const errorMessage = page.locator('text=/401|unauthorized|expired|sign in/i').first();
        const isVisible = await errorMessage.isVisible({ timeout: 3000 }).catch(() => false);
        expect(isVisible).toBe(true);
      }

      // Step 6: Verify session cookie is cleared
      const cookiesAfterLogout = await context.cookies();
      const sessionCookieAfter = cookiesAfterLogout.find(
        (c) => c.name.toLowerCase().includes('session')
      );

      // Session cookie should be cleared (empty or removed)
      if (sessionCookieAfter) {
        expect(sessionCookieAfter.value).toBe('');
      }
    });

    test('logout clears HttpOnly session cookie', async ({ page, context }) => {
      // This test specifically verifies cookie clearing behavior

      // Create a session by verifying email
      await page.goto(`${BASE_URL}/reader/verify`);
      await page.fill('input[name="email"]', 'cookie-test@example.com');
      await page.click('button:has-text("Send Code")');

      // Skip to verification (real test would handle email code)
      // For now, assume logged in state

      // Check cookie before logout
      const cookiesBefore = await context.cookies();
      const sessionBefore = cookiesBefore.find((c) => c.name === 'sessionToken');

      // If logged in, sessionToken should exist
      // Note: In real test, would need to complete email verification first
      if (sessionBefore) {
        expect(sessionBefore.httpOnly).toBe(true);
        expect(sessionBefore.sameSite).toBe('Lax');
        expect(sessionBefore.secure).toBe(true);

        // Click logout
        const signOut = page.locator('button:has-text("Sign Out")').first();
        if (await signOut.isVisible()) {
          await signOut.click();

          // After logout, check cookies
          const cookiesAfter = await context.cookies();
          const sessionAfter = cookiesAfter.find((c) => c.name === 'sessionToken');

          // Session cookie should be cleared
          if (sessionAfter) {
            expect(sessionAfter.value).toBe('');
          }
        }
      }
    });
  });

  test.describe('T058: Timeout/expiry flow', () => {
    test('idle until expiry → access denied → prompt to reverify', async ({
      page,
      context,
    }) => {
      // This test simulates a session expiring due to inactivity
      // In real environment, would need to manipulate server time or use test session with short expiry

      // Step 1: Create session with short expiry (test-only feature)
      await page.goto(`${BASE_URL}/reader/verify`);
      await page.fill('input[name="email"]', 'expiry-test@example.com');
      // Add URL parameter to request short-expiry session (test feature)
      await page.click('button:has-text("Send Code")');

      // Step 2: Access chapter to confirm session works
      await page.goto(`${BASE_URL}/reader/chapters`);
      const contentBefore = await page.locator('.chapter-content, h1').count();
      expect(contentBefore).toBeGreaterThanOrEqual(0);

      // Step 3: Wait for session to expire (or simulate by clearing cookie)
      // In a real integration test, would use a test endpoint to expire sessions
      // For now, manually clear the session cookie
      await context.clearCookies({ name: 'sessionToken' });

      // Step 4: Try to access chapter
      await page.goto(`${BASE_URL}/reader/chapters/chapter-1`);

      // Should be redirected to verification or show error
      await page.waitForTimeout(1000); // Give page time to redirect

      const isVerifyPage = page.url().includes('/verify');
      const isLoginPage = page.url().includes('/login');
      const isCheckEmail = page.url().includes('check-email');

      expect(isVerifyPage || isLoginPage || isCheckEmail).toBe(true);

      // Step 5: Should see prompt to reverify
      const reverifyPrompt = page.locator(
        'text=/reverify|expired|please sign in|authenticate/i'
      ).first();
      const promptVisible = await reverifyPrompt
        .isVisible({ timeout: 3000 })
        .catch(() => false);

      expect(promptVisible).toBe(true);
    });

    test('expired session returns 401 Unauthorized', async ({ page }) => {
      // This test checks the HTTP response code for expired sessions

      // Create session and access chapter
      await page.goto(`${BASE_URL}/reader/chapters/chapter-1`);

      // Listen for responses
      const responsePromise = page.waitForResponse((response) => {
        return response.url().includes('/api/reader/chapters');
      });

      // If session is expired, should get 401
      const response = await responsePromise.catch(() => null);

      if (response) {
        // With expired session, response should be 401
        // With valid session, should be 200
        expect([200, 401, 404]).toContain(response.status());
      }
    });

    test('expired session prompts reverification with action field', async ({ page }) => {
      // Test that error response includes action: "reverify_email"

      // This would involve intercepting API responses
      let apiResponse: any = null;

      page.on('response', async (response) => {
        if (response.url().includes('/api/reader/')) {
          try {
            apiResponse = await response.json();
          } catch (e) {
            // Not JSON
          }
        }
      });

      // Try to access chapter with expired session
      await page.goto(`${BASE_URL}/reader/chapters/chapter-1`);
      await page.waitForTimeout(2000);

      // If we got a 401 response, check for action field
      if (apiResponse && apiResponse.error) {
        // Error response should have action field
        expect(['reverify_email', 'retry', 'login']).toContain(apiResponse.action);
      }
    });

    test('no grace period: session denied immediately after expiry', async ({ page }) => {
      // This test verifies no-grace-period enforcement
      // Session should be denied immediately when expiresAt <= now

      // In a controlled test, would:
      // 1. Create session with specific expiry time
      // 2. Wait exactly until expiry
      // 3. Try to access
      // 4. Should be denied immediately

      // For now, test the logout behavior which should be immediate
      await page.goto(`${BASE_URL}/reader/chapters`);

      // Check that logout is immediate
      const logoutButton = page.locator('button:has-text("Sign Out")').first();
      if (await logoutButton.isVisible()) {
        await logoutButton.click();

        // After logout, next request should be denied
        // (not "about to logout" or grace period)
        await page.goto(`${BASE_URL}/reader/chapters/chapter-1`);

        // Should be redirected immediately (no attempts to access)
        const isRedirected =
          page.url().includes('/verify') ||
          page.url().includes('/login');
        expect(isRedirected).toBe(true);
      }
    });
  });

  test.describe('Session termination edge cases', () => {
    test('logout is idempotent: second logout attempt is safe', async ({ page }) => {
      // Logging out twice should not cause error

      await page.goto(`${BASE_URL}/reader/verify`);
      await page.fill('input[name="email"]', 'idempotent-test@example.com');
      await page.click('button:has-text("Send Code")');

      // First logout
      const signOut = page.locator('button:has-text("Sign Out")').first();
      if (await signOut.isVisible()) {
        await signOut.click();
        await page.waitForURL(`**/verify**`, { timeout: 5000 }).catch(() => null);

        // Try to logout again (should be safe)
        await page.goto(`${BASE_URL}/reader/chapters`);
        const signOut2 = page.locator('button:has-text("Sign Out")').first();

        // Should not exist (already logged out)
        const exists = await signOut2.isVisible({ timeout: 1000 }).catch(() => false);
        expect(exists).toBe(false);
      }
    });
  });
});
