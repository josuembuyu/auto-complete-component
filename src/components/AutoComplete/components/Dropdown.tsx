import React, { useEffect, useRef } from "react";
import styles from "../AutoComplete.module.css";
import DropdownItem from "./DropdownItem";

type Props = {
  filteredData: string[];
  query: string;
  highlightedIndex: number;
  hasNoResults: boolean;
  isFocused: boolean;
  onSelect: (value: string, index: number) => void;
};

const Dropdown: React.FC<Props> = React.memo(
  ({
    filteredData,
    query,
    highlightedIndex,
    hasNoResults,
    isFocused,
    onSelect,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
      if (highlightedIndex !== -1) {
        const highlightedItem = itemsRef.current[highlightedIndex];
        if (highlightedItem) {
          highlightedItem.scrollIntoView({
            block: "nearest",
          });
        }
      }
    }, [highlightedIndex]);

    if (!isFocused) return null;

    return (
      <div ref={containerRef} className={styles.dropdownContainer}>
        {hasNoResults ? (
          <div className={styles.noFound}>No results found</div>
        ) : (
          <ul className={styles.dropdownMenu}>
            {filteredData.map((item: string, index: number) => (
              <DropdownItem
                isHighlighted={highlightedIndex === index}
                item={item}
                key={index}
                query={query}
                onSelect={() => onSelect(item, index)}
                ref={(el) => (itemsRef.current[index] = el)}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default Dropdown;
