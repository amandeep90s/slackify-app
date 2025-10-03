import { z } from 'zod';

// Schemas
export const signInSchema = z.object({
  email: z.email('Please enter a valid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Enter your full name')
      .max(100, 'Name must be less than 100 characters'),
    email: z
      .email('Enter your email')
      .min(1, 'Email is required')
      .max(100, 'Email must be less than 100 characters'),
    password: z
      .string()
      .min(8, 'Enter a password with at least 8 characters')
      .max(100, 'Password must be less than 100 characters'),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const emailVerificationSchema = z.object({
  code: z
    .string()
    .min(6, 'Verification code must be 6 digits')
    .max(6, 'Verification code must be 6 digits')
    .regex(/^\d{6}$/, 'Verification code must contain only numbers'),
});

export const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address').min(1, 'Email is required'),
});

export const resetPasswordSchema = z
  .object({
    code: z
      .string()
      .min(6, 'Verification code must be 6 digits')
      .max(6, 'Verification code must be 6 digits')
      .regex(/^\d{6}$/, 'Verification code must contain only numbers'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password must be less than 100 characters'),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const workspaceSchema = z.object({
  name: z
    .string()
    .min(3, 'Workspace name must be at least 3 characters')
    .max(50, 'Workspace name must be less than 50 characters'),
});

// Types
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type EmailVerificationFormData = z.infer<typeof emailVerificationSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type WorkspaceFormData = z.infer<typeof workspaceSchema>;
