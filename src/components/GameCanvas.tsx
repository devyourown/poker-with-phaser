import React, { RefObject } from 'react';
import { useCanvas } from '../utils/hooks/useCanvas';

type GameCanvasProps = {
    canvasWidth: number,
    canvasHeight: number
}

const GameCanvas: React.FC<GameCanvasProps> = 
({canvasWidth, canvasHeight}) => {
    const canvasRef: RefObject<HTMLCanvasElement> = 
    useCanvas(canvasWidth, canvasHeight);
    
    return (
        <canvas ref={canvasRef} />
    );
};

export default GameCanvas;