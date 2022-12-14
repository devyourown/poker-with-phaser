import call, { Methods } from "../../utils/api";
import Game from "../game/GameDTO";
import Player from "../player/PlayerDTO";

export default class RoomDTO {
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

    leaveRoom() {
      call("/room-out", Methods.POST, {});
    }

    makeGame() {
      return new Game({
        playerIndex: this.getPlayerIndex(),
        small: 100,
        big: 200,
      });
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

    getRoomStatus() {
      return this.status;
    }

    isRoomChanged() {
      return this.isChanged;
    }
}