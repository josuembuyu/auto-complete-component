import styles from "../AutoComplete.module.css";
import DropdownItem from "./DropdownItem";

type Props = {
  filteredData: string[];
  query: string;
  highlightedIndex: number;
  hasNoResults: boolean;
  isFocused: boolean;
  onSelect: (value: string) => void;
};

const Dropdown: React.FC<Props> = ({
  filteredData,
  query,
  highlightedIndex,
  hasNoResults,
  isFocused,
  onSelect,
}) => {
  if (!isFocused) return null;

  return (
    <div className={styles.dropdownContainer}>
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
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
