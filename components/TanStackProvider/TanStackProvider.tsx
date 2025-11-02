'use client';

import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from '@tanstack/react-query';

interface TanStackProviderProps {
  children: React.ReactNode;
  dehydratedState?: DehydratedState | null;
}

export default function TanStackProvider({
  children,
  dehydratedState,
}: TanStackProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState ?? undefined}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
