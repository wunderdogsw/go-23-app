import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import { getCameraVideo } from './media.js';
import { getSizes, setSceneSize, getQueryStringValue, getParameterValue } from './utils.js';
import { getDetector } from './bodyDetection.js';
import {
  drawBubbleStickFigure,
  createBubbleStickFigure,
  BUBBLE_STICK_FIGURE,
  checkBubbleFigureIntersection,
  BUBBLE_BODY_MATERIAL,
} from './bubblePerson.js';
import { renderShapes, resetShapes, SHAPES, SHAPE_BODY_MATERIAL, updateShapes } from './shape.js';
import { updateControlInputs, resetParameters, initControlInputs } from './localStorage.js';

document.querySelectorAll('.video-texture').forEach((video) => {
  // need to play texture videos programmatically, otherwise it doesn't work :(
  video.play();
});

const MINIMUM_POSES_SCORE = 20;
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

let video;
let detector;
let isPersonPresent = false;

function addShapeAndBubbleFigureContactMaterial() {
  const contactMaterial = new CANNON.ContactMaterial(BUBBLE_BODY_MATERIAL, SHAPE_BODY_MATERIAL, {
    friction: 0.0,
    restitution: 1.0,
  });
  world.addContactMaterial(contactMaterial);
}

function removeBubbleStickFigure() {
  scene.remove(BUBBLE_STICK_FIGURE);
  BUBBLE_STICK_FIGURE.traverse(removePhysicalBodyFromWorld);
}

function visibilityTraverseObject(object, show) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (show) {
        child.traverse(addPhysicalBodyToWorld);
        child.visible = true;
        return;
      }
      if (!show) {
        child.traverse(removePhysicalBodyFromWorld);
        child.visible = false;
      }
    }
  });
}

function visibilityBubbleStickFigure(show) {
  if (BUBBLE_STICK_FIGURE.children[0].visible === show) {
    return;
  }

  BUBBLE_STICK_FIGURE.traverse((children) => visibilityTraverseObject(children, show));
}

function addBubbleStickFigure() {
  scene.add(BUBBLE_STICK_FIGURE);
  BUBBLE_STICK_FIGURE.traverse(addPhysicalBodyToWorld);
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
  for (let i = 0; i < SHAPES.length; i++) {
    checkBubbleFigureIntersection(SHAPES[i]);
  }
}

function renderPoses(poses) {
  for (let i = 0; i < poses.length; i++) {
    const pose = poses[i];
    renderPose(pose);
  }

  // keeping intersection related code in case anyone changes their minds about using it
  // once we have the final version we can safely remove it
  // checkShapeIntersections();
}

function calculateEstimateScore(keyPoints) {
  let estimateScore = 0;

  for (let i = 0; i < keyPoints.length; ++i) {
    estimateScore += keyPoints[i].score;
  }

  return estimateScore;
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

  const estimatePosesKeyPoints = poses[0].keypoints;
  const estimateScore = calculateEstimateScore(estimatePosesKeyPoints);

  if (estimateScore < MINIMUM_POSES_SCORE) {
    visibilityBubbleStickFigure(false);
    return;
  }

  visibilityBubbleStickFigure(true);
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

  addShapeAndBubbleFigureContactMaterial();

  render();

  const sizes = getSizes();
  video = await getCameraVideo(sizes.video.width, sizes.video.height);
  detector = await getDetector();
}

start();

function updateParameters() {
  updateControlInputs();
  scene.clear();
  scene.add(ambientLight);
  removeBubbleStickFigure();
  createBubbleStickFigure();
  addBubbleStickFigure();
  updateCamera();
  resetShapes({ scene, world });
}

function resetInputValues() {
  resetParameters();
  updateParameters();
}

function updateCamera() {
  const cameraPositionZ = parseInt(getParameterValue('camera_z'));
  const cameraZoom = parseFloat(getParameterValue('camera_zoom'));

  camera.position.z = cameraPositionZ;
  camera.zoom = cameraZoom / 100;
}

function initControls() {
  initControlInputs();
  const applyButton = document.getElementById('apply');
  const resetButton = document.getElementById('reset');
  applyButton.onclick = updateParameters;
  resetButton.onclick = resetInputValues;

  const hasControls = getQueryStringValue('controls');
  if (hasControls === 'true') {
    toggleControls();
  }

  hotkeys('ctrl+k, command+k', () => {
    toggleControls();
  });
}

function toggleControls() {
  const controls = document.getElementById('controls');
  controls.classList.toggle('hidden');
}

initControls();
