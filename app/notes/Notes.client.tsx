'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import Pagination from '../../components/Pagination/Pagination';
import { debounce } from 'lodash';

export default function NotesClient() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes({ query, page }),
    placeholderData: (prevData) => prevData,
  });

  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setQuery(value);
      setPage(1);
    }, 500),
    [],
  );

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <SearchBox onChange={handleSearchChange} />
        <button
          onClick={handleOpenModal}
          style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
          }}
        >
          Create Note
        </button>
      </div>

      <NoteList notes={data?.notes ?? []} />

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} onSuccess={handleCloseModal} />
        </Modal>
      )}

      {data?.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
