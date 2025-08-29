import type { CanvasHandler } from "../canvas/canvas";

export class Path {

    public id: string = crypto.randomUUID();

    public name: string = "path";

    private readonly cellSize: number;

    private readonly canvasHandler: CanvasHandler

    private readonly pathCheckPoints: { x: number, y: number }[] = [];

    private readonly pathWidth: number = 0;

    constructor(canvasHandler: CanvasHandler, cellSize: number, pathCheckPoints: { x: number, y: number }[], width: number) {
        this.canvasHandler = canvasHandler;
        this.cellSize = cellSize;
        this.pathCheckPoints = pathCheckPoints;
        this.pathWidth = width
    }

    public setUpPath() {

        const gameWorldPathPoints: { x: number, y: number }[] = []

        this.pathCheckPoints.forEach((pathCheckPoint, index) => {
            if (index === this.pathCheckPoints.length - 1) {
                // Need to add end zone here
                return;
            }

            const nextCheckPoint = this.pathCheckPoints[index + 1];

            // TODO: Handle negative values
            const xDiff = Math.abs(pathCheckPoint.x - nextCheckPoint.x);
            const yDiff = Math.abs(pathCheckPoint.y - nextCheckPoint.y);

            let lastXValue = pathCheckPoint.x;

            for (let x = 0; xDiff > x; x++) {
                gameWorldPathPoints.push({ x, y: pathCheckPoint.y });
                lastXValue = x;
            }

            for (let y = 0; yDiff > y; y++) {
                gameWorldPathPoints.push({ x: lastXValue, y });
                // for (let x = this.pathWidth * -0.5; this.pathWidth / 2 > x; x++) {
                //     gameWorldPathPoints.push({ x: lastXValue + x, y });
                // }
            }

        });

        return gameWorldPathPoints;
    }

    public draw(position: { x: number, y: number }) {
        const context = this.canvasHandler.getCanvasContext();
        context.beginPath();
        context.rect(position.x * this.cellSize, position.y * this.cellSize, this.cellSize, this.cellSize);
        context.fillStyle = "#cfbe8a";
        context.fill();
        context.closePath();
    }
}