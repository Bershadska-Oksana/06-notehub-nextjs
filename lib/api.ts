import axios from 'axios';
import type { Note, NewNote } from '../types/note';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages?: number;
}

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error('❌ NEXT_PUBLIC_API_BASE_URL is not defined');
}
if (!process.env.NEXT_PUBLIC_NOTEHUB_TOKEN) {
  throw new Error('❌ NEXT_PUBLIC_NOTEHUB_TOKEN is not defined');
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error(
      '❌ API ERROR:',
      error.response?.status,
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  const trimmed = search?.toString().trim() ?? '';
  if (trimmed !== '') {
    params.search = trimmed;
  }

  const response = await api.get<FetchNotesResponse>('/notes', { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const response = await api.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};
