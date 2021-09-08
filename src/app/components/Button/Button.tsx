import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  color?: string;
}

export default function Button({ color }: ButtonProps): JSX.Element {
  return <button className={styles.button}>Button</button>;
}
