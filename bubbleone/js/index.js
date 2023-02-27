import * as THREE from 'three';
import Bubble from './Bubble.js';

import { getVideoCamera } from './media.js';
import { getPeopleData, getSegementer } from './bodyDetection.js'
import { getObjectX, getObjectY, visibleHeightAtZDepth, visibleWidthAtZDepth } from './utils.js'

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


let video;
let segmenter;

const bubbles = []
for (let i = 0; i < 100; i++) {
  const bubble = Bubble({radius: 0.2, x: 1000, y: 1000})
  scene.add(bubble)
  bubbles.push(bubble)
}

function renderBubblePerson(personData) {
  let bubbleIndex = 0

  for (let y = 0; y < personData.length; y++) {
    const row = personData[y];
    for (let x = 0; x < row.length; x++) {
      const { probability } = row[x];

      // adding all the pixels hogs resources
      if (probability > 0.9 && bubbleIndex < bubbles.length && Math.random() < 0.001) {
        const objectX = getObjectX(x, 640, visibleWidth);
        const objectY = getObjectY(y, 480, visibleHeight);
        const bubble = bubbles[bubbleIndex];
        bubble.position.set(objectX, objectY);
        bubbleIndex++;
      }
    }
  }

}

// Render Loop
const render = async function () {
  requestAnimationFrame(render);
  const people = !!segmenter ? await segmenter.segmentPeople(video) : [];
  const peopleData = await getPeopleData(people);
  peopleData.forEach(renderBubblePerson);

  // Render the scene
  renderer.render(scene, camera);
};

render();

video = await getVideoCamera()
segmenter = await getSegementer()
