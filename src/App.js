import "./App.css";
import { Link } from "react-router-dom";

function App() {
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
    </div>
  );
}

export default App;
