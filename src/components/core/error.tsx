import { TriangleAlert } from 'lucide-react';

import { cn } from '@/lib/utils';

export const Error = ({ error }: { error: string }) => {
  return (
    <div
      className={cn(
        'bg-destructive/15 text-destructive mb-6 flex items-center gap-x-2 rounded-sm p-3 text-sm'
      )}
    >
      <TriangleAlert className={cn('size-4')} />
      {error}
    </div>
  );
};
