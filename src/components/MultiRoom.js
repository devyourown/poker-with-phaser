import React from "react";
import Phaser from "phaser";
import { gameConfig } from "../PhaserGame";

function MultiRoom() {
  if (!localStorage.getItem("roomId")) window.location.href = "/";
  new Phaser.Game(gameConfig);
  return <div id="phaser-container"></div>;
}

export default MultiRoom;
