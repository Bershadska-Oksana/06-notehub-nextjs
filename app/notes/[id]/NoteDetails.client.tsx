'use client';

import React from 'react';
import css from './NoteDetails.module.css';
import type { Note } from '../../../types/note';
import TanStackProvider from '../../../components/TanStackProvider';

type Props = {
  note: Note;
};

export default function NoteDetailsClient({ note }: Props) {
  return (
    <TanStackProvider>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h1>{note.title}</h1>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p>{note.content}</p>
          <small>
            Created: {new Date(note.createdAt).toLocaleString()} <br />
            Updated: {new Date(note.updatedAt).toLocaleString()}
          </small>
        </div>
      </div>
    </TanStackProvider>
  );
}
