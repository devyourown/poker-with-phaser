import React, { useCallback, useEffect, useState } from "react";
import call, { Methods } from "../utils/api";
import Player from "./Player";

function MultiRoom() {
  if (!localStorage.getItem("roomId")) window.location.href = "/";

  const roomId = localStorage.getItem("roomId");
  const [players, setPlayers] = useState([]);
  const [stop, setStop] = useState(false);

  function getPlayers() {
    call("/room/room-status", Methods.POST, {
      roomId: roomId,
    }).then((response) => {
      if (response.status === 403) window.location.href = "/login";
      if (response.status === 200) {
        setPlayers(response.data.players);
        if (response.data.status === "PLAYING") setStop(true);
      }
    });
  }

  const onReady = useCallback(() => {
    call("/room/player-status-change", Methods.POST, {
      roomId: roomId,
    });
    getPlayers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!stop) {
        getPlayers();
      }
    }, 3000);
    return () => {
      call("/room-out", Methods.POST, {});
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div>방</div>
      <div>
        {players &&
          players.map((player) => {
            return (
              <Player
                id={player.id}
                nickname={player.nickname}
                money={player.money}
                ready={player.ready}
                onReady={onReady}
              />
            );
          })}
      </div>
    </div>
  );
}

export default MultiRoom;
