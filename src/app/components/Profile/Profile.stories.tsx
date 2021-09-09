import React from 'react';
import ProfilePicture from './ProfilePicture';

export default {
  title: 'Component/Profile',
  component: ProfilePicture,
};

export const Picture = (): JSX.Element => (
  <ProfilePicture image="https://image.api.playstation.com/cdn/EP1464/CUSA07669_00/arN9Uez8UTKixtUdBHibVbzUOinKBMAB.png?w=960&h=960" />
);
