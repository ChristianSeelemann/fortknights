import React from 'react';
import ProfilePicture from './ProfilePicture';
import ProfileItem from './ProfileItem';

export default {
  title: 'Component/Profile',
  component: ProfilePicture,
};

export const Picture = (): JSX.Element => (
  <ProfilePicture image="/avatars/0.webp" />
);

export const Item = (): JSX.Element => (
  <ProfileItem
    username="PaulPanzer1337"
    games="1451"
    wins="31"
    link="#"
    buttonStyle="warning"
    buttonText="Unfollow"
    avatar="/avatars/1.webp"
  />
);
