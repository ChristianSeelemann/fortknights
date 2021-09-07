import React from 'react';
import Navigation from './Navigation';

export default {
  title: 'Component/Navigation',
  component: Navigation,
};

export const News = (): JSX.Element => <Navigation>Login</Navigation>;
export const Items = (): JSX.Element => <Navigation>Register</Navigation>;
