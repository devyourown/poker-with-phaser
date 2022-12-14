import Phaser from "phaser";
import Game from "../apis/game/Game";
import Room from "../apis/room/Room";
import GamePainter, { GamePainterProp } from "./GamePainter";
import RoomPainter, { RoomPainterProp } from "./RoomPainter";

const firstPosX = 300;
const firstPosY = 150;
export const playerPosition = [[firstPosX, firstPosY + 150], 
[firstPosX + 200, firstPosY], [firstPosX + 400, firstPosY], 
[firstPosX + 600, firstPosY], [firstPosX + 800, firstPosY + 150], 
[firstPosX + 200, firstPosY + 340], [firstPosX + 400, firstPosY + 340], 
[firstPosX + 600, firstPosY + 340]];

export default class PokerScene extends Phaser.Scene {
    private room: Room;
    private pokerGame: Game | null;
    private frameTime: number;
    private roomPainter: RoomPainter;
    private gamePainter: GamePainter;

    constructor() {
        super('PokerScene');
        this.frameTime = 0;
        this.pokerGame = null;
    }

    preload() {
        this.load.html('actionForm', process.env.PUBLIC_URL + '/assets/html/action-form.html');
        this.load.image('backCard', process.env.PUBLIC_URL + '/assets/back.png');
        this.load.image('user', process.env.PUBLIC_URL + '/assets/user_icon.png');
    }

    create() {
        const roomId: string = localStorage.getItem("roomId")!;
        if (roomId === null)
            return ;
        this.room = new Room(roomId);
        const prop: RoomPainterProp = {
            room: this.room,
            scene: this,
        }
        this.roomPainter = new RoomPainter(prop);
        this.roomPainter.drawRoom();
    }

    update(time: number, delta: number) {
        this.frameTime += delta;
        if (this.frameTime < 3000)
            return ;
        this.frameTime = 0;
        this.room.update();
        if (this.room.isRoomChanged()) {
            this.scene.restart();
            this.roomPainter.drawRoom();
        }
        if ("PLAYING" === this.room.getRoomStatus()) {
            this.getGame();
            if (this.pokerGame?.isGameChanged())
                this.gamePainter.drawGame();
        }
    }

    private getGame() {
        if (this.pokerGame === null) {
            this.pokerGame = this.room.makeGame();
            const prop: GamePainterProp = {
                scene: this,
                game: this.pokerGame,
                room: this.room
            }
            this.gamePainter = new GamePainter(prop);
        }
        this.pokerGame.getGame();
    }
}