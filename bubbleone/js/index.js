import * as THREE from 'three';

import { getCameraVideo } from './media.js';
import { visibleHeightAtZDepth, visibleWidthAtZDepth } from './utils.js'
import { getDetector } from './bodyDetection.js'
import { createPoseBubblesMap, drawPoseBubbles } from './bubblePerson.js'

// Create an empty scene
const scene = new THREE.Scene();
const canvas = document.querySelector('#canvas');

// Create a basic perspective camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

const videoWidth = 640;
const videoHeight = 480;
const visibleHeight = visibleHeightAtZDepth(camera)
const visibleWidth = visibleWidthAtZDepth(camera, visibleHeight)

// Create a renderer with Antialiasing
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

// Configure renderer clear color
renderer.setClearColor('#000000');

// Needed for standard materials to be visible
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

const poseBubblesMap = createPoseBubblesMap();
poseBubblesMap.forEach((bubble) => scene.add(bubble));

let video;
let detector;

function renderPose(pose) {
  if (!pose.keypoints) {
    return
  }

  drawPoseBubbles({ pose, poseBubblesMap, videoWidth, videoHeight, visibleWidth, visibleHeight })
}

function renderPoses(poses) {
  for (let i = 0; i < poses.length; i++) {
    const pose = poses[i];
    renderPose(pose);
  }
}

// Render Loop
const render = async function () {
  requestAnimationFrame(render);
  const poses = await detector.estimatePoses(video, {});
  renderPoses(poses);

  // Render the scene
  renderer.render(scene, camera);
};

async function init() {
  video = await getCameraVideo(videoWidth, videoHeight);
  detector = await getDetector();
  render();
}

init()
