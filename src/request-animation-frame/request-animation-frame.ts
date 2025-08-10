export class RequestAnimationFrameHandler {

    private previousRequestAnimationFrameTime: number | null = null;

    constructor() {

        requestAnimationFrame(this.callback.bind(this));
    }

    private callback() {
        this.previousRequestAnimationFrameTime = performance.now();
        requestAnimationFrame(this.callback.bind(this));
    }

}