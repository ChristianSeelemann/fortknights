import React from 'react';
import styles from './Tag.module.css';

interface TagProps {
  style: 'battleroyale' | 'savetheworld' | 'creative' | 'date' | string;
  text: string;
  onClick?: () => void;
}

export default function Tag({ style, text, onClick }: TagProps): JSX.Element {
  return (
    <button onClick={onClick} className={`${styles.tag} ${styles[style]}`}>
      {text}
    </button>
  );
}
