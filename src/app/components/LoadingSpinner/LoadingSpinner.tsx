import React, { ReactElement } from 'react';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner(): ReactElement {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner__ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
