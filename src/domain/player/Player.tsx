import { randomUUID } from 'crypto';
import React from 'react';
import Card from '../deck/Card';

class Player {
    private id: string;
    private money: number;
    private hands: Card[];

    constructor(props) {
        this.id = randomUUID();
        this.money = props.money;
    }

    public setHands(hands: Card[]) {
        this.hands = hands;
    }

    public isMyself(player: Player): boolean {
        return this.id === player.id;
    }
}

export default Player;