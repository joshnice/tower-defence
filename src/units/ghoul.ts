import type { CanvasHandler } from "../canvas/canvas";
import type { GameGrid } from "../game-world/game-grid";
import { Unit, type UnitName } from "./unit";

/** Unit controls where it is on the game grid and draws/updates and removes it self from the canvas */
export class GhoulUnit extends Unit {

    public name: UnitName = "ghoul";

    constructor(canvasHandler: CanvasHandler, gameGrid: GameGrid) {
        super(canvasHandler, gameGrid)
    }

    protected setUnitStats(): void {
        this.unitStats = {
            moveTime: 25, size: { x: 10, y: 10 }
        };
    }

    protected move(time: number) {
        this.lastMoveTime = time;

        let updatedPositionX = this.position.x + 1;
        let updatedPositionY = this.position.y;
        if (updatedPositionX + this.unitStats.size.x > this.gameGrid.columns - 1) {
            updatedPositionX = 0;
            updatedPositionY = updatedPositionY + this.unitStats.size.y;
        }

        this.previousPosition = { x: this.position.x, y: this.position.y };
        this.position = { x: updatedPositionX, y: updatedPositionY };

        this.gameGrid.moveGridPosition(this);
    }

    public draw() {
        const context = this.canvasHandler.getCanvasContext();

        const cellSize = this.gameGrid.cellSize;

        const gameGridPositions = this.getPositionInGameWorld();
        const canvasPositions = gameGridPositions.map((position) => this.gameGrid.getCanvasPosition(position));

        const sum = canvasPositions.reduce((sum, pos) => ({ x: sum.x + pos.x, y: sum.y + pos.y }), { x: 0, y: 0 })
        const { x: centerOfCellX, y: centerOfCellY } = { x: sum.x / gameGridPositions.length, y: sum.y / gameGridPositions.length };

        const radiusX = cellSize * this.unitStats.size.x;
        const radiusY = cellSize * this.unitStats.size.y;

        context.beginPath();
        context.ellipse(centerOfCellX, centerOfCellY, radiusX / 4, radiusY / 4, 0, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = "blue";
        context.fill();
    }

}