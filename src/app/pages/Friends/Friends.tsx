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
  const { friendsData, handleFriendClick } = useFriends();

  const friendList: statsFromAPI[] = [];
  friendsData.map((id: number) => {
    const { data, isLoading } = useFetch<statsFromAPI>(`/api/stats/${id}`);
    data && isLoading === false && friendList.push(data);
    console.log(data);
  });

  const [modal, setModal] = useState(true);

  function openModal() {
    setModal(true);
  }

  const addFriendButton = document.querySelector('#friends__modal');
  modal === false &&
    addFriendButton?.classList.add(`${styles.friends__modal_hidden}`);
  modal === true &&
    addFriendButton?.classList.remove(`${styles.friends__modal_hidden}`);

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
              onClick={() => openModal()}
            />
          }
        ></Header>
        <main>
          <h2>Friends you Follow</h2>
          <section className={styles.friends__itemGroup}>
            {friendList.map((user, index) => (
              <ProfileItem
                username={user.data.name}
                games={user.data.global_stats.solo.matchesplayed}
                wins={user.data.global_stats.solo.placetop1}
                link="#"
                avatar={`../../src/assets/avatars/${index}.webp`}
                onClick={() => handleFriendClick(user.id)}
                key={user.id}
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
        <Navigation active="friends" />
      </section>
      <div id="friends__modal" className={styles.friends__modal}>
        Modal
      </div>
    </>
  );
}
