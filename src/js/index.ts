import { initBodyDetection } from './bodyDetection';
import { resetBubbleFigure, updateBubbleFigure } from './bubbleFigure/index';
import { BUBBLE_BODY_MATERIAL } from './bubbleFigure/physicalBody';
import { clearScene, initCinematography, renderScene, updateCamera } from './cinematography';
import { initControls } from './controls';
import { initParameters } from './parameters';
import { addCollidingContactMaterial, initWorld, worldStep } from './physics';
import { SHAPE_BODY_MATERIAL, resetShapes, updateShapes } from './shapes/falling';

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
