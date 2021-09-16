import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import ToTop from '../../components/Icons/ToTop';
import Navigation from '../../components/Navigation/Navigation';
import ProfileItem from '../../components/Profile/ProfileItem';
import useFetch from '../../hooks/useFetch';
import useFriends from '../../hooks/useFriends';
import type statsFromAPI from '../../types/statsFromAPI';
import styles from './Friends.module.css';

export default function Friends(): JSX.Element {
  const [modalClosed, setModal] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(false);
  const [user, setUser] = useState<statsFromAPI[] | 'error' | ''>('');

  const { friendsData, handleFriendClick } = useFriends();
  const jointFriends = friendsData.join('&id=');

  const { data: friendList } = useFetch<statsFromAPI[]>(
    `/api/stats/?id=${jointFriends}`
  );

  function modalClick() {
    setModal(!modalClosed);
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

  const addFriendButton = document.querySelector('#modal');
  modalClosed === false &&
    addFriendButton?.classList.add(`${styles.modal_hidden}`);
  modalClosed === true &&
    addFriendButton?.classList.remove(`${styles.modal_hidden}`);

  return (
    <>
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
          <h2>Friends you Follow</h2>
          <section className={styles.friends__itemGroup}>
            {friendList &&
              friendsData.length !== 0 &&
              friendList.map((user, index) => (
                <ProfileItem
                  username={user.data.name}
                  games={
                    user.data.global_stats && user.data.global_stats !== null
                      ? user.data.global_stats.solo.matchesplayed
                      : '0'
                  }
                  wins={
                    user.data.global_stats && user.data.global_stats !== null
                      ? user.data.global_stats.solo.placetop1
                      : '0'
                  }
                  link="#"
                  avatar={`../../src/assets/avatars/${index}.webp`}
                  buttonText="Unfollow"
                  buttonStyle="warning"
                  onClick={() => handleFriendClick(user.id)}
                  key={user.id}
                />
              ))}
            {friendsData.length === 0 &&
              'There is no Knight in your list :( Wanna add your first Knight?'}
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
        <Navigation active="friends" />
      </section>
      <div id="modal" className={styles.modal}>
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
              wins={
                user[0].data.global_stats !== null
                  ? user[0].data.global_stats?.solo.placetop1
                  : '0'
              }
              games={
                user[0].data.global_stats !== null
                  ? user[0].data.global_stats.solo.matchesplayed
                  : '0'
              }
              buttonStyle="success"
              buttonText="Follow"
              onClick={() => {
                handleFriendClick(user[0].id);
                setModal(true);
                setInputValue('');
                setUser('');
              }}
              link="#"
              avatar={'../../src/assets/avatars/5.webp'}
            />
          )}
        </section>
      </div>
    </>
  );
}
