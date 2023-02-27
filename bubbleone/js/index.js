import * as THREE from 'three';
import Cone from './Cone.js';
import Sphere from './Sphere.js';
import Bubble from './Bubble.js';

import { getVideoCamera } from './media.js';
import { getSegementer } from './bodyDetection.js'

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

// Create a renderer with Antialiasing
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

// Configure renderer clear color
renderer.setClearColor('#000000');

// Needed for standard materials to be visible
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

const verticalTexture = new THREE.TextureLoader().load(
  '../assets/vStripes.jpeg'
);
const horizontalTexture = new THREE.TextureLoader().load(
  '../assets/hStripes.jpeg'
);

const hVideo = document.getElementById('hVideo');
const sVideo = document.getElementById('sVideo');

const hVTexture = new THREE.VideoTexture(hVideo);
const sVTexture = new THREE.VideoTexture(sVideo);

// Cone with static texture
const coneStaticTexture = Cone(verticalTexture);
coneStaticTexture.position.x = 5;
scene.add(coneStaticTexture);

// Cone with video
const coneVideoTexture = Cone(hVTexture);
scene.add(coneVideoTexture);

// Sphere with static texture
const sphereStaticTexture = Sphere(horizontalTexture);
sphereStaticTexture.position.x = 2;
scene.add(sphereStaticTexture);

// Sphere with video
const sphereVideoTexture = Sphere(sVTexture);
sphereVideoTexture.position.x = -2;
scene.add(sphereVideoTexture);

const bubble = Bubble({x: -4})
scene.add(bubble)

let video;
let segmenter;

// Render Loop
const render = async function () {
  requestAnimationFrame(render);

  const people = !!segmenter ? await segmenter.segmentPeople(video) : [];

  coneStaticTexture.rotateX(0.01);
  coneStaticTexture.rotateY(0.01);
  sphereStaticTexture.rotateX(0.01);
  sphereStaticTexture.rotateY(0.01);

  coneVideoTexture.rotateX(0.01);
  coneVideoTexture.rotateY(-0.01);

  sphereVideoTexture.rotateX(-0.01);
  sphereVideoTexture.rotateY(-0.01);

  sVTexture.needsUpdate = true;
  hVTexture.needsUpdate = true;

  // Render the scene
  renderer.render(scene, camera);
};

render();

video = await getVideoCamera()
segmenter = await getSegementer()
