'use client';

import { TAILWIND_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Sidebar } from '@/components/core/sidebar';
import { Toolbar } from '@/components/core/toolbar';
import { WorkspaceSidebar } from '@/components/core/workspace-sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={cn('min-h-screen')}>
      <Toolbar />
      <div className={cn('flex h-[calc(100vh-40px)]')}>
        <Sidebar />

        <ResizablePanelGroup autoSaveId={'dashboard-layout'} direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={11} className={TAILWIND_COLORS.BG.SIDEBAR}>
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
