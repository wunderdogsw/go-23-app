import * as THREE from 'three';

import { getCameraVideo } from './media.js';
import { getSizes, setSceneSize } from './utils.js'
import { getDetector } from './bodyDetection.js'
import { createBubbleHead, createBubbleBody, drawBubbleStickFigure } from './bubblePerson.js'

document.querySelectorAll('.video-texture').forEach((video) => {
  // need to play texture videos programmatically, otherwise it doesn't work :(
  video.play();
})

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

setSceneSize(camera);

// Create a renderer with Antialiasing
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

// Configure renderer clear color
renderer.setClearColor('#000000');

// Needed for standard materials to be visible
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

const bubbleRadius = 0.2;

const bubbleHead = createBubbleHead(bubbleRadius);
scene.add(bubbleHead);

const bubbleBody = createBubbleBody(bubbleRadius);
bubbleBody.forEach(({ group }) => scene.add(group));

let video;
let detector;

function renderPose(pose) {
  if (!pose.keypoints) {
    return
  }

  drawBubbleStickFigure({ pose, bubbleHead, bubbleBody })
}

async function renderPoses() {
  if (!(detector && video)) {
    return
  }

  const poses = await detector.estimatePoses(video, {});

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

async function init() {
  render();

  const sizes = getSizes()
  video = await getCameraVideo(sizes.video.width, sizes.video.height);
  detector = await getDetector();
}

init()
