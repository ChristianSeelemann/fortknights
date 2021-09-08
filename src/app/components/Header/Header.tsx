import React from 'react';
import { useHistory } from 'react-router';
import Close from '../Icons/Close';
import Notification from '../Icons/Notification';
import styles from './Header.module.css';

type HeaderProps = {
  textthin: string;
  textbold: string;
  icon: 'notification' | 'close' | JSX.Element;
  linkto?: string;
};

export default function Header({
  textthin,
  textbold,
  icon,
}: HeaderProps): JSX.Element {
  const history = useHistory();

  return (
    <header className={styles.header}>
      <h1 className={styles.headline}>
        <span className={styles.thin}>{textthin}</span>
        {textbold}
      </h1>
      <div className={styles.icon}>
        {icon === 'notification' && (
          <Notification
            color="var(--clr-white)"
            activecolor="var(--clr-primary)"
          />
        )}
        {icon === 'close' && (
          <Close color="var(--clr-white)" onClick={() => history.goBack()} />
        )}
        {icon !== 'close' && icon !== 'notification' && icon}
      </div>
    </header>
  );
}
