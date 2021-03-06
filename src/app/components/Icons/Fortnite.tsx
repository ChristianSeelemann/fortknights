import React from 'react';

type FortniteProps = {
  color: string;
  onClick?: () => void;
};

export default function Fortnite({
  color,
  onClick,
}: FortniteProps): JSX.Element {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M 8 3 L 8 21 L 12 20 L 12 14 L 16 14 L 16 10 L 12 10 L 12 7 L 16.457031 7 L 18 3 L 8 3 z M 2 5 L 3 10 L 2 20 L 6 18.615234 L 6 16.498047 L 4.3007812 17.087891 L 4.9902344 10.199219 L 5.0195312 9.9003906 L 4.9609375 9.6074219 L 4.4394531 7 L 6 7 L 6 5 L 2 5 z M 19.355469 5 L 18.587891 7.0371094 L 19.566406 6.9746094 L 19.039062 9.6074219 L 18.980469 9.9003906 L 19.009766 10.199219 L 19.742188 17.515625 L 14 16.292969 L 14 18.330078 L 22 20 L 21 10 L 22 5 L 19.355469 5 z"
      />
    </svg>
  );
}
