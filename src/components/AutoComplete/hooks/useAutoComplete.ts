import { useState, useEffect, useCallback } from "react";
import { useAutoCompleteContext } from "../context/AutoCompleteProvider";

const itemHeight = 35;

export const useAutoComplete = (
  data: string[],
  query: string,
  handleSelect: (value: string, index: number) => void
) => {
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNoResults, setNoResults] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const {
    startIndex,
    endIndex,
    scrollTop,
    setScrollTop,
    setEndIndex,
    setStartIndex,
  } = useAutoCompleteContext();

  const filterData = useCallback(
    async (query: string) => {
      setLoading(true);
      try {
        setTimeout(() => {
          const filteredItems = data.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredData(filteredItems);
          setNoResults(filteredItems.length === 0 && query !== "" && !loading);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setLoading(false);
      }
    },
    [data, loading]
  );

  const visibleItems = filteredData.slice(startIndex, endIndex);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      return e.target.value;
    },
    []
  );

  console.log(visibleItems);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (highlightedIndex + 1 >= endIndex) {
            setStartIndex(startIndex + 1);
            setEndIndex(endIndex + 1);
            setScrollTop(scrollTop + itemHeight);
          } else {
            setHighlightedIndex((prevIndex) => prevIndex + 1);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (highlightedIndex <= startIndex) {
            if (startIndex > 0) {
              setStartIndex(startIndex - 1);
              setEndIndex(endIndex - 1);
              setScrollTop(scrollTop - itemHeight);
            }
          } else {
            setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          }
          break;
        case "Enter":
          if (highlightedIndex >= 0) {
            handleSelect(visibleItems[highlightedIndex], highlightedIndex);
          }
          break;
        case "Escape":
          setHighlightedIndex(-1);
          setIsFocused(false);
          break;
        default:
          break;
      }
    },
    [visibleItems, highlightedIndex, handleSelect]
  );

  useEffect(() => {
    filterData(query);
  }, [query]);

  useEffect(() => {
    setHighlightedIndex(startIndex);
  }, [filterData, startIndex]);

  return {
    filteredData,
    loading,
    hasNoResults,
    highlightedIndex,
    isFocused,
    setIsFocused,
    setHighlightedIndex,
    handleInputChange,
    handleKeyDown,
    handleSelect,
  };
};
