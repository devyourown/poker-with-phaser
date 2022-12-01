import { randomUUID } from 'crypto';
import React from 'react';
import Card from '../deck/Card';

export enum PlayerStatus {
    FOLD,
    PLAYING
}

class Player {
    private id: string;
    private money: number;
    private hands: Card[];
    private status: PlayerStatus;
    private betSize: number;

    constructor(money: number) {
        this.id = randomUUID();
        this.money = money;
        this.status = PlayerStatus.PLAYING;
        this.betSize = 0;
    }

    public call(betSize: number) {
        if (this.betSize - this.getBetSize > this.money)
            throw 'Over Betting.';
        this.money -= this.betSize - this.getBetSize;
        this.betSize = betSize;
    }

    public bet(betSize: number) {
        if (betSize > this.money)
            throw 'Over Betting.';
        this.money -= betSize;
        this.betSize = betSize;
    }

    public setHands(hands: Card[]) {
        this.hands = hands;
    }

    public equals(player: Player): boolean {
        return this.id === player.id;
    }

    get getStatus() {
        return this.status;
    }

    public setFold() {
        this.status = PlayerStatus.FOLD;
    }

    get getBetSize() {
        return this.betSize;
    }

    public resetBetSize() {
        this.betSize = 0;
    }
}

export default Player;