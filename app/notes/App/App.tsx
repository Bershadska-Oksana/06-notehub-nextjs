import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes, FetchNotesResponse } from '../../../lib/api';
import NoteList from '../../../components/NoteList/NoteList';
import Pagination from '../../../components/Pagination/Pagination';
import SearchBox from '../../../components/SearchBox/SearchBox';
import Modal from '../../../components/Modal/Modal';
import NoteForm from '../../../components/NoteForm/NoteForm';
import css from './App.module.css';

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearchState] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    keepPreviousData: true,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const setSearch = useCallback((value: string) => {
    setPage(1);
    setSearchState(value);
  }, []);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong. Please try again.</p>}

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        !isLoading && <p>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title="Create note">
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default App;
