import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { ChevronDown, ListFilter, SquarePen } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Doc } from '../../../convex/_generated/dataModel';
import { Hint } from './hint';

interface WorkspaceHeaderProps {
  workspace: Doc<'workspaces'>;
  isAdmin: boolean;
}

export const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
  return (
    <div className={cn('flex h-12 items-center justify-between gap-0.5 px-4')}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'transparent'}
            className={cn(
              'flex max-w-full min-w-0 flex-1 overflow-hidden p-1.5 text-lg font-semibold'
            )}
            size={'sm'}
          >
            <span className={cn('truncate')}>{workspace.name}</span>
            <ChevronDown className={cn('ml-1 size-4 shrink-0')} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className={cn('w-64')}>
          <DropdownMenuItem
            key={workspace._id}
            className={cn('flex cursor-pointer items-center p-1 capitalize')}
          >
            <div
              className={cn(
                'relative size-9 overflow-hidden bg-gray-500 text-xl font-semibold text-white',
                'mr-2 flex shrink-0 items-center justify-center rounded-md'
              )}
            >
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <div className={cn('flex flex-col items-start')}>
              <p className={cn('font-bold')}>{workspace.name}</p>
              <p className={cn('text-muted-foreground text-xs')}>Active workspace</p>
            </div>
          </DropdownMenuItem>
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className={cn('cursor-pointer px-1 py-2 text-xs')}>
                Invite people to {workspace.name}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className={cn('cursor-pointer px-1 py-2 text-xs')}>
                Preferences
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className={cn('flex items-center gap-0.5')}>
        <Hint label="Filter conversations" side="bottom">
          <Button size={'icon'} variant={'transparent'}>
            <ListFilter className={cn('size-4')} />
          </Button>
        </Hint>

        <Hint label="New message" side="bottom">
          <Button size={'icon'} variant={'transparent'}>
            <SquarePen className={cn('size-4')} />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
