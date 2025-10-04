import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

import { query } from './_generated/server';

/**
 * Query to get the current authenticated user's details.
 * Throws an error if the user is not authenticated.
 */
export const currentUserQuery = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) return null;

    // Fetch and return the user document from the database
    return await ctx.db.get(userId);
  },
});

/**
 * Query to get a user by their email address.
 * Returns null if no user is found with the given email.
 */
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query('users')
      .withIndex('email', (q) => q.eq('email', email))
      .unique();
  },
});
