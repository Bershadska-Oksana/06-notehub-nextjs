'use client';

import React from 'react';
import { useQuery, DehydratedState } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '../../lib/api';
import TanStackProvider from '../../components/TanStackProvider/TanStackProvider';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Loader from '../../components/Loader/Loader';
import Link from 'next/link';

type Props = {
  dehydratedState?: DehydratedState | null;
};

export default function NotesClient({ dehydratedState }: Props) {
  const [search, setSearch] = React.useState('');
  const [page] = React.useState(1);
  const perPage = 12;

  const { data, isLoading, isError, refetch } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', { page, perPage, search }],
    queryFn: () => fetchNotes({ page, perPage, search }),
    staleTime: 1000 * 60 * 2,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Could not fetch the list of notes.</p>;

  return (
    <TanStackProvider dehydratedState={dehydratedState ?? undefined}>
      <div style={{ padding: 20 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <SearchBox value={search} onChange={(v: string) => setSearch(v)} />
          <Link href="/notes/create">Create note</Link>
        </div>

        <NoteList notes={data?.notes ?? []} onDelete={() => refetch()} />
      </div>
    </TanStackProvider>
  );
}
