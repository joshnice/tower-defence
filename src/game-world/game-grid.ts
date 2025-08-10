import type { CanvasHandler } from "../canvas/canvas";
import { GameCell } from "./game-cell";

export class GameGrid {


    private cells: GameCell[] = [];

    constructor(canvasHandler: CanvasHandler, options: { rows: number, columns: number, size: number }) {

        for (let x = 0; x <= options.rows; x++) {
            for (let y = 0; y <= options.columns; y++) {
                this.cells.push(new GameCell(canvasHandler, { x, y }, options.size))
            }
        }

    }
}