import { useEffect, useState } from "react";
import AutoComplete from "./components/AutoComplete/AutoComplete";
import { AutoCompleteProvider } from "./components/AutoComplete/context/AutoCompleteProvider";
import { data, dataFromAPI } from "./components/utils/data";

function App() {
  const [todos, setTodos] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    console.log(value);
  };

  const getData = async () => {
    const data = await dataFromAPI();

    setTodos(data);
  };

  useEffect(() => {
    getData();
  }, []);

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
