import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import Close from '../Icons/Close';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Tag from '../Tag/Tag';
import styles from './Map.module.css';

interface mapPOISFromAPI {
  name: string;
  x: number;
  y: number;
  images: [
    {
      url: string;
    }
  ];
}

export default function mapComponent(): JSX.Element {
  const [togglePOIs, setTogglePOIs] = useState(true);

  const { data: mapData, isLoading } = useFetch<mapPOISFromAPI[]>('api/map');

  function handlePOIClick(event: React.MouseEvent) {
    if ((event.target as Element).classList.contains(styles.active)) {
      (event.target as Element).classList.remove(styles.active);
    } else {
      (event.target as Element).classList.add(styles.active);
    }
  }

  function handlePOIClose(event: React.MouseEvent) {
    if ((event.target as Element).localName === 'div') {
      (event.target as Element).parentElement?.classList.remove(styles.active);
    } else if (
      (event.target as Element).classList.contains(styles.pois__item_image)
    ) {
      (
        event.target as Element
      ).parentElement?.parentElement?.parentElement?.classList.remove(
        styles.active
      );
    } else if ((event.target as Element).localName === 'path') {
      (
        event.target as Element
      ).parentElement?.parentElement?.parentElement?.parentElement?.classList.remove(
        styles.active
      );
    }
  }

  useEffect(() => {
    const scrollMap = document.querySelector('#scrollMap');
    if (scrollMap) {
      scrollMap.scrollLeft += scrollMap.scrollWidth / 2 / 1.5;
      scrollMap.scrollTop += scrollMap.scrollHeight / 2 / 1.5;
    }
  }, []);

  return (
    <>
      <section className={styles.map__wrapper}>
        <div id="scrollMap" className={styles.map__image_wrapper}>
          <img
            className={styles.map__image}
            src="https://media.fortniteapi.io/images/map.png"
            alt="Image of the Fortnite Map"
          />
          {togglePOIs === true && (
            <div className={styles.pois}>
              <ul className={styles.pois__ul}>
                {mapData &&
                  mapData.map((poi) => (
                    <motion.li
                      onClick={(event) => handlePOIClick(event)}
                      className={`${styles.pois__item}`}
                      key={poi.name}
                      style={{ left: poi.x, top: poi.y }}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      <div
                        onClick={(event) => handlePOIClose(event)}
                        className={styles.pois__item_info}
                      >
                        <div className={styles.pois__item_name}>
                          {poi.name}
                          <Close
                            height="13"
                            width="13"
                            color="var(--clr-white)"
                          />
                        </div>
                        <span>
                          <img
                            className={styles.pois__item_image}
                            src={poi.images[0].url}
                            alt=""
                          />
                        </span>
                      </div>
                    </motion.li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.tags}>
          <Tag
            style="savetheworld"
            text="PURE MAP"
            onClick={() => setTogglePOIs(false)}
          />
          <Tag
            style="battleroyale"
            text="HOTSPOTS"
            onClick={() => setTogglePOIs(true)}
          />
        </div>
      </section>
      {isLoading && <LoadingSpinner />}
    </>
  );
}
