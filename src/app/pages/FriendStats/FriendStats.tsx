import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import ToTop from '../../components/Icons/ToTop';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Navigation from '../../components/Navigation/Navigation';
import useFetch from '../../hooks/useFetch';
import statsFromAPI from '../../types/statsFromAPI';
import styles from './FriendStats.module.css';

export default function FriendStats(): JSX.Element {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [showToTop, setShowToTop] = useState(false);

  const { data, isLoading } = useFetch<statsFromAPI[]>(`/api/stats?id=${id}`);

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
        <section className={styles.friendStats}>
          {!isLoading && data && (
            <>
              <Header
                textThin={data[0].data.name}
                textBold="Stats"
                icon="close"
                onClick={() => history.push('/friends')}
              />
              <main>
                <section className={styles.stats__overall}>
                  <h3 className="uncommon">Overall Stats</h3>
                  <section className={styles.stats__itemGroup}>
                    <div className={styles.stats__item}>
                      Kills
                      <span>
                        {data[0].data.global_stats.solo.kills +
                          data[0].data.global_stats.duo.kills +
                          data[0].data.global_stats.squad.kills}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Kills / Match
                      <span>
                        {Number(
                          (data[0].data.global_stats.solo.kd +
                            data[0].data.global_stats.duo.kd +
                            data[0].data.global_stats.squad.kd) /
                            3
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Matches
                      <span>
                        {data[0].data.global_stats.solo.matchesplayed +
                          data[0].data.global_stats.duo.matchesplayed +
                          data[0].data.global_stats.squad.matchesplayed}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Wins
                      <span>
                        {data[0].data.global_stats.solo.placetop1 +
                          data[0].data.global_stats.duo.placetop1 +
                          data[0].data.global_stats.squad.placetop1}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 3s
                      <span>
                        {data[0].data.global_stats.solo.placetop3 +
                          data[0].data.global_stats.duo.placetop3 +
                          data[0].data.global_stats.squad.placetop3}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 5s
                      <span>
                        {data[0].data.global_stats.solo.placetop5 +
                          data[0].data.global_stats.duo.placetop5 +
                          data[0].data.global_stats.squad.placetop5}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 10s
                      <span>
                        {data[0].data.global_stats.solo.placetop10 +
                          data[0].data.global_stats.duo.placetop10 +
                          data[0].data.global_stats.squad.placetop10}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 25s
                      <span>
                        {data[0].data.global_stats.solo.placetop25 +
                          data[0].data.global_stats.duo.placetop25 +
                          data[0].data.global_stats.squad.placetop25}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Winrate
                      <span>
                        {Number(
                          (data[0].data.global_stats.solo.winrate +
                            data[0].data.global_stats.duo.winrate +
                            data[0].data.global_stats.squad.winrate) /
                            3
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Score
                      <span>
                        {data[0].data.global_stats.solo.score +
                          data[0].data.global_stats.duo.score +
                          data[0].data.global_stats.squad.score}
                      </span>
                    </div>
                  </section>
                </section>

                <section className={styles.stats__solo}>
                  <h3 className="rare">Solo Stats</h3>
                  <section className={styles.stats__itemGroup}>
                    <div className={styles.stats__item}>
                      Kills<span>{data[0].data.global_stats.solo.kills}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Kills / Match
                      <span>{data[0].data.global_stats.solo.kd}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Matches
                      <span>
                        {data[0].data.global_stats.solo.matchesplayed}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Wins
                      <span>{data[0].data.global_stats.solo.placetop1}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 3s
                      <span>{data[0].data.global_stats.solo.placetop3}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 5s
                      <span>{data[0].data.global_stats.solo.placetop5}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 10s
                      <span>{data[0].data.global_stats.solo.placetop10}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 25s
                      <span>{data[0].data.global_stats.solo.placetop25}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Winrate
                      <span>
                        {Number(data[0].data.global_stats.solo.winrate).toFixed(
                          2
                        )}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Score<span>{data[0].data.global_stats.solo.score}</span>
                    </div>
                  </section>
                </section>

                <section className={styles.stats__duo}>
                  <h3 className="epic">Duo Stats</h3>
                  <section className={styles.stats__itemGroup}>
                    <div className={styles.stats__item}>
                      Kills<span>{data[0].data.global_stats.duo.kills}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Kills / Match
                      <span>{data[0].data.global_stats.duo.kd}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Matches
                      <span>{data[0].data.global_stats.duo.matchesplayed}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Wins<span>{data[0].data.global_stats.duo.placetop1}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 3s
                      <span>{data[0].data.global_stats.duo.placetop3}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 5s
                      <span>{data[0].data.global_stats.duo.placetop5}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 10s
                      <span>{data[0].data.global_stats.duo.placetop10}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 25s
                      <span>{data[0].data.global_stats.duo.placetop25}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Winrate
                      <span>
                        {Number(data[0].data.global_stats.duo.winrate).toFixed(
                          2
                        )}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Score<span>{data[0].data.global_stats.duo.score}</span>
                    </div>
                  </section>
                </section>

                <section className={styles.stats__squad}>
                  <h3 className="legendary">Squad Stats</h3>
                  <section className={styles.stats__itemGroup}>
                    <div className={styles.stats__item}>
                      Kills<span>{data[0].data.global_stats.squad.kills}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Kills / Match
                      <span>{data[0].data.global_stats.squad.kd}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Matches
                      <span>
                        {data[0].data.global_stats.squad.matchesplayed}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Wins
                      <span>{data[0].data.global_stats.squad.placetop1}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 3s
                      <span>{data[0].data.global_stats.squad.placetop3}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 5s
                      <span>{data[0].data.global_stats.squad.placetop5}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 10s
                      <span>{data[0].data.global_stats.squad.placetop10}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Top 25s
                      <span>{data[0].data.global_stats.squad.placetop25}</span>
                    </div>
                    <div className={styles.stats__item}>
                      Winrate
                      <span>
                        {Number(
                          data[0].data.global_stats.squad.winrate
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.stats__item}>
                      Score<span>{data[0].data.global_stats.squad.score}</span>
                    </div>
                  </section>
                </section>
                {showToTop === true && (
                  <div className={styles.news__toDo}>
                    <ToTop color="var(--clr-white)" />
                    <span>This is everything :)</span>
                  </div>
                )}
              </main>
              <Navigation active="friends" />
            </>
          )}
        </section>
      </motion.div>

      <AnimatePresence exitBeforeEnter>
        {isLoading && (
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
