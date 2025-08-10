export class CanvasHandler {

    private readonly canvasElement: HTMLCanvasElement;

    constructor() {

        const element = document.getElementById("game-canvas");

        if (element == null || !(element instanceof HTMLCanvasElement)) {
            throw new Error("Can't find canvas element");
        }

        this.canvasElement = element;
    }

    public getCanvasContext() {
        const canvasContext = this.canvasElement.getContext("2d");

        if (canvasContext == null) {
            throw new Error("Can't get canvas context");
        }

        return canvasContext;
    }

}