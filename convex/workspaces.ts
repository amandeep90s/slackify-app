import { getAuthUserId } from '@convex-dev/auth/server';
import { generateRandomString, type RandomReader } from '@oslojs/crypto/random';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

const random: RandomReader = {
  read(bytes) {
    crypto.getRandomValues(bytes);
  },
};

const generateCode = () => {
  const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';

  return generateRandomString(random, alphabet, 6);
};

/**
 * Create a new workspace associated with the authenticated user.
 */
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) throw new Error('Unauthorized');

    const joinCode = generateCode();

    // Convex always returns the ID as a string
    const workspaceId = await ctx.db.insert('workspaces', {
      name,
      userId,
      joinCode,
    });

    // Assign the user as an admin of the workspace
    await ctx.db.insert('members', {
      userId,
      workspaceId,
      role: 'admin',
    });

    return workspaceId;
  },
});

/**
 * Get all workspaces the authenticated user is a member of.
 */
export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) return [];

    const members = await ctx.db
      .query('members')
      .withIndex('by_user_id', (q) => q.eq('userId', userId))
      .collect();

    if (members.length === 0) {
      return [];
    }

    const workspaceIds = members.map((member) => member.workspaceId);

    const workspaces = [];

    for (const workspaceId of workspaceIds) {
      const details = await ctx.db.get(workspaceId);
      if (details) {
        workspaces.push(details);
      }
    }

    return workspaces;
  },
});

/**
 * Get a workspace by its ID, ensuring the authenticated user is authorized to access it.
 */
export const getById = query({
  args: { workspaceId: v.id('workspaces') },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) throw new Error('Unauthorized');

    const member = await ctx.db
      .query('members')
      .withIndex('by_workspace_id_user_id', (q) =>
        q.eq('workspaceId', args.workspaceId).eq('userId', userId)
      )
      .unique();

    if (!member) return null;

    return await ctx.db.get(args.workspaceId);
  },
});
