import type { CanvasHandler } from "../canvas/canvas";
import type { GameWorld } from "../game-world/game-world";
import { Unit, type UnitName } from "./unit";

/** Unit controls where it is on the game world and draws/updates and removes it self from the canvas */
export class Ghoul extends Unit {

    public name: UnitName = "ghoul";

    constructor(canvasHandler: CanvasHandler, gameWorld: GameWorld) {
        super(canvasHandler, gameWorld)
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
        if (updatedPositionX + this.unitStats.size.x > this.gameWorld.columns - 1) {
            updatedPositionX = 0;
            updatedPositionY = updatedPositionY + this.unitStats.size.y;
        }

        this.previousPosition = { x: this.position.x, y: this.position.y };
        this.position = { x: updatedPositionX, y: updatedPositionY };

        this.gameWorld.updateUnitsGameWorldPosition(this);
    }

    public draw() {
        const context = this.canvasHandler.getCanvasContext();

        const cellSize = this.gameWorld.cellSize;

        const canvasPositions = this.gameWorld.getCanvasPositionForUnit(this);

        const centerOfCellX = (canvasPositions.start.x + canvasPositions.end.x) / 2;
        const centerOfCellY = (canvasPositions.start.y + canvasPositions.end.y) / 2;

        const radiusX = cellSize * this.unitStats.size.x;
        const radiusY = cellSize * this.unitStats.size.y;

        context.beginPath();
        context.ellipse(centerOfCellX, centerOfCellY, radiusX / 4, radiusY / 4, 0, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = "blue";
        context.fill();
    }
}