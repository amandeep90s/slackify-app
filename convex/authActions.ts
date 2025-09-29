import { v } from 'convex/values';

import { api } from './_generated/api';
import { action } from './_generated/server';

export const checkUserExistsAction = action({
  args: { email: v.string() },
  handler: async (ctx, { email }): Promise<boolean> => {
    // Check if the user already exists using the custom query.
    const existingUser = await ctx.runQuery(api.users.getUserByEmail, { email });
    return existingUser !== null;
  },
});
