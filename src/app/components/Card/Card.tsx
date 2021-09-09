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
      <div className={styles.Card}>
        <img className={styles.CardImg} src={image} alt="News Image" />
        <div className={styles.CardOverlay}>
          <div className={styles.CardTags}>
            <Tag text={modeName} style={modeStyle} />
            <Tag text={date} style="date"></Tag>
          </div>
          <div className={styles.CardTitle}>{title}</div>
        </div>
      </div>
    </Link>
  );
}
