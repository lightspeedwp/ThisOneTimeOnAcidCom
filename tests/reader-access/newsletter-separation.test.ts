/**
 * @fileoverview Newsletter separation tests for reader access
 * Verifies that reading never subscribes anyone to newsletters
 * Spec: Phase 5 RA-T046
 */

import fs from 'fs';
import path from 'path';

describe('Newsletter Separation — Reader Access', () => {
  const netlifyFunctionsDir = path.join(__dirname, '../../netlify/functions');
  const readerFunctions = [
    'reader-code-request.ts',
    'reader-verify.ts',
    'reader-chapter.ts',
    'reader-session.ts',
  ];

  describe('Reader handlers never call newsletter APIs', () => {
    const newsletterPatterns = [
      /mailchimp/i,
      /convertkit/i,
      /klaviyo/i,
      /sendinblue/i,
      /brevo/i,
      /newsletter/i,
      /subscribe/i,
      /subscription/i,
      /mailing.?list/i,
      /email.?list/i,
      /audience/i,
      /subscriber/i,
    ];

    test.each(readerFunctions)(
      '%s should not reference newsletter services or subscription APIs',
      (filename) => {
        const filePath = path.join(netlifyFunctionsDir, filename);
        const content = fs.readFileSync(filePath, 'utf-8');

        // Check that file exists and is readable
        expect(fs.existsSync(filePath)).toBe(true);

        // Verify no newsletter service references
        for (const pattern of newsletterPatterns) {
          expect(content).not.toMatch(pattern);
        }
      }
    );
  });

  describe('Reader handlers only call approved APIs', () => {
    const approvedImports = [
      'mailgun', // Email verification only
      'netlify/blobs', // Session storage
      'crypto', // Code generation/hashing
      'scrypt', // Hashing
    ];

    test.each(readerFunctions)(
      '%s should only import approved external services',
      (filename) => {
        const filePath = path.join(netlifyFunctionsDir, filename);
        const content = fs.readFileSync(filePath, 'utf-8');

        // Extract all import statements
        const imports = content.match(/from\s+['"](.+?)['"]/g) || [];
        const externalImports = imports
          .map(imp => imp.match(/from\s+['"](.+?)['"]/)?.[1] || '')
          .filter(imp => !imp.startsWith('.') && !imp.startsWith('/'));

        // Verify all imports are from approved services
        for (const imp of externalImports) {
          const isApproved = approvedImports.some(approved =>
            imp.includes(approved)
          );
          expect(isApproved).toBe(true);
        }
      }
    );
  });

  describe('Code and session handlers are independent', () => {
    test('reader-code-request should not reference session handling', () => {
      const filePath = path.join(
        netlifyFunctionsDir,
        'reader-code-request.ts'
      );
      const content = fs.readFileSync(filePath, 'utf-8');

      expect(content).not.toMatch(/session/i);
      expect(content).not.toMatch(/cookie/i);
    });

    test('reader-verify should handle sessions independently', () => {
      const filePath = path.join(netlifyFunctionsDir, 'reader-verify.ts');
      const content = fs.readFileSync(filePath, 'utf-8');

      // Should reference session but not newsletter
      expect(content).toMatch(/session/i);
      expect(content).not.toMatch(/newsletter/i);
      expect(content).not.toMatch(/subscribe/i);
    });

    test('reader-chapter should validate sessions without newsletter checks', () => {
      const filePath = path.join(netlifyFunctionsDir, 'reader-chapter.ts');
      const content = fs.readFileSync(filePath, 'utf-8');

      // Should reference sessions and chapters but not newsletters
      expect(content).toMatch(/session/i);
      expect(content).toMatch(/chapter/i);
      expect(content).not.toMatch(/newsletter/i);
      expect(content).not.toMatch(/subscribe/i);
    });
  });

  describe('Copy is truthful about newsletter separation', () => {
    test('reader-access.ts should state newsletter is separate and requires explicit consent', () => {
      const mockFilePath = path.join(
        __dirname,
        '../../src/app/data/mock/reader-access.ts'
      );
      const content = fs.readFileSync(mockFilePath, 'utf-8');

      expect(content).toMatch(
        /newsletter.+?separate.+?from.+?reader.?access/i
      );
      expect(content).toMatch(/explicit.?consent/i);
      expect(content).toMatch(/double.?opt-in/i);
    });

    test('ThankYouPage should not claim newsletter subscription', () => {
      const filePath = path.join(
        __dirname,
        '../../src/app/components/pages/book-site/ThankYouPage.tsx'
      );
      const content = fs.readFileSync(filePath, 'utf-8');

      // Should NOT claim user will receive updates
      expect(content).not.toMatch(/you.{0,30}receive.+?updates/i);
      expect(content).not.toMatch(/you.{0,30}be.+?in.{0,30}touch/i);

      // SHOULD state newsletter is separate
      expect(content).toMatch(/newsletter/i);
      expect(content).toMatch(/explicit.?consent/i);
    });

    test('WaitlistPage should not claim updates', () => {
      const filePath = path.join(
        __dirname,
        '../../src/app/components/pages/book-site/WaitlistPage.tsx'
      );
      const content = fs.readFileSync(filePath, 'utf-8');

      // Should NOT claim user will receive updates
      expect(content).not.toMatch(/we.{0,20}be.+?in.{0,20}touch/i);
      expect(content).not.toMatch(/draft.?updates/i);

      // SHOULD state newsletter is separate (in success message or guidance)
      expect(content).toMatch(/newsletter/i);
      expect(content).toMatch(/explicit.?consent/i);
    });
  });

  describe('No unverified access claims', () => {
    test('ThankYouPage should not claim access is active', () => {
      const filePath = path.join(
        __dirname,
        '../../src/app/components/pages/book-site/ThankYouPage.tsx'
      );
      const content = fs.readFileSync(filePath, 'utf-8');

      // Should NOT claim access starts immediately
      expect(content).not.toMatch(/access.{0,30}starts.{0,30}here/i);
      expect(content).not.toMatch(/you.{0,20}in/i);

      // SHOULD reference verification step
      expect(content).toMatch(/verif/i);
    });
  });
});
