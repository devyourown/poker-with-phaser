import { RefObject, useEffect, useRef } from "react"

export const useCanvas = (canvasWidth: number, canvasHeight: number) => {
    const canvasRef: RefObject<HTMLCanvasElement> = 
    useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        const setCanvas = () => {
            const devicePixelRatio = window.devicePixelRatio ?? 1;
      
            if (canvas) {
              canvas.style.width = canvasWidth + 'px';
              canvas.style.height = canvasHeight + 'px';
      
              canvas.width = canvasWidth * devicePixelRatio;
              canvas.height = canvasHeight * devicePixelRatio;
      
              ctx?.scale(devicePixelRatio, devicePixelRatio);
            }
        };
        setCanvas();
    }, [canvasWidth, canvasHeight]);

    return canvasRef;
}