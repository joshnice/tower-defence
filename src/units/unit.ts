import type { CanvasHandler } from "../canvas/canvas";
import type { GameGrid } from "../game-world/game-grid";
import type { UnitStats } from "./unit-stats";

export type UnitName = "ghoul";

export abstract class Unit {
    public abstract name: UnitName;

    public position: { x: number, y: number } = { x: 0, y: 0 };

    public previousPosition: { x: number, y: number } = { x: 0, y: 0 };

    public readonly id: string;

    protected readonly canvasHandler: CanvasHandler;

    protected readonly gameGrid: GameGrid;

    protected lastMoveTime: number = 0;

    protected unitStats: UnitStats = { moveTime: 0, size: { x: 0, y: 0 } };

    constructor(canvasHandler: CanvasHandler, gameGrid: GameGrid) {
        this.canvasHandler = canvasHandler;
        this.gameGrid = gameGrid;
        this.id = crypto.randomUUID();
        this.setUnitStats();
        this.gameGrid.addUnit(this);
        this.redraw();
    }

    /** Unit stats */

    protected abstract setUnitStats(): void;


    /** Called every request animation cycle */
    public update(updateTime: number) {
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
        const sizeX = this.unitStats.size.x * this.gameGrid.cellSize;
        const sizeY = this.unitStats.size.y * this.gameGrid.cellSize;
        const previousCanvasPosition = this.gameGrid.getCanvasPosition(this.previousPosition);
        this.canvasHandler.clearCanvas(previousCanvasPosition, { x: sizeX, y: sizeY });
        // Redraw the other units where the canvas has been cleared
        this.gameGrid.redrawCoordinates(this.getPositionInGameWorld(), [this.id]);
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
}