import { CanvasHandler } from "./canvas/canvas";
import { GameWorld } from "./game-world/game-world";
import { RequestAnimationFrameHandler } from "./request-animation-frame/request-animation-frame";
import "./style.css";
import { Ghoul } from "./units/ghoul";
import type { Unit } from "./units/unit";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="game-canvas" width="500" height="500"></canvas>
`;

const canvas = new CanvasHandler();

const gameWorld = new GameWorld({ rows: 100, columns: 100, size: 5 });

const units: Unit[] = [new Ghoul(canvas, gameWorld)];

setTimeout(() => {
  units.push(new Ghoul(canvas, gameWorld));
}, 300);

setTimeout(() => {
  units.push(new Ghoul(canvas, gameWorld));
}, 600);

setTimeout(() => {
  units.push(new Ghoul(canvas, gameWorld));
}, 900);

new RequestAnimationFrameHandler(() => units);
