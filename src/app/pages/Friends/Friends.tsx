import React from 'react';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import ToTop from '../../components/Icons/ToTop';
import Navigation from '../../components/Navigation/Navigation';
import ProfileItem from '../../components/Profile/ProfileItem';
import useFetch from '../../hooks/useFetch';
import styles from './Friends.module.css';

interface statsFromAPI {
  result: boolean;
  name: string;
  account: {
    level: number | null;
    progress_pct: number | null;
  };
  global_stats: {
    squad: {
      placetop1: number;
      kd: number;
      winrate: number;
      placetop3: number;
      placetop5: number;
      placetop6: number;
      placetop10: number;
      placetop12: number;
      placetop25: number;
      kills: number;
      matchesplayed: number;
      minutesplayed: number;
      score: number;
      playersoutlived: number;
    };
    duo: {
      placetop1: number;
      kd: number;
      winrate: number;
      placetop3: number;
      placetop5: number;
      placetop6: number;
      placetop10: number;
      placetop12: number;
      placetop25: number;
      kills: number;
      matchesplayed: number;
      minutesplayed: number;
      score: number;
      playersoutlived: number;
    };
    solo: {
      placetop1: number;
      kd: number;
      winrate: number;
      placetop3: number;
      placetop5: number;
      placetop6: number;
      placetop10: number;
      placetop12: number;
      placetop25: number;
      kills: number;
      matchesplayed: number;
      minutesplayed: number;
      score: number;
      playersoutlived: number;
    };
  };
}

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
          {friendList.map((user) => (
            <ProfileItem
              username={user.name}
              games={user.global_stats.solo.matchesplayed}
              wins={user.global_stats.solo.placetop1}
              link="#"
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
