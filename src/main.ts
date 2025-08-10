import { CanvasHandler } from "./canvas/canvas";
import { GameGrid } from "./game-world/game-grid";
import { RequestAnimationFrameHandler } from "./request-animation-frame/request-animation-frame";
import "./style.css";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="game-canvas" width="500" height="500"></canvas>
`;


const canvas = new CanvasHandler();

new RequestAnimationFrameHandler();

const gameGrid = new GameGrid(canvas, { rows: 10, columns: 10, size: 50 });