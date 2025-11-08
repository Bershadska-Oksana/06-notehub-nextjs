'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ onClose, children, title }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    const root = document.getElementById('modal-root');
    if (root) setModalRoot(root);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      onClose();
    }
  };

  if (!modalRoot) return null;

  return createPortal(
    <div className={css.backdrop} onMouseDown={handleBackdrop}>
      <div className={css.modal} onMouseDown={(e) => e.stopPropagation()}>
        {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
