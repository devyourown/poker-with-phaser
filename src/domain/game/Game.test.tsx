import Player from "../player/Player";
import Game, { Action, GameStatus } from "./Game"

describe('Game test', () => {
    let game: Game;
    let players: Player[];
    beforeEach(() => {
        players = [new Player(1000), new Player(2000),
                    new Player(3000), new Player(4000)];
        game = new Game({players: players, small: 100, big: 200});
    })

    it('tests Fold', () => {
        game.playAction(Action.FOLD, 0);
        game.playAction(Action.FOLD, 10000);
        expect(game.isEnd()).toBe(false);
        game.playAction(Action.FOLD, 0);
        expect(game.isEnd()).toBe(true);
    });

    it('tests Check', () => {
        expect(() => {game.playAction(Action.CHECK, 0)}).toThrow;
        ('Cannot check now.');
    });

    it('tests Call', () => {
        game.playAction(Action.CALL, 0);
        game.playAction(Action.CALL, 0);
        game.playAction(Action.CALL, 0);
        game.playAction(Action.CHECK, 0);

        expect(game.getStatus()).toBe(GameStatus.FLOP);
        expect(game.getPotSize()).toBe(800);
    });
})