import Card from '../card/CardDTO';
import GameApi from './GameApi';

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
        this.gameId = GameApi.getGameId().gameId;
        this.board = [];
        this.potSize = small + big;
        this.currentBetSize = big;
        this.lastActionIndex = -1;
        this.setHands();
    }

    private setHands() {
        this.hands = GameApi.getHands().hands;
    }

    getGame() {
        const result = GameApi.getGame();
        this.setBoard(result.board);
        this.potSize = result.potSize;
        this.currentBetSize = result.currentBet;
        this.status = result.gameStatus;
        this.currentTurnIndex = result.currentTurnIndex;
        this.lastActionIndex = result.lastActionIndex;
        this.lastAction = result.lastAction;
        this.isChanged = result.isChanged;
    }

    private setBoard(board: any[]) {
        if (board.length === this.board.length)
            return ;
        board.forEach((value) => {
            this.board.push(new Card(
                value.suit,
                value.value
            ));
        });
    }

    playAction(action: string, betSize: number) {
        this.validateAction(action, betSize);
        GameApi.playAction(this.gameId, action, betSize);
    }

    private validateAction(action: string, betSize: number) {
        if (action === "BET" && betSize < this.currentBetSize)
            throw new Error("BetSize is small");
    }

    restart() {
        GameApi.restartGame();
    }

    leaveGame() {
        GameApi.leaveGame();
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

    getCurrentBetSize() {
        return this.currentBetSize;
    }
}