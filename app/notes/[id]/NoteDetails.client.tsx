'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

interface NoteDetailsProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsProps) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError) return <p>Error loading note</p>;
  if (!data) return <p>Note not found</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>
        <strong>Tag:</strong> {data.tag}
      </p>
    </div>
  );
}
