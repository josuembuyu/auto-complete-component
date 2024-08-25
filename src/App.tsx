import { useEffect, useState } from "react";
import AutoComplete from "./components/AutoComplete/AutoComplete";
import { data, dataFromAPI } from "./components/utils/data";

function App() {
  const [users, setUsers] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    console.log(value);
  };

  const getData = async () => {
    const data = await dataFromAPI();
    setUsers(data);
  };

  useEffect(() => {
    getData();
  }, []);

  // users state contain data that comes from an api
  // data contains fake data you can pass it to the AutoComplete component if you need to test if how component can receive any amount of data in order to check from performance

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "sans-serif",
        gap: "10px",
      }}
    >
      <div>
        <p>AutoComplete with data from API</p>
        <AutoComplete
          placeholder="Type something..."
          data={users}
          onSelect={handleSelect}
        />
      </div>

      <div>
        <p>AutoComplete with large dataset (1M items)</p>
        <AutoComplete
          placeholder="Type something..."
          data={data}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}

export default App;
