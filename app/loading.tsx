'use client';

import React from 'react';
import Loader from '../components/Loader/Loader';

export default function Loading() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f9fafb',
      }}
    >
      <Loader />
    </div>
  );
}
