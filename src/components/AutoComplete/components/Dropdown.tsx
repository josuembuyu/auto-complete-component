import React, { useEffect, useRef } from "react";
import styles from "../AutoComplete.module.css";
import DropdownItem from "./DropdownItem";
import { useAutoCompleteContext } from "../context/AutoCompleteProvider";

const itemHeight = 35;
const windowHeight = 200;
const overscan = 0;

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
    const ulRef = useRef<HTMLUListElement>(null);
    const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

    const {
      startIndex,
      endIndex,
      scrollTop,
      setScrollTop,
      setStartIndex,
      setEndIndex,
    } = useAutoCompleteContext();

    useEffect(() => {
      if (ulRef.current && isFocused) {
        ulRef.current.scrollTop = scrollTop;
      }
    }, [isFocused, scrollTop]);

    useEffect(() => {
      const newStartIndex = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - overscan
      );
      const newEndIndex = Math.min(
        filteredData.length,
        Math.ceil((scrollTop + windowHeight) / itemHeight) + overscan
      );

      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }, [scrollTop, setStartIndex, setEndIndex, filteredData.length]);

    useEffect(() => {
      if (highlightedIndex !== -1) {
        const highlightedItem = itemsRef.current[highlightedIndex];
        if (highlightedItem) {
          highlightedItem.scrollIntoView({
            block: "nearest",
            inline: "start",
          });
        }
      }
    }, [highlightedIndex]);

    useEffect(() => {
      if (highlightedIndex !== -1) {
        const highlightedItemTop = highlightedIndex * itemHeight;
        if (
          highlightedItemTop < scrollTop ||
          highlightedItemTop >= scrollTop + windowHeight
        ) {
          containerRef.current?.scrollTo({
            top: highlightedItemTop - windowHeight / 2,
          });
        }
      }
    }, [highlightedIndex, scrollTop]);

    useEffect(() => {
      if (ulRef.current) {
        ulRef.current.scrollTop = 0;
        setScrollTop(0);
      }
    }, [filteredData]);

    if (!isFocused) return null;

    return (
      <div ref={containerRef} className={styles.dropdownContainer}>
        {hasNoResults ? (
          <div className={styles.noFound}>No results found</div>
        ) : (
          <ul
            id="ul-dropdown"
            ref={ulRef}
            style={{ overflowY: "auto" }}
            className={styles.dropdownMenu}
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
          >
            <div
              style={{
                height: `${filteredData.length * itemHeight}px`,
                position: "relative",
              }}
            >
              {filteredData.slice(startIndex, endIndex).map((item, idx) => {
                const actualIndex = startIndex + idx;
                return (
                  <DropdownItem
                    isHighlighted={highlightedIndex === actualIndex}
                    item={item}
                    key={actualIndex}
                    query={query}
                    onSelect={() => {
                      onSelect(item, actualIndex);
                    }}
                    ref={(el) => (itemsRef.current[actualIndex] = el)}
                    style={{
                      position: "absolute",
                      top: `${actualIndex * itemHeight}px`,
                      width: "100%",
                      height: `${itemHeight}px`,
                    }}
                  />
                );
              })}
            </div>
          </ul>
        )}
      </div>
    );
  }
);

export default Dropdown;
