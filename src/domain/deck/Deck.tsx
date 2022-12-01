import React from 'react';
import Card from './Card';

class Deck {
    private deck: Card[];

    constructor(playerSize: number) {
        while (this.deck.length < playerSize * 2 + 5) {
            const newCard = Card.getCard(
                this.getRandomInt(0, 4),
                this.getRandomInt(1, 14)
            );
            if (this.isDuplicated(newCard))
                continue;
            this.deck.push(newCard);
        }
    }

    public draw(): Card {
        if (this.deck.length == 0)
            throw "Deck is empty.";
        return this.deck[this.deck.length - 1];
    }

    private isDuplicated(card: Card): boolean {
        const duplicates = this.deck.filter((value) => {
            return value.toString() === card.toString();
        });
        return duplicates.length > 0 ? true : false;
    }

    private getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export default Deck;