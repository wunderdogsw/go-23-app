import * as THREE from 'three';

import { getSceneHeight, getSceneWidth } from '../cinematography.js';
import { VIDEO_SIZE } from '../media.js';
import { getRandomInt } from './maths.js';

export function visibleBoundingBox() {
  const width = getSceneWidth();
  const height = getSceneHeight();

  const left = -width / 2;
  const right = width / 2;
  const top = height / 2;
  const bottom = -height / 2;

  return { left, right, top, bottom };
}

export function getObjectX(videoX) {
  // this calculation flips the x coordinate for a mirror effect
  return ((VIDEO_SIZE.width - videoX) / VIDEO_SIZE.width - 0.5) * getSceneWidth();
}

export function getObjectY(videoY) {
  return (0.5 - videoY / VIDEO_SIZE.height) * getSceneHeight();
}

export function getVectorsRadiansAngle(startVector, endVector) {
  // the vector angleTo function doesn't seem to produce the desired result
  const deltaX = endVector.x - startVector.x;
  const deltaY = endVector.y - startVector.y;
  return Math.atan2(deltaY, deltaX);
}

export function createRandomEuler() {
  const x = getRandomRadiansAngle();
  const y = getRandomRadiansAngle();
  const z = getRandomRadiansAngle();
  return new THREE.Euler(x, y, z);
}

export function disposeMesh(mesh) {
  mesh.material.dispose();
  mesh.geometry.dispose();
}

export function disposeGroup(group, onMeshDisposedCallback = null) {
  group.traverse((object) => {
    if (object.type !== 'Mesh') {
      return;
    }

    disposeMesh(object);

    if (!!onMeshDisposedCallback) {
      onMeshDisposedCallback(object);
    }
  });
}

// reference: https://codepen.io/discoverthreejs/pen/VbWLeM
export function visibleHeightAtZDepth(camera, depth = 0) {
  const cameraZ = camera.position.z;
  const compensatedDepth = depth < cameraZ ? depth - cameraZ : depth + cameraZ;
  const verticalFOVRadians = (camera.fov * Math.PI) / 180;

  return 2 * Math.tan(verticalFOVRadians / 2) * Math.abs(compensatedDepth);
}

export function visibleWidthAtZDepth(camera, visibleHeight) {
  return visibleHeight * camera.aspect;
}

function getRandomRadiansAngle() {
  const degrees = getRandomInt(0, 359);
  return THREE.MathUtils.degToRad(degrees);
}
