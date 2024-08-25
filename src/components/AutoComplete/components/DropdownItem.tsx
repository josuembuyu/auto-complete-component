import { forwardRef } from "react";
import styles from "../AutoComplete.module.css";
import HighlightMatch from "./HighlightMatch";

type Props = {
  item: string;
  query: string;
  style: any;
  isHighlighted: boolean;
  onSelect: (value: string) => void;
};

const DropdownItem = forwardRef<HTMLLIElement, Props>(
  ({ item, query, style, isHighlighted, onSelect }, ref) => (
    <li
      style={style}
      ref={ref}
      onClick={() => onSelect(item)}
      className={`${isHighlighted ? styles.active : ""} ${styles.dropdownItem}`}
    >
      <HighlightMatch text={item} query={query} />
    </li>
  )
);

export default DropdownItem;
