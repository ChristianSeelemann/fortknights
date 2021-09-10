import React from 'react';
import { Link } from 'react-router-dom';
import Tag from '../Tag/Tag';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  image: string;
  link: string;
  date: string;
  gamemode: 'br' | 'stw' | 'creative';
}

export default function Card({
  title,
  image,
  link,
  date,
  gamemode,
}: CardProps): JSX.Element {
  let modeName;
  if (gamemode === 'br') {
    modeName = 'Battle Royale';
  } else if (gamemode === 'stw') {
    modeName = 'Save the World';
  } else {
    modeName = 'Creative';
  }

  let modeStyle;
  if (gamemode === 'br') {
    modeStyle = 'battleroyale';
  } else if (gamemode === 'stw') {
    modeStyle = 'savetheworld';
  } else {
    modeStyle = 'creative';
  }

  return (
    <Link to={link}>
      <article className={styles.card}>
        <img className={styles.card__img} src={image} alt="News Image" />
        <div className={styles.card__overlay}>
          <div className={styles.card__tags}>
            <Tag text={modeName} style={modeStyle} />
            <Tag text={date} style="date"></Tag>
          </div>
          <div className={styles.card__title}>{title}</div>
        </div>
      </article>
    </Link>
  );
}
