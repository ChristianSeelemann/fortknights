import React, { ReactNode } from 'react';

type NavigationProps = {
  children: ReactNode;
};

function Navigation({ children }: NavigationProps): JSX.Element {
  return <button>{children}</button>;
}

export default Navigation;
