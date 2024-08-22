import { ReactNode } from "react";

type Props = {
  Loading: ReactNode;
  children: ReactNode;
  isLoading: boolean;
};

const Loader: React.FC<Props> = ({ Loading, children, isLoading }) => {
  return (
    <>
      {children}
      {isLoading && Loading}
    </>
  );
};

export default Loader;
