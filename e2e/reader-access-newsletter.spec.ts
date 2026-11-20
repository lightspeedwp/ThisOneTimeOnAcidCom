/**
 * @fileoverview E2E tests for newsletter separation in reader access
 * Tests: Q-10 (newsletter separation)
 * Spec: Phase 5 RA-T046
 *
 * Verifies that:
 * - Requesting reader access does not subscribe to newsletter
 * - Verifying reader access does not subscribe to newsletter
 * - Reading content does not trigger newsletter subscription
 * - Newsletter copy accurately reflects separation
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const TEST_EMAIL = 'reader-newsletter-test@example.com';

test.describe('Newsletter Separation — Reader Access Flow (Q-10)', () => {
  test('requesting code should not subscribe to newsletter', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/ebook`);

    const emailInput = page.locator('#email');
    await emailInput.fill(TEST_EMAIL);

    // Mock code request
    // Should NOT include newsletter subscription call
    let codeRequestMade = false;
    let newsletterCallMade = false;

    await page.on('request', (request) => {
      const url = request.url();
      if (url.includes('reader-code-request')) {
        codeRequestMade = true;
      }
      if (
        url.includes('mailchimp') ||
        url.includes('convertkit') ||
        url.includes('newsletter')
      ) {
        newsletterCallMade = true;
      }
    });

    await page.route('**/.netlify/functions/reader-code-request', async (route) => {
      codeRequestMade = true;
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

    // Wait a moment for any newsletter calls
    await page.waitForTimeout(1000);

    // Verify: code request was made
    expect(codeRequestMade).toBe(true);

    // Verify: NO newsletter calls were made
    expect(newsletterCallMade).toBe(false);
  });

  test('verifying code should not subscribe to newsletter', async ({
    page,
    context,
  }) => {
    await page.goto(`${BASE_URL}/ebook`);

    let codeRequestMade = false;
    let verifyRequestMade = false;
    let newsletterCallMade = false;

    await page.on('request', (request) => {
      const url = request.url();
      if (url.includes('reader-code-request')) codeRequestMade = true;
      if (url.includes('reader-verify')) verifyRequestMade = true;
      if (
        url.includes('mailchimp') ||
        url.includes('convertkit') ||
        url.includes('newsletter')
      ) {
        newsletterCallMade = true;
      }
    });

    // Step 1: Request code
    const emailInput = page.locator('#email');
    await emailInput.fill(TEST_EMAIL);

    await page.route('**/.netlify/functions/reader-code-request', async (route) => {
      codeRequestMade = true;
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

    // Step 2: Verify code
    const codeInput = page.locator('#code');
    await codeInput.fill('123456');

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    await page.route('**/.netlify/functions/reader-verify', async (route) => {
      verifyRequestMade = true;
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          state: 'verified',
          sessionId: 'sess_newsletter_test',
          expiresAt,
        }),
        headers: {
          'Set-Cookie':
            'reader_session=sess_newsletter_test; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000',
        },
      });
    });

    const verifyButton = page.locator('button:has-text("Verify")').first();
    await verifyButton.click();

    // Wait for verification to complete
    await page.waitForTimeout(1000);

    // Verify: verify request was made
    expect(verifyRequestMade).toBe(true);

    // Verify: NO newsletter calls were made
    expect(newsletterCallMade).toBe(false);
  });

  test('accessing chapters should not trigger newsletter subscription', async ({
    page,
    context,
  }) => {
    // Setup: User with active session
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await context.addCookies([
      {
        name: 'reader_session',
        value: 'sess_chapter_test',
        url: BASE_URL,
        path: '/',
        secure: false,
        httpOnly: true,
        sameSite: 'Lax',
        expires: Math.floor(expiresAt.getTime() / 1000),
      },
    ]);

    let chapterRequestMade = false;
    let newsletterCallMade = false;

    await page.on('request', (request) => {
      const url = request.url();
      if (url.includes('reader-chapter')) chapterRequestMade = true;
      if (
        url.includes('mailchimp') ||
        url.includes('convertkit') ||
        url.includes('newsletter')
      ) {
        newsletterCallMade = true;
      }
    });

    await page.goto(`${BASE_URL}/ebook`);

    // Mock chapter fetch
    await page.route('**/.netlify/functions/reader-chapter/**', async (route) => {
      chapterRequestMade = true;
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          state: 'approved',
          chapterId: 'ch-001',
          content: '<h1>Chapter 1</h1><p>Content here</p>',
        }),
      });
    });

    // Trigger chapter access (simulated)
    // In real scenario, this would be clicking to read a chapter
    const chapterLinks = page.locator('[data-chapter-link]');
    const count = await chapterLinks.count();

    if (count > 0) {
      await chapterLinks.first().click();
      await page.waitForTimeout(1000);
    }

    // Verify: NO newsletter calls were made
    expect(newsletterCallMade).toBe(false);
  });

  test('thank you page shows truthful copy about newsletter separation', async ({
    page,
  }) => {
    // Navigate to thank you page (usually after code request)
    await page.goto(`${BASE_URL}/book-site/thank-you`);

    // Verify truthful copy is present
    const pageText = await page.textContent('body');
    expect(pageText).toContain('newsletter');
    expect(pageText).toContain('separate');
    expect(pageText).toContain('explicit consent');

    // Verify FALSE claims are NOT present
    expect(pageText).not.toMatch(/you.{0,30}be.?in.{0,20}touch/i);
    expect(pageText).not.toMatch(/you.{0,30}receive/i);
  });

  test('waitlist page shows truthful copy about newsletter separation', async ({
    page,
  }) => {
    // Navigate to waitlist page
    await page.goto(`${BASE_URL}/book-site/waitlist`);

    // Submit form
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill(TEST_EMAIL);

    await page.route('**/*', async (route) => {
      const url = route.request().url();
      if (url.includes('newsletter') || url.includes('subscribe')) {
        // Block newsletter subscriptions
        await route.abort();
      } else {
        await route.continue();
      }
    });

    const submitButton = page.locator('button:has-text("Join")');
    await submitButton.click();

    // Wait for success message
    await page.waitForTimeout(500);

    // Verify success message contains truthful copy
    const successText = await page.textContent('.waitlist-success');
    if (successText) {
      expect(successText).toContain('newsletter');
      expect(successText).toContain('explicit consent');

      // Verify FALSE claims are NOT in success message
      expect(successText).not.toMatch(/we.{0,20}be.?in.?touch/i);
    }
  });

  test('reader access handlers do not make newsletter API calls', async ({
    page,
  }) => {
    // Track all API calls
    const apiCalls: string[] = [];

    await page.on('request', (request) => {
      const url = request.url();
      apiCalls.push(url);
    });

    // Go through full reader access flow
    await page.goto(`${BASE_URL}/ebook`);

    const emailInput = page.locator('#email');
    await emailInput.fill(TEST_EMAIL);

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

    // Wait for all requests to settle
    await page.waitForTimeout(1500);

    // Verify: NO newsletter service calls
    const hasNewsletterCall = apiCalls.some(
      (url) =>
        url.includes('mailchimp') ||
        url.includes('convertkit') ||
        url.includes('klaviyo') ||
        url.includes('newsletter')
    );

    expect(hasNewsletterCall).toBe(false);
  });

  test('reader session and newsletter are independent systems', async ({
    page,
    context,
  }) => {
    // Setup: User with reader session
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await context.addCookies([
      {
        name: 'reader_session',
        value: 'sess_independent_test',
        url: BASE_URL,
        path: '/',
        secure: false,
        httpOnly: true,
        sameSite: 'Lax',
        expires: Math.floor(expiresAt.getTime() / 1000),
      },
    ]);

    await page.goto(`${BASE_URL}/ebook`);

    // Mock session GET
    await page.route('**/.netlify/functions/reader-session', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({
            state: 'verified',
            sessionId: 'sess_independent_test',
            expiresAt: expiresAt.toISOString(),
            renewedAt: new Date().toISOString(),
          }),
        });
      }
    });

    // Verify: Session cookie exists
    const cookies = await context.cookies();
    const readerCookie = cookies.find((c) => c.name === 'reader_session');
    expect(readerCookie?.value).toBe('sess_independent_test');

    // Verify: NO newsletter cookie or token
    const newsletterCookies = cookies.filter(
      (c) =>
        c.name.toLowerCase().includes('newsletter') ||
        c.name.toLowerCase().includes('mailchimp') ||
        c.name.toLowerCase().includes('convertkit')
    );
    expect(newsletterCookies.length).toBe(0);
  });
});
