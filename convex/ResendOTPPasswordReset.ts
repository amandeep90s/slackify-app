import Resend from '@auth/core/providers/resend';
import { generateRandomString, RandomReader } from '@oslojs/crypto/random';
import { Resend as ResendAPI } from 'resend';

export const ResendOTPPasswordReset = Resend({
  id: 'resend-otp',
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes) {
        crypto.getRandomValues(bytes);
      },
    };

    const alphabet = '0123456789';
    const length = 6;
    return generateRandomString(random, alphabet, length);
  },
  async sendVerificationRequest({ identifier: email, token }) {
    // Use the API key from environment variables
    const apiKey = process.env.AUTH_RESEND_KEY;

    if (!apiKey) {
      throw new Error(
        'Resend API key is not configured. Please set AUTH_RESEND_KEY in your Convex environment.'
      );
    }

    const resend = new ResendAPI(apiKey);
    const { error } = await resend.emails.send({
      from: 'Slackify <onboarding@resend.dev>',
      to: [email],
      subject: `Reset Your Slackify Password`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3F0E40;">Password Reset Request</h2>
          <p>We received a request to reset your password for your Slackify account.</p>
          <p>Please enter the verification code below to reset your password:</p>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="font-size: 32px; letter-spacing: 8px; color: #3F0E40; margin: 0;">${token}</h1>
          </div>
          <p>This code will expire in 10 minutes for security reasons.</p>
          <p><strong>If you didn't request a password reset, please ignore this email.</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #666;">This email was sent from Slackify</p>
        </div>
      `,
      text: `Password Reset Request - Your verification code is: ${token}. This code will expire in 10 minutes. If you didn't request a password reset, please ignore this email.`,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Failed to send password reset email: ${error.message || 'Unknown error'}`);
    }
  },
});
