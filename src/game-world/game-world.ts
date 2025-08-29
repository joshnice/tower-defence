import type { Unit } from "../units/unit";
import { Path } from "./path";

type Cell = string[] | null;

type Entity = Unit | Path;

/** Handles the location of units within the game world, should not communicate with the canvas */
export class GameWorld {

    private cells: Cell[][] = [];

    public readonly cellSize: number;

    public readonly rows: number;

    public readonly columns: number;

    public entityIdToEntity: Record<string, Entity> = {};

    constructor(options: { rows: number, columns: number, size: number }, path: Path) {
        this.cellSize = options.size;
        this.rows = options.rows;
        this.columns = options.columns;

        for (let x = 0; x <= options.rows - 1; x++) {
            this.cells[x] = [];
            for (let y = 0; y <= options.columns - 1; y++) {
                this.cells[x][y] = null;
            }
        }

        path.setUpPath().forEach((pathPosition) => {
            this.cells[pathPosition.x][pathPosition.y] = [path.id];
            path.draw(pathPosition);
        });
        this.entityIdToEntity[path.id] = path;
    }

    public addUnitToGameWorld(unit: Unit) {
        this.entityIdToEntity[unit.id] = unit;
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
                return;
            }

            this.cells[position.x][position.y] = unitsInPreviousCell?.filter((unitId) => unit.id !== unitId);
        });
    }

    private moveUnitToUpdatedPosition(unit: Unit) {
        unit.getPositionInGameWorld().forEach((position) => {

            if (this.cells[position.x][position.y] === undefined) {
                return;
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
                    const unit = this.entityIdToEntity[unitId];
                    if (unit instanceof Path) {
                        unit.draw({ x, y });
                    } else {
                        unit.draw();
                        skipUnitsRedrawing.push(unit.id);
                    }

                }
            })
        })
    }

    public getCanvasPositionForUnit(unit: Unit) {
        return this.getPositionForUnit(unit, unit.position);
    }

    public getPreviousPositionForUnit(unit: Unit) {
        return this.getPositionForUnit(unit, unit.previousPosition);
    }

    private getPositionForUnit(unit: Unit, position: { x: number, y: number }) {
        const size = unit.getUnitSize();
        const x = position.x * this.cellSize;
        const y = position.y * this.cellSize;
        const endX = x + (size.x * this.cellSize);
        const endY = y + (size.y * this.cellSize);
        return { start: { x, y }, end: { x: endX, y: endY } };
    }
}