import * as THREE from "three";
import Sphere from "./shapes/Sphere.js";
import { VIDEO_TEXTURES } from "./VideoTexture.js";

export default function Bubble({ radius = 0.4, x = 0, y = 0, z = 0 } = {}) {
  const texture = VIDEO_TEXTURES.S_VIDEO;
  const bubble = Sphere(texture, radius);
  bubble.position.set(x, y, z);
  // Generate a random vector with values between -0.1 and 0.1. TODO: change inversely proportional to bubble size?
  const randomOffset = new THREE.Vector3(Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25, 0);
  // Custom property to draw the bubble always with the same offset.
  bubble.offset = randomOffset;
  return bubble;
}
