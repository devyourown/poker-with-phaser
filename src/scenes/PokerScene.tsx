import Phaser from "phaser";
import Card from "../apis/card/Card";
import Game from "../apis/game/Game";
import GameResult from "../apis/game/GameResult";
import Room from "../apis/room/Room";
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
    private lastActionIndex: number;
    private frameTime: number;
    private roomPainter: RoomPainter;

    constructor() {
        super('PokerScene');
        this.lastActionIndex = -1;
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
                this.drawGame();
            if (this.pokerGame?.isEnd()) {
                const result = this.drawGameResult();
                this.drawAfterGame(result);
            }
        }
    }

    private getGame() {
        if (this.pokerGame === null)
            this.pokerGame = this.room.makeGame();
        this.pokerGame.getGame();
    }

    private drawGame() {
        if (this.pokerGame?.isEnd()) {
            const gameResult = this.drawGameResult();
            this.drawAfterGame(gameResult);
        }
        this.drawPlayerCards();
        this.drawCurrentTurnLight();
        this.drawBoard();
        this.drawPotSize();
        this.drawAction();
        if (this.pokerGame?.isMyTurn())
            this.drawActionForm();
    }

    private drawGameResult(): GameResult {
        const gameResult = new GameResult();
        //draw gameResult
        return gameResult;
    }

    private drawAfterGame(result: GameResult) {
        //if game should be removed, init room
        //else reset game, and resume game
    }

    private drawCurrentTurnLight() {
        const index = this.pokerGame!.getCurrentTurnIndex();
        this.add.pointlight(
            playerPosition[index][0], 
            playerPosition[index][1]
            , 0x33691e, 50, 1);
    }

    private drawAction() {
        if (this.lastActionIndex === this.pokerGame!.getLastActionIndex())
            return ;
        this.lastActionIndex = this.pokerGame!.getLastActionIndex();
        const action = this.pokerGame!.getLastAction();
        const textAnimated = this.add.text(
            playerPosition[this.lastActionIndex][0] - 20,
            playerPosition[this.lastActionIndex][1] - 70,
            action);
        textAnimated.scale = 1.5;
        this.tweens.add({
            targets: textAnimated,
            alpha: 0,
            duration: 2500,
            ease: 'Power2'
        });
    }

    private drawActionForm() {
        const form = this.add.dom(700, 700).createFromCache('actionForm');
        form.addListener('click');
        form.on('click', (event: any) => {
            event.preventDefault();
            if (event.target.innerText.length > 6)
                return ;
            const inputBet: any = form.getChildByID('betSize');
            this.pokerGame!.playAction(event.target.innerText,
                inputBet.value);
        })
    }

    private drawPlayerCards() {
        for (let i=0; i<this.room.getPlayers().length; i++) {
            if (i === this.pokerGame!.getPlayerIndex()) {
                this.drawHands(i);
                continue;
            }
            this.drawOtherHands(i);
        }
    }

    private drawHands(posIndex: number) {
        this.loadHands();
        this.load.start();
        this.load.once(Phaser.Loader.Events.COMPLETE, () => {
            const playerHand = this.add.image(
                playerPosition[posIndex][0] + 70, 
                playerPosition[posIndex][1], 
                'hand0');
            const playerHand2 = this.add.image(
                playerPosition[posIndex][0] + 100,
                playerPosition[posIndex][1], 
                'hand1');
            playerHand.scale = 0.25;
            playerHand2.scale = 0.25;
        });
    }

    private loadHands() {
        const hands = this.pokerGame!.getHands();
        hands.forEach((card, index) => {
            this.load.image('hand' + index, process.env.PUBLIC_URL 
            + '/assets/' + card.getSuit() + 
            '/' + card.getSuit() + card.getValue() +'.svg');
        });
    }

    private drawOtherHands(posIndex: number) {
        const backCard = this.add.image(
            playerPosition[posIndex][0] + 70,
            playerPosition[posIndex][1], 
            'backCard');
        const backCard2 = this.add.image(
            playerPosition[posIndex][0] + 100,
            playerPosition[posIndex][1], 
            'backCard');
        backCard.scale = 0.06;
        backCard2.scale = 0.06;
    }

    private drawBoard() {
        const board = this.pokerGame!.getBoard();
        if (board === null)
            return ;
        this.loadBoard(board);
        this.load.start();
        this.load.once(Phaser.Loader.Events.COMPLETE, () => {
            for (let i=0; i<board.length; i++) {
                const card = this.add.image(620 + (70 * i) , 300, 
                    'board' + i);
                card.scale = 0.4;
            }
        });
    }

    private loadBoard(board: Card[]) {
        board.forEach((card, index) => {
            this.load.image('board' + index, process.env.PUBLIC_URL + 
            '/assets/' + card.getSuit() + '/' + 
            card.getSuit() + card.getValue() + '.svg');
        })
    }

    private drawPotSize() {
        const potSize = this.pokerGame!.getPotSize();
        this.add.text(650, 380, 'Pot: $' + potSize);
    }
}