import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Charts } from "./components/charts";
import { Filter } from "./components/filter";
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/data`);
        //console.log(data.length);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handleData = (data) => {
    setData(data);
  };
  return (
    <div>
      <Filter ondata={handleData} />
      {data && data.length && <Charts data={data} />}
      {data && data.length === 0 && (
        <div className="container">
          <div className="no-data">
            <h2>No Data Found</h2>
            <p>Please remove some filters.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
