import Game from "../apis/game/Game";
import Room from "../apis/room/Room";
import ActionPainter from "./ActionPainter";
import CardPainter from "./CardPainter";
import GameResultPainter from "./GameResultPainter";
import { playerPosition } from "./PokerScene";

export interface GamePainterProp {
    scene: Phaser.Scene,
    game: Game,
    room: Room,
}

export default class GamePainter {
    private scene: Phaser.Scene;
    private game: Game;
    private lastActionIndex: number;
    private room: Room;
    private cardPainter: CardPainter;
    private actionPainter: ActionPainter;

    constructor({scene, game, room}: GamePainterProp) {
        this.scene = scene;
        this.game = game;
        this.room = room;
        this.lastActionIndex = -1;
        this.cardPainter = new CardPainter({
            scene: this.scene,
            game: this.game,
            numOfPlayers: this.room.getPlayers.length
        });
        this.actionPainter = new ActionPainter({
            scene: this.scene,
            game: this.game,
            lastActionIndex: this.lastActionIndex
        });
    }

    public drawGame() {
        if (this.game.isEnd()) {
            const gameResultPainter = new GameResultPainter(this.scene);
            gameResultPainter.drawGameResult();
            return ;
        }
        this.cardPainter.drawCards();
        this.drawCurrentTurnLight();
        this.drawPotSize();
        this.actionPainter.drawAction();
        if (this.game.isMyTurn())
            this.actionPainter.drawActionForm();
    }

    private drawCurrentTurnLight() {
        const index = this.game.getCurrentTurnIndex();
        this.scene.add.pointlight(
            playerPosition[index][0], 
            playerPosition[index][1]
            , 0x33691e, 50, 1);
    }

    private drawPotSize() {
        const potSize = this.game.getPotSize();
        this.scene.add.text(650, 380, 'Pot: $' + potSize);
    }
}