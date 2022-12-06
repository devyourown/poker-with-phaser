import React, { RefObject } from 'react';
import { useCanvas } from '../utils/hooks/useCanvas';
import { Card, CardSource, CardSourceImpl } from './CardSource';
import { PotSource, PotSourceImpl } from './PotSource';

type GameCanvasProps = {
    canvasWidth: number,
    canvasHeight: number,
    numOfPlayers: number,
    myHands: Card[],
    everyHands: Card[],
    board: Card[]
}

const GameCanvas: React.FC<GameCanvasProps> = 
({canvasWidth, canvasHeight, numOfPlayers, myHands,
everyHands, board}) => {
    const fillBackground = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = 'rgb(102,187,106)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    const cardSource: CardSource = new CardSourceImpl(
        canvasWidth, 
        canvasHeight,
        numOfPlayers);

    const potSource: PotSource = new PotSourceImpl(
        canvasWidth,
        canvasHeight
    );

    const animate = (ctx: CanvasRenderingContext2D) => {
        fillBackground(ctx);
        cardSource.drawHands(ctx);
        cardSource.drawMyHands(ctx, myHands);
        if (board !== null)
            cardSource.drawBoard(ctx, board);
        if (everyHands !== null)
            cardSource.drawResultHands(ctx, everyHands);
        potSource.drawPot(ctx);
    }

    const canvasRef: RefObject<HTMLCanvasElement> = useCanvas(
        canvasWidth, 
        canvasHeight,
        animate);
    
    return (
        <canvas ref={canvasRef} />
    );
};

export default GameCanvas;