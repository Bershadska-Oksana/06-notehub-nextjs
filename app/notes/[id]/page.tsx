import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Loader from '../../../components/Loader/Loader';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '../../../lib/api';

export default async function NotePage({ params }: any) {
  const resolved = await Promise.resolve(params);
  const { id } = resolved;

  const note = await fetchNoteById(id);

  if (!note) {
    notFound();
  }

  return (
    <Suspense fallback={<Loader />}>
      <NoteDetailsClient note={note} />
    </Suspense>
  );
}
