import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import Close from '../Icons/Close';
import styles from './Map.module.css';

interface mapPOISFromAPI {
  name: string;
  x: number;
  y: number;
}

export default function mapComponent(): JSX.Element {
  const { data: mapData } = useFetch<mapPOISFromAPI[]>('api/map');

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
    } else {
      (
        event.target as Element
      ).parentElement?.parentElement?.parentElement?.classList.remove(
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
    <section className={styles.map__wrapper}>
      <div id="scrollMap" className={styles.map__image_wrapper}>
        <img
          className={styles.map__image}
          src="https://media.fortniteapi.io/images/map.png"
          alt="Image of the Fortnite Map"
        />
        <div className={styles.pois}>
          <ul className={styles.pois__ul}>
            {mapData &&
              mapData.map((poi) => (
                <li
                  onClick={(event) => handlePOIClick(event)}
                  className={`${styles.pois__item}`}
                  key={poi.name}
                  style={{ left: poi.x, top: poi.y }}
                >
                  <div
                    onClick={(event) => handlePOIClose(event)}
                    className={styles.pois__item_info}
                  >
                    {poi.name}
                    <Close height="13" width="13" color="var(--clr-white)" />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
