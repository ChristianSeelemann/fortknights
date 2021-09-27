import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import ToTop from '../../components/Icons/ToTop';
import Navigation from '../../components/Navigation/Navigation';
import styles from './News.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Tag from '../../components/Tag/Tag';

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
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredMode, setFilteredMode] = useState('');

  const { data: battleRoyaleNews, isLoading: battleRoyaleLoading } =
    useFetch<newsFromAPI[]>('/api/news/?mode=br');

  const { data: creativeNews, isLoading: creativeLoading } = useFetch<
    newsFromAPI[]
  >('/api/news/?mode=creative');

  const { data: saveTheWorldNews, isLoading: saveTheWorldLoading } = useFetch<
    newsFromAPI[]
  >('/api/news/?mode=stw');

  function handleFilterClick(mode: string) {
    setIsFiltered(true);
    setFilteredMode(mode);
  }

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
          <section className={styles.news__tags}>
            <Tag
              style="battleroyale"
              text="Battle Royale"
              onClick={() => handleFilterClick('battleroyale')}
            />
            <Tag
              style="savetheworld"
              text="Save the World"
              onClick={() => handleFilterClick('savetheworld')}
            />
            <Tag
              style="creative"
              text="Creative"
              onClick={() => handleFilterClick('creative')}
            />
          </section>
          <section className={styles.news__itemGroup}>
            {battleRoyaleNews &&
              (!isFiltered || filteredMode === 'battleroyale') && (
                <h2>Battle Royale</h2>
              )}
            {battleRoyaleNews &&
              (!isFiltered || filteredMode === 'battleroyale') &&
              battleRoyaleNews?.map((item) => (
                <Card
                  key={item.id}
                  title={item.body}
                  image={item.image}
                  date={item.title}
                  gamemode="br"
                />
              ))}
            {saveTheWorldNews &&
              (!isFiltered || filteredMode === 'savetheworld') && (
                <h2>Save the World</h2>
              )}
            {saveTheWorldNews &&
              (!isFiltered || filteredMode === 'savetheworld') &&
              saveTheWorldNews.map((item) => (
                <Card
                  key={item.title}
                  title={item.body}
                  image={item.image}
                  date={item.title}
                  gamemode="stw"
                />
              ))}
            {creativeNews && (!isFiltered || filteredMode === 'creative') && (
              <h2>Creative</h2>
            )}
            {creativeNews &&
              (!isFiltered || filteredMode === 'creative') &&
              creativeNews?.map((item) => (
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
