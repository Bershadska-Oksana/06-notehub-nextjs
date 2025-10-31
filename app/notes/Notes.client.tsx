'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import TanStackProvider from '../../components/TanStackProvider/TanStackProvider';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Loader from '../../components/Loader/Loader';
import Link from 'next/link';

type Props = {
  dehydratedState?: unknown;
};

export default function NotesClient({ dehydratedState }: Props) {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const perPage = 12;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['notes', { page, perPage, search }],
    queryFn: () => fetchNotes({ page, perPage, search }),
    keepPreviousData: true,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Could not fetch the list of notes.</p>;

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <div style={{ padding: 20 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <SearchBox
            value={search}
            onChange={(v: string) => setSearch(v)}
            onSearch={() => refetch()}
          />
          <Link href="/notes/new">Create note</Link>
        </div>

        <NoteList notes={data?.notes ?? []} onDelete={() => refetch()} />
      </div>
    </TanStackProvider>
  );
}
