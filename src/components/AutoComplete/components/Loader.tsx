import React, { ReactNode } from "react";

type Props = {
  Loading: ReactNode;
  children: ReactNode;
  isLoading: boolean;
};

const Loader: React.FC<Props> = React.memo(
  ({ Loading, children, isLoading }) => (
    <>
      {children}
      {isLoading && Loading}
    </>
  )
);

export default Loader;
