export function getCanvasContext(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    if (ctx == null) {
        throw new Error("Could not get canvas context");
    }

    return ctx;
}