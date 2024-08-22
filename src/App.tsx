import AutoComplete from "./components/AutoComplete/AutoComplete";
import { data } from "./components/utils/data";

function App() {
  const handleSelect = (value: string) => {
    console.log("Selected:", value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <AutoComplete
        placeholder="Type something..."
        data={data}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default App;
