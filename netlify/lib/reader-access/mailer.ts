// Email adapter using Mailgun for transactional sending
// Distinguishes "accepted for sending" from provider failure
// Never claims delivery (delivery status is provider's responsibility)

import type { Client } from '@mailgun/mailgun.js';

export interface EmailResult {
  status: 'accepted' | 'failed' | 'uncertain';
  messageId?: string;
  error?: string;
}

export class MailgunMailer {
  private client: Client;

  constructor(apiKey: string, domain: string) {
    // Initialize Mailgun client
    // this.client = new Mailgun({ key: apiKey, domain });
  }

  async sendVerificationCode(
    to: string,
    code: string,
    validityDuration: string = '10 minutes'
  ): Promise<EmailResult> {
    try {
      // Send verification code via Mailgun
      // Message: "Check your email within 10 minutes of requesting it"
      throw new Error('sendVerificationCode: Not implemented');
    } catch (err) {
      return {
        status: 'failed',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }

  async sendRecoveryCode(
    to: string,
    code: string
  ): Promise<EmailResult> {
    try {
      // Send recovery code via Mailgun
      throw new Error('sendRecoveryCode: Not implemented');
    } catch (err) {
      return {
        status: 'failed',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }
}
