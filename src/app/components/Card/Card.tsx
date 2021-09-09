import React from 'react';
import { Link } from 'react-router-dom';
import Tag from '../Tag/Tag';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  image: string;
  link: string;
}

export default function Card({ title, image, link }: CardProps): JSX.Element {
  return (
    <Link to={link}>
      <div className={styles.Card}>
        <img className={styles.CardImg} src={image} alt="News Image" />
        <div className={styles.CardOverlay}>
          <div className={styles.CardTags}>
            <Tag text="Battle Royale" style="battleroyale" />
            <Tag text="24.08.21" style="date"></Tag>
          </div>
          <div className={styles.CardTitle}>{title}</div>
        </div>
      </div>
    </Link>
  );
}
