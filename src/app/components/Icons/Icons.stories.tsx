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

export const NewsIcon = (): JSX.Element => <News />;
export const ItemsIcon = (): JSX.Element => <Items />;
export const StatsIcon = (): JSX.Element => <Stats />;
export const FriendsIcon = (): JSX.Element => <Friends />;
export const MapIcon = (): JSX.Element => <Map />;
