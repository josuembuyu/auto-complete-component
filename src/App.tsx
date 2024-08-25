import AutoComplete from "./components/AutoComplete/AutoComplete";
import { AutoCompleteProvider } from "./components/AutoComplete/context/AutoCompleteProvider";
import { data } from "./components/utils/data";

function App() {
  const handleSelect = (value: string) => {};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <AutoCompleteProvider>
        <AutoComplete
          placeholder="Type something..."
          data={data}
          onSelect={handleSelect}
        />
      </AutoCompleteProvider>
    </div>
  );
}

export default App;
