import * as THREE from 'three';

import { getScene } from '../cinematography';
import { VIDEO_SIZE } from '../media';
import { getRandomInt } from './maths';

type VisibleBoundingBoxReturnType = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};
export function visibleBoundingBox(): VisibleBoundingBoxReturnType {
  const { width, height } = getScene().userData;

  const left = -width / 2;
  const right = width / 2;
  const top = height / 2;
  const bottom = -height / 2;

  return { left, right, top, bottom };
}

export function getObjectX(videoX: number): number {
  const { width: sceneWidth } = getScene().userData;
  const { width: videoWidth } = VIDEO_SIZE;
  // this calculation flips the x coordinate for a mirror effect
  return ((videoWidth - videoX) / videoWidth - 0.5) * sceneWidth;
}

export function getObjectY(videoY: number): number {
  const { height: sceneHeight } = getScene().userData;
  const { height: videoHeight } = VIDEO_SIZE;
  return (0.5 - videoY / videoHeight) * sceneHeight;
}

export function getVectorsRadiansAngle(startVector: THREE.Vector3, endVector: THREE.Vector3): number {
  // the vector angleTo function doesn't seem to produce the desired result
  const deltaX = endVector.x - startVector.x;
  const deltaY = endVector.y - startVector.y;
  return Math.atan2(deltaY, deltaX);
}

export function createRandomEuler(): THREE.Euler {
  const x = getRandomRadiansAngle();
  const y = getRandomRadiansAngle();
  const z = getRandomRadiansAngle();
  return new THREE.Euler(x, y, z);
}

export function disposeMesh(mesh: THREE.Mesh) {
  if (mesh.material instanceof THREE.Material) {
    mesh.material.dispose();
  }
  mesh.geometry.dispose();
}

export function disposeGroup(group: THREE.Group, onMeshDisposedCallback: (mesh: THREE.Mesh) => void) {
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) {
      return;
    }

    disposeMesh(object);
    !!onMeshDisposedCallback && onMeshDisposedCallback(object);
  });
}

// reference: https://codepen.io/discoverthreejs/pen/VbWLeM
export function visibleHeightAtZDepth(camera: THREE.PerspectiveCamera, depth = 0): number {
  const cameraZ = camera.position.z;
  const compensatedDepth = depth < cameraZ ? depth - cameraZ : depth + cameraZ;
  const verticalFOVRadians = (camera.fov * Math.PI) / 180;

  return 2 * Math.tan(verticalFOVRadians / 2) * Math.abs(compensatedDepth);
}

export function visibleWidthAtZDepth(camera: THREE.PerspectiveCamera, visibleHeight: number): number {
  return visibleHeight * camera.aspect;
}

function getRandomRadiansAngle(): number {
  const degrees = getRandomInt(0, 359);
  return THREE.MathUtils.degToRad(degrees);
}
