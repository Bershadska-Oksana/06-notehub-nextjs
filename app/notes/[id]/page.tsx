import { dehydrate } from '@tanstack/react-query';
import { createQueryClient } from '../../../lib/queryClient';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Note {id}</h1>
    </div>
  );
}
