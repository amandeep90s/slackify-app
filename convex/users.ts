import { getAuthUserId } from '@convex-dev/auth/server';

import { query } from './_generated/server';

/**
 * Query to get the current authenticated user's details.
 * Throws an error if the user is not authenticated.
 */
export const currentUserQuery = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    // Fetch and return the user document from the database
    return await ctx.db.get(userId);
  },
});
