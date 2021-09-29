import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <section className={styles.news}>
          <Header textThin="Fort" textBold="Knights" icon="fortnite" />
          <main>
            <motion.section
              className={styles.news__tags}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'spring' }}
            >
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
            </motion.section>
            <section className={styles.news__itemGroup}>
              {battleRoyaleNews &&
                (!isFiltered || filteredMode === 'battleroyale') && (
                  <motion.h2
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    Battle Royale
                  </motion.h2>
                )}
              {battleRoyaleNews &&
                (!isFiltered || filteredMode === 'battleroyale') &&
                battleRoyaleNews?.map((item) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' }}
                    key={item.id}
                  >
                    <Card
                      key={item.id}
                      title={item.body}
                      image={item.image}
                      date={item.title}
                      gamemode="br"
                    />
                  </motion.div>
                ))}
              {saveTheWorldNews &&
                (!isFiltered || filteredMode === 'savetheworld') && (
                  <motion.h2
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    Save the World
                  </motion.h2>
                )}
              {saveTheWorldNews &&
                (!isFiltered || filteredMode === 'savetheworld') &&
                saveTheWorldNews.map((item) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' }}
                    key={item.id}
                  >
                    <Card
                      key={item.title}
                      title={item.body}
                      image={item.image}
                      date={item.title}
                      gamemode="stw"
                    />
                  </motion.div>
                ))}
              {creativeNews && (!isFiltered || filteredMode === 'creative') && (
                <motion.h2
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  Creative
                </motion.h2>
              )}
              {creativeNews &&
                (!isFiltered || filteredMode === 'creative') &&
                creativeNews?.map((item) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' }}
                    key={item.id}
                  >
                    <Card
                      key={item.id}
                      title={item.body}
                      image={item.image}
                      date={item.title}
                      gamemode="creative"
                    />
                  </motion.div>
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
      </motion.div>

      <AnimatePresence>
        {(battleRoyaleLoading || saveTheWorldLoading || creativeLoading) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <LoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
