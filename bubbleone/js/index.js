import * as THREE from 'three';

import { getCameraVideo } from './media.js';
import { getSizes, setSceneSize, getQueryStringValue } from './utils.js';
import { getDetector } from './bodyDetection.js';
import { drawBubbleStickFigure, resetBody, BUBBLE_STICK_FIGURE, hideBubbleStickFigure } from './bubblePerson.js';

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

// Create a renderer with Antialiasing
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.shadowMap.enabled = true;

// Configure renderer clear color
renderer.setClearColor('#000000');

// Needed for standard materials to be visible
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
generateDirectionalLight();

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

scene.add(BUBBLE_STICK_FIGURE.HEAD);
BUBBLE_STICK_FIGURE.BODY.forEach(({ group }) => scene.add(group));

let video;
let detector;

function renderPose(pose) {
  if (!pose.keypoints) {
    return;
  }

  drawBubbleStickFigure({ pose });
}

async function renderPoses() {
  if (!(detector && video)) {
    return;
  }

  const poses = await detector.estimatePoses(video, {});

  if (!poses.length) {
    hideBubbleStickFigure();
    return;
  }

  for (let i = 0; i < poses.length; i++) {
    const pose = poses[i];
    renderPose(pose);
  }
}

// Render Loop
const render = async function () {
  requestAnimationFrame(render);
  await renderPoses();
  renderer.render(scene, camera);
};

async function start() {
  render();

  const sizes = getSizes();
  video = await getCameraVideo(sizes.video.width, sizes.video.height);
  detector = await getDetector();
}

start();

function updateParameters() {
  console.log('clear');
  scene.clear();
  scene.add(ambientLight);
  scene.add(BUBBLE_STICK_FIGURE.HEAD);
  console.log('resetting...');
  resetBody();
  console.log('foreach');
  BUBBLE_STICK_FIGURE.BODY.forEach(({ group }) => scene.add(group));
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

//Add direction light to apply the shadows to the objects
function generateDirectionalLight(showHelper = false) {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  //Set for the direction of the light
  directionalLight.position.set(-4, 2, 1);
  scene.add(directionalLight);
  directionalLight.castShadow = true;

  if (showHelper) {
    const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(helper);
  }
}

initControls();
