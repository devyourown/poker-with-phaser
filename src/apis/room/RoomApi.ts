import call, { Methods } from "../../utils/api";

export default class RoomApi {
    public static getRoomStatus(roomId: string) {
        const result: any = {};
        result.isChanged = false;
        call("/room/room-status", Methods.POST, {
          roomId: roomId,
        })?.then((response) => {
          if (response.status === 200) {
            result.players = response.data.players;
            result.status = response.data.status;
            result.isChanged = true;
          }
        });
        return result;
    }

    public static leaveRoom() {
        call("/room-out", Methods.POST, {});
    }

    public static getPlayerIndex(roomId: string): number {
        let result = -1;
        call("/room/player-index", Methods.GET, {
            roomId: roomId
        })?.then((response) => {
            result = response.data;
        });
        return result;
    }

    public static readyPlayer(roomId: string): string {
        let result = "";
        call("/room/player-status-change", Methods.POST, {
            roomId: roomId,
        })?.then((response) => {
          result = response.data.status;
        });
        return result;
    }
}