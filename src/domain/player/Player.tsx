import { randomUUID } from 'crypto';
import React from 'react';
import Card from '../deck/Card';

export enum PlayerStatus {
    FOLD,
    PLAYING
}

export default class Player {
    private id: string;
    private money: number;
    private nikcname: string;
    private hands: Card[];
    private status: PlayerStatus;
    private betSize: number;

    constructor(money: number) {
        this.id = randomUUID();
        this.money = money;
        this.status = PlayerStatus.PLAYING;
        this.betSize = 0;
    }

    get getMoney() {
        return this.money;
    }

    get getNickname() {
        return this.nikcname;
    }
}