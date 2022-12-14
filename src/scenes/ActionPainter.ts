import Game from "../apis/game/GameDTO";
import { playerPosition } from "./PokerScene";

export interface ActionPainterProp {
    scene: Phaser.Scene,
    game: Game;
}

export default class ActionPainter {
    private scene: Phaser.Scene;
    private game: Game;
    private lastActionIndex: number;

    constructor({scene, game}: ActionPainterProp) {
        this.scene = scene;
        this.game = game;
        this.lastActionIndex = -1;
    }

    public drawAction() {
        if (this.lastActionIndex === this.game.getLastActionIndex())
            return ;
        this.lastActionIndex = this.game.getLastActionIndex();
        const action = this.game.getLastAction();
        const textAnimated = this.scene.add.text(
            playerPosition[this.lastActionIndex][0] - 20,
            playerPosition[this.lastActionIndex][1] - 70,
            action);
        textAnimated.scale = 1.5;
        this.scene.tweens.add({
            targets: textAnimated,
            alpha: 0,
            duration: 2500,
            ease: 'Power2'
        });
    }
        

    public drawActionForm() {
        const form = this.scene.add.dom(700, 700).createFromCache('actionForm');
        form.addListener('click');
        form.on('click', (event: any) => {
            event.preventDefault();
            if (event.target.innerText.length > 6)
                return ;
            const inputBet: any = form.getChildByID('betSize');
            this.game.playAction(event.target.innerText,
                inputBet.value);
        })
    }
}