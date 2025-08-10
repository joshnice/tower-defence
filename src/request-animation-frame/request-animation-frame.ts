import type { CanvasHandler } from "../canvas/canvas";
import type { GameGrid } from "../game-world/game-grid";

export class RequestAnimationFrameHandler {

    private previousRequestAnimationFrameTime: number | null = null;

    private readonly canvasHandler: CanvasHandler;

    private readonly gameGrid: GameGrid;

    constructor(gameGrid: GameGrid, canvasHandler: CanvasHandler) {
        requestAnimationFrame(this.callback.bind(this));
        this.gameGrid = gameGrid;
        this.canvasHandler = canvasHandler;
    }

    private callback() {
        this.previousRequestAnimationFrameTime = performance.now();
        this.canvasHandler.clearCanvas();
        this.gameGrid.redrawGameGrid();
        requestAnimationFrame(this.callback.bind(this));
    }
}