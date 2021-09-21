import React from 'react';
import Cosmetic from './Cosmetic';

export default {
  title: 'Component/Cosmetic',
  component: Cosmetic,
};

export const Normal = (): JSX.Element => (
  <Cosmetic
    name="Brutus the Longus"
    price={3000}
    rarity="Epic"
    image="https://media.fortniteapi.io/images/displayAssets/v2/DAv2_Bundle_Featured_TextileKnight/MI_Bundle_Featured_TextileKnight.png"
  />
);
