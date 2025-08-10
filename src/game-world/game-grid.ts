import type { Unit } from "../units/unit";

type Cell = Unit[] | null;

export class GameGrid {

    private cells: Cell[][] = [];

    public readonly cellSize: number;

    public readonly rows: number;

    public readonly columns: number;

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

    public redrawGameGrid() {
        this.cells.forEach((row) => {
            row.forEach((col) => {
                col?.forEach((unit) => unit.draw());
            })
        })
    }

    public addUnit(unit: Unit, initialPosition: { x: number, y: number }) {
        this.moveUnitToUpdatedPosition(unit, initialPosition);
    }

    public moveGridPosition(unit: Unit, position: { x: number, y: number }) {
        this.removeUnitFromPosition(unit);
        this.moveUnitToUpdatedPosition(unit, position);
    }

    private removeUnitFromPosition(unit: Unit) {
        let unitsInPreviousCell = this.cells[unit.position.x][unit.position.y];

        if (unitsInPreviousCell == null) {
            throw new Error("Unit couldn't be found in previous cell");
        }

        this.cells[unit.position.x][unit.position.y] = unitsInPreviousCell?.filter((unit) => unit.id !== unit.id);

    }

    private moveUnitToUpdatedPosition(unit: Unit, position: { x: number, y: number }) {
        let updatePositionCell = this.cells[position.x][position.y];

        if (updatePositionCell === undefined) {
            throw new Error("Chosen cell has not been given a value, outside of GameGrid");
        }

        if (updatePositionCell === null) {
            updatePositionCell = [unit];
        } else {
            updatePositionCell.push(unit);
        }

        this.cells[position.x][position.y] = updatePositionCell;
    }

    public getCanvasDrawPosition(position: { x: number, y: number }) {
        return { x: position.x * this.cellSize, y: position.y * this.cellSize };
    }
}