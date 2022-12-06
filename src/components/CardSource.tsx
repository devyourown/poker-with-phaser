export type Card = {
    value: string,
    suit: string
}

export interface CardSource {
    drawHands: (ctx: CanvasRenderingContext2D) => void;
    drawMyHands: (ctx: CanvasRenderingContext2D, myHands: Card[]) => void;
    drawResultHands: (ctx: CanvasRenderingContext2D, cards: Card[]) => void;
    drawBoard: (ctx: CanvasRenderingContext2D, board: Card[]) => void;
}

const xPos = [1, 2, 3, -1, 4, 1, 3];
const yPos = [1, 1, 1, 2, 2, 3, 3];

export class CardSourceImpl implements CardSource {
    private firstX: number;
    private firstY: number; 
    private xSpace: number;
    private ySpace: number;
    private numOfPlayers: number;
    private backCardImage = new Image();

    constructor(canvasWidth: number, canvasHeight: number,
            numOfPlayers: number) {
        this.xSpace = canvasWidth / 3;
        this.ySpace = canvasHeight / 4;
        this.firstX = canvasWidth / 3;
        this.firstY = canvasHeight / 4;
        this.numOfPlayers = numOfPlayers;
        this.backCardImage.src = "../../public/assets/back.png";
    }

    drawHands(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        for (let i=0; i<this.numOfPlayers; i++) {
            const x = this.firstX + this.xSpace * xPos[i];
            const y = this.firstY + this.ySpace * yPos[i];
            ctx.rect(x, y, 100, 130);
            ctx?.drawImage(this.backCardImage, x, y, 100, 130);
            ctx.rect(x + 50, y, 100, 130);
            ctx?.drawImage(this.backCardImage, x + 50, y, 100, 130);
        }
    }

    drawMyHands(ctx: CanvasRenderingContext2D, myHands: Card[]) {
        ctx.beginPath();
        const x = this.firstX + this.xSpace * 2;
        const y = this.firstY + this.ySpace * 2;
        const firstCardImage = new Image();
        const secondCardImage = new Image();
        const {suit, value} = myHands[0];
        firstCardImage.src = "../../public/assets/"
        + suit + "/" + suit + value + ".svg";
        const secondSuit = myHands[1].suit;
        const secondValue = myHands[1].value;
        secondCardImage.src = "../../public/assets/" 
            + secondSuit + "/" + secondSuit + secondValue + ".svg";
        
        ctx.rect(x, y, 100, 130);
        ctx.drawImage(firstCardImage, x, y, 100, 130);
        ctx.rect(x + 50, y, 100, 130);
        ctx.drawImage(secondCardImage, x + 50, y, 100, 130);
    }

    drawResultHands(ctx: CanvasRenderingContext2D, cards: Card[]) {
        ctx.beginPath();
        for (let i=0; i<this.numOfPlayers/2; i++) {
            const x = this.firstX + this.xSpace * xPos[i * 2];
            const y = this.firstY + this.ySpace * yPos[i * 2 + 1];
            const firstCardImage = new Image();
            const secondCardImage = new Image();
            const {suit, value} = cards[i * 2];
            firstCardImage.src = "../../public/assets/" 
            + suit + "/" + suit + value + ".svg";
            const secondSuit = cards[i * 2 + 1].suit;
            const secondValue = cards[i * 2 + 1].value;
            secondCardImage.src = "../../public/assets/" 
            + secondSuit + "/" + secondSuit + secondValue + ".svg";
            ctx.rect(x, y, 100, 130);
            ctx?.drawImage(firstCardImage, x, y, 100, 130);
            ctx.rect(x + 50, y, 100, 130);
            ctx?.drawImage(secondCardImage, x + 50, y, 100, 130);
        }
    }

    drawBoard(ctx: CanvasRenderingContext2D, board: Card[]) {
        let midX = this.firstX + 200;
        const midY = this.firstY + 100;
        board.forEach((card) => {
            const cardImage = new Image();
            cardImage.src = "../../public/assets/" +
            card.suit + "/" + card.suit + card.value;
            ctx.rect(midX, midY, 100, 130);
            ctx.drawImage(cardImage, midX, midY, 100, 130);
            midX += 130;
        });
    }
}