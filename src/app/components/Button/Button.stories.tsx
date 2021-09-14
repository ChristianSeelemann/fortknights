import React from 'react';
import Button from './Button';

export default {
  title: 'Component/Buttons',
  component: Button,
};

export const primary = (): JSX.Element => (
  <Button style="primary" text="Primary" />
);

export const secondary = (): JSX.Element => (
  <Button style="secondary" text="Secondary" />
);

export const accent = (): JSX.Element => (
  <Button style="accent" text="Accent" />
);

export const warning = (): JSX.Element => (
  <Button style="warning" text="Warning" />
);

export const success = (): JSX.Element => (
  <Button style="success" text="Success" />
);

export const withIcon = (): JSX.Element => (
  <Button style="primary" text="Success" icon="Stats" />
);
