import React from 'react';
import Tag from './Tag';

export default {
  title: 'Component/Tag',
  component: Tag,
};

export const BattleRoyale = (): JSX.Element => (
  <Tag style="br" text="Battle Royale" />
);

export const SaveTheWorld = (): JSX.Element => (
  <Tag style="stw" text="Save the World" />
);

export const Creative = (): JSX.Element => (
  <Tag style="creative" text="Creative" />
);

export const Date = (): JSX.Element => <Tag style="date" text="24.08.21" />;
