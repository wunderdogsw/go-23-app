import * as CANNON from 'cannon-es';
import * as THREE from 'three';

import { detectPoses, initBodyDetection } from './bodyDetection.js';
import {
  BUBBLE_BODY_MATERIAL,
  BUBBLE_STICK_FIGURE,
  createBubbleStickFigure,
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

function visibilityTraverseObject(object, show, force = false) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh && (force || child.visible !== show)) {
      if (show) {
        if (child.userData?.body) {
          getWorld().addBody(child.userData.body);
        }        
        child.visible = true;
        return;
      }

      if (child.userData?.body) {
        getWorld().removeBody(child.userData?.body);
      }
      
      child.visible = false;
    }
  });

  object.visible = show;
}

function setBubbleStickFigureVisibility(show) {
  if (BUBBLE_STICK_FIGURE.visible === show) {
    return;
  }

  visibilityTraverseObject(BUBBLE_STICK_FIGURE, show);
}

function removeBubbleStickFigure() {
  getScene().remove(BUBBLE_STICK_FIGURE);
  visibilityTraverseObject(BUBBLE_STICK_FIGURE, false, true);
}

function addBubbleStickFigure() {
  getScene().add(BUBBLE_STICK_FIGURE);
  visibilityTraverseObject(BUBBLE_STICK_FIGURE, true, true);
}

function personLeft() {
  removeBubbleStickFigure();
  createBubbleStickFigure();
  visibilityTraverseObject(BUBBLE_STICK_FIGURE, false, true);
}

function personEntered() {
  addBubbleStickFigure();
}

function renderPose(pose) {
  if (!pose.keypoints) {
    return;
  }

  drawBubbleStickFigure({ pose });
}

async function renderPoses() {
  const { poses, posesLost, posesFound } = await detectPoses();

  if (posesLost) {
    personLeft();
  } else if (posesFound) {
    personEntered();
  }

  setBubbleStickFigureVisibility(!!poses.length);

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
  createBubbleStickFigure();
  addBubbleStickFigure();
  resetShapes();

  addCollidingContactMaterial(BUBBLE_BODY_MATERIAL, SHAPE_BODY_MATERIAL);

  // render first before getting the video + detector, otherwise nothing is displayed for a few seconds
  render();

  await initBodyDetection();
}

function updateParameters() {
  clearScene();

  removeBubbleStickFigure();
  createBubbleStickFigure();
  addBubbleStickFigure();

  updateCamera();
  resetShapes();
}

start();
