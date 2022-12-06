export interface PotSource {
    drawPot: (ctx: CanvasRenderingContext2D) => void;
}

export class PotSourceImpl implements PotSource {
    private potPosX: number;
    private potPosY: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.potPosX = canvasWidth / 2;
        this.potPosY = canvasHeight / 1.4;
    }
    
    drawPot(ctx: CanvasRenderingContext2D) {
    }
}