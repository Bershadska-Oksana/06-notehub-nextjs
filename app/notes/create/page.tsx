import React from 'react';
import NoteForm from '../../../components/NoteForm/NoteForm';
import Modal from '../../../components/Modal/Modal';

export default function CreateNotePage() {
  return (
    <Modal
      onClose={() => (window.location.href = '/notes')}
      title="Create Note"
    >
      <NoteForm />
    </Modal>
  );
}
