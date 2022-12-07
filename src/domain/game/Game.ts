import { Methods } from './../../utils/api';
import React from 'react';
import call from '../../utils/api';
import Player, { PlayerStatus } from '../player/Player';
import Card from '../deck/Card';

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
    private players: Player[];
    private isProgressed: boolean;
    private hands: Card[];
    private playerIndex: number;

    constructor({players, small, big}: GameProp) {
        this.players = players;
        call("/game/game", Methods.POST)?.then((response) => {
            if (response.status === 200) {
              this.isMyTurn = response.data.isMyTurn;
              this.gameId = response.data.gameId;
              this.board = [];
              this.potSize = small + big;
              this.currentBetSize = big;
            }
        });
    }

    getGame() {
        call("/game/result", Methods.GET)?.then((response: any) => {
            if (response.status === 200) {
                this.isProgressed = true;
                this.board = response.data.board;
                this.potSize = response.data.potSize;
                this.currentBetSize = response.data.currentBet;
                this.status = response.data.gameStatus;
                this.isMyTurn = response.data.isMyTurn;
            }
        }).catch((error) => {
            this.isProgressed = false;
        });
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
    
    getIsProgressed() {
        return this.isProgressed;
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
}