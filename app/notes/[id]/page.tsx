import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { fetchNoteById } from '../../../lib/api';
import Loader from '../../../components/Loader/Loader';
import NoteDetailsClient from './NoteDetails.client';

type NotePageProps = {
  params: { id: string };
};

export default async function NotePage({ params }: NotePageProps) {
  const { id } = params;
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
