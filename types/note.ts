export interface Note {
  id: string;
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  createdAt: string;
  updatedAt: string;
}

export type NewNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
