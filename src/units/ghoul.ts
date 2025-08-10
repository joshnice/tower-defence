import type { CanvasHandler } from "../canvas/canvas";
import type { GameGrid } from "../game-world/game-grid";
import type { Unit } from "./unit";

export class GhoulUnit implements Unit {

    public name = "ghoul";

    public readonly id: string;

    private readonly canvasHandler: CanvasHandler;

    private readonly gameGrid: GameGrid;

    public position: { x: number, y: number } = { x: 0, y: 0 };

    constructor(canvasHandler: CanvasHandler, gameGrid: GameGrid) {
        this.canvasHandler = canvasHandler;
        this.gameGrid = gameGrid;
        this.id = crypto.randomUUID();
        this.gameGrid.addUnit(this, this.position);
        this.move();
    }

    public move() {
        let updatedPositionX = this.position.x + 1;
        let updatedPositionY = this.position.y;
        if (updatedPositionX > this.gameGrid.columns - 1) {
            updatedPositionX = 0;
            updatedPositionY = updatedPositionY + 1;
        }

        const updatedPosition = { x: updatedPositionX, y: updatedPositionY };
        this.gameGrid.moveGridPosition(this, updatedPosition);
        this.position = updatedPosition;

        setTimeout(() => {
            this.move();
        }, 250);
    }

    public draw() {
        const context = this.canvasHandler.getCanvasContext();
        const canvasPosition = this.gameGrid.getCanvasDrawPosition(this.position);
        const cellSize = this.gameGrid.cellSize;
        context.beginPath();
        context.moveTo(canvasPosition.x, canvasPosition.y);
        context.lineTo(canvasPosition.x + cellSize, canvasPosition.y);
        context.lineTo(canvasPosition.x + cellSize, canvasPosition.y + cellSize);
        context.lineTo(canvasPosition.x, canvasPosition.y + cellSize);
        context.lineTo(canvasPosition.x, canvasPosition.y);
        context.stroke();
        context.closePath();
    }

}