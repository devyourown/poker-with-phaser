import GameResult from "../apis/game/GameResultDTO";

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
}