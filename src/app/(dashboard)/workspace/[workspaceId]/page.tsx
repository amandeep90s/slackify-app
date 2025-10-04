'use client';

import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { LoadingSpinner } from '@/components/core/loading-spinner';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';

export default function WorkspaceIdPage() {
  const workspaceId = useWorkspaceId();
  const { data: workspace, isLoading } = useGetWorkspace({ workspaceId });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Welcome to Workspace</h1>
      <p className="text-gray-600">Workspace ID: {workspaceId}</p>
    </div>
  );
}
