import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';

import { api } from '../../../../convex/_generated/api';

export const useGetWorkspaces = () => {
  return useQuery({
    ...convexQuery(api.workspaces.get, {}),
    // You can add additional React Query options here if needed
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
