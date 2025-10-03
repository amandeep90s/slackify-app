import { z } from 'zod';

const envSchema = z.object({
  // Public environment variables
  NEXT_PUBLIC_CONVEX_URL: z.string().url('Invalid Convex URL'),

  // Server-side environment variables (add more as needed)
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Validate environment variables at build time
export const env = envSchema.parse({
  NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
  NODE_ENV: process.env.NODE_ENV,
});

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
