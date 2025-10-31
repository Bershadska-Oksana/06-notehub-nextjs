'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import TanStackProvider from '../../../components/TanStackProvider/TanStackProvider';
import Loader from '../../../components/Loader/Loader';
import css from '../../../components/Modal/Modal.module.css';

type Props = {
  id?: string;
  dehydratedState?: unknown;
};

export default function NoteDetailsClient({ id, dehydratedState }: Props) {
  const params = useParams();
  const noteId = id ?? params?.id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId as string),
    enabled: !!noteId,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Something went wrong.</p>;
  if (!note) return <p>Something went wrong.</p>;

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </TanStackProvider>
  );
}
