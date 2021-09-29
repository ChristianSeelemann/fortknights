import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useUser from '../../hooks/useUser';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Close from '../../components/Icons/Close';
import ToTop from '../../components/Icons/ToTop';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Navigation from '../../components/Navigation/Navigation';
import ProfileItem from '../../components/Profile/ProfileItem';
import useFetch from '../../hooks/useFetch';
import useFriends from '../../hooks/useFriends';
import type statsFromAPI from '../../types/statsFromAPI';
import styles from './Friends.module.css';

export default function Friends(): JSX.Element {
  const { selfData } = useUser();
  const [isModalOpen, setModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(false);
  const [user, setUser] = useState<statsFromAPI[] | 'error' | ''>('');
  const [showToTop, setShowToTop] = useState(false);

  const history = useHistory();

  const { friendsData, handleFriendClick } = useFriends();
  const jointFriends = friendsData.join('&id=');

  const { data: friendList, isLoading } = useFetch<statsFromAPI[]>(
    `/api/stats/?id=${jointFriends}`
  );

  function modalClick() {
    setModal(!isModalOpen);
  }

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

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 10) {
        setShowToTop(true);
      } else {
        setShowToTop(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style.overflow = 'hidden';
    } else if (isModalOpen === false) {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <section className={styles.friends}>
          <Header
            textThin="Your"
            textBold="Knights"
            icon={
              <Button
                style="primary"
                text="Add Friend"
                icon="Friends"
                onClick={() => modalClick()}
              />
            }
          ></Header>
          <main>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'spring' }}
            >
              Friends you Follow
            </motion.h2>
            <section className={styles.friends__itemGroup}>
              {friendList &&
                friendsData.length !== 0 &&
                friendList.map((user, index) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' }}
                    key={user.id}
                  >
                    <ProfileItem
                      username={
                        user.data.name
                          ? user.data.name.substr(0, 10)
                          : 'Loading...'
                      }
                      games={
                        user.data.global_stats &&
                        user.data.global_stats !== null
                          ? user.data.global_stats.solo.matchesplayed
                          : '0'
                      }
                      avatar={`/avatars/${index}.webp`}
                      buttonText={
                        <Close
                          color="var(--clr-white)"
                          height="0.75rem"
                          width="0.75rem"
                        />
                      }
                      buttonStyle="warning"
                      onClick={() => handleFriendClick(user.id)}
                      compare={selfData !== '0'}
                      stats={true}
                      onClickStats={() => {
                        history.push(`/friendstats/${user.id}`);
                      }}
                      onClickCompare={() => {
                        history.push(`/friendcompare/${user.id}/${selfData}`);
                      }}
                      key={user.id}
                    />
                  </motion.div>
                ))}

              {friendsData.length === 0 && isLoading === false && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  There is no Knight in your list :(
                  <br />
                  Wanna add your first Knight?
                </motion.div>
              )}
            </section>
            {showToTop === true && (
              <div className={styles.news__toDo}>
                <ToTop color="var(--clr-white)" />
                <span>This is everything :)</span>
              </div>
            )}
          </main>
          <Navigation active="friends" />
        </section>
        {isModalOpen === true && (
          <div className={styles.modal}>
            <Header
              textThin="Add"
              textBold="Knight"
              icon="close"
              onClick={() => modalClick()}
            />
            <section className={styles.modal__section}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  className={styles.form__input}
                  type="text"
                  placeholder="Type in your Knights Name"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                />
              </form>
              {user === 'error' && (
                <span className={styles.modal__span}>
                  There is no Knight with this Name... :(
                  <br />
                  Maybe try another one :)
                </span>
              )}

              {result === true && user !== 'error' && user !== '' && (
                <ProfileItem
                  username={user[0].data.name}
                  games={
                    user[0].data.global_stats !== null
                      ? user[0].data.global_stats.solo.matchesplayed
                      : '0'
                  }
                  buttonStyle={
                    Object.values(friendsData).includes(user[0].id) === false
                      ? 'success'
                      : 'warning'
                  }
                  buttonText={
                    Object.values(friendsData).includes(user[0].id) === false
                      ? 'Follow'
                      : 'Unfollow'
                  }
                  onClick={() => {
                    handleFriendClick(user[0].id);
                    setModal(false);
                    setInputValue('');
                    setUser('');
                  }}
                  avatar={'/avatars/5.webp'}
                />
              )}
            </section>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
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
