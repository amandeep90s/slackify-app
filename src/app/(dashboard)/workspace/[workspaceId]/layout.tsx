'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Toolbar } from '@/components/core/toolbar';

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  return (
    <div className={cn('min-h-screen')}>
      <Toolbar />
      {children}
    </div>
  );
};

export default WorkspaceIdLayout;
