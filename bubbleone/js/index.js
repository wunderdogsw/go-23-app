import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import { getCameraVideo } from './media.js';
import { getSizes, setSceneSize, getQueryStringValue } from './utils.js';
import { getDetector } from './bodyDetection.js';
import {
  drawBubbleStickFigure,
  createBubbleStickFigure,
  BUBBLE_STICK_FIGURE,
  checkBubbleFigureIntersection,
  BUBBLE_BODY_MATERIAL,
} from './bubblePerson.js';
import { renderShapes, resetShapes, SHAPES, SHAPE_BODY_MATERIAL } from './shape.js';

document.querySelectorAll('.video-texture').forEach((video) => {
  // need to play texture videos programmatically, otherwise it doesn't work :(
  video.play();
});

const CAMERA_Z_POSITION_QUERY_KEY = 'z';
const CAMERA_ZOOM_QUERY_KEY = 'zoom';
const MINIMUM_POSES_SCORE = 20;
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

function addShapeAndBubbleFigureContactMaterial() {
  const contactMaterial = new CANNON.ContactMaterial(BUBBLE_BODY_MATERIAL, SHAPE_BODY_MATERIAL, {
    friction: 0.0,
    restitution: 1.0
  });
  world.addContactMaterial(contactMaterial);
}

function removeBubbleStickFigure() {
  scene.remove(BUBBLE_STICK_FIGURE.HEAD);
  BUBBLE_STICK_FIGURE.HEAD.traverse(removePhysicalBodyFromWorld);
  BUBBLE_STICK_FIGURE.BODY.forEach(({ group }) => {
    scene.remove(group);
    group.traverse(removePhysicalBodyFromWorld);
  });
}

function addBubbleStickFigure() {
  scene.add(BUBBLE_STICK_FIGURE.HEAD);
  BUBBLE_STICK_FIGURE.HEAD.traverse(addPhysicalBodyToWorld);
  BUBBLE_STICK_FIGURE.BODY.forEach(({ group }) => {
    scene.add(group);
    group.traverse(addPhysicalBodyToWorld);
  });
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
    return;
  }

  renderPoses(poses);
}

const render = async function () {
  requestAnimationFrame(render);

  world.step(1 / 60);
  renderShapes();
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
