import React from 'react';

type CloseProps = {
  color: string;
  onClick?: () => void;
};

export default function Close({ color, onClick }: CloseProps): JSX.Element {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M9.87959 7.99886L15.6082 2.28357C15.8591 2.03271 16 1.69246 16 1.33769C16 0.98291 15.8591 0.642664 15.6082 0.391799C15.3573 0.140934 15.0171 0 14.6623 0C14.3075 0 13.9673 0.140934 13.7164 0.391799L8.00114 6.12041L2.28585 0.391799C2.03498 0.140934 1.69474 -2.64329e-09 1.33996 0C0.985184 2.64329e-09 0.644938 0.140934 0.394073 0.391799C0.143208 0.642664 0.0022736 0.98291 0.00227359 1.33769C0.00227359 1.69246 0.143208 2.03271 0.394073 2.28357L6.12268 7.99886L0.394073 13.7142C0.269205 13.838 0.170094 13.9853 0.102458 14.1477C0.0348226 14.31 0 14.4842 0 14.66C0 14.8359 0.0348226 15.01 0.102458 15.1724C0.170094 15.3347 0.269205 15.4821 0.394073 15.6059C0.517922 15.7308 0.665268 15.8299 0.827613 15.8975C0.989958 15.9652 1.16409 16 1.33996 16C1.51583 16 1.68996 15.9652 1.85231 15.8975C2.01465 15.8299 2.162 15.7308 2.28585 15.6059L8.00114 9.87731L13.7164 15.6059C13.8403 15.7308 13.9876 15.8299 14.15 15.8975C14.3123 15.9652 14.4864 16 14.6623 16C14.8382 16 15.0123 15.9652 15.1747 15.8975C15.337 15.8299 15.4844 15.7308 15.6082 15.6059C15.7331 15.4821 15.8322 15.3347 15.8998 15.1724C15.9675 15.01 16.0023 14.8359 16.0023 14.66C16.0023 14.4842 15.9675 14.31 15.8998 14.1477C15.8322 13.9853 15.7331 13.838 15.6082 13.7142L9.87959 7.99886Z" />
    </svg>
  );
}