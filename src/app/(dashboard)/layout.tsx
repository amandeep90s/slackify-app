'use client';

import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/core/sidebar';
import { Toolbar } from '@/components/core/toolbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={cn('min-h-screen')}>
      <Toolbar />
      <div className={cn('flex h-[calc(100vh-40px)]')}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
