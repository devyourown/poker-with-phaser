import Phaser from "phaser";
import Card from "../domain/card/Card";
import Game from "../domain/game/Game";
import Player from "../domain/player/Player";
import { Room } from "../domain/room/Room";

const firstPosX = 300;
const firstPosY = 150;
const playerPosition = [[firstPosX, firstPosY + 150], 
[firstPosX + 200, firstPosY], [firstPosX + 400, firstPosY], 
[firstPosX + 600, firstPosY], [firstPosX + 800, firstPosY + 150], 
[firstPosX + 200, firstPosY + 300], [firstPosX + 400, firstPosY + 300], 
[firstPosX + 600, firstPosY + 300]];

export default class PokerScene extends Phaser.Scene {
    private room: Room;
    private pokerGame: Game;
    private lastActionIndex: number;

    constructor() {
        super('PokerScene');
        this.lastActionIndex = -1;
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
        this.drawRoom();
    }

    private drawRoom() {
        this.drawPlayerCircle();
        this.drawRoomButton();
        this.drawPlayers();
    }

    private drawPlayerCircle() {
        for (let i=0; i<playerPosition.length; i++) {
            this.add.circle(playerPosition[i][0], playerPosition[i][1], 30)
            .setStrokeStyle(1, 0x33adfd);
            if (this.room.getPlayers().length > i)
                this.add.image(playerPosition[i][0], playerPosition[i][1], 'user');
        }
    }

    private drawRoomButton() {
        const readyButton= this.add.text(675, 300, 'Ready')
        .setInteractive()
        .on('pointerdown', () => this.onReady(readyButton));
    }

    private onReady(button: Phaser.GameObjects.Text) {
        const text = button.text === 'Ready' ? 'Cancel' : 'Ready';
        button.setText(text);
        this.room.readyPlayer();
    }

    private drawPlayers() {
        const players: Player[] = this.room.getPlayers();
        for (let i =0; i<players.length; i++) {
            this.add.text(playerPosition[i][0] - 40, 
                playerPosition[i][1] + 40, players[i].getNickname);
            this.add.text(playerPosition[i][0] - 40, 
                playerPosition[i][1] + 60, players[i].getMoney.toString());
        }
    }

    update() {
        if ("PLAYING" === this.room.getRoomStatus()) {
            this.pokerGame = this.room.makeGame();
            this.drawGame();
        }
    }

    private drawGame() {
        this.drawPlayerCards();
        this.drawCurrentTurnLight();
        this.drawBoard();
        this.drawPotSize();
        this.drawAction();
        if (this.pokerGame.getIsMyTurn())
            this.drawActionForm();
    }

    private drawCurrentTurnLight() {

    }

    private drawAction() {
        if (this.lastActionIndex === this.pokerGame.getLastActionIndex())
            return ;
        this.lastActionIndex = this.pokerGame.getLastActionIndex();
        const action = this.pokerGame.getLastAction();
        const textAnimated = this.add.text(
            playerPosition[this.lastActionIndex][0],
            playerPosition[this.lastActionIndex][1] + 30,
            action);
        this.tweens.add({
            targets: textAnimated,
            alpha: 0,
            duration: 300,
            ease: 'Power2'
        });
    }

    private drawActionForm() {
        const form = this.add.dom(700, 700).createFromCache('actionForm');
        form.addListener('click');
        form.on('click', (event: any) => {
            event.preventDefault();
            const inputBet: any = form.getChildByID('betSize');
            this.pokerGame.playAction(event.target.innerText,
                inputBet.value);
        })
    }

    private drawPlayerCards() {
        for (let i=0; i<playerPosition.length; i++) {
            if (i === this.pokerGame.getPlayerIndex()) {
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
        const hands = this.pokerGame.getHands();
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
        const board = this.pokerGame.getBoard();
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
        const potSize = this.pokerGame.getPotSize();
        this.add.text(650, 380, 'Pot: $' + potSize);
    }
}