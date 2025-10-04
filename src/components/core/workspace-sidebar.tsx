import { AlertTriangle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { LoadingSpinner } from '@/components/core/loading-spinner';
import { WorkspaceHeader } from '@/components/core/workspace-header';
import { useCurrentMember } from '@/features/members/api/use-current-memeber';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ workspaceId });

  if (workspaceLoading || memberLoading) {
    return (
      <div className={cn('flex h-full flex-col items-center justify-center')}>
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className={cn('flex h-full flex-col items-center justify-center')}>
        <AlertTriangle className={cn('size-5 text-white')} />
        <p className={cn('text-sm text-white')}>Workspace not found</p>
      </div>
    );
  }

  return (
    <div className={cn('flex h-full flex-col')}>
      <WorkspaceHeader workspace={workspace} isAdmin={member.role === 'admin'} />
    </div>
  );
};
