import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

interface UseGetWorkspaceProps {
  id: Id<'workspaces'>;
}

export const useGetWorkspace = ({ id }: UseGetWorkspaceProps) => {
  return useQuery({
    ...convexQuery(api.workspaces.getById, { id }),
    // You can add additional React Query options here if needed
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
