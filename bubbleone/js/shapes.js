import * as THREE from 'three';
import Cone from './shapes/Cone.js';
import Cylinder from './shapes/Cylinder.js';
import Sphere from './shapes/Sphere.js';
import VideoTexture from './VideoTexture.js';

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
camera.position.z = 6;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  shadowMap: {
    enabled: true,
    type: THREE.PCFSoftShadowMap,
  },
  canvas,
});

// Configure renderer clear color
renderer.setClearColor('#000000');

// Needed for standard materials to be visible
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

const hVideo = document.getElementById('hVideo');
const sVideo = document.getElementById('sVideo');

// Cone1
const cone1 = Cone(VideoTexture(hVideo));
scene.add(cone1);

// Cone2
const cone2 = Cone(VideoTexture(hVideo));
cone2.position.y = -2;
scene.add(cone2);

// Sphere1
const sphere1 = Sphere(VideoTexture(sVideo));
sphere1.position.x = -2;
scene.add(sphere1);

//Sphere2
const sphere2 = Sphere(VideoTexture(sVideo));
sphere2.position.x = -2;
sphere2.position.y = -2;
scene.add(sphere2);

// Cylinder1
const cylinder1 = Cylinder(VideoTexture(hVideo));
cylinder1.position.x = 2;
scene.add(cylinder1);

// Cylinder2
const cylinder2 = Cylinder(VideoTexture(hVideo));
cylinder2.position.x = 2;
cylinder2.position.y = -2;
scene.add(cylinder2);

// Random rotation
let start = 0;
const changeRotationSeconds = 2 * 1000;
const getRandomRotationSpeedXYZ = () => {
  const minRotationSpeed = -0.04;
  const maxRotationSpeed = 0.05;
  return {
    X: Math.random() * (maxRotationSpeed - minRotationSpeed) + minRotationSpeed,
    Y: Math.random() * (maxRotationSpeed - minRotationSpeed) + minRotationSpeed,
    Z: Math.random() * (maxRotationSpeed - minRotationSpeed) + minRotationSpeed,
  };
}

let cone1Rotations, cone2Rotations, sphere1Rotations, sphere2Rotations, cylinder1Rotations, cylinder2Rotations;

// Render Loop
var render = function (timestamp) {
  requestAnimationFrame(render);

  if(!start || timestamp - start >= changeRotationSeconds) {
    start = timestamp;
    cone1Rotations = getRandomRotationSpeedXYZ();
    cone2Rotations = getRandomRotationSpeedXYZ();
    sphere1Rotations = getRandomRotationSpeedXYZ();
    sphere2Rotations = getRandomRotationSpeedXYZ();
    cylinder1Rotations = getRandomRotationSpeedXYZ();
    cylinder2Rotations = getRandomRotationSpeedXYZ();
  }

  cone1.rotateX(cone1Rotations.X);
  cone1.rotateY(cone1Rotations.Y);
  cone1.rotateZ(cone1Rotations.Z);
  cone2.rotateX(cone2Rotations.X);
  cone2.rotateY(cone2Rotations.Y);
  cone2.rotateZ(cone2Rotations.Z);

  sphere1.rotateX(sphere1Rotations.X);
  sphere1.rotateY(sphere1Rotations.Y);
  sphere2.rotateX(sphere2Rotations.X);
  sphere2.rotateY(sphere2Rotations.Y);

  cylinder1.rotateX(cylinder1Rotations.X);
  cylinder1.rotateY(cylinder1Rotations.Y);
  cylinder1.rotateZ(cylinder1Rotations.Z);
  cylinder2.rotateX(cylinder2Rotations.X);
  cylinder2.rotateY(cylinder2Rotations.Y);
  cylinder2.rotateZ(cylinder2Rotations.Z);

  // Render the scene
  renderer.render(scene, camera);
};

render();
