import React from 'react';
import styles from './Cosmetic.module.css';

interface cosmeticProps {
  name: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | string;
  price: number;
  image: string;
}

export default function Cosmetic({
  name,
  rarity,
  price,
  image,
}: cosmeticProps): JSX.Element {
  return (
    <div className={`${styles.cosmetic} ${rarity.toLowerCase()}`}>
      <img src={image} alt="Item Image" />
      <div className={styles.cosmetic__info}>
        {name.substr(0, 6)}
        {name.length > 6 && '...'}
        <span className={styles.cosmetic__price}>
          <img
            src="https://fortnite-api.com/images/vbuck.png"
            alt="VBucks Logo"
          />
          {price}
        </span>
      </div>
    </div>
  );
}
