import React from 'react';
import Deck from '../deck/Deck';
import Player, { PlayerStatus } from '../player/Player';

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

interface GameProp {
    players: Player[],
    small: number,
    big: number
}

class Game {
    private potSize: number;
    private betSize: number;
    private status: GameStatus;
    private players: Player[];
    private currentPlayerIndex: number;
    private lastPlayerIndex: number;
    private deck: Deck;

    constructor(props: GameProp) {
        this.players = props.players;
        this.deck = new Deck(this.players.length);
        this.distributeHands();

        this.currentPlayerIndex = 0;
        this.lastPlayerIndex = this.players.length - 1;

        this.getBlindPot(props.small, props.big);

        this.status = GameStatus.PRE_FLOP;
    }

    private distributeHands() {
        this.players.forEach((player) => {
            player.setHands([this.deck.draw(), this.deck.draw()]);
        });
    }

    private getBlindPot(small: number, big: number) {
        this.betSize = big;
        this.potSize = small + big;
        this.players[this.lastPlayerIndex - 1].bet(small);
        this.players[this.lastPlayerIndex].bet(big);
    }
    
    public playAction(action: Action, betSize: number): void {
        if (action === Action.FOLD)
            this.actFold();
        else if (action === Action.CHECK)
            this.actCheck();
        else if (action === Action.CALL)
            this.actCall();
        else if (action === Action.BET)
            this.actBet(betSize);
    }

    private actFold() {
        this.players[this.currentPlayerIndex].setFold();
        if (this.isEndForFold()) {
            this.setEnd();
            return ;
        }
        this.moveTurn();
    }

    private actCheck() {
        if (this.betSize > this.getCurrentPlayer().getBetSize)
            throw 'Cannot check now.';
        this.moveTurn();
    }

    private actCall() {
        this.potSize += this.betSize - this.getCurrentPlayer().getBetSize;
        this.getCurrentPlayer().bet(this.betSize - 
            this.getCurrentPlayer().getBetSize);
        this.moveTurn();
    }

    private actBet(betSize: number) {
        this.potSize += betSize;
        this.getCurrentPlayer().bet(betSize);
        this.betSize = betSize;
        this.moveTurn();
    }

    private moveTurn() {
        if (this.currentPlayerIndex === this.lastPlayerIndex)
            this.setNextStatus();
        for (let i = this.currentPlayerIndex + 1; i <= this.lastPlayerIndex; i++) {
            if (this.players[i % this.players.length].getStatus 
                === PlayerStatus.PLAYING) {
                this.currentPlayerIndex = i;
                break;
            }
        }
    }

    private setNextStatus(): void {
        this.status += 1;
        this.betSize = 0;
        this.players.forEach((player) => {
            player.resetBetSize();
        })
    }

    private isEndForFold(): boolean {
        const playerNotFold = this.players.filter((player) => {
            return player.getStatus === PlayerStatus.PLAYING;
        });
        return playerNotFold.length < 2 ? true : false;
    }

    private setEnd(): void {
        this.status = GameStatus.END;
    }

    private getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    public isEnd(): boolean {
        return this.status === GameStatus.END;
    }

    public getStatus(): GameStatus {
        return this.status;
    }

    public getPotSize(): number {
        return this.potSize;
    }
}

export default Game;