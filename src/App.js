import "./App.css";
import { Link } from "react-router-dom";
import { useCallback, useEffect } from "react";
import call, { Methods } from "./utils/api";

function App() {
  const onEnter = useCallback(() => {
    if (!localStorage.getItem("TOKEN")) window.location.href = "/login";
    call("/room/auto-enter", Methods.POST, {}).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("roomId", response.data.roomId);
        window.location.href = "worlds";
      }
    });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("TOKEN")) return;
    call("/room/player-maker", Methods.POST, {});
  }, []);

  return (
    <div className="App">
      <h1>Poker Play Worlds</h1>
      <div className="Links">
        <Link to="bot">
          <button>Play with bot</button>
        </Link>
        <button onClick={onEnter}>Play with worlds</button>
      </div>
    </div>
  );
}

export default App;
