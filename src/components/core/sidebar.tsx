import { usePathname } from 'next/navigation';
import { Bell, Home, MessagesSquare, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SidebarButton } from '@/components/core/sidebar-button';
import { WorkspaceSwitcher } from '@/components/core/workspace-switcher';
import { UserButton } from '@/features/auth/components/user-button';

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'bg-primary-background flex h-full w-16 flex-col items-center gap-y-4 pt-2.5 pb-4'
      )}
    >
      <WorkspaceSwitcher />
      <SidebarButton label="Home" icon={Home} isActive={pathname.startsWith('/workspace')} />
      <SidebarButton label="DMs" icon={MessagesSquare} />
      <SidebarButton label="Activity" icon={Bell} />
      <SidebarButton label="More" icon={MoreHorizontal} />
      <div className={cn('mt-auto flex flex-col items-center justify-center gap-y-1')}>
        <UserButton />
      </div>
    </aside>
  );
};
