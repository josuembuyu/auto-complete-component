import styles from "../AutoComplete.module.css";
import HighlightMatch from "./HighlightMatch";

type Props = {
  item: string;
  query: string;
  isHighlighted: boolean;
  onSelect: (value: string) => void;
};

const DropdownItem: React.FC<Props> = ({
  item,
  query,
  isHighlighted,
  onSelect,
}) => (
  <li
    onClick={() => onSelect(item)}
    className={`${isHighlighted ? styles.active : ""} ${styles.dropdownItem}`}
  >
    <HighlightMatch text={item} query={query} />
  </li>
);

export default DropdownItem;
