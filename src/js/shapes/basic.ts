import * as THREE from 'three';
import { createRandomEuler } from '../utils/three';
import { getRandomColorTexture } from '../textures';
import { getRandomFloat } from '../utils/maths';

export function createCone(texture: THREE.Texture, radius = 0.8, height = 2, segments = 32): THREE.Mesh {
  const geometry = new THREE.ConeGeometry(radius, height, segments);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const cone = new THREE.Mesh(geometry, material);
  cone.castShadow = true;
  cone.receiveShadow = true;
  return cone;
}

export function createCylinder(
  texture: THREE.Texture,
  radiusTop = 0.3,
  radiusBottom = 0.3,
  height = 3,
  radialSegments = 20
): THREE.Mesh {
  const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const cylinder = new THREE.Mesh(geometry, material);

  cylinder.castShadow = true;
  cylinder.receiveShadow = true;
  return cylinder;
}

export function createSphere(texture: THREE.Texture, radius = 0.6): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(radius);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const sphere = new THREE.Mesh(geometry, material);

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
} = {}): THREE.Mesh {
  const bubble = createSphere(texture, radius);

  bubble.position.set(x, y, z);
  bubble.userData.rotation = rotation;
  // Custom property to draw the bubble always with the same offset.
  bubble.userData.offset = createRandomOffsetVector(offset);

  return bubble;
}

const createRandomOffsetVector = (offset: number): THREE.Vector3 => {
  const min = -offset / 2;
  const max = offset / 2;

  const x = getRandomFloat(min, max);
  const y = getRandomFloat(min, max);
  const z = getRandomFloat(min, max);

  return new THREE.Vector3(x, y, z);
};
