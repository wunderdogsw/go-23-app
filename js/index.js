import * as CANNON from 'cannon-es';
import * as THREE from 'three';

import { detectPoses, initBodyDetection } from './bodyDetection.js';
import {
  BUBBLE_BODY_MATERIAL,
  createBubbleStickFigure,
  disposeBubbleStickFigure,
  drawBubbleStickFigure,
} from './bubblePerson.js';
import {
  clearScene,
  getScene,
  initCinematography,
  renderScene,
  updateCamera
} from './cinematography.js';
import { initControls } from './controls.js';
import { initParameters } from './parameters.js';
import {
  addCollidingContactMaterial,
  getWorld,
  initWorld,
  worldStep
} from './physics.js';
import { SHAPE_BODY_MATERIAL, renderShapes, resetShapes, updateShapes } from './shape.js';

function renderPose(pose) {
  if (!pose.keypoints) {
    return;
  }

  drawBubbleStickFigure({ pose });
}

async function renderPoses() {
  const { poses, posesLost, posesFound } = await detectPoses();

  if (posesLost) {
    disposeBubbleStickFigure();
  } else if (posesFound) {
    createBubbleStickFigure();
  }

  if (!poses.length) {
    return;
  }

  renderPose(poses[0]);
}

const render = async function () {
  requestAnimationFrame(render);

  worldStep();
  renderShapes();
  updateShapes();
  await renderPoses();
  renderScene();
};

async function start() {
  initParameters();
  initCinematography();
  initWorld();

  await initControls({ onSubmit: updateParameters });
  resetShapes();

  addCollidingContactMaterial(BUBBLE_BODY_MATERIAL, SHAPE_BODY_MATERIAL);

  // render first before getting the video + detector, otherwise nothing is displayed for a few seconds
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
