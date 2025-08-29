import type { CanvasHandler } from "../canvas/canvas";

export class Path {

    public id: string = crypto.randomUUID();

    public name: string = "path";

    private readonly cellSize: number;

    private readonly canvasHandler: CanvasHandler

    public readonly pathCheckPoints: { x: number, y: number, movement: "hoz" | "vert" | "end" | "spawn" }[] = [];

    private readonly pathWidth: number = 0;

    constructor(canvasHandler: CanvasHandler, cellSize: number, pathCheckPoints: { x: number, y: number, movement: "hoz" | "vert" | "end" | "spawn" }[], width: number) {
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

            const xDiff = Math.abs(pathCheckPoint.x - nextCheckPoint.x);
            const yDiff = Math.abs(pathCheckPoint.y - nextCheckPoint.y);

            if (xDiff !== 0 && yDiff !== 0) {
                throw new Error("Don't support x and y changes per path checkpoint");
            }

            if (xDiff > 0) {
                for (let x = pathCheckPoint.x; nextCheckPoint.x > x; x++) {
                    for (let y = pathCheckPoint.y - (this.pathWidth * 0.5); pathCheckPoint.y + this.pathWidth > y; y++) {
                        gameWorldPathPoints.push({ x, y });
                    }
                }
            }

            if (yDiff > 0) {
                for (let y = pathCheckPoint.y; nextCheckPoint.y > y; y++) {
                    for (let x = pathCheckPoint.x - (this.pathWidth * 0.5); pathCheckPoint.x + this.pathWidth > x; x++) {
                        gameWorldPathPoints.push({ x, y });
                    }
                }
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