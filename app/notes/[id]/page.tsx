import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { fetchNoteById } from '../../../lib/api';
import Loader from '../../../components/Loader/Loader';
import NoteDetailsClient from './NoteDetails.client';

// Next.js 15.5 очікує саме таку сигнатуру — без типу Promise у params
export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  // Безпечне отримання id навіть якщо Next передає Promise
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;

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
