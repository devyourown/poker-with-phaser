import PokerScene from "./scenes/PokerScene";

const config: Phaser.Types.Core.GameConfig = {
    width: 1920,
    type: Phaser.AUTO,
    parent: 'phaser-container',
    physics: {
        default: 'arcade',
        arcade: {
        },
    },
    backgroundColor: '#338a3e',
    dom: {
        createContainer: true
    },
    scene: [PokerScene],
}

export default new Phaser.Game(config);