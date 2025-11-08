'use client';

import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import { debounce } from 'lodash';

export default function NotesClient() {
  const [input, setInput] = useState(''); // локальний інпут для миттєвого вводу
  const [query, setQuery] = useState(''); // дебаунсний запит для API
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // debounced setter для query (500ms)
  const debouncedSetQuery = useMemo(
    () =>
      debounce((v: string) => {
        setQuery(v);
        setPage(1);
      }, 500),
    [],
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value); // миттєво оновлюємо поле вводу
      debouncedSetQuery(value); // і дебаунсимо запит
    },
    [debouncedSetQuery],
  );

  const { data, isLoading, isError, refetch } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes({ query, page }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <SearchBox
            value={input}
            onChange={handleInputChange}
            onSearch={() => refetch()}
          />
        </div>

        <div style={{ marginLeft: 12 }}>
          <button
            onClick={openModal}
            style={{
              padding: '8px 14px',
              backgroundColor: '#0d6efd',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
            }}
          >
            Create Note
          </button>
        </div>
      </div>

      <NoteList notes={data?.notes ?? []} />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          {/* передаємо onClose до форми, щоб Cancel працював */}
          <NoteForm
            onClose={closeModal}
            onSuccess={() => {
              closeModal();
              refetch();
            }}
          />
        </Modal>
      )}

      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
