import React, { useEffect, useState } from "react";
import call, { Methods } from "../utils/api";
import isLogined from "../utils/statusChecker";

function MultiRoom() {
  if (!isLogined()) window.location.href = "/login";
  if (!localStorage.getItem("roomId")) window.location.href = "/";

  const [roomId, setRoomId] = useState("");
  const [players, setPlayers] = useState([]);

  setRoomId(localStorage.getItem("roomId"));
  useEffect(() => {
    call("/room/status", Methods.GET, {
      headers: `Bearer ${localStorage.getItem("TOKEN")}`,
      data: roomId,
    }).then((response) => {
      if (response.status === 200) {
        setRoomId(response.data.roomId);
        response.data.players.forEach((player) => {
          setPlayers(players.concat(player));
        });
      }
    });
  }, [roomId, players]);

  return (
    <div>
      {players.map((player) => {
        return <div>{player.money}</div>;
      })}
    </div>
  );
}

export default MultiRoom;
