import type { CanvasHandler } from "../canvas/canvas";
import type { GameWorld } from "../game-world/game-world";
import type { Path } from "../game-world/path";
import { Unit, type UnitName } from "./unit";

/** Unit controls where it is on the game world and draws/updates and removes it self from the canvas */
export class Ghoul extends Unit {

    public name: UnitName = "ghoul";

    private readonly path: Path;

    private pathCheckPointCount = 0;

    constructor(canvasHandler: CanvasHandler, gameWorld: GameWorld, path: Path) {
        super(canvasHandler, gameWorld);
        this.path = path;
    }

    protected setUnitStats(): void {
        this.unitStats = {
            moveTime: 25, size: { x: 10, y: 10 }
        };
    }

    protected move(time: number) {
        this.lastMoveTime = time;

        let updatedPositionX: null | number = null;
        let updatedPositionY: null | number = null;

        const currentPathCheckPoint = this.path.pathCheckPoints[this.pathCheckPointCount];
        const { movement } = currentPathCheckPoint;

        // We are spawning the unit
        if (movement === "spawn") {
            updatedPositionX = this.path.pathCheckPoints[0].x;
            updatedPositionY = this.path.pathCheckPoints[0].y;
            this.pathCheckPointCount++;
        }

        if (movement === "hoz") {
            updatedPositionX = this.position.x + 1;
            updatedPositionY = this.position.y;

            if (currentPathCheckPoint.x === updatedPositionX) {
                this.pathCheckPointCount++;
            }
        }

        if (movement === "vert") {
            updatedPositionX = this.position.x;
            updatedPositionY = this.position.y + 1;

            if (currentPathCheckPoint.y === updatedPositionY) {
                this.pathCheckPointCount++;
            }
        }


        if (updatedPositionX == null || updatedPositionY == null) {
            throw new Error("Position not updated correctly");
        }

        if (this.path.pathCheckPoints[this.pathCheckPointCount] == null) {
            this.remove();
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