import * as CANNON from 'cannon-es';
import * as THREE from 'three';

import { detectPoses, initBodyDetection } from './bodyDetection.js';
import {
  BUBBLE_BODY_MATERIAL,
  BUBBLE_STICK_FIGURE,
  createBubbleStickFigure,
  drawBubbleStickFigure,
} from './bubblePerson.js';
import { initControls } from './controls.js';
import { getCameraVideoElement, getSelectedVideoInputDeviceId } from './media.js';
import { getParameters, initParameters } from './parameters.js';
import { SHAPE_BODY_MATERIAL, renderShapes, resetShapes, updateShapes } from './shape.js';
import { getSizes, setSceneSize } from './utils.js';

initParameters();

// Create an empty scene
const scene = new THREE.Scene();
const canvas = document.querySelector('#canvas');

// Create a basic perspective camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

updateCamera();
camera.updateProjectionMatrix();

setSceneSize(camera);

const world = new CANNON.World();
world.gravity.set(0, 0, 0);

// Create a renderer with Antialiasing
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.shadowMap.enabled = true;

// Configure renderer clear color
renderer.setClearColor('#000000');

// Needed for standard materials to be visible
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

function addShapeAndBubbleFigureContactMaterial() {
  const contactMaterial = new CANNON.ContactMaterial(BUBBLE_BODY_MATERIAL, SHAPE_BODY_MATERIAL, {
    friction: 0.0,
    restitution: 1.0,
  });
  world.addContactMaterial(contactMaterial);
}

function removeBubbleStickFigure() {
  scene.remove(BUBBLE_STICK_FIGURE);
  visibilityTraverseObject(BUBBLE_STICK_FIGURE, false, true);
}

function visibilityTraverseObject(object, show, force = false) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh && (force || child.visible !== show)) {
      if (show) {
        addPhysicalBodyToWorld(child);
        child.visible = true;
        return;
      }

      removePhysicalBodyFromWorld(child);
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

function addBubbleStickFigure() {
  scene.add(BUBBLE_STICK_FIGURE);
  visibilityTraverseObject(BUBBLE_STICK_FIGURE, true, true);
}

function addPhysicalBodyToWorld(entry) {
  const body = entry?.userData?.body;
  if (body) {
    world.addBody(body);
  }
}

function removePhysicalBodyFromWorld(entry) {
  const body = entry?.userData?.body;
  if (body) {
    world.removeBody(body);
  }
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

  for (let i = 0; i < poses.length; i++) {
    const pose = poses[i];
    renderPose(pose);
  }
}

const render = async function () {
  requestAnimationFrame(render);

  world.step(1 / 60);
  renderShapes();
  updateShapes({ scene, world });
  await renderPoses();
  renderer.render(scene, camera);
};

async function start() {
  await initControls({ onSubmit: updateParameters });
  createBubbleStickFigure();
  addBubbleStickFigure();
  resetShapes({ scene, world });

  addShapeAndBubbleFigureContactMaterial();

  // render first before getting the video + detector, otherwise nothing is displayed for a few seconds
  render();

  await initBodyDetection();
}

function updateCamera() {
  const { cameraZ, cameraZoom } = getParameters();
  camera.position.z = cameraZ;
  camera.zoom = cameraZoom / 100;
}

function updateParameters() {
  scene.clear();
  scene.add(ambientLight);

  removeBubbleStickFigure();
  createBubbleStickFigure();
  addBubbleStickFigure();

  updateCamera();
  resetShapes({ scene, world });
}

start();
