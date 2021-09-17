import React from 'react';
import ProfilePicture from './ProfilePicture';
import ProfileItem from './ProfileItem';

export default {
  title: 'Component/Profile',
  component: ProfilePicture,
};

export const Picture = (): JSX.Element => (
  <ProfilePicture image="https://image.api.playstation.com/cdn/EP1464/CUSA07669_00/arN9Uez8UTKixtUdBHibVbzUOinKBMAB.png?w=960&h=960" />
);

export const Item = (): JSX.Element => (
  <ProfileItem
    username="PaulPanzer1337"
    games="1451"
    wins="31"
    link="#"
    buttonStyle="warning"
    buttonText="Unfollow"
    avatar="https://image.api.playstation.com/cdn/EP1464/CUSA07669_00/arN9Uez8UTKixtUdBHibVbzUOinKBMAB.png?w=960&h=960"
  />
);
