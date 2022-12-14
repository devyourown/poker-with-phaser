import call, { Methods } from "../../utils/api";
import Game, { GameProp } from "../game/Game";
import Player from "../player/Player";

export default class Room {
    private roomId: string;
    private players: Player[]
    private status: string;
    private isChanged: boolean;

    constructor(roomId: string) {
        this.roomId = roomId;
        this.players = [];
        this.update();
        this.isChanged = false;
    }


    update() {
      this.isChanged = false;
      call("/room/room-status", Methods.POST, {
        roomId: this.roomId,
      })?.then((response) => {
        if (response.status === 200) {
          this.setPlayers(response.data.players);
          this.status = response.data.status;
          this.isChanged = true;
        }
      });
    }

    private isPlayerChanged(players: any[]): boolean {
      if (this.players.length !== players.length)
        return true;
      for (let i=0; i < players.length; i++) {
        if (this.players[i].getNickname !== players[i].nickname)
          return true;
      }
      return false;
    }

    private setPlayers(players: any[]) {
      if (players.length === this.players.length)
        return;
      this.players = [];
      players.forEach((value) => {
        this.players.push(new Player(
          value.money,
          value.nickname,
          value.isReady
        ));
      });
    }

    makeGame() {
      const prop: GameProp = {
        playerIndex: this.getPlayerIndex(),
        small: 100,
        big: 200,
      }
      return new Game(prop);
    }

    private getPlayerIndex(): number {
      call("/room/player-index", Methods.GET, {
        roomId: this.roomId
      })?.then((response) => {
        return response.data;
      });
      return -1;
    }

    readyPlayer() {
      call("/room/player-status-change", Methods.POST, {
          roomId: this.roomId,
      })?.then((response) => {
        this.status = response.data.status;
      });
    }

    getPlayers() {
      return this.players;
    }

    getOutOfRoom() {
        call("/room-out", Methods.POST, {});
    }

    getRoomStatus() {
      return this.status;
    }

    isRoomChanged() {
      return this.isChanged;
    }
}