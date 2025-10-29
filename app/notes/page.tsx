// app/notes/page.tsx
import { dehydrate } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/queryClient';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = createQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, perPage: 12, search: '' }],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '' }),
  });

  const dehydratedState = dehydrate(queryClient);

  return <NotesClient dehydratedState={dehydratedState} />;
}
