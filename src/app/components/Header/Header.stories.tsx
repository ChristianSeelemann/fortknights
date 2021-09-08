import React from 'react';
import Friends from '../Icons/Friends';
import Header from './Header';

export default {
  title: 'Component/Header',
  component: Header,
};

export const Notification = (): JSX.Element => (
  <Header textThin="Fort" textBold="Knights" icon="notification" />
);
export const Close = (): JSX.Element => (
  <Header textThin="Fort" textBold="Knights" icon="close" />
);

export const Other = (): JSX.Element => (
  <Header
    textThin="Fort"
    textBold="Knights"
    icon={<Friends color="var(--clr-white)" />}
  />
);
