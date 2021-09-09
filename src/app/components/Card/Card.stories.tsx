import React from 'react';
import Card from './Card';

export default {
  title: 'Component/Cards',
  component: Card,
  parameters: {
    layout: 'fullscreen',
  },
};

export const News = (): JSX.Element => (
  <Card
    title="SCHAUT EUCH DIE FNCS FINALS VON KAPITEL 2 – SAISON 7 IN PARTY ROYALE AN"
    image="https://cdn2.unrealengine.com/Fortnite%2Fblog%2Fwhats-new-in-br-in-v11-20%2FBR07_News_Featured_Evergreens_v2_Pink-%281%29-1920x1080-a0e09ea34aafa903610a8f47c0e8386230d006ef.jpg"
    link="#"
    date="23.08.21"
    gamemode="br"
  />
);
