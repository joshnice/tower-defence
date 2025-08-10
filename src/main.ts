import { getCanvasContext } from "./canvas/canvas-helpers";
import { setupCanvas } from "./canvas/setup";
import "./style.css";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="game-canvas"></canvas>
`;

main();

function main() {
  const canvas = setupCanvas();
  const ctx = getCanvasContext(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "lime";
  ctx.fillRect(100, 100, 50, 50);
}
