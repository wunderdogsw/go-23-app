import * as THREE from 'three';

import { getCameraVideo } from './media.js';
import { visibleHeightAtZDepth, visibleWidthAtZDepth } from './utils.js'
import { getDetector } from './bodyDetection.js'
import { createBubbleHead, createBubbleLines, drawBubblesStickPerson } from './bubblePerson.js'

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

const bubbleHead = createBubbleHead();
scene.add(bubbleHead);

const bubbleLines = createBubbleLines();
bubbleLines.forEach(({ group }) => scene.add(group));

let video;
let detector;

function renderPose(pose) {
  if (!pose.keypoints) {
    return
  }

  drawBubblesStickPerson({ pose, bubbleHead, bubbleLines, videoWidth, videoHeight, visibleWidth, visibleHeight })
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

  video = await getCameraVideo(videoWidth, videoHeight);
  detector = await getDetector();
}

init()
