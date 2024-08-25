import { useEffect, useState } from "react";

const itemHeight = 35;
const windowHeight = 200;
const overscan = 0;

export default function useDropdown(filterData: string[]) {
  const [scrollTop, setScrollTop] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  useEffect(() => {
    setStartIndex(Math.max(0, Math.floor(scrollTop / itemHeight) - overscan));
    setEndIndex(
      Math.min(
        filterData.length,
        Math.ceil((scrollTop + windowHeight) / itemHeight) + overscan
      )
    );
  }, [scrollTop, filterData]);

  console.log(startIndex, endIndex);

  return {
    scrollTop,
    startIndex,
    endIndex,
    itemHeight,
    windowHeight,
    overscan,
    setScrollTop,
    setEndIndex,
    setStartIndex,
  };
}
