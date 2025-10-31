import axios from 'axios';
import type { Note, NewNote } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const response = await instance.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await instance.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await instance.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await instance.delete(`/notes/${id}`);
};
