import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  style: 'warning' | 'success' | 'primary' | 'secondary' | 'accent';
  text: string;
  icon?: JSX.Element;
  onClick?: () => void;
}

export default function Button({
  style,
  text,
  icon,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button onClick={onClick} className={`${styles.button} ${styles[style]}`}>
      <span className={styles.icon}>{icon}</span>
      {text}
    </button>
  );
}
