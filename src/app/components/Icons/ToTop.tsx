import React from 'react';

type toTopProps = {
  color: string;
};

export default function ToTop({ color }: toTopProps): JSX.Element {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <svg
      width="29"
      height="32"
      viewBox="0 0 29 32"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      onClick={scrollTop}
    >
      <path d="M1.77778 21.3333H8.88889V32H19.5556V21.3333H26.6667L14.2222 7.11111L1.77778 21.3333ZM0 0H28.4444V3.55556H0V0Z" />
    </svg>
  );
}
