import * as THREE from 'three';

import Sphere from './shapes/Sphere.js';
import { getRandomColorTexture } from './textures.js';
import { createRandomEuler, getRandomRadianAngle } from './utils.js';

const Point = (offset) => Math.random() * offset - offset / 2;

export default function Bubble({
  radius = 0.4,
  x = 0,
  y = 0,
  z = 0,
  offset = document.getElementById('offsetPercentage')?.value || 0.5,
  rotation = createRandomEuler(),
} = {}) {
  const texture = getRandomColorTexture();
  const bubble = Sphere(texture, radius);
  bubble.position.set(x, y, z);
  bubble.rotation.copy(rotation);

  const randomOffset = new THREE.Vector3(Point(offset), Point(offset), 0);
  // Custom property to draw the bubble always with the same offset.
  bubble.offset = randomOffset;
  return bubble;
}
