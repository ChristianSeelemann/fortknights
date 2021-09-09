import React from 'react';
import styles from './Profile.module.css';

interface ProfilePictureProps {
  image: string;
}

export default function ProfilePicture({
  image,
}: ProfilePictureProps): JSX.Element {
  return <img className={styles.profilePicture} src={image} alt="Avatar" />;
}
