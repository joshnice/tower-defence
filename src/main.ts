import { CanvasHandler } from "./canvas/canvas";
import { GameGrid } from "./game-world/game-grid";
import { RequestAnimationFrameHandler } from "./request-animation-frame/request-animation-frame";
import "./style.css";
import { GhoulUnit } from "./units/ghoul";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="game-canvas" width="500" height="500"></canvas>
`;

const canvas = new CanvasHandler();

const gameGrid = new GameGrid({ rows: 10, columns: 10, size: 50 });

const unit = new GhoulUnit(canvas, gameGrid);

new RequestAnimationFrameHandler(gameGrid, canvas);
