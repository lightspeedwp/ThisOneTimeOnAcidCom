/**
 * E2E routing tests for ThisOneTimeOnAcidCom portfolio site.
 * Validates Netlify SPA routing, fallback behavior, and cross-browser compatibility.
 */
import { test, expect } from '@playwright/test';

/**
 * Valid journal routes that should load successfully with SPA fallback.
 */
const WORKING_ROUTES = [
  '/journal',
  '/journal/dancefloor-belonging',
  '/journal/uv-paint-visible',
  '/journal/living-full-colour',
  '/journal/berlin-bicycles',
  '/journal/rough-draft-notes',
  '/journal/standing-out-skill',
];

test.describe('Netlify SPA Routing', () => {
  test.describe('Working Routes - Direct Load', () => {
    WORKING_ROUTES.forEach(route => {
      test(`${route} loads directly and renders content`, async ({ page }) => {
        const response = await page.goto(route);

        // Should return 200 or use redirect to index.html
        if (response) {
          expect(response.status()).toBeLessThan(400);
        }

        // Should render page content (not 404 or "Post not found")
        const pageContent = page.locator('body');
        await expect(pageContent).not.toContainText('404');
        await expect(pageContent).not.toContainText(/not found/i);

        // Should have main content area
        const mainContent = page.locator('main, [role="main"], .content, article');
        await expect(mainContent).toBeVisible();
      });

      test(`${route} loads with page refresh`, async ({ page }) => {
        await page.goto(route);

        // Refresh the page
        await page.reload();

        // Should still be on the same route
        expect(page.url()).toContain(route);

        // Should have content (not 404)
        const pageContent = page.locator('body');
        await expect(pageContent).not.toContainText('404');
      });
    });
  });

  test.describe('Route Navigation', () => {
    test('can navigate from journal index to article', async ({ page }) => {
      await page.goto('/journal');

      // Find and click a link to an article
      const articleLink = page.locator('a[href*="/journal/"]').first();
      if (await articleLink.isVisible()) {
        await articleLink.click();

        // Should navigate successfully
        expect(page.url()).toContain('/journal/');
        const pageContent = page.locator('body');
        await expect(pageContent).not.toContainText('404');
      }
    });

    test('can navigate back from article to journal index', async ({ page }) => {
      await page.goto(WORKING_ROUTES[1]); // Navigate to first article

      // Find back/home link or use back navigation
      const backButton = page.locator('a[href="/journal"], button:has-text("Back"), a:has-text("Back")').first();
      if (await backButton.isVisible()) {
        await backButton.click();
        await page.waitForURL('/journal');
      }
    });
  });

  test.describe('Invalid Routes - SPA Fallback', () => {
    test('invalid route /nonexistent falls back to index.html', async ({ page }) => {
      const response = await page.goto('/nonexistent');

      // Netlify should serve index.html with 200 for SPA
      expect(response?.status()).toBeLessThan(400);

      // Page should load (will show home or 404 from React Router)
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('/nonexistent');
    });

    test('deeply nested invalid route /journal/invalid/deep/path falls back', async ({ page }) => {
      const response = await page.goto('/journal/invalid/deep/path');

      expect(response?.status()).toBeLessThan(400);
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('/journal/invalid/deep/path');
    });
  });

  test.describe('Asset Loading', () => {
    test('CSS assets load without 404 errors', async ({ page }) => {
      let cssErrors = false;

      page.on('response', response => {
        if (response.url().endsWith('.css') && response.status() === 404) {
          cssErrors = true;
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      expect(cssErrors).toBe(false);
    });

    test('JavaScript assets load without 404 errors', async ({ page }) => {
      let jsErrors = false;

      page.on('response', response => {
        if (response.url().endsWith('.js') && response.status() === 404) {
          jsErrors = true;
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      expect(jsErrors).toBe(false);
    });

    test('assets have correct content type headers', async ({ page }) => {
      const cssResponses: string[] = [];
      const jsResponses: string[] = [];

      page.on('response', response => {
        const contentType = response.headers()['content-type'] || '';
        if (response.url().endsWith('.css')) {
          cssResponses.push(contentType);
        }
        if (response.url().endsWith('.js')) {
          jsResponses.push(contentType);
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // At least one CSS file should have text/css content type
      if (cssResponses.length > 0) {
        expect(cssResponses.some(ct => ct.includes('text/css'))).toBe(true);
      }

      // JavaScript files should have correct content type
      if (jsResponses.length > 0) {
        expect(jsResponses.some(ct =>
          ct.includes('application/javascript') || ct.includes('text/javascript')
        )).toBe(true);
      }
    });
  });

  test.describe('Responsive Routing', () => {
    test('mobile view renders routes correctly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      for (const route of WORKING_ROUTES.slice(0, 3)) {
        await page.goto(route);

        // Should render on mobile
        const content = page.locator('main, [role="main"], .content, article');
        await expect(content).toBeVisible();
      }
    });

    test('tablet view renders routes correctly', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      for (const route of WORKING_ROUTES.slice(0, 3)) {
        await page.goto(route);

        const content = page.locator('main, [role="main"], .content, article');
        await expect(content).toBeVisible();
      }
    });

    test('desktop view renders routes correctly', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      for (const route of WORKING_ROUTES.slice(0, 3)) {
        await page.goto(route);

        const content = page.locator('main, [role="main"], .content, article');
        await expect(content).toBeVisible();
      }
    });
  });

  test.describe('Page Performance', () => {
    test('route loads within acceptable time', async ({ page }) => {
      const start = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const duration = Date.now() - start;

      // Should load within 5 seconds
      expect(duration).toBeLessThan(5000);
    });

    test('navigation between routes is fast', async ({ page }) => {
      await page.goto('/journal');

      const start = Date.now();
      const firstArticleLink = page.locator('a[href*="/journal/"]').first();
      if (await firstArticleLink.isVisible()) {
        await firstArticleLink.click();
        await page.waitForLoadState('networkidle');
      }
      const duration = Date.now() - start;

      // Should navigate within 2 seconds
      expect(duration).toBeLessThan(2000);
    });
  });
});
