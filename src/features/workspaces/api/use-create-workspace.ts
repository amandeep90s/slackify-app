import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutation as useConvexMutation } from 'convex/react';
import { toast } from 'sonner';

import { api } from '../../../../convex/_generated/api';

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const createWorkspaceMutation = useConvexMutation(api.workspaces.create);

  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const result = await createWorkspaceMutation({ name });
      return result;
    },
    onSuccess: () => {
      toast.success('Workspace created successfully!');
      // Invalidate and refetch workspaces
      queryClient.invalidateQueries({ queryKey: ['convexQuery', api.workspaces.get, {}] });
    },
    onError: (error) => {
      toast.error('Failed to create workspace');
      console.error('Create workspace error:', error);
    },
  });
};
