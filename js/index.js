import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import { getCameraVideoElement, getVideoInputDeviceId, getVideoInputDevices } from './media.js';
import { getSizes, setSceneSize, getQueryStringValue, convertFormToJson } from './utils.js';
import { getDetector } from './bodyDetection.js';
import {
  drawBubbleStickFigure,
  createBubbleStickFigure,
  BUBBLE_STICK_FIGURE,
  BUBBLE_BODY_MATERIAL,
} from './bubblePerson.js';
import { renderShapes, resetShapes, SHAPE_BODY_MATERIAL, updateShapes } from './shape.js';
import { setDefaultParameters, initParameters, getParameters, setParameters } from './parameters.js';

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

function visibilityBubbleStickFigure(show) {
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
  isPersonPresent = false;
  removeBubbleStickFigure();
  createBubbleStickFigure();
  visibilityTraverseObject(BUBBLE_STICK_FIGURE, false, true);
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

function renderPoses(poses) {
  for (let i = 0; i < poses.length; i++) {
    const pose = poses[i];
    renderPose(pose);
  }
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
  initParameters();
  createBubbleStickFigure();
  addBubbleStickFigure();
  resetShapes({ scene, world });

  addShapeAndBubbleFigureContactMaterial();

  render();

  const sizes = getSizes();
  const videoInputDeviceId = await getVideoInputDeviceId();
  video = await getCameraVideoElement(videoInputDeviceId, sizes.video.width, sizes.video.height);

  detector = await getDetector();
}

start();

function updateParameters() {
  scene.clear();
  scene.add(ambientLight);

  removeBubbleStickFigure();
  createBubbleStickFigure();
  addBubbleStickFigure();

  updateCamera();
  resetShapes({ scene, world });
}

function submitControlsForm(event) {
  event.preventDefault();

  const parameters = convertFormToJson(event.target);
  setParameters(parameters);

  updateParameters();
}

function resetInputValues() {
  setDefaultParameters();
  initControlInputs();
  updateParameters();
}

function updateCamera() {
  const { cameraZ, cameraZoom } = getParameters();

  camera.position.z = cameraZ;
  camera.zoom = cameraZoom / 100;
}

async function initVideoInputControl() {
  const [videoInputControl] = document.getElementsByName('videoDeviceId');
  if (!videoInputControl) {
    return;
  }

  const videoInputDevices = await getVideoInputDevices();
  const selectedVideoDeviceId = await getVideoInputDeviceId();

  videoInputDevices.forEach(({ deviceId, label }) => {
    const option = document.createElement('option');
    option.value = deviceId;
    option.textContent = label;

    if (deviceId === selectedVideoDeviceId) {
      option.selected = true;
    }

    videoInputControl.appendChild(option);
  });
}

function initControlInputs() {
  const parameters = getParameters();

  for (const [key, value] of Object.entries(parameters)) {
    const [element] = document.getElementsByName(key);
    if (!element) {
      continue;
    }

    element.value = value;
  }
}

async function initControls() {
  initControlInputs();
  await initVideoInputControl();

  const controls = document.getElementById('controls');
  controls.onsubmit = submitControlsForm;

  const resetButton = document.getElementById('reset');
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
