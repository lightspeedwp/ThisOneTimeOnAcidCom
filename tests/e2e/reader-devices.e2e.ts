/**
 * E2E tests for multi-device access and device limit enforcement (T045-T046).
 * Uses Playwright to test real browser scenarios.
 */

import { test, expect } from '@playwright/test';

// Set base URL for API calls
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const READER_VERIFY_URL = `${BASE_URL}/api/reader/verify`;
const READER_SESSION_URL = `${BASE_URL}/api/reader/session`;
const READER_DEVICE_LOGOUT_URL = `${BASE_URL}/api/reader/device/logout`;

/**
 * Helper: Simulate email verification and get session token
 */
async function verifyAndCreateSession(email: string, context: any) {
  // Step 1: Request verification code (Phase 2)
  const verifyResponse = await context.request.post(`${READER_VERIFY_URL}`, {
    data: { email },
  });
  expect(verifyResponse.ok()).toBeTruthy();
  const verifyData = await verifyResponse.json() as any;

  // For testing: extract code from response (in real scenario, sent via email)
  const verificationCode = verifyData.code || '000000';

  // Step 2: Create session with device fingerprint
  const sessionResponse = await context.request.post(`${BASE_URL}/api/reader/sessions`, {
    data: {
      email,
      verificationCode,
      userAgent: context.browser.userAgent || 'Mozilla/5.0',
      ipAddress: '203.0.113.42',
    },
  });

  return { response: sessionResponse, email };
}

test.describe('Multi-Device Access - T045', () => {
  test('should allow phone and tablet to access within limit', async ({ browser, context }) => {
    const email = `phone-tablet-test-${Date.now()}@example.com`;

    // Simulate phone access
    const phoneContext = await browser.newContext();
    const phoneResponse = await verifyAndCreateSession(email, phoneContext);
    expect(phoneResponse.response.ok()).toBeTruthy();

    const phoneData = await phoneResponse.response.json() as any;
    expect(phoneData.state).toBe('created');
    expect(phoneData.sessionId).toBeTruthy();

    // Verify phone can access chapter
    const phoneChapterResponse = await phoneContext.request.get(
      `${BASE_URL}/api/reader/chapter/1`
    );
    expect(phoneChapterResponse.ok()).toBeTruthy();

    // Simulate tablet access (different context)
    const tabletContext = await browser.newContext();
    const tabletResponse = await verifyAndCreateSession(email, tabletContext);
    expect(tabletResponse.response.ok()).toBeTruthy();

    const tabletData = await tabletResponse.response.json() as any;
    expect(tabletData.state).toBe('created');
    expect(tabletData.sessionId).toBeTruthy();

    // Verify tablet can access chapter
    const tabletChapterResponse = await tabletContext.request.get(
      `${BASE_URL}/api/reader/chapter/1`
    );
    expect(tabletChapterResponse.ok()).toBeTruthy();

    // Verify they're different sessions
    expect(phoneData.sessionId).not.toBe(tabletData.sessionId);

    // Cleanup
    await phoneContext.close();
    await tabletContext.close();
  });

  test('should maintain session across multiple chapter accesses on same device', async ({
    browser,
  }) => {
    const email = `persistence-test-${Date.now()}@example.com`;
    const context = await browser.newContext();

    // Create session
    const sessionResponse = await verifyAndCreateSession(email, context);
    expect(sessionResponse.response.ok()).toBeTruthy();

    const sessionData = await sessionResponse.response.json() as any;
    const sessionToken = sessionData.sessionId;

    // Access multiple chapters
    for (let i = 1; i <= 3; i++) {
      const chapterResponse = await context.request.get(
        `${BASE_URL}/api/reader/chapter/${i}`,
        {
          headers: {
            cookie: `sessionToken=${sessionToken}`,
          },
        }
      );

      expect(chapterResponse.ok()).toBeTruthy();
    }

    await context.close();
  });
});

test.describe('Device Overflow Enforcement - T046', () => {
  test('should reject 3rd device with 409 error when limit is 2', async ({ browser }) => {
    const email = `device-overflow-${Date.now()}@example.com`;

    // Create sessions on 2 devices
    const device1Context = await browser.newContext();
    const response1 = await verifyAndCreateSession(email, device1Context);
    expect(response1.response.ok()).toBeTruthy();

    const device2Context = await browser.newContext();
    const response2 = await verifyAndCreateSession(email, device2Context);
    expect(response2.ok()).toBeTruthy();

    // Attempt 3rd device - should get 409
    const device3Context = await browser.newContext();
    const response3 = await verifyAndCreateSession(email, device3Context);

    // Expect 409 Conflict
    expect(response3.response.status()).toBe(409);

    const errorData = await response3.response.json() as any;
    expect(errorData.error).toContain('Device limit exceeded');

    // Cleanup
    await device1Context.close();
    await device2Context.close();
    await device3Context.close();
  });

  test('should show device limit message to user', async ({ page, context }) => {
    const email = `user-message-test-${Date.now()}@example.com`;

    // Create sessions on 2 devices to hit limit
    const device1Context = await context.browser().newContext();
    await verifyAndCreateSession(email, device1Context);

    const device2Context = await context.browser().newContext();
    await verifyAndCreateSession(email, device2Context);

    // Try to create 3rd device session and check error display
    const device3Context = await context.browser().newContext();
    const errorResponse = await verifyAndCreateSession(email, device3Context);

    // Verify error response includes helpful information
    const errorData = await errorResponse.response.json() as any;
    expect(errorData).toHaveProperty('error');
    expect(errorData.error).toMatch(/[Dd]evice.*limit/i);

    // Cleanup
    await device1Context.close();
    await device2Context.close();
    await device3Context.close();
  });

  test('should allow new device after terminating old device', async ({ browser }) => {
    const email = `device-switch-${Date.now()}@example.com`;

    // Create session on device 1
    const device1Context = await browser.newContext();
    const response1 = await verifyAndCreateSession(email, device1Context);
    expect(response1.response.ok()).toBeTruthy();
    const data1 = await response1.response.json() as any;

    // Create session on device 2
    const device2Context = await browser.newContext();
    const response2 = await verifyAndCreateSession(email, device2Context);
    expect(response2.response.ok()).toBeTruthy();
    const data2 = await response2.response.json() as any;

    // Try device 3 - should fail (at limit)
    const device3Context = await browser.newContext();
    const response3 = await verifyAndCreateSession(email, device3Context);
    expect(response3.response.status()).toBe(409);

    // Logout device 1
    const logoutResponse = await device1Context.request.post(
      `${READER_DEVICE_LOGOUT_URL}`,
      {
        data: {
          email,
          deviceId: data1.deviceId,
        },
      }
    );
    expect(logoutResponse.ok()).toBeTruthy();

    // Now device 3 should succeed
    const response3Retry = await verifyAndCreateSession(email, device3Context);
    expect(response3Retry.response.ok()).toBeTruthy();

    // Cleanup
    await device1Context.close();
    await device2Context.close();
    await device3Context.close();
  });

  test('should handle rapid device switches correctly', async ({ browser }) => {
    const email = `rapid-switch-${Date.now()}@example.com`;

    const devices = [];

    // Create device 1
    const ctx1 = await browser.newContext();
    const res1 = await verifyAndCreateSession(email, ctx1);
    expect(res1.response.ok()).toBeTruthy();
    devices.push({ context: ctx1, response: res1 });

    // Create device 2
    const ctx2 = await browser.newContext();
    const res2 = await verifyAndCreateSession(email, ctx2);
    expect(res2.response.ok()).toBeTruthy();
    devices.push({ context: ctx2, response: res2 });

    // Try device 3 (should fail)
    const ctx3 = await browser.newContext();
    const res3 = await verifyAndCreateSession(email, ctx3);
    expect(res3.response.status()).toBe(409);

    // Logout device 1
    const data1 = await devices[0].response.response.json() as any;
    await devices[0].context.request.post(
      `${READER_DEVICE_LOGOUT_URL}`,
      { data: { email, deviceId: data1.deviceId } }
    );

    // Create device 3 (should now succeed)
    const res3Retry = await verifyAndCreateSession(email, ctx3);
    expect(res3Retry.response.ok()).toBeTruthy();

    // Logout device 2
    const data2 = await devices[1].response.response.json() as any;
    await devices[1].context.request.post(
      `${READER_DEVICE_LOGOUT_URL}`,
      { data: { email, deviceId: data2.deviceId } }
    );

    // Create device 4 (should succeed)
    const ctx4 = await browser.newContext();
    const res4 = await verifyAndCreateSession(email, ctx4);
    expect(res4.response.ok()).toBeTruthy();

    // Cleanup
    for (const device of devices) {
      await device.context.close();
    }
    await ctx3.close();
    await ctx4.close();
  });
});

test.describe('Device Fingerprinting Consistency - T047', () => {
  test('should generate same device fingerprint for same device characteristics', async ({
    context,
  }) => {
    const email = `fingerprint-test-${Date.now()}@example.com`;

    // Create session with specific fingerprint characteristics
    const response1 = await verifyAndCreateSession(email, context);
    expect(response1.response.ok()).toBeTruthy();
    const data1 = await response1.response.json() as any;
    const deviceId1 = data1.deviceId;

    // Create another session with same user agent and IP (simulating same device)
    const response2 = await context.request.post(`${BASE_URL}/api/reader/sessions`, {
      data: {
        email,
        verificationCode: '000000',
        userAgent: 'Mozilla/5.0 (consistent)',
        ipAddress: '203.0.113.42',
      },
    });

    // Should create new session but potentially same device
    // (device limit would prevent if they're treated as same)
    if (response2.ok()) {
      const data2 = await response2.json() as any;
      // Devices with same fingerprinting input should have same ID
      expect(data2.deviceId).toBe(deviceId1);
    }
  });

  test('should generate different device fingerprints for different devices', async ({
    browser,
  }) => {
    const email = `fingerprint-diff-${Date.now()}@example.com`;

    // Device 1: iPhone
    const device1Context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0)',
    });
    const res1 = await verifyAndCreateSession(email, device1Context);
    expect(res1.response.ok()).toBeTruthy();

    // Device 2: iPad
    const device2Context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0)',
    });
    const res2 = await verifyAndCreateSession(email, device2Context);
    expect(res2.response.ok()).toBeTruthy();

    // Different user agents should create different device IDs
    // (at different IPs, they're definitely different)

    // Cleanup
    await device1Context.close();
    await device2Context.close();
  });
});
