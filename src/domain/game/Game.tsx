import React from 'react';
import Deck from '../deck/Deck';
import Player from '../player/Player';

enum GameStatus {
    PRE_FLOP,
    FLOP,
    TURN,
    RIVER,
    END
}

enum Action {
    FOLD,
    CHECK,
    CALL,
    BET
}

class Game {
    private potSize: number;
    private betSize: number;
    private status: GameStatus;
    private players: Player[];
    private lastPlayer: Player;
    private deck: Deck;

    constructor(props) {
        this.players = props.players;
        this.deck = new Deck(this.players.length);
        this.distributeHands();

        this.betSize = 0;
        this.potSize = 0;

        this.status = GameStatus.PRE_FLOP;
    }

    private distributeHands() {
        this.players.forEach((player) => {
            player.setHands([this.deck.draw(), this.deck.draw()]);
        });
    }
    
    public playAction(action: Action, betSize: number): void {
        if (action === Action.FOLD)
            this.actFold();
        else if (action === Action.CHECK)
            this.actCheck();
        else if (action === Action.CALL)
            this.actCall();
        else if (action === Action.BET)
            this.actBet();
    }

    private actFold() {

    }

    private actCheck() {

    }

    private actCall() {

    }

    private actBet() {

    }
}

export default Game;