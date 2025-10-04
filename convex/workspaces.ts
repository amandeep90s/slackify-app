import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

/**
 * Create a new workspace associated with the authenticated user.
 */
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('Unauthorized');
    }

    // TODO: Join Code method to add the user as a member of the workspace
    const joinCode = '123456';

    // Convex always returns the ID as a string
    const workspaceId = await ctx.db.insert('workspaces', {
      name,
      userId,
      joinCode,
    });

    return workspaceId;
  },
});

/**
 * Get all workspaces. In a real app, you'd likely want to paginate this.
 */
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('workspaces').collect();
  },
});

/**
 * Get a workspace by its ID, ensuring the authenticated user is authorized to access it.
 */
export const getById = query({
  args: { id: v.id('workspaces') },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('Unauthorized');
    }

    return await ctx.db.get(args.id);
  },
});
