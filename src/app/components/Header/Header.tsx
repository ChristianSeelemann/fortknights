import React from 'react';
import { useHistory } from 'react-router';
import Close from '../Icons/Close';
import Notification from '../Icons/Notification';
import styles from './Header.module.css';

type HeaderProps = {
  textThin: string;
  textBold: string;
  icon: 'notification' | 'close' | JSX.Element;
};

export default function Header({
  textThin,
  textBold,
  icon,
}: HeaderProps): JSX.Element {
  const history = useHistory();

  return (
    <header className={styles.header}>
      <h1 className={styles.headline}>
        <span className={styles.thin}>{textThin}</span>
        {textBold}
      </h1>
      <div className={styles.icon}>
        {icon === 'notification' && (
          <Notification
            color="var(--clr-white)"
            activeColor="var(--clr-primary)"
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
