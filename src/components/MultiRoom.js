import React from "react";

function MultiRoom() {
  if (!localStorage.getItem("roomId")) window.location.href = "/";
  return <div id="phaser-container"></div>;
}

export default MultiRoom;
