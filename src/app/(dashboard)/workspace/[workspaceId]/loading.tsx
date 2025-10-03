import { LoadingSpinner } from '@/components/core/loading-spinner';

export default function WorkspaceIdLoading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner />
        <p className="text-muted-foreground text-sm">Loading workspace details...</p>
      </div>
    </div>
  );
}
