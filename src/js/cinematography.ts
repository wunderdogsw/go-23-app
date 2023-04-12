import * as THREE from 'three';

import { getParameters } from './parameters.js';
import { visibleHeightAtZDepth, visibleWidthAtZDepth } from './utils/three.js';

let camera: any;
let renderer: any;

let scene: any;

export function initCinematography() {
  scene = new THREE.Scene();
  addLightingToScene();
  initCamera();
  initRenderer();
}

export function getCamera() {
  return camera;
}

export function getRenderer() {
  return renderer;
}

export function getScene() {
  return scene;
}

export function renderScene() {
  renderer.render(scene, camera);
}

export function clearScene() {
  scene.clear();

  addLightingToScene();
}

export function updateCamera() {
  const { cameraZ, cameraZoom } = getParameters();

  camera.position.z = cameraZ;
  camera.zoom = cameraZoom / 100;
  camera.updateProjectionMatrix();
}

function initCamera() {
  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  updateCamera();

  setSceneSize(camera);
}

function initRenderer() {
  // Create a renderer with Antialiasing
  renderer = new THREE.WebGLRenderer({ antialias: true });
  document.body.appendChild(renderer.domElement);

  renderer.shadowMap.enabled = true;

  // Configure renderer clear color
  renderer.setClearColor('#000000');

  // Configure renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function addLightingToScene() {
  // Needed for standard materials to be visible
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
}

function setSceneSize(camera: any) {
  scene.userData.height = visibleHeightAtZDepth(camera);
  scene.userData.width = visibleWidthAtZDepth(camera, scene.userData.height);
}
