import { Suspense } from 'react';
import { dehydrate } from '@tanstack/react-query';
import { createQueryClient } from '../../../lib/queryClient';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';
import Loader from '../../../components/Loader/Loader';
import { notFound } from 'next/navigation';

type NotePageProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;

  const note = await fetchNoteById(id);
  if (!note) return notFound();

  return (
    <Suspense fallback={<Loader />}>
      <NoteDetailsClient note={note} />
    </Suspense>
  );
}
