import { dehydrate } from '@tanstack/react-query';
import { createQueryClient } from '../../../lib/queryClient';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

type Props = { params: { id: string } };

export default async function NoteDetailsPage({ params }: Props) {
  const queryClient = createQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  const dehydratedState = dehydrate(queryClient);

  return <NoteDetailsClient id={params.id} dehydratedState={dehydratedState} />;
}
