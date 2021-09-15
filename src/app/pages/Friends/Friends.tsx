import React from 'react';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import ToTop from '../../components/Icons/ToTop';
import Navigation from '../../components/Navigation/Navigation';
import ProfileItem from '../../components/Profile/ProfileItem';
import useFetch from '../../hooks/useFetch';
import type statsFromAPI from '../../types/statsFromAPI';
import styles from './Friends.module.css';

export default function Friends(): JSX.Element {
  const sampleData = [
    '65084a8f1c464ff8939c92869f4bf9d3',
    'e8eecb7f5fde410baf2c290f5752015d',
    'fdbca122c846485f9a89cfeb84527469',
    '2860abbef13d4baaa31794fd15097d53',
    '264fbac0c49f4d488b43302272a0b37a',
  ];

  const friendList: statsFromAPI[] = [];
  sampleData.map((id) => {
    const { data, isLoading } = useFetch<statsFromAPI>(`/api/stats/${id}`);
    data && isLoading === false && friendList.push(data);
  });

  function handleUnfollowClick() {
    console.log('Clicked!');
  }

  return (
    <section className={styles.friends}>
      <Header
        textThin="Your"
        textBold="Knights"
        icon={<Button style="primary" text="Add Friend" icon="Friends" />}
      ></Header>
      <main>
        <h2>Friends you Follow</h2>
        <section className={styles.friends__itemGroup}>
          {friendList.map((user, index) => (
            <ProfileItem
              username={user.name}
              games={user.global_stats.solo.matchesplayed}
              wins={user.global_stats.solo.placetop1}
              link="#"
              avatar={`../../src/assets/avatars/${index}.webp`}
              onClick={() => handleUnfollowClick()}
              key={user.name}
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
  );
}
