import { CanvasHandler } from "./canvas/canvas";
import { GameGrid } from "./game-world/game-grid";
import { RequestAnimationFrameHandler } from "./request-animation-frame/request-animation-frame";
import "./style.css";
import { GhoulUnit } from "./units/ghoul";
import type { Unit } from "./units/unit";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="game-canvas" width="500" height="500"></canvas>
`;

const canvas = new CanvasHandler();

const gameGrid = new GameGrid({ rows: 100, columns: 100, size: 5 });

const units: Unit[] = [new GhoulUnit(canvas, gameGrid)];

setTimeout(() => {
  units.push(new GhoulUnit(canvas, gameGrid));
}, 1000);

setTimeout(() => {
  units.push(new GhoulUnit(canvas, gameGrid));
}, 2000);

setTimeout(() => {
  units.push(new GhoulUnit(canvas, gameGrid));
}, 3000);

new RequestAnimationFrameHandler(() => units);
