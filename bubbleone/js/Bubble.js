import * as THREE from 'three';
import Sphere from './shapes/Sphere.js';
import { getRandomTexture } from './textures.js';

export default function Bubble({ radius = 0.4, x = 0, y = 0, z = 0 } = {}) {
  const texture = getRandomTexture();
  const bubble = Sphere(texture, radius);
  bubble.position.set(x, y, z);
  // Generate a random vector with values between -offsetPercentage and +offsetPercentage. TODO: change inversely proportional to bubble size?
  const offsetPercentage =
    document.getElementById('offsetPercentage')?.value || 0.5;
  const randomOffset = new THREE.Vector3(
    Math.random() * offsetPercentage - offsetPercentage / 2,
    Math.random() * offsetPercentage - offsetPercentage / 2,
    0
  );
  // Custom property to draw the bubble always with the same offset.
  bubble.offset = randomOffset;
  return bubble;
}
