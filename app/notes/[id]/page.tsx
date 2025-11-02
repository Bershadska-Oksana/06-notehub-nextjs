import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';
import Loader from '../../../components/Loader/Loader';

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = params;

  const note = await fetchNoteById(id).catch(() => null);
  if (!note) return notFound();

  return (
    <Suspense fallback={<Loader />}>
      <NoteDetailsClient note={note} />
    </Suspense>
  );
}
