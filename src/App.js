import "./App.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import call, { Methods } from "./utils/api";
import { getTokenHeader } from "./utils/statusChecker";

function App() {
  const onEnter = useEffect(() => {
    call("/room/auto-enter", Methods.POST, getTokenHeader()).then(
      (response) => {
        if (response.status === 200) {
          localStorage.setItem("roomId", response.roomId);
        }
      }
    );
  }, []);

  return (
    <div className="App">
      <h1>Poker Play Worlds</h1>
      <div className="Links">
        <Link to="bot">
          <button>Play with bot</button>
        </Link>
        <Link to="worlds">
          <button onClick={onEnter}>Play with worlds</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
