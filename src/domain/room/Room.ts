import call, { Methods } from "../../utils/api";
import Game, { GameProp } from "../game/Game";
import Player from "../player/Player";

export class Room {
    private roomId: string;
    private players: Player[]
    private status: string;

    constructor(roomId: string) {
        this.roomId = roomId;
        this.setPlayersFromServer();
    }

    private setPlayersFromServer() {
        call("/room/room-status", Methods.POST, {
          roomId: this.roomId,
        })?.then((response) => {
          if (response.status === 200) {
            this.setPlayers(response.data.players);
          }
        });
    }

    private setPlayers(players: []) {

    }

    getPlayers() {
      return this.players;
    }

    getOutOfRoom() {
        call("/room-out", Methods.POST, {});
    }

    readyPlayer() {
        call("/room/player-status-change", Methods.POST, {
            roomId: this.roomId,
        });
    }

    getRoomStatus() {
      return this.status;
    }

    makeGame() {
      const prop: GameProp = {
        players: this.players,
        small: 100,
        big: 200,
      }
      return new Game(prop);
    }
}