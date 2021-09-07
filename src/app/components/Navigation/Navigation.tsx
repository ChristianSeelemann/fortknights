import React, { ReactNode } from 'react';

type NavigationProps = {
  children: ReactNode;
};

export default function Navigation({ children }: NavigationProps): JSX.Element {
  return <button>{children}</button>;
}
