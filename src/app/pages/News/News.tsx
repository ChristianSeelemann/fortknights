import React from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import ToTop from '../../components/Icons/ToTop';
import Navigation from '../../components/Navigation/Navigation';
import styles from './News.module.css';

interface NewsMotd {
  data: {
    motds: [
      {
        id: string;
        title: string;
        body: string;
        image: string;
      }
    ];
  };
}

interface NewsStw {
  data: {
    messages: [
      {
        title: string;
        body: string;
        image: string;
      }
    ];
  };
}

export default function News(): JSX.Element {
  const { data: battleRoyaleData } = useFetch<NewsMotd>(
    'https://fortnite-api.com/v2/news/br'
  );
  const battleRoyaleNews = battleRoyaleData?.data.motds;

  const { data: creativeData } = useFetch<NewsMotd>(
    'https://fortnite-api.com/v2/news/creative'
  );
  const creativeNews = creativeData?.data.motds;

  const { data: saveTheWorldData } = useFetch<NewsStw>(
    'https://fortnite-api.com/v2/news/stw'
  );
  const saveTheWorldNews = saveTheWorldData?.data.messages;

  return (
    <section className={styles.news}>
      <Header textThin="Fort" textBold="Knights" icon="fortnite" />
      <main>
        <h2>Battle Royale</h2>
        <section className={styles.news__itemGroup}>
          {battleRoyaleNews?.map((item) => (
            <Card
              key={item.id}
              title={item.body}
              image={item.image}
              date={item.title}
              gamemode="br"
            />
          ))}
          <h2 className={styles.news__h2}>Save the World</h2>
          {saveTheWorldNews?.map((item) => (
            <Card
              key={item.title}
              title={item.body}
              image={item.image}
              date={item.title}
              gamemode="stw"
            />
          ))}
          <h2 className={styles.news__h2}>Creative</h2>
          {creativeNews?.map((item) => (
            <Card
              key={item.id}
              title={item.body}
              image={item.image}
              date={item.title}
              gamemode="creative"
            />
          ))}
        </section>
        <div className={styles.news__toDo}>
          <ToTop color="var(--clr-white)" />
          <span>
            This is everything :)
            <br />
            Come back later for new great stuff!
          </span>
        </div>
      </main>
      <Navigation active="news" />
    </section>
  );
}
