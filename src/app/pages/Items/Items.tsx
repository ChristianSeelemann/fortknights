import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import Cosmetic from '../../components/Cosmetic/Cosmetic';
import Navigation from '../../components/Navigation/Navigation';
import useFetch from '../../hooks/useFetch';
import styles from './Items.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ToTop from '../../components/Icons/ToTop';

interface itemsFromAPI {
  mainId: string;
  displayName: string;
  displayAssets: [
    {
      url: string;
    }
  ];
  price: {
    finalPrice: number;
  };
  rarity: {
    name: string;
  };
}

export default function Items(): JSX.Element {
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 10) {
        setShowToTop(true);
      } else {
        setShowToTop(false);
      }
    });
  }, []);

  const { data, isLoading } = useFetch<itemsFromAPI[]>('/api/items');

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <section className={styles.items}>
          <Header textThin="Cosmetics" textBold="Shop" icon="fortnite" />
          <main>
            <motion.div
              className={styles.items__information}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'spring' }}
            >
              Current Rotation
              <span>
                The Current item shop rotation for Battle Royale.
                <br />
                Updates daily at 00:00.
              </span>
            </motion.div>
            <section className={styles.items__group}>
              {!isLoading &&
                data &&
                data.map((item) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <Link to={`/item/${item.mainId}`} key={item.mainId}>
                      <Cosmetic
                        name={item.displayName}
                        price={item.price.finalPrice}
                        image={item.displayAssets[0].url}
                        rarity={item.rarity.name}
                      />
                    </Link>
                  </motion.div>
                ))}
            </section>
            {showToTop && (
              <div className={styles.news__toDo}>
                <ToTop color="var(--clr-white)" />
                <span>
                  This is everything :)
                  <br />
                  Come back later for new great stuff!
                </span>
              </div>
            )}
          </main>
          <Navigation active="items" />
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
