import React from 'react';
import styles from './Map.module.css';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import MapComponent from '../../components/Map/Map';

export default function Map(): JSX.Element {
  return (
    <section className={styles.map}>
      <Header textThin="Fortnite" textBold="Map" icon="fortnite" />
      <main>
        <MapComponent />
      </main>
      <Navigation active="map" />
    </section>
  );
}
