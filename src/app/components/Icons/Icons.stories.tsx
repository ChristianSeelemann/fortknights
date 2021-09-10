import React from 'react';
import Close from './Close';
import Friends from './Friends';
import Items from './Items';
import Map from './Map';
import News from './News';
import Notification from './Notification';
import Stats from './Stats';
import ToTop from './ToTop';

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
export const NotificationIcon = (): JSX.Element => (
  <Notification color="var(--clr-white)" activeColor="var(--clr-primary)" />
);
export const CloseIcon = (): JSX.Element => <Close color="var(--clr-white)" />;
export const ToTopIcon = (): JSX.Element => <ToTop color="var(--clr-white)" />;
