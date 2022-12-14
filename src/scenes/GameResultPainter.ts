import GameResult from "../apis/game/GameResult";

export default class GameResultPainter {
    private scene: Phaser.Scene;
    private gameResult: GameResult;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public drawGameResult(): GameResult {
        const gameResult = new GameResult();
        //draw gameResult
        return gameResult;
    }

    private drawAfterGame(result: GameResult) {
        //if game should be removed, init room
        //else reset game, and resume game
    }
}