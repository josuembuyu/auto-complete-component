import React, { useCallback, useRef, useState } from "react";
import { useAutoComplete } from "../hooks/useAutoComplete";
import { useClickOutside } from "../hooks/useClickOutside";
import styles from "../AutoComplete.module.css";
import Spinner from "../components/Spinner";
import Dropdown from "../components/Dropdown";
import Loader from "../components/Loader";

type Props = {
  /** Array of strings to be searched */
  data: string[];
  /** Placeholder text for the input */
  placeholder: string;
  /** Callback function when an item is selected */
  onSelect: (value: string) => void;
};

/**
 * A reusable AutoComplete component that filters a list of strings based on user input.
 * Features:
 * - Debounced filtering (handled in useAutoComplete)
 * - Keyboard navigation (ArrowUp, ArrowDown, Enter, Escape)
 * - Click outside to close dropdown
 * - Loading state
 */
const OriginalAutoComplete: React.FC<Props> = ({
  data,
  placeholder,
  onSelect,
}) => {
  const [query, setQuery] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ref to hold the selection handler to avoid circular dependencies
  const handleSelectRef = useRef<(value: string, index: number) => void>(() => {});

  const {
    filteredData,
    loading,
    hasNoResults,
    highlightedIndex,
    isFocused,
    setHighlightedIndex,
    handleInputChange,
    setIsFocused,
    handleKeyDown,
  } = useAutoComplete(data, query, (value, index) => handleSelectRef.current(value, index));

  const handleItemSelect = useCallback(
    (value: string, index: number) => {
      onSelect(value);
      setSelectedValue(value);
      setIsFocused(false);
      setHighlightedIndex(index);
      inputRef.current?.focus();
    },
    [onSelect, setIsFocused, setHighlightedIndex]
  );

  // Update the ref with the latest handler
  // We use a ref so useAutoComplete can call this even though it's defined after
  handleSelectRef.current = handleItemSelect;

  // Use the custom hook for closing the dropdown when clicking outside
  useClickOutside(containerRef, () => {
    setIsFocused(false);
  });

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = handleInputChange(e);
    setQuery(newQuery);
    setSelectedValue(null);
    if (!isFocused) {
      setIsFocused(true);
    }
  };

  // Determine the value to display in the input
  const inputValue = selectedValue !== null ? selectedValue : query;

  return (
    <div ref={containerRef} className={styles.container}>
      <Loader Loading={<Spinner />} isLoading={loading}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          onClick={handleInputFocus}
          // Ensure focus is handled correctly for accessibility
          onFocus={handleInputFocus}
        />

        <Dropdown
          isFocused={isFocused}
          hasNoResults={hasNoResults}
          filteredData={filteredData}
          query={query}
          highlightedIndex={highlightedIndex}
          onSelect={handleItemSelect}
        />
      </Loader>
    </div>
  );
};

export default OriginalAutoComplete;
