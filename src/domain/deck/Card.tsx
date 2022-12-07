import React from 'react';

enum Suit {
    CLOVER,
    HEART,
    DIAMOND,
    SPADE
}

export default class Card {
    private suit: string;
    private value: string;

    private constructor(suit: string, value: string) {
        this.suit = suit;
        this.value = value;
    }

    getSuit() {
        return this.suit;
    }

    getValue() {
        return this.value;
    }
}