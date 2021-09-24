import React from 'react';

type ArrowProps = {
  color: string;
  onClick?: () => void;
  height?: string;
  width?: string;
  rotate?: number;
  draw?: boolean;
};

export default function Arrow({
  color,
  onClick,
  height,
  width,
  rotate,
  draw,
}: ArrowProps): JSX.Element {
  return (
    <svg
      width={width ? width : '22'}
      height={height ? height : '22'}
      viewBox="0 0 22 22"
      fill={!draw ? color : 'orange'}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      transform={`rotate(${!draw ? rotate : 90})`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM7.8 9C7.65808 8.99836 7.51822 9.03409 7.39448 9.1036C7.27073 9.17311 7.16745 9.27395 7.095 9.396C7.02679 9.51456 6.99427 9.6503 7.00137 9.7869C7.00847 9.9235 7.05487 10.0551 7.135 10.166L10.335 14.666C10.4114 14.7705 10.5115 14.8552 10.6272 14.9133C10.7428 14.9714 10.8706 15.0011 11 15C11.1296 15.0013 11.2576 14.9716 11.3734 14.9136C11.4892 14.8555 11.5895 14.7706 11.666 14.666L14.866 10.166C14.9461 10.0551 14.9925 9.9235 14.9996 9.7869C15.0067 9.6503 14.9742 9.51456 14.906 9.396C14.8335 9.2738 14.73 9.17287 14.6061 9.10335C14.4822 9.03383 14.3421 8.99819 14.2 9H7.8Z"
      />
    </svg>
  );
}
