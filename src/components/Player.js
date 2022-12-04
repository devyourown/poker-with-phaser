import React from "react";

function Player({ id, nickname, money, ready, onReady }) {
  return (
    <div className="container" key={id}>
      <h4>
        <b>{nickname}</b>
      </h4>
      <p>Money: {money}</p>
      <p>{ready}</p>
      <button onClick={onReady}>{ready ? "Cancel" : "Ready"}</button>
    </div>
  );
}

export default Player;
