import React from "react";
import { AutoCompleteProvider } from "./context/AutoCompleteProvider";
import OriginalAutoComplete from "./components/OriginalAutoComplete";

type Props = {
  data: string[];
  placeholder: string;
  onSelect: (value: string) => void;
};

const AutoComplete: React.FC<Props> = ({ data, placeholder, onSelect }) => {
  return (
    <AutoCompleteProvider>
      <OriginalAutoComplete
        placeholder={placeholder}
        data={data}
        onSelect={onSelect}
      />
    </AutoCompleteProvider>
  );
};

export default AutoComplete;
