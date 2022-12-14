export default class CardDTO {
    private suit: string;
    private value: string;

    constructor(suit: string, value: string) {
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