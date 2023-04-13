import * as THREE from 'three';

import { getParameters } from './parameters';
import { visibleHeightAtZDepth, visibleWidthAtZDepth } from './utils/three';

let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;

export function initCinematography() {
  scene = new THREE.Scene();
  addLightingToScene();
  initCamera();
  initRenderer();
}

export function getScene(): THREE.Scene {
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
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  updateCamera();
  setSceneSize(camera);
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  document.body.appendChild(renderer.domElement);

  renderer.shadowMap.enabled = true;
  renderer.setClearColor('#000000');
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function addLightingToScene() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
}

function setSceneSize(camera: THREE.PerspectiveCamera) {
  scene.userData.height = visibleHeightAtZDepth(camera);
  scene.userData.width = visibleWidthAtZDepth(camera, scene.userData.height);
}
