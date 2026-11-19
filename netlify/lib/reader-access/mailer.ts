// Email adapter using Mailgun for transactional sending
// Distinguishes "accepted for sending" from provider failure
// Never claims delivery (delivery status is provider's responsibility)

import Mailgun from 'mailgun.js';
import FormData from 'form-data';

export interface EmailResult {
  status: 'accepted' | 'failed' | 'uncertain';
  messageId?: string;
  error?: string;
}

export interface MailerConfig {
  apiKey: string;
  domain: string;
  fromAddress: string;
}

const DEFAULT_FROM = 'noreply@thisonetimeonacidcom.com';

export class MailgunMailer {
  private mg: ReturnType<typeof Mailgun>;
  private domain: string;
  private fromAddress: string;

  constructor(config: MailerConfig) {
    const mailgun = new Mailgun(FormData);
    this.mg = mailgun.client({ key: config.apiKey });
    this.domain = config.domain;
    this.fromAddress = config.fromAddress || DEFAULT_FROM;
  }

  async sendVerificationCode(
    to: string,
    code: string,
    validityDuration: string = '10 minutes'
  ): Promise<EmailResult> {
    try {
      const result = await this.mg.messages.create(this.domain, {
        from: this.fromAddress,
        to,
        subject: 'Your verification code',
        text: `Your code is: ${code}\n\nThis code is valid for ${validityDuration}.`,
        html: `<p>Your code is: <strong>${code}</strong></p><p>This code is valid for ${validityDuration}.</p>`,
      });

      return {
        status: 'accepted',
        messageId: result.id,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      // Check if error is retriable (network, timeout) vs permanent (invalid email)
      const isRetriable = this.isRetriableError(err);
      return {
        status: isRetriable ? 'uncertain' : 'failed',
        error: message,
      };
    }
  }

  async sendRecoveryCode(to: string, code: string): Promise<EmailResult> {
    try {
      const result = await this.mg.messages.create(this.domain, {
        from: this.fromAddress,
        to,
        subject: 'Your recovery code',
        text: `Your recovery code is: ${code}\n\nUse this to regain access to your reader account.`,
        html: `<p>Your recovery code is: <strong>${code}</strong></p><p>Use this to regain access to your reader account.</p>`,
      });

      return {
        status: 'accepted',
        messageId: result.id,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      const isRetriable = this.isRetriableError(err);
      return {
        status: isRetriable ? 'uncertain' : 'failed',
        error: message,
      };
    }
  }

  private isRetriableError(err: unknown): boolean {
    if (!(err instanceof Error)) return false;
    // Mailgun HTTP errors 5xx are retriable; 4xx are permanent
    if ('status' in err && typeof err.status === 'number') {
      return err.status >= 500;
    }
    // Network timeouts are retriable
    return err.message.includes('timeout') || err.message.includes('ECONNREFUSED');
  }
}
