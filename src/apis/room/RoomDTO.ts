import Game from "../game/GameDTO";
import Player from "../player/PlayerDTO";
import RoomApi from "./RoomApi";

export default class RoomDTO {
    private roomId: string;
    private players: Player[]
    private status: string;
    private isChanged: boolean;
    private shouldStop: boolean;

    constructor(roomId: string) {
        this.roomId = roomId;
        this.players = [];
        this.update();
        this.isChanged = false;
    }


    update() {
      const result = RoomApi.getRoomStatus(this.roomId);
      this.setPlayers(result.players);
      this.setStatus(result.status);
      this.setChanged(result.isChanged);
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
      RoomApi.leaveRoom();
    }

    makeGame() {
      return new Game({
        playerIndex: this.getPlayerIndex(),
        small: 100,
        big: 200,
      });
    }

    private getPlayerIndex(): number {
      return RoomApi.getPlayerIndex(this.roomId);
    }

    readyToExit() {

    }

    readyPlayer() {
      const status = RoomApi.readyPlayer(this.roomId);
      this.setStatus(status);
    }

    setStatus(status: string) {
      this.status = status;
    }

    setChanged(isChanged: boolean) {
      this.isChanged = isChanged;
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

    shouldRoomStop() {
      return this.shouldStop;
    }
}