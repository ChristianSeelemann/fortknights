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
}

export default function ProfileItem({
  username,
  games,
  wins,
  link,
}: ProfileItemProps): JSX.Element {
  return (
    <div className={styles.profileItem}>
      <Link to={link}>
        <ProfilePicture image="https://image.api.playstation.com/cdn/EP1464/CUSA07669_00/arN9Uez8UTKixtUdBHibVbzUOinKBMAB.png?w=960&h=960" />
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
