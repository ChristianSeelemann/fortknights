import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import ToTop from '../../components/Icons/ToTop';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Navigation from '../../components/Navigation/Navigation';
import ProfileItem from '../../components/Profile/ProfileItem';
import useFetch from '../../hooks/useFetch';
import useUser from '../../hooks/useUser';
import type statsFromAPI from '../../types/statsFromAPI';
import styles from './Stats.module.css';

export default function Stats(): JSX.Element {
  const { selfData, addSelf, removeSelf } = useUser();
  const [isDataSet, setIsDataSet] = useState(selfData !== '0');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(false);
  const [user, setUser] = useState<statsFromAPI[] | 'error' | ''>('');
  const [showToTop, setShowToTop] = useState(false);
  const [isNickname, setIsNickname] = useState(false);

  useEffect(() => {
    if (selfData === '0') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selfData]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 10) {
        setShowToTop(true);
      } else {
        setShowToTop(false);
      }
    });
  }, []);

  const history = useHistory();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const lookupFetch = await fetch(`/api/lookup/${inputValue}`);
    const lookupData = await lookupFetch.json();

    if (lookupData.result === false) {
      setUser('error');
      setResult(true);
      return;
    }

    const userFetch = await fetch(`/api/stats/?id=${lookupData.account_id}`);
    const userData = await userFetch.json();

    setUser(userData);
    setResult(true);
  }

  const { data, isLoading } = useFetch<statsFromAPI[]>(
    `/api/stats/?id=${selfData}`
  );

  return (
    <>
      <section className={styles.stats}>
        <Header textThin="Your" textBold="Stats" icon="fortnite" />
        <main>
          {data && data[0].data.result === true && (
            <div className={styles.stats__head}>
              <h2>{data[0].data.name}</h2>
              <Button
                onClick={() => {
                  removeSelf('nickname');
                  setIsNickname(false);
                  setIsDataSet(false);
                }}
                text="New Player"
                style="primary"
                icon="Close"
              />
            </div>
          )}
          {data &&
            data[0].data.result === true &&
            !data[0].data.global_stats.solo &&
            !data[0].data.global_stats.duo &&
            !data[0].data.global_stats.squad && (
              <span className={styles.stats__none}>
                You dont have played any Game :(
              </span>
            )}
          {data &&
            data[0].data.result === true &&
            (data[0].data.global_stats.solo ||
              data[0].data.global_stats.duo ||
              data[0].data.global_stats.squad) && (
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
            )}
          {data &&
            data[0].data.result === true &&
            data[0].data.global_stats.solo && (
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
                    <span>{data[0].data.global_stats.solo.matchesplayed}</span>
                  </div>
                  <div className={styles.stats__item}>
                    Wins<span>{data[0].data.global_stats.solo.placetop1}</span>
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
            )}
          {data &&
            data[0].data.result === true &&
            data[0].data.global_stats.duo && (
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
                      {Number(data[0].data.global_stats.duo.winrate).toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.stats__item}>
                    Score<span>{data[0].data.global_stats.duo.score}</span>
                  </div>
                </section>
              </section>
            )}
          {data &&
            data[0].data.result === true &&
            data[0].data.global_stats.squad && (
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
                    <span>{data[0].data.global_stats.squad.matchesplayed}</span>
                  </div>
                  <div className={styles.stats__item}>
                    Wins<span>{data[0].data.global_stats.squad.placetop1}</span>
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
                      {Number(data[0].data.global_stats.squad.winrate).toFixed(
                        2
                      )}
                    </span>
                  </div>
                  <div className={styles.stats__item}>
                    Score<span>{data[0].data.global_stats.squad.score}</span>
                  </div>
                </section>
              </section>
            )}
          {showToTop === true && (
            <div className={styles.news__toDo}>
              <ToTop color="var(--clr-white)" />
              <span>This is everything :)</span>
            </div>
          )}
        </main>
        <Navigation active="stats" />
      </section>
      {!isDataSet && !isNickname && (
        <section className={styles.modal}>
          <Header
            icon="close"
            textThin="Your"
            textBold="Self"
            onClick={() => history.push('/')}
          />
          <section className={styles.modal__section}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.form__input}
                type="text"
                placeholder="Type in your Username"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
            </form>
            {user !== 'error' && result && user !== '' && (
              <ProfileItem
                username={user[0].data.name}
                avatar={'/avatars/5.webp'}
                games={
                  user[0].data.global_stats !== null
                    ? user[0].data.global_stats.solo.matchesplayed
                    : '0'
                }
                buttonStyle="success"
                buttonText="Choose"
                compare={false}
                stats={false}
                onClick={() => {
                  addSelf(user[0].id);
                  setIsNickname(true);
                  setInputValue('');
                  setUser('');
                }}
              />
            )}
            {user === 'error' && result && (
              <span className={styles.modal__span}>
                No player found :(
                <br />
                Maybe try another one :)
              </span>
            )}
          </section>
        </section>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
}
