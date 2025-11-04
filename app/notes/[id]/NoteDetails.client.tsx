'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import styles from './NoteDetails.module.css';

export default function NoteDetailsClient({ id }: { id: string }) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note.</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className={styles.noteDetails}>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}
