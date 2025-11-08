'use client';

import React from 'react';
import css from './SearchBox.module.css';

export interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
}

const SearchBox = ({ value, onChange, onSearch }: SearchBoxProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={css.wrapper}>
      <input
        type="text"
        className={css.input}
        placeholder="Search notes"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Search notes"
      />
      {onSearch && (
        <button className={css.button} onClick={onSearch} type="button">
          Search
        </button>
      )}
    </div>
  );
};

export default SearchBox;
