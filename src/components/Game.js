import { METHODS } from "http";
import React, { useEffect, useRef, useState } from "react";
import call, { Methods } from "../utils/api";

function Game({ players, bigBlind }) {
  let gameId = useRef("");
  const canvasRef = useRef(null);
  const [playOrder, setPlayOrder] = useState(0);
  const [board, setBoard] = useState([]);
  const [potSize, setPotSize] = useState(0);
  const [currentBet, setCurrentBet] = useState(bigBlind);
  const [status, setStatus] = useState("PREFLOP");
  const [myTurn, setMyTurn] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const className = e.submitter.className;
    call("/game/action", Methods.POST, {
      gameId: gameId.current,
      action: className,
      betSize: 1000,
    });
  }

  function getGame() {
    call("/game/result", Methods.GET).then((response) => {
      if (response.status === 200) {
        if (playOrder !== response.turnIndex) {
          setPlayOrder(response.data.turnIndex);
          setBoard(response.data.board);
          setPotSize(response.data.potSize);
          setCurrentBet(response.data.currentBet);
          setStatus(response.data.gameStatus);
          setMyTurn(response.data.isMyTurn);
        }
      }
    });
  }

  useEffect(() => {
    function makeGame() {
      call("/game/game", Methods.POST).then((response) => {
        if (response.status === 200) {
          setMyTurn(response.data.isMyTurn);
          gameId.current = response.data.gameId;
        }
      });
    }
    makeGame();
  });
  return (
    <div>
      <canvas ref={canvasRef} />
      <form className="action" onSubmit={onSubmit}>
        <button type="submit" className="BET">
          Bet
        </button>
      </form>
    </div>
  );
}

export default Game;
