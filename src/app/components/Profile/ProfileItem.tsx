import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';
import Button from '../Button/Button';
import ProfilePicture from './ProfilePicture';

interface ProfileItemProps {
  username: string;
  games: string | number;
  wins: string | number;
  link: string;
  avatar: string;
}

export default function ProfileItem({
  username,
  games,
  wins,
  link,
  avatar,
}: ProfileItemProps): JSX.Element {
  return (
    <div className={styles.profileItem}>
      <Link to={link}>
        <ProfilePicture image={avatar} />
      </Link>
      <div className={styles.profileItem__notPicture}>
        <Link to={link}>
          <div className={styles.profileItem__info}>
            {username}
            <span>
              {games} Games | {wins} Wins
            </span>
          </div>
        </Link>
        <Button text="Unfollow" style="warning" />
      </div>
    </div>
  );
}
