import { dehydrate } from '@tanstack/react-query';
import { createQueryClient } from '../../../lib/queryClient';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = createQueryClient();


  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return <NoteDetails id={id} dehydratedState={dehydratedState} />;
}
}
