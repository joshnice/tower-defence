import type { CanvasHandler } from "../canvas/canvas";


export class GameCell {

    private readonly id: string;

    constructor(canvas: CanvasHandler, position: { x: number, y: number }, sizePx: number) {

        this.id = crypto.randomUUID();

        const canvasContext = canvas.getCanvasContext();

        canvasContext.beginPath();

        const startingX = position.x * sizePx;
        const startingY = position.y * sizePx;

        console.group(this.id);

        canvasContext.moveTo(startingX, startingY);
        console.log("starting coords", startingX, startingY)

        canvasContext.lineTo(startingX, startingY + sizePx);
        console.log("first point", startingX, startingY + sizePx);

        canvasContext.lineTo(startingX + sizePx, startingY + sizePx);
        console.log("second point", startingX + sizePx, startingY + sizePx);

        canvasContext.lineTo(startingX + sizePx, startingY);
        console.log("third point", startingX + sizePx, startingY);

        canvasContext.lineTo(startingX, startingY);
        console.log("final point", startingX, startingY);

        console.groupEnd();


        canvasContext.stroke();

        canvasContext.closePath();
    }


}