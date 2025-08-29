import { CanvasHandler } from "./canvas/canvas";
import { GameWorld } from "./game-world/game-world";
import { Path } from "./game-world/path";
import { RequestAnimationFrameHandler } from "./request-animation-frame/request-animation-frame";
import "./style.css";
import { Ghoul } from "./units/ghoul";
import type { Unit } from "./units/unit";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="game-canvas" width="500" height="500"></canvas>
`;

const canvas = new CanvasHandler();

const CELL_SIZE = 5;
const ROWS = 100;
const COLUMNS = ROWS

const path = new Path(canvas, CELL_SIZE, [{ x: 5, y: 0 }, { x: 5, y: ROWS }], 1)

const gameWorld = new GameWorld({ rows: ROWS, columns: COLUMNS, size: CELL_SIZE, }, path);

const units: Unit[] = [new Ghoul(canvas, gameWorld)];

// setTimeout(() => {
//   units.push(new Ghoul(canvas, gameWorld));
// }, 500);

// setTimeout(() => {
//   units.push(new Ghoul(canvas, gameWorld));
// }, 1000);

// setTimeout(() => {
//   units.push(new Ghoul(canvas, gameWorld));
// }, 1500);

new RequestAnimationFrameHandler(() => units);
