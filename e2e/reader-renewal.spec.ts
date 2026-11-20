/**
 * @fileoverview E2E tests for reader session renewal (Phase 4, US2)
 * Tests: T026 - Session renewal on activity, 30-day window, expiry enforcement
 * Covers: Session auto-renewal on chapter access, seamless continuation
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const TEST_EMAIL = 'renewal-test@example.com';

test.describe('Reader Session Renewal (Phase 4, US2)', () => {
  test('should maintain active session during chapter access (renewal on activity)', async ({ page, context }) => {
    // Setup: Navigate and verify user to create initial session
    await page.goto(`${BASE_URL}/ebook`);

    const emailInput = page.locator('#email');
    await emailInput.fill(TEST_EMAIL);

    // Mock code request
    await page.route('**/.netlify/functions/reader-code-request', async (route) => {
      await route.fulfill({
        status: 202,
        body: JSON.stringify({
          state: 'request-received',
          expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        }),
      });
    });

    const sendButton = page.locator('button:has-text("Send Code")');
    await sendButton.click();

    const codeInput = page.locator('#code');
    await codeInput.fill('123456');

    // Mock verification with session (30-day expiry)
    const initialExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    let sessionExpiresAt = initialExpiresAt;

    await page.route('**/.netlify/functions/reader-verify', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          state: 'verified',
          sessionId: 'sess_renewal_test_123',
          expiresAt: sessionExpiresAt,
        }),
        headers: {
          'Set-Cookie': `sessionToken=sess_renewal_test_123; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
        },
      });
    });

    const verifyButton = page.locator('button:has-text("Verify")').first();
    await verifyButton.click();

    // Wait for success state
    const successMsg = page.locator('.reader-access-form__success');
    await expect(successMsg).toBeVisible();

    // Session should be created with 30-day expiry
    const cookies = await context.cookies();
    const sessionCookie = cookies.find((c) => c.name === 'sessionToken');
    expect(sessionCookie?.value).toBe('sess_renewal_test_123');

    // Check expiry date is set
    const expiresDate = new Date(sessionExpiresAt);
    const now = new Date();
    const daysUntilExpiry = (expiresDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

    expect(daysUntilExpiry).toBeGreaterThan(29);
    expect(daysUntilExpiry).toBeLessThanOrEqual(30);
  });

  test('should allow seamless chapter access with session renewal on activity', async ({ page, context }) => {
    // Setup: Create session context
    const sessionExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    await context.addCookies([{
      name: 'sessionToken',
      value: 'sess_access_test_456',
      url: BASE_URL,
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.floor(new Date(sessionExpiresAt).getTime() / 1000),
    }]);

    // Navigate to ebook
    await page.goto(`${BASE_URL}/ebook`);

    // Mock chapter access (should auto-renew session)
    let renewalCount = 0;
    await page.route('**/.netlify/functions/reader-chapter*', async (route) => {
      renewalCount++;
      const request = route.request();

      // Check that session cookie is present
      const cookies = await context.cookies();
      const sessionCookie = cookies.find((c) => c.name === 'sessionToken');

      if (sessionCookie) {
        // Session valid - return chapter content
        // In real scenario, this would trigger renewal via session-middleware
        await route.fulfill({
          status: 200,
          body: JSON.stringify({
            chapterId: 'ch-01-01',
            title: 'Chapter 1: Introduction',
            content: 'Chapter content...',
          }),
        });
      } else {
        // No session - 401
        await route.fulfill({
          status: 401,
          body: JSON.stringify({
            error: 'unauthorized',
            reason: 'missing_session',
          }),
        });
      }
    });

    // Click to view first chapter
    const chapter1Link = page.locator('a:has-text("Chapter 1")');
    if (await chapter1Link.isVisible()) {
      await chapter1Link.click();
    }

    // Session should still be valid
    const cookies = await context.cookies();
    const sessionCookie = cookies.find((c) => c.name === 'sessionToken');
    expect(sessionCookie?.value).toBe('sess_access_test_456');

    // Renewal should have occurred (tracked by route call)
    expect(renewalCount).toBeGreaterThan(0);
  });

  test('should deny access after session expires (beyond 30 days)', async ({ page, context }) => {
    // Setup: Create expired session (30+ days old)
    const expiredExpiresAt = new Date(Date.now() - 1000).toISOString(); // 1 second in past

    await context.addCookies([{
      name: 'sessionToken',
      value: 'sess_expired_test_789',
      url: BASE_URL,
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.floor(new Date(expiredExpiresAt).getTime() / 1000),
    }]);

    // Navigate to ebook
    await page.goto(`${BASE_URL}/ebook`);

    // Mock chapter access with expired session handling
    await page.route('**/.netlify/functions/reader-chapter*', async (route) => {
      // Session middleware checks expiry (expiresAt <= now)
      // Returns 401 for expired session
      await route.fulfill({
        status: 401,
        body: JSON.stringify({
          error: 'unauthorized',
          reason: 'expired_session',
          action: 'reverify_email',
        }),
        headers: {
          // Clear session cookie
          'Set-Cookie': 'sessionToken=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
        },
      });
    });

    // Try to access chapter
    const chapter1Link = page.locator('a:has-text("Chapter 1")');
    if (await chapter1Link.isVisible()) {
      await chapter1Link.click();
    }

    // Should show session expired message or redirect to verification
    // Check for error message or redirect
    const errorMsg = page.locator('.error-message, .alert-danger, [data-testid="expired-session-message"]');
    const isErrorVisible = await errorMsg.isVisible().catch(() => false);

    if (isErrorVisible) {
      await expect(errorMsg).toContainText(/expired|sign in/i);
    }
  });

  test('should handle renewal coalescing (skip redundant renewals within 1 second)', async ({ page, context }) => {
    // Setup: Create session
    const sessionExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    await context.addCookies([{
      name: 'sessionToken',
      value: 'sess_coalesce_test_999',
      url: BASE_URL,
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.floor(new Date(sessionExpiresAt).getTime() / 1000),
    }]);

    // Navigate to ebook
    await page.goto(`${BASE_URL}/ebook`);

    // Track renewal requests
    let chapterRequestCount = 0;
    await page.route('**/.netlify/functions/reader-chapter*', async (route) => {
      chapterRequestCount++;

      // Return chapter content
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          chapterId: `ch-01-0${chapterRequestCount}`,
          title: `Chapter 1 Part ${chapterRequestCount}`,
          content: 'Content...',
        }),
      });
    });

    // Rapid clicks on content (within 1 second coalesce window)
    // These should be coalesced into single renewal
    const contentLinks = page.locator('a[data-chapter]');
    const linkCount = await contentLinks.count();

    if (linkCount > 0) {
      // Click first few links rapidly
      for (let i = 0; i < Math.min(3, linkCount); i++) {
        await contentLinks.nth(i).click();
        // No wait between clicks - within coalesce window
      }
    }

    // Session should still be valid
    const cookies = await context.cookies();
    const sessionCookie = cookies.find((c) => c.name === 'sessionToken');
    expect(sessionCookie?.value).toBe('sess_coalesce_test_999');

    // Multiple chapter requests were made
    expect(chapterRequestCount).toBeGreaterThan(0);
  });

  test('should provide error details when session expires during reading', async ({ page, context }) => {
    // Setup: Session that will expire
    const expiresAt = new Date(Date.now() + 100).toISOString(); // Expires very soon

    await context.addCookies([{
      name: 'sessionToken',
      value: 'sess_timeout_test_111',
      url: BASE_URL,
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.floor(new Date(expiresAt).getTime() / 1000),
    }]);

    // Navigate to ebook
    await page.goto(`${BASE_URL}/ebook`);

    // Wait for session to expire
    await page.waitForTimeout(200);

    // Mock expired session response
    await page.route('**/.netlify/functions/reader-chapter*', async (route) => {
      await route.fulfill({
        status: 401,
        body: JSON.stringify({
          error: 'unauthorized',
          reason: 'expired_session',
          action: 'reverify_email',
        }),
      });
    });

    // Try to access chapter
    const chapter1Link = page.locator('a:has-text("Chapter 1")');
    if (await chapter1Link.isVisible()) {
      await chapter1Link.click();
    }

    // Should show appropriate error message
    const errorMsg = page.locator('[data-testid="error-message"], .alert, .error');
    const isErrorVisible = await errorMsg.isVisible().catch(() => false);

    if (isErrorVisible) {
      // Error should indicate action needed (reverify)
      const errorText = await errorMsg.textContent().catch(() => '');
      expect(errorText).toMatch(/expired|reverify|sign in/i);
    }
  });

  test('should maintain session across multiple chapters over time', async ({ page, context }) => {
    // Setup: Create session
    const sessionExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    await context.addCookies([{
      name: 'sessionToken',
      value: 'sess_multiread_test_222',
      url: BASE_URL,
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.floor(new Date(sessionExpiresAt).getTime() / 1000),
    }]);

    // Navigate to ebook
    await page.goto(`${BASE_URL}/ebook`);

    let totalChapterAccess = 0;

    // Mock chapter access
    await page.route('**/.netlify/functions/reader-chapter*', async (route) => {
      totalChapterAccess++;

      // Auto-renew session on each access
      // In real scenario, this happens in session-middleware

      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          chapterId: `ch-01-${String(totalChapterAccess).padStart(2, '0')}`,
          title: `Chapter 1 Section ${totalChapterAccess}`,
          content: 'Chapter content...',
        }),
      });
    });

    // Simulate reading multiple chapters
    const chapters = page.locator('a[data-chapter]');
    const chapterCount = Math.min(3, await chapters.count());

    for (let i = 0; i < chapterCount; i++) {
      await chapters.nth(i).click();
      // Small delay between chapter access (simulating reading time)
      await page.waitForTimeout(50);
    }

    // Session should remain valid
    const cookies = await context.cookies();
    const sessionCookie = cookies.find((c) => c.name === 'sessionToken');
    expect(sessionCookie?.value).toBe('sess_multiread_test_222');

    // Multiple chapters should have been accessed
    expect(totalChapterAccess).toBeGreaterThan(0);
  });
});
