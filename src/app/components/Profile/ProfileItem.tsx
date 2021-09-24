import React from 'react';
import styles from './Profile.module.css';
import Button from '../Button/Button';
import ProfilePicture from './ProfilePicture';
import Compare from '../Icons/Compare';
import Stats from '../Icons/Stats';

interface ProfileItemProps {
  username: string;
  games: string | number;
  avatar: string;
  buttonStyle: string;
  buttonText: string | JSX.Element;
  compare?: boolean;
  stats?: boolean;
  onClick?: () => void;
  onClickCompare?: () => void;
  onClickStats?: () => void;
}

export default function ProfileItem({
  username,
  games,
  avatar,
  buttonStyle,
  buttonText,
  compare,
  stats,
  onClick,
  onClickCompare,
  onClickStats,
}: ProfileItemProps): JSX.Element {
  return (
    <div className={styles.profileItem}>
      <ProfilePicture image={avatar} />
      <div className={styles.profileItem__notPicture}>
        <div className={styles.profileItem__info}>
          {username}
          <span>{games} Games</span>
        </div>
        <div className={styles.profileItem__buttonGroup}>
          {stats && games !== '0' && (
            <Button
              text={
                <Stats
                  color="var(--clr-white)"
                  height="0.75rem"
                  width="0.75rem"
                />
              }
              style="primary"
              onClick={onClickStats}
            />
          )}
          {compare && games !== '0' && (
            <Button
              text={
                <Compare
                  color="var(--clr-white)"
                  height="0.75rem"
                  width="0.75rem"
                />
              }
              style="secondary"
              onClick={onClickCompare}
            />
          )}
          <Button text={buttonText} style={buttonStyle} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
