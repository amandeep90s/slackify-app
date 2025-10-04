import { Info, Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { Button } from '@/components/ui/button';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';

export const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });

  return (
    <nav className={cn('bg-auth-background flex h-10 items-center justify-between p-1.5')}>
      <div className={cn('flex-1')}></div>

      <div className={cn('max-w-2xl min-w-3xs shrink grow-[2]')}>
        <Button
          size="sm"
          className={cn('bg-accent/25 hover:bg-accent/25 h-7 w-full justify-start px-2')}
        >
          <Search className={cn('mr-2 size-4 text-white')} />
          <span className={cn('text-xs text-white')}>Search {data?.name}</span>
        </Button>
      </div>

      <div className={cn('ml-auto flex flex-1 items-center justify-end')}>
        <Button variant={'transparent'} size="icon">
          <Info className={cn('size-5 text-white')} />
        </Button>
      </div>
    </nav>
  );
};
