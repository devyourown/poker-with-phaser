import { playerPosition } from './PokerScene';
import Game from "../apis/game/GameDTO";
import Card from '../apis/card/CardDTO';

export interface CardPainterProp {
    scene: Phaser.Scene,
    game: Game,
    numOfPlayers: number
}

export default class CardPainter {
    private game: Game;
    private scene: Phaser.Scene;
    private numOfPlayers: number;

    constructor({scene, game, numOfPlayers}: CardPainterProp) {
        this.scene = scene;
        this.game = game;
        this.numOfPlayers = numOfPlayers;
    }

    public drawCards() {
        this.drawPlayerCards();
        this.drawBoard();
    }

    private drawPlayerCards() {
        for (let i=0; i < this.numOfPlayers; i++) {
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

}