import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAutoComplete } from "./hooks/useAutoComplete";
import styles from "./AutoComplete.module.css";
import Spinner from "./components/Spinner";
import Dropdown from "./components/Dropdown";
import Loader from "./components/Loader";

type Props = {
  data: string[];
  placeholder: string;
  onSelect: (value: string) => void;
};

const AutoComplete: React.FC<Props> = ({ data, placeholder, onSelect }) => {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = useCallback(
    (value: string, index: number) => {
      onSelect(value);
      setSelectedValue(value);
      setIsFocused(false);
      setHighlightedIndex(index);
      inputRef.current?.focus();
    },
    [onSelect]
  );

  const {
    filteredData,
    loading,
    hasNoResults,
    highlightedIndex,
    setHighlightedIndex,
    handleInputChange,
    handleKeyDown,
  } = useAutoComplete(data, query, handleSelect);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const inputValue = selectedValue !== null ? selectedValue : query;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <Loader Loading={<Spinner />} isLoading={loading}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(handleInputChange(e));
            setSelectedValue(null);
            if (!isFocused) {
              setIsFocused(true);
            }
          }}
          onKeyDown={handleKeyDown}
          onClick={handleFocus}
        />
        <Dropdown
          isFocused={isFocused}
          hasNoResults={hasNoResults}
          filteredData={filteredData}
          query={query}
          highlightedIndex={highlightedIndex}
          onSelect={(value, index) => handleSelect(value, index)}
        />
      </Loader>
    </div>
  );
};

export default AutoComplete;
