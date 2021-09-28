import React, { useEffect, useState } from 'react';
import styles from './FriendCompare.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import statsFromAPI from '../../types/statsFromAPI';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ToTop from '../../components/Icons/ToTop';
import ArrowIcon from '../../components/Icons/Arrow';

export default function FriendCompare(): JSX.Element {
  const { id1, id2 } = useParams<{ id1: string; id2: string }>();
  const history = useHistory();
  const [showToTop, setShowToTop] = useState(false);

  const { data, isLoading } = useFetch<statsFromAPI[]>(
    `/api/stats?id=${id1}&id=${id2}`
  );

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
        <section className={styles.friendCompare}>
          {!isLoading && data && (
            <>
              <Header
                textThin={data[0].data.name}
                textBold="Compare"
                icon="close"
                onClick={() => history.push('/friends')}
              />
              <main>
                <section className={styles.stats__overall}>
                  <h3 className="uncommon">Overall Stats</h3>
                  <section className={styles.stats__itemGroup}>
                    <>
                      <div className={styles.stats__item}>
                        <div>
                          Kills
                          <span className={styles.stats__item_arrow}>
                            <ArrowIcon
                              width="1rem"
                              height="1rem"
                              color={
                                data[0].data.global_stats.solo.kills +
                                  data[0].data.global_stats.duo.kills +
                                  data[0].data.global_stats.squad.kills >
                                data[1].data.global_stats.solo.kills +
                                  data[1].data.global_stats.duo.kills +
                                  data[1].data.global_stats.squad.kills
                                  ? 'rgba(255, 105, 105, 1)'
                                  : 'rgb(62, 189, 15)'
                              }
                              rotate={
                                data[0].data.global_stats.solo.kills +
                                  data[0].data.global_stats.duo.kills +
                                  data[0].data.global_stats.squad.kills <
                                data[1].data.global_stats.solo.kills +
                                  data[1].data.global_stats.duo.kills +
                                  data[1].data.global_stats.squad.kills
                                  ? 180
                                  : 0
                              }
                              draw={
                                data[0].data.global_stats.solo.kills +
                                  data[0].data.global_stats.duo.kills +
                                  data[0].data.global_stats.squad.kills ==
                                data[1].data.global_stats.solo.kills +
                                  data[1].data.global_stats.duo.kills +
                                  data[1].data.global_stats.squad.kills
                                  ? true
                                  : false
                              }
                            />
                          </span>
                        </div>
                        <div className={styles.stats__item_friend}>
                          {data[0].data.global_stats.solo.kills +
                            data[0].data.global_stats.duo.kills +
                            data[0].data.global_stats.squad.kills}
                          <span className={styles.stats__item_own}>
                            {data[1].data.global_stats.solo.kills +
                              data[1].data.global_stats.duo.kills +
                              data[1].data.global_stats.squad.kills}
                          </span>
                        </div>
                      </div>
                      <div className={styles.stats__item}>
                        <div>
                          K/M
                          <span className={styles.stats__item_arrow}>
                            <ArrowIcon
                              width="1rem"
                              height="1rem"
                              color={
                                data[0].data.global_stats.solo.kd +
                                  data[0].data.global_stats.duo.kd +
                                  data[0].data.global_stats.squad.kd >
                                data[1].data.global_stats.solo.kd +
                                  data[1].data.global_stats.duo.kd +
                                  data[1].data.global_stats.squad.kd
                                  ? 'rgba(255, 105, 105, 1)'
                                  : 'rgb(62, 189, 15)'
                              }
                              rotate={
                                data[0].data.global_stats.solo.kd +
                                  data[0].data.global_stats.duo.kd +
                                  data[0].data.global_stats.squad.kd <
                                data[1].data.global_stats.solo.kd +
                                  data[1].data.global_stats.duo.kd +
                                  data[1].data.global_stats.squad.kd
                                  ? 180
                                  : 0
                              }
                              draw={
                                data[0].data.global_stats.solo.kd +
                                  data[0].data.global_stats.duo.kd +
                                  data[0].data.global_stats.squad.kd ==
                                data[1].data.global_stats.solo.kd +
                                  data[1].data.global_stats.duo.kd +
                                  data[1].data.global_stats.squad.kd
                                  ? true
                                  : false
                              }
                            />
                          </span>
                        </div>
                        <div className={styles.stats__item_friend}>
                          {Number(
                            data[0].data.global_stats.solo.kd +
                              data[0].data.global_stats.duo.kd +
                              data[0].data.global_stats.squad.kd
                          ).toFixed(2)}
                          <span className={styles.stats__item_own}>
                            {Number(
                              data[1].data.global_stats.solo.kd +
                                data[1].data.global_stats.duo.kd +
                                data[1].data.global_stats.squad.kd
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className={styles.stats__item}>
                        <div>
                          Matches
                          <span className={styles.stats__item_arrow}>
                            <ArrowIcon
                              width="1rem"
                              height="1rem"
                              color={
                                data[0].data.global_stats.solo.matchesplayed +
                                  data[0].data.global_stats.duo.matchesplayed +
                                  data[0].data.global_stats.squad
                                    .matchesplayed >
                                data[1].data.global_stats.solo.matchesplayed +
                                  data[1].data.global_stats.duo.matchesplayed +
                                  data[1].data.global_stats.squad.matchesplayed
                                  ? 'rgba(255, 105, 105, 1)'
                                  : 'rgb(62, 189, 15)'
                              }
                              rotate={
                                data[0].data.global_stats.solo.matchesplayed +
                                  data[0].data.global_stats.duo.matchesplayed +
                                  data[0].data.global_stats.squad
                                    .matchesplayed <
                                data[1].data.global_stats.solo.matchesplayed +
                                  data[1].data.global_stats.duo.matchesplayed +
                                  data[1].data.global_stats.squad.matchesplayed
                                  ? 180
                                  : 0
                              }
                              draw={
                                data[0].data.global_stats.solo.matchesplayed +
                                  data[0].data.global_stats.duo.matchesplayed +
                                  data[0].data.global_stats.squad
                                    .matchesplayed ==
                                data[1].data.global_stats.solo.matchesplayed +
                                  data[1].data.global_stats.duo.matchesplayed +
                                  data[1].data.global_stats.squad.matchesplayed
                                  ? true
                                  : false
                              }
                            />
                          </span>
                        </div>
                        <div className={styles.stats__item_friend}>
                          {data[0].data.global_stats.solo.matchesplayed +
                            data[0].data.global_stats.duo.matchesplayed +
                            data[0].data.global_stats.squad.matchesplayed}
                          <span className={styles.stats__item_own}>
                            {data[1].data.global_stats.solo.matchesplayed +
                              data[1].data.global_stats.duo.matchesplayed +
                              data[1].data.global_stats.squad.matchesplayed}
                          </span>
                        </div>
                      </div>
                      <div className={styles.stats__item}>
                        <div>
                          Wins
                          <span className={styles.stats__item_arrow}>
                            <ArrowIcon
                              width="1rem"
                              height="1rem"
                              color={
                                data[0].data.global_stats.solo.placetop1 +
                                  data[0].data.global_stats.duo.placetop1 +
                                  data[0].data.global_stats.squad.placetop1 >
                                data[1].data.global_stats.solo.placetop1 +
                                  data[1].data.global_stats.duo.placetop1 +
                                  data[1].data.global_stats.squad.placetop1
                                  ? 'rgba(255, 105, 105, 1)'
                                  : 'rgb(62, 189, 15)'
                              }
                              rotate={
                                data[0].data.global_stats.solo.placetop1 +
                                  data[0].data.global_stats.duo.placetop1 +
                                  data[0].data.global_stats.squad.placetop1 <
                                data[1].data.global_stats.solo.placetop1 +
                                  data[1].data.global_stats.duo.placetop1 +
                                  data[1].data.global_stats.squad.placetop1
                                  ? 180
                                  : 0
                              }
                              draw={
                                data[0].data.global_stats.solo.placetop1 +
                                  data[0].data.global_stats.duo.placetop1 +
                                  data[0].data.global_stats.squad.placetop1 ==
                                data[1].data.global_stats.solo.placetop1 +
                                  data[1].data.global_stats.duo.placetop1 +
                                  data[1].data.global_stats.squad.placetop1
                                  ? true
                                  : false
                              }
                            />
                          </span>
                        </div>
                        <div className={styles.stats__item_friend}>
                          {data[0].data.global_stats.solo.placetop1 +
                            data[0].data.global_stats.duo.placetop1 +
                            data[0].data.global_stats.squad.placetop1}
                          <span className={styles.stats__item_own}>
                            {data[1].data.global_stats.solo.placetop1 +
                              data[1].data.global_stats.duo.placetop1 +
                              data[1].data.global_stats.squad.placetop1}
                          </span>
                        </div>
                      </div>
                      <div className={styles.stats__item}>
                        <div>
                          Top 3s
                          <span className={styles.stats__item_arrow}>
                            <ArrowIcon
                              width="1rem"
                              height="1rem"
                              color={
                                data[0].data.global_stats.solo.placetop3 +
                                  data[0].data.global_stats.duo.placetop3 +
                                  data[0].data.global_stats.squad.placetop3 >
                                data[1].data.global_stats.solo.placetop3 +
                                  data[1].data.global_stats.duo.placetop3 +
                                  data[1].data.global_stats.squad.placetop3
                                  ? 'rgba(255, 105, 105, 1)'
                                  : 'rgb(62, 189, 15)'
                              }
                              rotate={
                                data[0].data.global_stats.solo.placetop3 +
                                  data[0].data.global_stats.duo.placetop3 +
                                  data[0].data.global_stats.squad.placetop3 <
                                data[1].data.global_stats.solo.placetop3 +
                                  data[1].data.global_stats.duo.placetop3 +
                                  data[1].data.global_stats.squad.placetop3
                                  ? 180
                                  : 0
                              }
                              draw={
                                data[0].data.global_stats.solo.placetop3 +
                                  data[0].data.global_stats.duo.placetop3 +
                                  data[0].data.global_stats.squad.placetop3 ==
                                data[1].data.global_stats.solo.placetop3 +
                                  data[1].data.global_stats.duo.placetop3 +
                                  data[1].data.global_stats.squad.placetop3
                                  ? true
                                  : false
                              }
                            />
                          </span>
                        </div>
                        <div className={styles.stats__item_friend}>
                          {data[0].data.global_stats.solo.placetop3 +
                            data[0].data.global_stats.duo.placetop3 +
                            data[0].data.global_stats.squad.placetop3}
                          <span className={styles.stats__item_own}>
                            {data[1].data.global_stats.solo.placetop3 +
                              data[1].data.global_stats.duo.placetop3 +
                              data[1].data.global_stats.squad.placetop3}
                          </span>
                        </div>
                      </div>
                      <div className={styles.stats__item}>
                        <div>
                          Top 5s
                          <span className={styles.stats__item_arrow}>
                            <ArrowIcon
                              width="1rem"
                              height="1rem"
                              color={
                                data[0].data.global_stats.solo.placetop5 +
                                  data[0].data.global_stats.duo.placetop5 +
                                  data[0].data.global_stats.squad.placetop5 >
                                data[1].data.global_stats.solo.placetop5 +
                                  data[1].data.global_stats.duo.placetop5 +
                                  data[1].data.global_stats.squad.placetop5
                                  ? 'rgba(255, 105, 105, 1)'
                                  : 'rgb(62, 189, 15)'
                              }
                              rotate={
                                data[0].data.global_stats.solo.placetop5 +
                                  data[0].data.global_stats.duo.placetop5 +
                                  data[0].data.global_stats.squad.placetop5 <
                                data[1].data.global_stats.solo.placetop5 +
                                  data[1].data.global_stats.duo.placetop5 +
                                  data[1].data.global_stats.squad.placetop5
                                  ? 180
                                  : 0
                              }
                              draw={
                                data[0].data.global_stats.solo.placetop5 +
                                  data[0].data.global_stats.duo.placetop5 +
                                  data[0].data.global_stats.squad.placetop5 ==
                                data[1].data.global_stats.solo.placetop5 +
                                  data[1].data.global_stats.duo.placetop5 +
                                  data[1].data.global_stats.squad.placetop5
                                  ? true
                                  : false
                              }
                            />
                          </span>
                        </div>
                        <div className={styles.stats__item_friend}>
                          {data[0].data.global_stats.solo.placetop5 +
                            data[0].data.global_stats.duo.placetop5 +
                            data[0].data.global_stats.squad.placetop5}
                          <span className={styles.stats__item_own}>
                            {data[1].data.global_stats.solo.placetop5 +
                              data[1].data.global_stats.duo.placetop5 +
                              data[1].data.global_stats.squad.placetop5}
                          </span>
                        </div>
                      </div>
                      <div className={styles.stats__item}>
                        <div>
                          Top 10s
                          <span className={styles.stats__item_arrow}>
                            <ArrowIcon
                              width="1rem"
                              height="1rem"
                              color={
                                data[0].data.global_stats.solo.placetop10 +
                                  data[0].data.global_stats.duo.placetop10 +
                                  data[0].data.global_stats.squad.placetop10 >
                                data[1].data.global_stats.solo.placetop10 +
                                  data[1].data.global_stats.duo.placetop10 +
                                  data[1].data.global_stats.squad.placetop10
                                  ? 'rgba(255, 105, 105, 1)'
                                  : 'rgb(62, 189, 15)'
                              }
                              rotate={
                                data[0].data.global_stats.solo.placetop10 +
                                  data[0].data.global_stats.duo.placetop10 +
                                  data[0].data.global_stats.squad.placetop10 <
                                data[1].data.global_stats.solo.placetop10 +
                                  data[1].data.global_stats.duo.placetop10 +
                                  data[1].data.global_stats.squad.placetop10
                                  ? 180
                                  : 0
                              }
                              draw={
                                data[0].data.global_stats.solo.placetop10 +
                                  data[0].data.global_stats.duo.placetop10 +
                                  data[0].data.global_stats.squad.placetop10 ==
                                data[1].data.global_stats.solo.placetop10 +
                                  data[1].data.global_stats.duo.placetop10 +
                                  data[1].data.global_stats.squad.placetop10
                                  ? true
                                  : false
                              }
                            />
                          </span>
                        </div>
                        <div className={styles.stats__item_friend}>
                          {data[0].data.global_stats.solo.placetop10 +
                            data[0].data.global_stats.duo.placetop10 +
                            data[0].data.global_stats.squad.placetop10}
                          <span className={styles.stats__item_own}>
                            {data[1].data.global_stats.solo.placetop10 +
                              data[1].data.global_stats.duo.placetop10 +
                              data[1].data.global_stats.squad.placetop10}
                          </span>
                        </div>
                      </div>
                      <div className={styles.stats__item}>
                        <div>
                          Top 25s
                          <span className={styles.stats__item_arrow}>
                            <ArrowIcon
                              width="1rem"
                              height="1rem"
                              color={
                                data[0].data.global_stats.solo.placetop25 +
                                  data[0].data.global_stats.duo.placetop25 +
                                  data[0].data.global_stats.squad.placetop25 >
                                data[1].data.global_stats.solo.placetop25 +
                                  data[1].data.global_stats.duo.placetop25 +
                                  data[1].data.global_stats.squad.placetop25
                                  ? 'rgba(255, 105, 105, 1)'
                                  : 'rgb(62, 189, 15)'
                              }
                              rotate={
                                data[0].data.global_stats.solo.placetop25 +
                                  data[0].data.global_stats.duo.placetop25 +
                                  data[0].data.global_stats.squad.placetop25 <
                                data[1].data.global_stats.solo.placetop25 +
                                  data[1].data.global_stats.duo.placetop25 +
                                  data[1].data.global_stats.squad.placetop25
                                  ? 180
                                  : 0
                              }
                              draw={
                                data[0].data.global_stats.solo.placetop25 +
                                  data[0].data.global_stats.duo.placetop25 +
                                  data[0].data.global_stats.squad.placetop25 ==
                                data[1].data.global_stats.solo.placetop25 +
                                  data[1].data.global_stats.duo.placetop25 +
                                  data[1].data.global_stats.squad.placetop25
                                  ? true
                                  : false
                              }
                            />
                          </span>
                        </div>
                        <div className={styles.stats__item_friend}>
                          {data[0].data.global_stats.solo.placetop25 +
                            data[0].data.global_stats.duo.placetop25 +
                            data[0].data.global_stats.squad.placetop25}
                          <span className={styles.stats__item_own}>
                            {data[1].data.global_stats.solo.placetop25 +
                              data[1].data.global_stats.duo.placetop25 +
                              data[1].data.global_stats.squad.placetop25}
                          </span>
                        </div>
                      </div>
                      <div className={styles.stats__item}>
                        <div>
                          Winrate
                          <span className={styles.stats__item_arrow}>
                            <ArrowIcon
                              width="1rem"
                              height="1rem"
                              color={
                                data[0].data.global_stats.solo.winrate +
                                  data[0].data.global_stats.duo.winrate +
                                  data[0].data.global_stats.squad.winrate >
                                data[1].data.global_stats.solo.winrate +
                                  data[1].data.global_stats.duo.winrate +
                                  data[1].data.global_stats.squad.winrate
                                  ? 'rgba(255, 105, 105, 1)'
                                  : 'rgb(62, 189, 15)'
                              }
                              rotate={
                                data[0].data.global_stats.solo.winrate +
                                  data[0].data.global_stats.duo.winrate +
                                  data[0].data.global_stats.squad.winrate <
                                data[1].data.global_stats.solo.winrate +
                                  data[1].data.global_stats.duo.winrate +
                                  data[1].data.global_stats.squad.winrate
                                  ? 180
                                  : 0
                              }
                              draw={
                                data[0].data.global_stats.solo.winrate +
                                  data[0].data.global_stats.duo.winrate +
                                  data[0].data.global_stats.squad.winrate ==
                                data[1].data.global_stats.solo.winrate +
                                  data[1].data.global_stats.duo.winrate +
                                  data[1].data.global_stats.squad.winrate
                                  ? true
                                  : false
                              }
                            />
                          </span>
                        </div>
                        <div className={styles.stats__item_friend}>
                          {Number(
                            data[0].data.global_stats.solo.winrate +
                              data[0].data.global_stats.duo.winrate +
                              data[0].data.global_stats.squad.winrate
                          ).toFixed(2)}
                          <span className={styles.stats__item_own}>
                            {Number(
                              data[1].data.global_stats.solo.winrate +
                                data[1].data.global_stats.duo.winrate +
                                data[1].data.global_stats.squad.winrate
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className={styles.stats__item}>
                        <div>
                          Score
                          <span className={styles.stats__item_arrow}>
                            <ArrowIcon
                              width="1rem"
                              height="1rem"
                              color={
                                data[0].data.global_stats.solo.score +
                                  data[0].data.global_stats.duo.score +
                                  data[0].data.global_stats.squad.score >
                                data[1].data.global_stats.solo.score +
                                  data[1].data.global_stats.duo.score +
                                  data[1].data.global_stats.squad.score
                                  ? 'rgba(255, 105, 105, 1)'
                                  : 'rgb(62, 189, 15)'
                              }
                              rotate={
                                data[0].data.global_stats.solo.score +
                                  data[0].data.global_stats.duo.score +
                                  data[0].data.global_stats.squad.score <
                                data[1].data.global_stats.solo.score +
                                  data[1].data.global_stats.duo.score +
                                  data[1].data.global_stats.squad.score
                                  ? 180
                                  : 0
                              }
                              draw={
                                data[0].data.global_stats.solo.score +
                                  data[0].data.global_stats.duo.score +
                                  data[0].data.global_stats.squad.score ==
                                data[1].data.global_stats.solo.score +
                                  data[1].data.global_stats.duo.score +
                                  data[1].data.global_stats.squad.score
                                  ? true
                                  : false
                              }
                            />
                          </span>
                        </div>
                        <div className={styles.stats__item_friend}>
                          {data[0].data.global_stats.solo.score +
                            data[0].data.global_stats.duo.score +
                            data[0].data.global_stats.squad.score}
                          <span className={styles.stats__item_own}>
                            {data[1].data.global_stats.solo.score +
                              data[1].data.global_stats.duo.score +
                              data[1].data.global_stats.squad.score}
                          </span>
                        </div>
                      </div>
                    </>
                  </section>
                </section>

                <section className={styles.stats__solo}>
                  <h3 className="rare">Solo Stats</h3>
                  <section className={styles.stats__itemGroup}>
                    <div className={styles.stats__item}>
                      <div>
                        Kills
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.solo.kills >
                              data[1].data.global_stats.solo.kills
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.solo.kills <
                              data[1].data.global_stats.solo.kills
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.solo.kills ==
                              data[1].data.global_stats.solo.kills
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.solo.kills}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.solo.kills}
                        </span>
                      </div>
                    </div>
                    <div className={styles.stats__item}>
                      <div>
                        K/M
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.solo.kd >
                              data[1].data.global_stats.solo.kd
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.solo.kd <
                              data[1].data.global_stats.solo.kd
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.solo.kd ==
                              data[1].data.global_stats.solo.kd
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.solo.kd}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.solo.kd}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Matches
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.solo.matchesplayed >
                              data[1].data.global_stats.solo.matchesplayed
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.solo.matchesplayed <
                              data[1].data.global_stats.solo.matchesplayed
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.solo.matchesplayed ==
                              data[1].data.global_stats.solo.matchesplayed
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.solo.matchesplayed}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.solo.matchesplayed}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Wins
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.solo.placetop1 >
                              data[1].data.global_stats.solo.placetop1
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.solo.placetop1 <
                              data[1].data.global_stats.solo.placetop1
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.solo.placetop1 ==
                              data[1].data.global_stats.solo.placetop1
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.solo.placetop1}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.solo.placetop1}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Top 3s
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.solo.placetop3 >
                              data[1].data.global_stats.solo.placetop3
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.solo.placetop3 <
                              data[1].data.global_stats.solo.placetop3
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.solo.placetop3 ==
                              data[1].data.global_stats.solo.placetop3
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.solo.placetop3}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.solo.placetop3}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Top 5s
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.solo.placetop5 >
                              data[1].data.global_stats.solo.placetop5
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.solo.placetop5 <
                              data[1].data.global_stats.solo.placetop5
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.solo.placetop5 ==
                              data[1].data.global_stats.solo.placetop5
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.solo.placetop5}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.solo.placetop5}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Top 10s
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.solo.placetop10 >
                              data[1].data.global_stats.solo.placetop10
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.solo.placetop10 <
                              data[1].data.global_stats.solo.placetop10
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.solo.placetop10 ==
                              data[1].data.global_stats.solo.placetop10
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.solo.placetop10}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.solo.placetop10}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Top 25s
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.solo.placetop25 >
                              data[1].data.global_stats.solo.placetop25
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.solo.placetop25 <
                              data[1].data.global_stats.solo.placetop25
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.solo.placetop25 ==
                              data[1].data.global_stats.solo.placetop25
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.solo.placetop25}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.solo.placetop25}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Winrate
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.solo.winrate >
                              data[1].data.global_stats.solo.winrate
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.solo.winrate <
                              data[1].data.global_stats.solo.winrate
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.solo.winrate ==
                              data[1].data.global_stats.solo.winrate
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {Number(data[0].data.global_stats.solo.winrate).toFixed(
                          2
                        )}
                        <span className={styles.stats__item_own}>
                          {Number(
                            data[1].data.global_stats.solo.winrate
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Score
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.solo.score >
                              data[1].data.global_stats.solo.score
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.solo.score <
                              data[1].data.global_stats.solo.score
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.solo.score ==
                              data[1].data.global_stats.solo.score
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.solo.score}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.solo.score}
                        </span>
                      </div>
                    </div>
                  </section>
                </section>

                <section className={styles.stats__duo}>
                  <h3 className="epic">Duo Stats</h3>
                  <section className={styles.stats__itemGroup}>
                    <div className={styles.stats__item}>
                      <div>
                        Kills
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.duo.kills >
                              data[1].data.global_stats.duo.kills
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.duo.kills <
                              data[1].data.global_stats.duo.kills
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.duo.kills ==
                              data[1].data.global_stats.duo.kills
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.duo.kills}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.duo.kills}
                        </span>
                      </div>
                    </div>
                    <div className={styles.stats__item}>
                      <div>
                        K/M
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.duo.kd >
                              data[1].data.global_stats.duo.kd
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.duo.kd <
                              data[1].data.global_stats.duo.kd
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.duo.kd ==
                              data[1].data.global_stats.duo.kd
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.duo.kd}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.duo.kd}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Matches
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.duo.matchesplayed >
                              data[1].data.global_stats.duo.matchesplayed
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.duo.matchesplayed <
                              data[1].data.global_stats.duo.matchesplayed
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.duo.matchesplayed ==
                              data[1].data.global_stats.duo.matchesplayed
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.duo.matchesplayed}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.duo.matchesplayed}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Wins
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.duo.placetop1 >
                              data[1].data.global_stats.duo.placetop1
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.duo.placetop1 <
                              data[1].data.global_stats.duo.placetop1
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.duo.placetop1 ==
                              data[1].data.global_stats.duo.placetop1
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.duo.placetop1}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.duo.placetop1}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Top 3s
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.duo.placetop3 >
                              data[1].data.global_stats.duo.placetop3
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.duo.placetop3 <
                              data[1].data.global_stats.duo.placetop3
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.duo.placetop3 ==
                              data[1].data.global_stats.duo.placetop3
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.duo.placetop3}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.duo.placetop3}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Top 5s
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.duo.placetop5 >
                              data[1].data.global_stats.duo.placetop5
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.duo.placetop5 <
                              data[1].data.global_stats.duo.placetop5
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.duo.placetop5 ==
                              data[1].data.global_stats.duo.placetop5
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.duo.placetop5}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.duo.placetop5}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Top 10s
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.duo.placetop10 >
                              data[1].data.global_stats.duo.placetop10
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.duo.placetop10 <
                              data[1].data.global_stats.duo.placetop10
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.duo.placetop10 ==
                              data[1].data.global_stats.duo.placetop10
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.duo.placetop10}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.duo.placetop10}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Top 25s
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.duo.placetop25 >
                              data[1].data.global_stats.duo.placetop25
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.duo.placetop25 <
                              data[1].data.global_stats.duo.placetop25
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.duo.placetop25 ==
                              data[1].data.global_stats.duo.placetop25
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.duo.placetop25}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.duo.placetop25}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Winrate
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.duo.winrate >
                              data[1].data.global_stats.duo.winrate
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.duo.winrate <
                              data[1].data.global_stats.duo.winrate
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.duo.winrate ==
                              data[1].data.global_stats.duo.winrate
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {Number(data[0].data.global_stats.duo.winrate).toFixed(
                          2
                        )}
                        <span className={styles.stats__item_own}>
                          {Number(
                            data[1].data.global_stats.duo.winrate
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Score
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.duo.score >
                              data[1].data.global_stats.duo.score
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.duo.score <
                              data[1].data.global_stats.duo.score
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.duo.score ==
                              data[1].data.global_stats.duo.score
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.duo.score}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.duo.score}
                        </span>
                      </div>
                    </div>
                  </section>
                </section>

                <section className={styles.stats__squad}>
                  <h3 className="legendary">Squad Stats</h3>
                  <section className={styles.stats__itemGroup}>
                    <div className={styles.stats__item}>
                      <div>
                        Kills
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.squad.kills >
                              data[1].data.global_stats.squad.kills
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.squad.kills <
                              data[1].data.global_stats.squad.kills
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.squad.kills ==
                              data[1].data.global_stats.squad.kills
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.squad.kills}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.squad.kills}
                        </span>
                      </div>
                    </div>
                    <div className={styles.stats__item}>
                      <div>
                        K/M
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.squad.kd >
                              data[1].data.global_stats.squad.kd
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.squad.kd <
                              data[1].data.global_stats.squad.kd
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.squad.kd ==
                              data[1].data.global_stats.squad.kd
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.squad.kd}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.squad.kd}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Matches
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.squad.matchesplayed >
                              data[1].data.global_stats.squad.matchesplayed
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.squad.matchesplayed <
                              data[1].data.global_stats.squad.matchesplayed
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.squad.matchesplayed ==
                              data[1].data.global_stats.squad.matchesplayed
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.squad.matchesplayed}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.squad.matchesplayed}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Wins
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.squad.placetop1 >
                              data[1].data.global_stats.squad.placetop1
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.squad.placetop1 <
                              data[1].data.global_stats.squad.placetop1
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.squad.placetop1 ==
                              data[1].data.global_stats.squad.placetop1
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.squad.placetop1}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.squad.placetop1}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Top 3s
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.squad.placetop3 >
                              data[1].data.global_stats.squad.placetop3
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.squad.placetop3 <
                              data[1].data.global_stats.squad.placetop3
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.squad.placetop3 ==
                              data[1].data.global_stats.squad.placetop3
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.squad.placetop3}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.squad.placetop3}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Top 5s
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.squad.placetop5 >
                              data[1].data.global_stats.squad.placetop5
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.squad.placetop5 <
                              data[1].data.global_stats.squad.placetop5
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.squad.placetop5 ==
                              data[1].data.global_stats.squad.placetop5
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.squad.placetop5}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.squad.placetop5}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Top 10s
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.squad.placetop10 >
                              data[1].data.global_stats.squad.placetop10
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.squad.placetop10 <
                              data[1].data.global_stats.squad.placetop10
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.squad.placetop10 ==
                              data[1].data.global_stats.squad.placetop10
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.squad.placetop10}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.squad.placetop10}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Top 25s
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.squad.placetop25 >
                              data[1].data.global_stats.squad.placetop25
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.squad.placetop25 <
                              data[1].data.global_stats.squad.placetop25
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.squad.placetop25 ==
                              data[1].data.global_stats.squad.placetop25
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.squad.placetop25}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.squad.placetop25}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Winrate
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.squad.winrate >
                              data[1].data.global_stats.squad.winrate
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.squad.winrate <
                              data[1].data.global_stats.squad.winrate
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.squad.winrate ==
                              data[1].data.global_stats.squad.winrate
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {Number(
                          data[0].data.global_stats.squad.winrate
                        ).toFixed(2)}
                        <span className={styles.stats__item_own}>
                          {Number(
                            data[1].data.global_stats.squad.winrate
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className={styles.stats__item}>
                      <div>
                        Score
                        <span className={styles.stats__item_arrow}>
                          <ArrowIcon
                            width="1rem"
                            height="1rem"
                            color={
                              data[0].data.global_stats.squad.score >
                              data[1].data.global_stats.squad.score
                                ? 'rgba(255, 105, 105, 1)'
                                : 'rgb(62, 189, 15)'
                            }
                            rotate={
                              data[0].data.global_stats.squad.score <
                              data[1].data.global_stats.squad.score
                                ? 180
                                : 0
                            }
                            draw={
                              data[0].data.global_stats.squad.score ==
                              data[1].data.global_stats.squad.score
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                      <div className={styles.stats__item_friend}>
                        {data[0].data.global_stats.squad.score}
                        <span className={styles.stats__item_own}>
                          {data[1].data.global_stats.squad.score}
                        </span>
                      </div>
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
