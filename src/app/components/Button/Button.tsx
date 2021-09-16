import React from 'react';
import Close from '../Icons/Close';
import Fortnite from '../Icons/Fortnite';
import Friends from '../Icons/Friends';
import Items from '../Icons/Items';
import Map from '../Icons/Map';
import News from '../Icons/News';
import Notification from '../Icons/Notification';
import Stats from '../Icons/Stats';
import styles from './Button.module.css';

interface ButtonProps {
  style: 'warning' | 'success' | 'primary' | 'secondary' | 'accent' | string;
  text: string;
  icon?:
    | 'Close'
    | 'Fortnite'
    | 'Friends'
    | 'Items'
    | 'Map'
    | 'News'
    | 'Notification'
    | 'Stats';
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
      <span className={styles.icon}>
        {icon === 'Close' && <Close color="var(--clr-white)" />}
        {icon === 'Fortnite' && <Fortnite color="var(--clr-white)" />}
        {icon === 'Friends' && <Friends color="var(--clr-white)" />}
        {icon === 'Items' && <Items color="var(--clr-white)" />}
        {icon === 'Map' && <Map color="var(--clr-white)" />}
        {icon === 'News' && <News color="var(--clr-white)" />}
        {icon === 'Notification' && (
          <Notification
            activeColor="var(--clr-primary)"
            color="var(--clr-white)"
          />
        )}
        {icon === 'Stats' && <Stats color="var(--clr-white)" />}
      </span>
      {text}
    </button>
  );
}
