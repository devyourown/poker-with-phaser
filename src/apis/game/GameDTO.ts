import { Methods } from '../../utils/api';
import call from '../../utils/api';
import Card from '../card/CardDTO';

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
    playerIndex: number,
    small: number,
    big: number
}

export default class GameDTO {
    private gameId: string;
    private currentTurnIndex: number;
    private board: Card[];
    private potSize: number;
    private currentBetSize: number;
    private status: string;
    private hands: Card[];
    private playerIndex: number;
    private lastActionIndex: number;
    private lastAction: string;
    private isChanged: boolean;

    constructor({playerIndex, small, big}: GameProp) {
        this.playerIndex = playerIndex;
        call("/game/game", Methods.POST)?.then((response) => {
            if (response.status === 200) {
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
        this.isChanged = false;
        call("/game/game", Methods.GET)?.then((response) => {
            if (response.status === 200) {
                this.setBoard(response.data.board);
                this.potSize = response.data.potSize;
                this.currentBetSize = response.data.currentBet;
                this.status = response.data.gameStatus;
                this.currentTurnIndex = response.data.currentTurnIndex;
                this.lastActionIndex = response.data.lastActionIndex;
                this.lastAction = response.data.lastAction;
                this.isChanged = true;
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

    isEnd() {
        return this.status === "END";
    }

    isGameChanged() {
        return this.isChanged;
    }

    isMyTurn() {
        return this.playerIndex === this.currentTurnIndex;
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

    getCurrentTurnIndex() {
        return this.currentTurnIndex;
    }

    getLastActionIndex() {
        return this.lastActionIndex;
    }

    getLastAction() {
        return this.lastAction;
    }
}