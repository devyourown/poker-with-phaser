import Player from "../apis/player/PlayerDTO";
import Room from "../apis/room/RoomDTO";
import { playerPosition } from "./PokerScene";

export interface RoomPainterProp {
    room: Room,
    scene: Phaser.Scene;
}

export default class RoomPainter {
    private scene: Phaser.Scene;
    private room: Room;
    private readyButton: Phaser.GameObjects.Text;
    private players: Player[];

    constructor({room, scene}: RoomPainterProp) {
        this.room = room;
        this.scene = scene;
        this.players = [];
    }

    public drawRoom() {
        this.drawPlayerCircle();
        this.drawRoomButton();
        this.drawPlayers();
    }

    private drawPlayerCircle() {
        for (let i=0; i < playerPosition.length; i++) {
            if (this.room.getPlayers().length > i) {
                const user = this.scene.add.image(
                    playerPosition[i][0], 
                    playerPosition[i][1], 'user');
                user.scale = 0.6;
            } else {
                this.scene.add.circle(playerPosition[i][0], playerPosition[i][1], 30)
                .setStrokeStyle(1, 0x33adfd);
            }
        }
    }

    private drawRoomButton() {
        if (this.readyButton !== undefined)
            return ;
        this.readyButton = this.scene.add.text(675, 300, 'Ready')
        .setInteractive()
        .on('pointerdown', () => this.onReady());
    }

    private onReady() {
        const text = this.readyButton.text === 'Ready' ?
         'Cancel' : 'Ready';
        this.readyButton.setText(text);
        this.room.readyPlayer();
    }

    private drawPlayers() {
        if (this.players.length === this.room.getPlayers().length)
            return ;
        this.players = this.room.getPlayers();
        for (let i =0; i < this.players.length; i++) {
            this.scene.add.text(playerPosition[i][0] - 40, 
                playerPosition[i][1] + 40, this.players[i].getNickname);
            this.scene.add.text(playerPosition[i][0] - 40, 
                playerPosition[i][1] + 60, this.players[i].getMoney.toString());
        }
    }
}