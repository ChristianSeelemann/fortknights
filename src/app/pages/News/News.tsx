import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import ToTop from '../../components/Icons/ToTop';
import Navigation from '../../components/Navigation/Navigation';
import styles from './News.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

interface newsFromAPI {
  adspace: string;
  body: string;
  date: string;
  id: string;
  image: string;
  live: boolean;
  tabTitle: string;
  title: string;
  video: string | null;
}

export default function News(): JSX.Element {
  const [showToTop, setShowToTop] = useState(false);

  const { data: battleRoyaleNews, isLoading: battleRoyaleLoading } =
    useFetch<newsFromAPI[]>('/api/news/?mode=br');

  const { data: creativeNews, isLoading: creativeLoading } = useFetch<
    newsFromAPI[]
  >('/api/news/?mode=creative');

  const { data: saveTheWorldNews, isLoading: saveTheWorldLoading } = useFetch<
    newsFromAPI[]
  >('/api/news/?mode=stw');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 10) {
        setShowToTop(true);
      } else {
        setShowToTop(false);
      }
    });
  }, []);

  return (
    <>
      <section className={styles.news}>
        <Header textThin="Fort" textBold="Knights" icon="fortnite" />
        <main>
          <section className={styles.news__itemGroup}>
            <h2 className={styles.news__h2_first}>Battle Royale</h2>
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
            {saveTheWorldNews &&
              saveTheWorldNews.map((item) => (
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
          {showToTop === true && (
            <div className={styles.news__toDo}>
              <ToTop color="var(--clr-white)" />
              <span>
                This is everything :)
                <br />
                Come back later for new great stuff!
              </span>
            </div>
          )}
        </main>
        <Navigation active="news" />
      </section>
      {(battleRoyaleLoading || saveTheWorldLoading || creativeLoading) && (
        <LoadingSpinner />
      )}
    </>
  );
}
