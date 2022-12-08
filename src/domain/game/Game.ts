import { Methods } from './../../utils/api';
import call from '../../utils/api';
import Player from '../player/Player';
import Card from '../card/Card';

export enum GameStatus {
    PRE_FLOP,
    FLOP,
    TURN,
    RIVER,
    END
}

export enum Action {
    FOLD,
    CHECK,
    CALL,
    BET
}

export interface GameProp {
    players: Player[],
    small: number,
    big: number
}

export default class Game {
    private gameId: string;
    private isMyTurn: boolean;
    private board: Card[];
    private potSize: number;
    private currentBetSize: number;
    private status: string;
    private hands: Card[];
    private playerIndex: number;
    private lastActionIndex: number;
    private lastAction: string;

    constructor({small, big}: GameProp) {
        call("/game/game", Methods.POST)?.then((response) => {
            if (response.status === 200) {
              this.isMyTurn = response.data.isMyTurn;
              this.gameId = response.data.gameId;
              this.board = [];
              this.potSize = small + big;
              this.currentBetSize = big;
              this.lastActionIndex = -1;
              this.setHands();
            }
        });
    }

    private setHands() {
        call("/game/hands", Methods.GET)?.then((response) => {
            this.hands = [];
            for (let i=0; i<2; i++) {
                this.hands.push(new Card(
                    response.data.hands[i].suit,
                    response.data.hands[i].value
                ));
            }
        });
    }

    getGame() {
        call("/game/result", Methods.GET)?.then((response: any) => {
            if (response.status === 200) {
                this.setBoard(response.data.board);
                this.potSize = response.data.potSize;
                this.currentBetSize = response.data.currentBet;
                this.status = response.data.gameStatus;
                this.isMyTurn = response.data.isMyTurn;
                this.lastActionIndex = response.data.lastActionIndex;
                this.lastAction = response.data.lastAction;
            }
        });
    }

    private setBoard(board: any[]) {
        if (board.length === this.board.length)
            return ;
        board.forEach((value) => {
            this.board.push(new Card(
                value.suit,
                value.value
            ));
        })
    }

    playAction(action: String, betSize: number) {
        call("/game/action", Methods.POST, {
            gameId: this.gameId,
            action: action,
            betSize: betSize,
        });
    }

    getIsMyTurn() {
        return this.isMyTurn;
    }

    getBoard() {
        return this.board;
    }

    getPotSize() {
        return this.potSize;
    }

    getHands() {
        return this.hands;
    }

    getPlayerIndex() {
        return this.playerIndex;
    }

    getLastActionIndex() {
        return this.lastActionIndex;
    }

    getLastAction() {
        return this.lastAction;
    }
}