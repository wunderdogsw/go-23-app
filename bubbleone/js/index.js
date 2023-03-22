import * as THREE from 'three';

import { getCameraVideo } from './media.js';
import { getSizes, setSceneSize, getQueryStringValue } from './utils.js';
import { getDetector } from './bodyDetection.js';
import {
  drawBubbleStickFigure,
  createBubbleStickFigure,
  BUBBLE_STICK_FIGURE,
  checkBubbleFigureIntersection,
} from './bubblePerson.js';
import { renderShapes, resetShapes, updateShapes, SHAPES_WITH_TRAJECTORIES } from './shape.js';

document.querySelectorAll('.video-texture').forEach((video) => {
  // need to play texture videos programmatically, otherwise it doesn't work :(
  video.play();
});

const CAMERA_Z_POSITION_QUERY_KEY = 'z';
const CAMERA_ZOOM_QUERY_KEY = 'zoom';

// Create an empty scene
const scene = new THREE.Scene();
const canvas = document.querySelector('#canvas');

// Create a basic perspective camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Adjusting camera z position via querystring. 6 by default
camera.position.z = parseInt(getQueryStringValue(CAMERA_Z_POSITION_QUERY_KEY)) || 6;
// Adjusting camera zoom percent via querystring. 100 % by default
camera.zoom = (parseFloat(getQueryStringValue(CAMERA_ZOOM_QUERY_KEY)) || 100) / 100;

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

let video;
let detector;
let isPersonPresent = false;

function removeBubbleStickFigure() {
  scene.remove(BUBBLE_STICK_FIGURE.HEAD);
  BUBBLE_STICK_FIGURE.BODY.forEach(({ group }) => scene.remove(group));
}

function addBubbleStickFigure() {
  scene.add(BUBBLE_STICK_FIGURE.HEAD);
  BUBBLE_STICK_FIGURE.BODY.forEach(({ group }) => scene.add(group));
}

function personLeft() {
  isPersonPresent = false;
  removeBubbleStickFigure();
  createBubbleStickFigure();
}

function personEntered() {
  isPersonPresent = true;
  addBubbleStickFigure();
}

function detectPersonPresence(hasPoses) {
  const hasPersonLeft = !hasPoses && isPersonPresent;
  const hasPersonEntered = hasPoses && !isPersonPresent;

  if (hasPersonLeft) {
    personLeft();
  } else if (hasPersonEntered) {
    personEntered();
  }
}

function renderPose(pose) {
  if (!pose.keypoints) {
    return;
  }

  drawBubbleStickFigure({ pose });
}

function checkShapeIntersections() {
  for (let i = 0; i < SHAPES_WITH_TRAJECTORIES.length; i++) {
    const { shape } = SHAPES_WITH_TRAJECTORIES[i];
    checkBubbleFigureIntersection(shape);
  }
}

function renderPoses(poses) {
  for (let i = 0; i < poses.length; i++) {
    const pose = poses[i];
    renderPose(pose);
  }

  checkShapeIntersections();
}

async function detectPoses() {
  if (!(detector && video)) {
    return;
  }

  const poses = await detector.estimatePoses(video, {});
  const hasPoses = !!poses?.length;

  detectPersonPresence(hasPoses);

  if (!hasPoses) {
    return;
  }

  renderPoses(poses);
}

const render = async function () {
  requestAnimationFrame(render);

  world.step(1 / 60);
  renderShapes();
  updateShapes({ scene, world });
  await detectPoses();
  renderer.render(scene, camera);
};

async function start() {
  createBubbleStickFigure();
  addBubbleStickFigure();
  resetShapes({ scene, world });

  render();

  const sizes = getSizes();
  video = await getCameraVideo(sizes.video.width, sizes.video.height);
  detector = await getDetector();
}

start();

function updateParameters() {
  scene.clear();
  scene.add(ambientLight);
  removeBubbleStickFigure();
  createBubbleStickFigure();
  addBubbleStickFigure();
  resetShapes({ scene, world });
}

function initControls() {
  const hasControls = getQueryStringValue('controls');
  if (!hasControls) {
    return;
  }

  const controls = document.getElementById('controls');
  controls.classList.toggle('hidden');

  const applyButton = document.getElementById('apply');
  applyButton.onclick = updateParameters;
}

initControls();
