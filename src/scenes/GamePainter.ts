import Card from "../apis/card/Card";
import Game from "../apis/game/Game";
import GameResult from "../apis/game/GameResult";
import Room from "../apis/room/Room";
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

    constructor({scene, game, room}: GamePainterProp) {
        this.scene = scene;
        this.game = game;
        this.room = room;
        this.lastActionIndex = -1;
    }

    public drawGame() {
        if (this.game.isEnd()) {
            const gameResult = this.drawGameResult();
            this.drawAfterGame(gameResult);
        }
        this.drawPlayerCards();
        this.drawCurrentTurnLight();
        this.drawBoard();
        this.drawPotSize();
        this.drawAction();
        if (this.game.isMyTurn())
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

    private drawPlayerCards() {
        for (let i=0; i<this.room.getPlayers().length; i++) {
            if (i === this.game.getPlayerIndex()) {
                this.drawHands(i);
                continue;
            }
            this.drawOtherHands(i);
        }
    }

    private drawHands(posIndex: number) {
        this.loadHands();
        this.scene.load.start();
        this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
            const playerHand = this.scene.add.image(
                playerPosition[posIndex][0] + 70, 
                playerPosition[posIndex][1], 
                'hand0');
            const playerHand2 = this.scene.add.image(
                playerPosition[posIndex][0] + 100,
                playerPosition[posIndex][1], 
                'hand1');
            playerHand.scale = 0.25;
            playerHand2.scale = 0.25;
        });
    }

    private loadHands() {
        const hands = this.game.getHands();
        hands.forEach((card, index) => {
            this.scene.load.image('hand' + index, process.env.PUBLIC_URL 
            + '/assets/' + card.getSuit() + 
            '/' + card.getSuit() + card.getValue() +'.svg');
        });
    }

    private drawOtherHands(posIndex: number) {
        const backCard = this.scene.add.image(
            playerPosition[posIndex][0] + 70,
            playerPosition[posIndex][1], 
            'backCard');
        const backCard2 = this.scene.add.image(
            playerPosition[posIndex][0] + 100,
            playerPosition[posIndex][1], 
            'backCard');
        backCard.scale = 0.06;
        backCard2.scale = 0.06;
    }

    private drawCurrentTurnLight() {
        const index = this.game.getCurrentTurnIndex();
        this.scene.add.pointlight(
            playerPosition[index][0], 
            playerPosition[index][1]
            , 0x33691e, 50, 1);
    }

    private drawAction() {
        if (this.lastActionIndex === this.game.getLastActionIndex())
            return ;
        this.lastActionIndex = this.game.getLastActionIndex();
        const action = this.game.getLastAction();
        const textAnimated = this.scene.add.text(
            playerPosition[this.lastActionIndex][0] - 20,
            playerPosition[this.lastActionIndex][1] - 70,
            action);
        textAnimated.scale = 1.5;
        this.scene.tweens.add({
            targets: textAnimated,
            alpha: 0,
            duration: 2500,
            ease: 'Power2'
        });
    }

    private drawBoard() {
        const board = this.game.getBoard();
        if (board === null)
            return ;
        this.loadBoard(board);
        this.scene.load.start();
        this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
            for (let i=0; i<board.length; i++) {
                const card = this.scene.add.image(620 + (70 * i) , 300, 
                    'board' + i);
                card.scale = 0.4;
            }
        });
    }

    private loadBoard(board: Card[]) {
        board.forEach((card, index) => {
            this.scene.load.image('board' + index, process.env.PUBLIC_URL + 
            '/assets/' + card.getSuit() + '/' + 
            card.getSuit() + card.getValue() + '.svg');
        })
    }

    private drawPotSize() {
        const potSize = this.game.getPotSize();
        this.scene.add.text(650, 380, 'Pot: $' + potSize);
    }

    private drawActionForm() {
        const form = this.scene.add.dom(700, 700).createFromCache('actionForm');
        form.addListener('click');
        form.on('click', (event: any) => {
            event.preventDefault();
            if (event.target.innerText.length > 6)
                return ;
            const inputBet: any = form.getChildByID('betSize');
            this.game.playAction(event.target.innerText,
                inputBet.value);
        })
    }
}