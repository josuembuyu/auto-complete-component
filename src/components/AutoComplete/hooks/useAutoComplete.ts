import { useState, useEffect, useCallback } from "react";

export const useAutoComplete = (
  data: string[],
  query: string,
  handleSelect: (value: string, index: number) => void
) => {
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNoResults, setNoResults] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

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
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    },
    [data, loading]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      return e.target.value;
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prevIndex) =>
            Math.min(prevIndex + 1, filteredData.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          break;
        case "Enter":
          if (highlightedIndex >= 0) {
            handleSelect(filteredData[highlightedIndex], highlightedIndex);
          }
          break;
        case "Escape":
          setHighlightedIndex(-1);
          break;
        default:
          break;
      }
    },
    [filteredData, highlightedIndex, handleSelect]
  );

  useEffect(() => {
    filterData(query);
  }, [query]);

  return {
    filteredData,
    loading,
    hasNoResults,
    highlightedIndex,
    setHighlightedIndex,
    handleInputChange,
    handleKeyDown,
    handleSelect,
  };
};
