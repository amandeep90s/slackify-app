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
  code: z.string().min(1, 'Verification code is required'),
});

// Types
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type EmailVerificationFormData = z.infer<typeof emailVerificationSchema>;
