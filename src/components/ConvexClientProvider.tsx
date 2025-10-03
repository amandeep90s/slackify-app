'use client';

import { ReactNode } from 'react';
import { ConvexAuthNextjsProvider } from '@convex-dev/auth/nextjs';
import { ConvexQueryClient } from '@convex-dev/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Disable retries for Convex queries since they handle their own error states
      retry: false,
      // Use stale time to avoid unnecessary refetches
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Set the default queryFn to handle Convex queries
      queryFn: convexQueryClient.queryFn(),
      // Set the default query key hash function for Convex queries
      queryKeyHashFn: convexQueryClient.hashFn(),
    },
  },
});

convexQueryClient.connect(queryClient);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthNextjsProvider client={convex}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConvexAuthNextjsProvider>
  );
}
