import React from 'react';
import Friends from './Friends';
import Items from './Items';
import Map from './Map';
import News from './News';
import Stats from './Stats';

export default {
  title: 'Component/Icons',
  component: News,
};

export const NewsIcon = (): JSX.Element => <News color="var(--clr-white)" />;
export const ItemsIcon = (): JSX.Element => <Items color="var(--clr-white)" />;
export const StatsIcon = (): JSX.Element => <Stats color="var(--clr-white)" />;
export const FriendsIcon = (): JSX.Element => (
  <Friends color="var(--clr-white)" />
);
export const MapIcon = (): JSX.Element => <Map color="var(--clr-white)" />;
