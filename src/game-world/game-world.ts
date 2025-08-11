import type { Unit } from "../units/unit";

type Cell = string[] | null;

/** Handles the location of units within the game world, should not communicate with the canvas */
export class GameWorld {

    private cells: Cell[][] = [];

    public readonly cellSize: number;

    public readonly rows: number;

    public readonly columns: number;

    public unitIdToUnit: Record<string, Unit> = {};

    constructor(options: { rows: number, columns: number, size: number }) {
        this.cellSize = options.size;
        this.rows = options.rows;
        this.columns = options.columns;

        for (let x = 0; x <= options.rows - 1; x++) {
            this.cells[x] = [];
            for (let y = 0; y <= options.columns - 1; y++) {
                this.cells[x][y] = null;
            }
        }
    }

    public addUnitToGameWorld(unit: Unit) {
        this.unitIdToUnit[unit.id] = unit;
        this.moveUnitToUpdatedPosition(unit);
    }

    public updateUnitsGameWorldPosition(unit: Unit) {
        this.removeUnitFromPosition(unit);
        this.moveUnitToUpdatedPosition(unit);
    }

    private removeUnitFromPosition(unit: Unit) {
        unit.getPrevioussPositionInGameWorld().forEach((position) => {
            let unitsInPreviousCell = this.cells[position.x][position.y];

            if (unitsInPreviousCell == null) {
                throw new Error("Unit couldn't be found in previous cell");
            }

            this.cells[position.x][position.y] = unitsInPreviousCell?.filter((unitId) => unit.id !== unitId);
        });
    }

    private moveUnitToUpdatedPosition(unit: Unit) {
        unit.getPositionInGameWorld().forEach((position) => {

            if (this.cells[position.x][position.y] === undefined) {
                throw new Error("Chosen cell has not been given a value, outside of Game World");
            }

            if (this.cells[position.x][position.y] === null) {
                this.cells[position.x][position.y] = [unit.id];
            } else {
                this.cells[position.x][position.y]?.push(unit.id);
            }
        })
    }

    public redrawCoordinates(positions: { x: number, y: number }[], _skipUnitsRedrawing: string[] = []) {
        const skipUnitsRedrawing: string[] = _skipUnitsRedrawing;
        positions.forEach(({ x, y }) => {
            const units = this.cells[x][y];
            units?.forEach((unitId) => {
                if (!skipUnitsRedrawing.includes(unitId)) {
                    const unit = this.unitIdToUnit[unitId];
                    unit.draw();
                    skipUnitsRedrawing.push(unit.id);
                }
            })
        })
    }

    public getCanvasPosition(position: { x: number, y: number }) {
        return { x: position.x * this.cellSize, y: position.y * this.cellSize };
    }
}