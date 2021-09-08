import React from 'react';
import Navigation from './Navigation';

export default {
  title: 'Component/Navigation',
  component: Navigation,
};

export const News = (): JSX.Element => <Navigation active="news" />;
export const Items = (): JSX.Element => <Navigation active="items" />;
export const Stats = (): JSX.Element => <Navigation active="stats" />;
export const Friends = (): JSX.Element => <Navigation active="friends" />;
export const Map = (): JSX.Element => <Navigation active="map" />;
