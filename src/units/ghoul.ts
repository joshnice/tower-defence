import type { CanvasHandler } from "../canvas/canvas";
import type { GameGrid } from "../game-world/game-grid";
import type { Unit } from "./unit";
import type { UnitConfig } from "./unit-config";

/** Unit controls where it is on the game grid and draws/updates and removes it self from the canvas */
export class GhoulUnit implements Unit {

    public name = "ghoul";

    public readonly id: string;

    private readonly canvasHandler: CanvasHandler;

    private readonly gameGrid: GameGrid;

    public position: { x: number, y: number } = { x: 0, y: 0 };

    public previousPosition: { x: number, y: number } = { x: 0, y: 0 };

    private lastMoveTime: number = 0;

    private unitConfig: UnitConfig = {
        moveTime: 25,
        size: {
            x: 10,
            y: 10
        }
    }

    constructor(canvasHandler: CanvasHandler, gameGrid: GameGrid) {
        this.canvasHandler = canvasHandler;
        this.gameGrid = gameGrid;
        this.id = crypto.randomUUID();
        this.gameGrid.addUnit(this);
        this.redraw();
    }

    public update(updateTime: number) {
        const move = updateTime - this.lastMoveTime > this.unitConfig.moveTime;
        let draw = false;

        if (move) {
            draw = true;
            this.move(updateTime);
        }

        if (draw) {
            this.draw();
        }
    }

    public getCurrentGameGridCoordiantes() {
        return this.getGameGrirdPostion(this.position);
    }

    public getPreviousGameGridCoordiantes() {
        return this.getGameGrirdPostion(this.previousPosition);
    }

    private getGameGrirdPostion(position: { x: number, y: number }) {
        const positions: { x: number, y: number }[] = [];
        for (let x = 0; x < this.unitConfig.size.x; x++) {
            for (let y = 0; y < this.unitConfig.size.y; y++) {
                positions.push({ x: position.x + x, y: position.y + y });
            }
        }
        return positions;
    }


    private move(time: number) {
        this.lastMoveTime = time;

        // This logic here is going to be determined by the game grid
        let updatedPositionX = this.position.x + 1;
        let updatedPositionY = this.position.y;
        if (updatedPositionX + this.unitConfig.size.x > this.gameGrid.columns - 1) {
            updatedPositionX = 0;
            updatedPositionY = updatedPositionY + this.unitConfig.size.y;
        }
        // End

        this.previousPosition = { x: this.position.x, y: this.position.y };
        this.position = { x: updatedPositionX, y: updatedPositionY };

        this.gameGrid.moveGridPosition(this);
    }

    private draw() {
        this.erase();
        this.redraw();
    }

    private erase() {
        // Clear the canvas at this point, redraw that bit
        const sizeX = this.unitConfig.size.x * this.gameGrid.cellSize;
        const sizeY = this.unitConfig.size.y * this.gameGrid.cellSize;
        const previousCanvasPosition = this.gameGrid.getCanvasPosition(this.previousPosition);
        console.log("erase", previousCanvasPosition, sizeX, sizeY);
        this.canvasHandler.clearCanvas(previousCanvasPosition, { x: sizeX, y: sizeY });
        // TODO: Readd this in and stop it calling redraw so much
        // this.gameGrid.redrawCoordinates(this.getCurrentGameGridCoordiantes());
    }

    public redraw() {
        const context = this.canvasHandler.getCanvasContext();

        const cellSize = this.gameGrid.cellSize;

        const gameGridPositions = this.getCurrentGameGridCoordiantes();
        const canvasPositions = gameGridPositions.map((position) => this.gameGrid.getCanvasPosition(position));

        const sum = canvasPositions.reduce((sum, pos) => ({ x: sum.x + pos.x, y: sum.y + pos.y }), { x: 0, y: 0 })
        const { x: centerOfCellX, y: centerOfCellY } = { x: sum.x / gameGridPositions.length, y: sum.y / gameGridPositions.length };

        const radiusX = cellSize * this.unitConfig.size.x;
        const radiusY = cellSize * this.unitConfig.size.y;

        context.beginPath();
        context.ellipse(centerOfCellX, centerOfCellY, radiusX / 4, radiusY / 4, 0, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = "blue";
        context.fill();
    }

}