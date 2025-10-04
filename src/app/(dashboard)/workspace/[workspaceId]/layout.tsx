'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/core/sidebar';
import { Toolbar } from '@/components/core/toolbar';

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  return (
    <div className={cn('min-h-screen')}>
      <Toolbar />
      <div className={cn('flex h-[calc(100vh-40px)]')}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
