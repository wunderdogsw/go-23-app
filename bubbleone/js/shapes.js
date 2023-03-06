import * as THREE from 'three';
import Cone from './shapes/Cone.js';
import Cylinder from './shapes/Cylinder.js';
import Sphere from './shapes/Sphere.js';
import VideoTexture from './VideoTexture.js';

// Create an empty scene
var scene = new THREE.Scene();
const canvas = document.querySelector('#canvas');
// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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

// Render Loop
var render = function () {
  requestAnimationFrame(render);

  cone1.rotateX(0.01);
  cone1.rotateY(-0.01);
  cone2.rotateX(-0.02);
  cone2.rotateY(0.02);

  sphere1.rotateX(-0.01);
  sphere1.rotateY(-0.01);
  sphere2.rotateX(0.01);
  sphere2.rotateY(0.01);

  cylinder1.rotateX(-0.01);
  cylinder1.rotateY(0.01);
  cylinder2.rotateX(0.01);
  cylinder2.rotateY(-0.01);

  // Render the scene
  renderer.render(scene, camera);
};

render();
