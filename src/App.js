import "./App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import call, { Methods } from "./utils/api";

function App() {
  const [data, setData] = useState([]);
  const clickAPI = () => {
    const result = call("/posts", Methods.GET, {});
    result.then((response) => {
      if (response.status === 200) {
        setData(response.data);
      }
    });
  };

  return (
    <div className="App">
      <h1>Poker Play Worlds</h1>
      <div className="Links">
        <Link to="bot">
          <button>Play with bot</button>
        </Link>
        <Link to="worlds">
          <button>Play with worlds</button>
        </Link>
      </div>
      <button onClick={clickAPI}>API</button>
      <div>
        {data.map((value, index) => {
          return (
            <div key={index}>
              <div>title: {value.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
