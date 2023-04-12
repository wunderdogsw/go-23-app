import * as THREE from 'three';

import { getScene } from '../cinematography';
import { VIDEO_SIZE } from '../media';
import { getRandomInt } from './maths';

export function visibleBoundingBox() {
  const { width, height } = getScene().userData;

  const left = -width / 2;
  const right = width / 2;
  const top = height / 2;
  const bottom = -height / 2;

  return { left, right, top, bottom };
}

export function getObjectX(videoX: any) {
  const { width: sceneWidth } = getScene().userData;
  const { width: videoWidth } = VIDEO_SIZE;
  // this calculation flips the x coordinate for a mirror effect
  return ((videoWidth - videoX) / videoWidth - 0.5) * sceneWidth;
}

export function getObjectY(videoY: any) {
  const { height: sceneHeight } = getScene().userData;
  const { height: videoHeight } = VIDEO_SIZE;
  return (0.5 - videoY / videoHeight) * sceneHeight;
}

export function getVectorsRadiansAngle(startVector: any, endVector: any) {
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

export function disposeMesh(mesh: any) {
  mesh.material.dispose();
  mesh.geometry.dispose();
}

export function disposeGroup(group: any, onMeshDisposedCallback: any) {
  group.traverse((object: any) => {
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
export function visibleHeightAtZDepth(camera: any, depth = 0) {
  const cameraZ = camera.position.z;
  const compensatedDepth = depth < cameraZ ? depth - cameraZ : depth + cameraZ;
  const verticalFOVRadians = (camera.fov * Math.PI) / 180;

  return 2 * Math.tan(verticalFOVRadians / 2) * Math.abs(compensatedDepth);
}

export function visibleWidthAtZDepth(camera: any, visibleHeight: any) {
  return visibleHeight * camera.aspect;
}

function getRandomRadiansAngle() {
  const degrees = getRandomInt(0, 359);
  return THREE.MathUtils.degToRad(degrees);
}
