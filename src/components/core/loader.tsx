import { cn } from '@/lib/utils';

import { LoadingSpinner } from './loading-spinner';

export const Loader = () => {
  return (
    <div className={cn('bg-auth-background flex min-h-screen items-center justify-center')}>
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner />
        <p className="text-sm text-white">Loading workspace details...</p>
      </div>
    </div>
  );
};
