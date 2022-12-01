import React from 'react';

enum Suit {
    CLOVER,
    HEART,
    DIAMOND,
    SPADE
}

class Card {
    private suit: Suit;
    private value: number;
    private static cardMap: Map<string, Card> = new Map();

    private constructor(suit: Suit, value: number) {
        this.suit = suit;
        this.value = value;
    }
    
    public static getCard(suit: Suit, value: number): Card {
        const cardStr = suit + ":" + value;
        if (!this.cardMap.has(cardStr))
            this.cardMap.set(cardStr, new Card(suit, value));
        return this.cardMap.get(cardStr) as Card;
    }

    public toString(): string {
        return this.suit + ":" + this.value;
    }
}

export default Card;