import React from 'react';

type NewsProps = {
  color: string;
};

export default function News({ color }: NewsProps): JSX.Element {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.875 0H2.125C0.953 0 0 0.897 0 2V16C0 17.103 0.953 18 2.125 18H17.875C19.047 18 20 17.103 20 16V2C20 0.897 19.047 0 17.875 0ZM17.875 16H2.125C2.068 16 2.029 15.984 2.012 15.984C2.005 15.984 2.001 15.986 2 15.992L1.988 2.046C1.995 2.036 2.04 2 2.125 2H17.875C17.954 2.001 17.997 2.028 18 2.008L18.012 15.954C18.005 15.964 17.96 16 17.875 16Z" />
      <path d="M4 4H10V10H4V4ZM11 12H4V14H16V12H12H11ZM12 8H16V10H12V8ZM12 4H16V6H12V4Z" />
    </svg>
  );
}
