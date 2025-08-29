import type { CanvasHandler } from "../canvas/canvas";
import type { GameWorld } from "../game-world/game-world";
import type { UnitStats } from "./unit-stats";

export type UnitName = "ghoul";

export abstract class Unit {
    public abstract name: UnitName;

    /** Game world position */
    public position: { x: number, y: number } = { x: 0, y: 0 };

    /** Previous game world position */
    public previousPosition: { x: number, y: number } = { x: 0, y: 0 };

    public readonly id: string;

    protected readonly canvasHandler: CanvasHandler;

    protected readonly gameWorld: GameWorld;

    protected lastMoveTime: number = 0;

    protected unitStats: UnitStats = { moveTime: 0, size: { x: 0, y: 0 } };

    private removed = false;

    constructor(canvasHandler: CanvasHandler, gameWorld: GameWorld) {
        this.canvasHandler = canvasHandler;
        this.gameWorld = gameWorld;
        this.id = crypto.randomUUID();
        this.setUnitStats();
        this.gameWorld.addUnitToGameWorld(this);
        this.draw();
    }

    /** Unit stats */

    protected abstract setUnitStats(): void;

    /** Called every request animation cycle */
    public update(updateTime: number) {

        if (this.removed) {
            return;
        }

        const move = updateTime - this.lastMoveTime > this.unitStats.moveTime;
        let draw = false;

        if (move) {
            draw = true;
            this.move(updateTime);
        }

        if (draw) {
            this.redraw();
        }
    }

    /** Draws the unit on the canvas */
    public abstract draw(): void;

    /** Erases the unit on the canvas */
    protected erase() {
        // Clear the unit from the canvas
        const previousCanvasPosition = this.gameWorld.getPreviousPositionForUnit(this);
        this.canvasHandler.clearCanvas(
            { x: previousCanvasPosition.start.x, y: previousCanvasPosition.start.y },
            {
                x: previousCanvasPosition.end.x - previousCanvasPosition.start.x,
                y: previousCanvasPosition.end.y - previousCanvasPosition.start.y
            }
        );

        const redrawWorldPositions: { x: number, y: number }[] = [];
        for (let xRedraw = this.previousPosition.x; xRedraw < this.previousPosition.x + this.unitStats.size.x; xRedraw++) {
            for (let yRedraw = this.previousPosition.y; yRedraw < this.previousPosition.y + this.unitStats.size.y; yRedraw++) {
                redrawWorldPositions.push({ x: xRedraw, y: yRedraw });
            }
        }

        // Redraw the other units where the canvas has been cleared
        this.gameWorld.redrawCoordinates(redrawWorldPositions);
    };

    /** Moves the position of the unit in the game world */
    protected abstract move(updateTime: number): void;

    public redraw() {
        this.erase();
        this.draw();
    };

    /** Game World Positional Helpers */

    /** Gets the position of the unit in the game world */
    protected getGameWorldPosition(position: { x: number, y: number }) {
        const positions: { x: number, y: number }[] = [];
        for (let x = 0; x < this.unitStats.size.x; x++) {
            for (let y = 0; y < this.unitStats.size.y; y++) {
                positions.push({ x: position.x + x, y: position.y + y });
            }
        }
        return positions;
    }

    public getPositionInGameWorld() {
        return this.getGameWorldPosition(this.position);
    };

    public getPrevioussPositionInGameWorld() {
        return this.getGameWorldPosition(this.previousPosition);
    };

    public getUnitSize() {
        return this.unitStats.size;
    }

    public remove() {
        this.removed = true;
        this.erase();
    }
}