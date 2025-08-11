import type { Unit } from "../units/unit";

export class RequestAnimationFrameHandler {


    private readonly getUnits: () => Unit[];

    constructor(getUnits: () => Unit[]) {
        requestAnimationFrame(this.callback.bind(this));
        this.getUnits = getUnits;
    }

    private callback(time: number) {
        this.getUnits().forEach((unit) => {
            unit.update(time);
        })

        requestAnimationFrame(this.callback.bind(this));
    }
}