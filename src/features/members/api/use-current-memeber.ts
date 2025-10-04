import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

interface UseCurrentMemberProps {
  workspaceId: Id<'workspaces'>;
}

export const useCurrentMember = ({ workspaceId }: UseCurrentMemberProps) => {
  return useQuery({
    ...convexQuery(api.members.currentMember, { workspaceId }),
    // You can add additional React Query options here if needed
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
