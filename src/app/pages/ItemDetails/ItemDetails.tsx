import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import ToTop from '../../components/Icons/ToTop';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Navigation from '../../components/Navigation/Navigation';
import useFetch from '../../hooks/useFetch';
import styles from './ItemDetails.module.css';

interface detailsFromAPI {
  result: boolean;
  item: {
    type: {
      name: string;
    };
    name: string;
    description: string;
    rarity: {
      id: string;
    };
    price: number;
    releaseDate: string;
    lastAppearance: string;
    images: {
      background: string;
    };
  };
}

export default function ItemDetails(): JSX.Element {
  const [showToTop, setShowToTop] = useState(false);

  const param = useParams<{ id: string }>();
  const history = useHistory();

  const { data, isLoading } = useFetch<detailsFromAPI>(`/api/item/${param.id}`);

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
        <section className={styles.item}>
          <Header
            textThin="Item"
            textBold="Details"
            icon="close"
            onClick={() => history.push('/items')}
          />
          <main>
            {!isLoading && data && !data.result && (
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring' }}
              >
                We are sorry...
                <br />
                There is no item with this ID :(
              </motion.div>
            )}
            {!isLoading && data && data.result && (
              <motion.section
                className={styles.item__wrapper}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <section className={styles.details}>
                  <div className={styles.details__top}>
                    <div>
                      <h1>{data.item.name}</h1>
                      {data.item.type.name + ' | ' + data.item.rarity.id}
                    </div>
                    <div className={styles.details__pice}>
                      <img
                        src="https://fortnite-api.com/images/vbuck.png"
                        alt="VBucks Icon"
                      />
                      {data.item.price}
                    </div>
                  </div>
                  <div className={styles.details__bottom}>
                    {data.item.description}
                  </div>
                </section>
                <img
                  className={styles.item__image}
                  src={data.item.images.background}
                  alt="Item Image"
                />
              </motion.section>
            )}
            {showToTop === true && (
              <div className={styles.news__toDo}>
                <ToTop color="var(--clr-white)" />
                <span>This is everything :)</span>
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
