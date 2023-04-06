import * as THREE from 'three';
import { createRandomEuler } from '../utils/three.js';
import { getRandomColorTexture } from '../textures/index.js';

export function createCone(texture, radius = 0.8, height = 2, segments = 32) {
  const coneGe = new THREE.ConeGeometry(radius, height, segments);
  const coneMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const cone = new THREE.Mesh(coneGe, coneMaterial);
  cone.castShadow = true;
  cone.receiveShadow = true;
  return cone;
}

export function createCylinder(texture, radiusTop = 0.3, radiusBottom = 0.3, height = 3, radialSegments = 20) {
  const cylinderGe = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
  const cylinderMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const cylinder = new THREE.Mesh(cylinderGe, cylinderMaterial);

  cylinder.castShadow = true;
  cylinder.receiveShadow = true;
  return cylinder;
}

export function createSphere(texture, radius = 0.6) {
  const sphereGe = new THREE.SphereGeometry(radius);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const sphere = new THREE.Mesh(sphereGe, sphereMaterial);

  sphere.castShadow = true;
  sphere.receiveShadow = true;
  return sphere;
}

export function createBubble({
  radius = 0.4,
  x = 0,
  y = 0,
  z = 0,
  offset = 0.5,
  rotation = createRandomEuler(),
  texture = getRandomColorTexture(),
} = {}) {
  const bubble = createSphere(texture, radius);
  bubble.position.set(x, y, z);
  bubble.userData.rotation = rotation;

  const randomOffset = new THREE.Vector3(Point(offset), Point(offset), Point(offset));
  // Custom property to draw the bubble always with the same offset.
  bubble.userData.offset = randomOffset;
  return bubble;
}

const Point = (offset) => Math.random() * offset - offset / 2;
