import React from 'react';
import { Link } from 'react-router-dom';
import Friends from '../Icons/Friends';
import Items from '../Icons/Items';
import Map from '../Icons/Map';
import News from '../Icons/News';
import Stats from '../Icons/Stats';
import styles from './Navigation.module.css';

type NavigationProps = {
  active: 'news' | 'items' | 'stats' | 'friends' | 'map';
};

export default function Navigation({ active }: NavigationProps): JSX.Element {
  return (
    <nav className={styles.navigation}>
      <Link to="/">
        <div className={styles.item}>
          <News color="var(--clr-white)" />
          <span>
            {active === 'news' ? (
              <div className={styles.dot}></div>
            ) : (
              <div className={styles.name}>NEWS</div>
            )}
          </span>
        </div>
      </Link>
      <Link to="/items">
        <div className={styles.item}>
          <Items color="var(--clr-white)" />
          <span>
            {active === 'items' ? (
              <div className={styles.dot}></div>
            ) : (
              <div className={styles.name}>ITEMS</div>
            )}
          </span>
        </div>
      </Link>
      <Link to="/stats">
        <div className={styles.item}>
          <Stats color="var(--clr-white)" />
          <span>
            {active === 'stats' ? (
              <div className={styles.dot}></div>
            ) : (
              <div className={styles.name}>STATS</div>
            )}
          </span>
        </div>
      </Link>
      <Link to="/friends">
        <div className={styles.item}>
          <Friends color="var(--clr-white)" />
          <span>
            {active === 'friends' ? (
              <div className={styles.dot}></div>
            ) : (
              <div className={styles.name}>FRIENDS</div>
            )}
          </span>
        </div>
      </Link>
      <Link to="/map">
        <div className={styles.item}>
          <Map color="var(--clr-white)" />
          <span>
            {active === 'map' ? (
              <div className={styles.dot}></div>
            ) : (
              <div className={styles.name}>MAP</div>
            )}
          </span>
        </div>
      </Link>
    </nav>
  );
}
