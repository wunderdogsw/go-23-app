import { initBodyDetection } from './bodyDetection.js';
import { resetBubbleFigure, updateBubbleFigure } from './bubbleFigure/index.js';
import { BUBBLE_BODY_MATERIAL } from './bubbleFigure/physicalBody.js';
import { clearScene, initCinematography, renderScene, updateCamera } from './cinematography.js';
import { initControls } from './controls.js';
import { initParameters } from './parameters.js';
import { addCollidingContactMaterial, initWorld, worldStep } from './physics.js';
import { SHAPE_BODY_MATERIAL, resetShapes, updateShapes } from './shapes/falling.js';

const render = async function () {
  requestAnimationFrame(render);

  worldStep();
  updateShapes();
  await updateBubbleFigure();
  renderScene();
};

async function start() {
  initParameters();
  initCinematography();
  initWorld();

  await initControls({ onSubmit: updateParameters });
  resetShapes();

  addCollidingContactMaterial(BUBBLE_BODY_MATERIAL, SHAPE_BODY_MATERIAL);

  render();

  await initBodyDetection();
}

function updateParameters() {
  clearScene();

  resetBubbleFigure();

  updateCamera();
  resetShapes();
}

start();
