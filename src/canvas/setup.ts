export function setupCanvas() {

    const canvas = document.getElementById("game-canvas");

    if (canvas == null || !(canvas instanceof HTMLCanvasElement)) {
        throw new Error("Can't find canvas element");
    }

    return canvas;
}

