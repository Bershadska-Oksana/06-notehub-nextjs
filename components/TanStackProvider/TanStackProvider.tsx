'use client';

import { ReactNode, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { useServerInsertedHTML } from 'next/navigation';

type Props = {
  children: ReactNode;
};

export default function TanStackProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  const dehydratedState = dehydrate(queryClient);

  // Next.js 16 має новий підхід до SSR — це забезпечує коректну гідратацію
  useServerInsertedHTML(() => {
    return null;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
