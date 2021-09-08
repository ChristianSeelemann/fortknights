import React from 'react';
import Friends from '../Icons/Friends';
import Header from './Header';

export default {
  title: 'Component/Header',
  component: Header,
};

export const Notification = (): JSX.Element => (
  <Header textthin="Fort" textbold="Knights" icon="notification" />
);
export const Close = (): JSX.Element => (
  <Header textthin="Fort" textbold="Knights" icon="close" />
);

export const Other = (): JSX.Element => (
  <Header
    textthin="Fort"
    textbold="Knights"
    icon={<Friends color="var(--clr-white)" />}
  />
);
