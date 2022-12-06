import PokerScene from "./scenes/PokerScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    physics: {
        default: 'arcade',
        arcade: {
        },
    },
    scene: [PokerScene],
}

export default new Phaser.Game(config);