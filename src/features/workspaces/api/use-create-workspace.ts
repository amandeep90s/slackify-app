import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutation as useConvexMutation } from 'convex/react';

import { api } from '../../../../convex/_generated/api';

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const createWorkspaceMutation = useConvexMutation(api.workspaces.create);

  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const result = await createWorkspaceMutation({ name });
      return result;
    },
    // All success handling should happen in the component where the workspace ID is needed
    meta: {
      // Expose queryClient to components if needed
      invalidateQueries: () =>
        queryClient.invalidateQueries({ queryKey: ['convexQuery', api.workspaces.get, {}] }),
    },
  });
};
