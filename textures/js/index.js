import * as THREE from 'three';

// Create an empty scene
var scene = new THREE.Scene();
const canvas = document.querySelector('#canvas');
// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

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

const cubeGe = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({
  //color: '#433F81',
  map: verticalTexture,
});
const cube = new THREE.Mesh(cubeGe, cubeMaterial);

// Add cube to Scene
scene.add(cube);

const sphereGe = new THREE.SphereGeometry(0.6);
const sphereMaterial = new THREE.MeshStandardMaterial({
  map: horizontalTexture,
});
const sphere = new THREE.Mesh(sphereGe, sphereMaterial);
sphere.position.x = -2;

scene.add(sphere);

// Render Loop
var render = function () {
  requestAnimationFrame(render);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  sphere.rotateX(0.01);
  sphere.rotateY(0.01);

  // Render the scene
  renderer.render(scene, camera);
};

render();
