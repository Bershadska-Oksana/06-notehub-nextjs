'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { NewNote } from '../../types/note';
import css from './NoteForm.module.css';

export interface NoteFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters'),
  content: Yup.string().max(500, 'Content must be at most 500 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

export default function NoteForm({ onClose, onSuccess }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (note: NewNote) => createNote(note),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' } as NewNote}
      validationSchema={validationSchema}
      onSubmit={(values: NewNote, { resetForm }) => {
        mutation.mutate(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} type="text" />
            <ErrorMessage name="title" component="p" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              className={css.textarea}
              rows={6}
            />
            <ErrorMessage name="content" component="p" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="p" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              className={css.submitButton}
              type="submit"
              disabled={mutation.isLoading || isSubmitting}
            >
              {mutation.isLoading || isSubmitting ? 'Saving...' : 'Save'}
            </button>

            <button
              className={css.cancelButton}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
