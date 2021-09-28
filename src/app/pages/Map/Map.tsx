import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import MapComponent from '../../components/Map/Map';

export default function Map(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section>
        <Header textThin="Fortnite" textBold="Map" icon="fortnite" />
        <main>
          <MapComponent />
        </main>
        <Navigation active="map" />
      </section>
    </motion.div>
  );
}
