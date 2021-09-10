import React from 'react';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import ToTop from '../../components/Icons/ToTop';
import Navigation from '../../components/Navigation/Navigation';
import Tag from '../../components/Tag/Tag';
import styles from './News.module.css';

interface NewsProps {
  test?: string;
}

export default function News({ test }: NewsProps): JSX.Element {
  return (
    <section className={styles.news}>
      <Header textThin="Fort" textBold="Knights" icon="notification" />
      <main>
        <section className={styles.news__tagGroup}>
          <Tag style="battleroyale" text="Battle Royale" />
          <Tag style="savetheworld" text="Save the World" />
          <Tag style="creative" text="Creative" />
        </section>
        <section className={styles.news__itemGroup}>
          <Card
            title="Headline"
            image="https://wallpaperaccess.com/full/3429710.jpg"
            date="27.08.21"
            gamemode="br"
            link="#"
          />
        </section>
        <div className={styles.news__toDo}>
          <ToTop color="var(--clr-white)" />
        </div>
      </main>
      <Navigation active="news" />
    </section>
  );
}
