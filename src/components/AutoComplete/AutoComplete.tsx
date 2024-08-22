import React, { useState } from "react";
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

  const {
    filteredData,
    loading,
    hasNoResults,
    highlightedIndex,
    handleInputChange,
    handleKeyDown,
  } = useAutoComplete(data, query, onSelect);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={styles.container}>
      <Loader Loading={<Spinner />} isLoading={loading}>
        <input
          className={styles.input}
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => setQuery(handleInputChange(e))}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Dropdown
          isFocused={isFocused}
          hasNoResults={hasNoResults}
          filteredData={filteredData}
          query={query}
          highlightedIndex={highlightedIndex}
          onSelect={onSelect}
        />
      </Loader>
    </div>
  );
};

export default AutoComplete;
