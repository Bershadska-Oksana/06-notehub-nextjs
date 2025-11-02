'use client';
import React from 'react';
import type { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import css from './NoteList.module.css';
import Link from 'next/link';

export interface NoteListProps {
  notes: Note[];
  onDelete?: () => void;
}

const NoteList = ({ notes, onDelete }: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      if (onDelete) onDelete();
    },
  });

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this note?')) return;
    mutation.mutate(id);
  };

  if (!notes || notes.length === 0) return <p>No notes found.</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <div className={css.actions}>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => handleDelete(note.id)}
                aria-label="Delete note"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
