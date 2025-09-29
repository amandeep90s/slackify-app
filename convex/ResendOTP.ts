import Resend from '@auth/core/providers/resend';
import { generateRandomString, RandomReader } from '@oslojs/crypto/random';
import { Resend as ResendAPI } from 'resend';

export const ResendOTP = Resend({
  id: 'resend-otp',
  apiKey: process.env.AUTH_RESEND_KEY!,
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
      subject: `Welcome to Slackify - Verify Your Email`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3F0E40;">Welcome to Slackify!</h2>
          <p>Thank you for signing up. To complete your registration, please enter the verification code below:</p>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="font-size: 32px; letter-spacing: 8px; color: #3F0E40; margin: 0;">${token}</h1>
          </div>
          <p>This code will expire in 10 minutes for security reasons.</p>
          <p>If you didn't create an account with Slackify, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #666;">This email was sent from Slackify</p>
        </div>
      `,
      text: `Welcome to Slackify! Your verification code is: ${token}. This code will expire in 10 minutes.`,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Failed to send verification email: ${error.message || 'Unknown error'}`);
    }
  },
});
