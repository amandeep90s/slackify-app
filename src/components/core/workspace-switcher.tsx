import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';

import { Button } from '../ui/button';
import { LoadingSpinner } from './loading-spinner';

export const WorkspaceSwitcher = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const [, setOpen] = useCreateWorkspaceModal();

  const { data: workspaces } = useGetWorkspaces();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ workspaceId });

  const filteredWorkspaces = workspaces?.filter((ws) => ws._id !== workspaceId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            'relative overflow-hidden bg-gray-400 text-xl font-semibold text-slate-800 hover:bg-gray-400/80'
          )}
          size={'icon'}
        >
          {workspaceLoading ? (
            <LoadingSpinner size="sm" variant="primary" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="start" className={cn('w-64 space-y-1')}>
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${workspaceId}`)}
          className={cn('cursor-pointer flex-col items-start justify-start gap-y-1 capitalize')}
        >
          {workspace?.name}
          <span className={cn('text-muted-foreground text-xs')}>Active workspace</span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            onClick={() => router.push(`/workspace/${workspace._id}`)}
            className={cn('cursor-pointer overflow-hidden capitalize')}
          >
            <div
              className={cn(
                'relative flex size-9 overflow-hidden rounded-md bg-gray-800 text-lg',
                'mr-2 shrink-0 items-center justify-center font-semibold text-white'
              )}
            >
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <p className={cn('truncate')}>{workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={() => setOpen(true)} className={cn('cursor-pointer')}>
          <div
            className={cn(
              'relative flex size-9 overflow-hidden rounded-md bg-gray-300 text-lg',
              'mr-2 items-center justify-center font-semibold text-slate-800'
            )}
          >
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
