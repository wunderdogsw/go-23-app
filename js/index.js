import { initBodyDetection } from './bodyDetection.js';
import {
  BUBBLE_BODY_MATERIAL,
  createBubbleStickFigure,
  disposeBubbleStickFigure,
  renderBubbleStickFigure,
} from './bubblePerson.js';
import { clearScene, initCinematography, renderScene, updateCamera } from './cinematography.js';
import { initControls } from './controls.js';
import { initParameters } from './parameters.js';
import { addCollidingContactMaterial, initWorld, worldStep } from './physics.js';
import { renderShapes, resetShapes, SHAPE_BODY_MATERIAL, updateShapes } from './shape.js';

const render = async function () {
  requestAnimationFrame(render);

  worldStep();
  renderShapes();
  updateShapes();
  await renderBubbleStickFigure();
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

  disposeBubbleStickFigure();
  createBubbleStickFigure();

  updateCamera();
  resetShapes();
}

start();
