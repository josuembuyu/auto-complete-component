import React, { createContext, useContext, useState } from "react";

type Props = {
  startIndex: number;
  endIndex: number;
  scrollTop: number;
  setScrollTop: (index: number) => void;
  setStartIndex: (index: number) => void;
  setEndIndex: (index: number) => void;
};

const AutoCompleteContext = createContext<Props | undefined>(undefined);

export const AutoCompleteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);

  return (
    <AutoCompleteContext.Provider
      value={{
        startIndex,
        endIndex,
        scrollTop,
        setStartIndex,
        setEndIndex,
        setScrollTop,
      }}
    >
      {children}
    </AutoCompleteContext.Provider>
  );
};

export const useAutoCompleteContext = (): Props => {
  const context = useContext(AutoCompleteContext);
  if (!context) {
    throw new Error(
      "useAutoCompleteContext must be used within a AutoCompleteProvider"
    );
  }
  return context;
};
