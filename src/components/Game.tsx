import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import call, { Methods } from "../utils/api";
import { useCanvas } from "../utils/hooks/useCanvas";

type Player = {
  
}

type GameProps = {
  canvasWidth: number,
  canvasHeight: number,
  players: Player[],
  bigBlind: number,
}

const Game: React.FC<GameProps> = ({
  canvasWidth,
  canvasHeight,
  players,
  bigBlind
}) => {
  let gameId = useRef("");
  const [playOrder, setPlayOrder] = useState(0);
  const [board, setBoard] = useState([]);
  const [potSize, setPotSize] = useState(0);
  const [currentBet, setCurrentBet] = useState(bigBlind);
  const [status, setStatus] = useState("PREFLOP");
  const [myTurn, setMyTurn] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const className = e.currentTarget.value;
    call("/game/action", Methods.POST, {
      gameId: gameId.current,
      action: className,
      betSize: 1000,
    });
  }

  const getGame = useCallback(() => {
    call("/game/result", Methods.GET)?.then((response: any) => {
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
  }, [playOrder]);
  

  useEffect(() => {
    function makeGame() {
      call("/game/game", Methods.POST)?.then((response) => {
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
      <form className="action" onSubmit={onSubmit}>
        <button type="submit" className="BET">
          Bet
        </button>
      </form>
    </div>
  );
}

export default Game;
