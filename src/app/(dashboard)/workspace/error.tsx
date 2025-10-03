'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

interface WorkspaceErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function WorkspaceError({ error, reset }: WorkspaceErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Workspace error:', error);
  }, [error]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex max-w-md flex-col items-center space-y-4 text-center">
        <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
          <svg
            className="h-6 w-6 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Something went wrong!</h2>
        <p className="text-muted-foreground text-sm">
          There was an error loading the workspace. Please try again.
        </p>
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
      </div>
    </div>
  );
}
