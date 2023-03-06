import * as THREE from 'three';
import { getRandomInt } from './utils.js';

const hVideo = document.getElementById('hVideo');
const sVideo = document.getElementById('sVideo');

export const VIDEO_TEXTURES = {
  H_VIDEO: VideoTexture(hVideo),
  S_VIDEO: VideoTexture(sVideo),
};

const VIDEO_TEXTURES_VALUES = Object.values(VIDEO_TEXTURES);

export function getRandomTexture() {
  const index = getRandomInt(0, VIDEO_TEXTURES_VALUES.length);
  return VIDEO_TEXTURES_VALUES[index];
}

/**
 *
 * @param {HTMLElement} video
 * @param {number} rotation
 * @param {number} x
 * @param {number} y
 * @returns
 */
export default function VideoTexture(video, rotation = -1.57, x = 0.5, y = 0.5) {
  const texture = new THREE.VideoTexture(video);

  texture.rotation = rotation;
  texture.center.set(x, y);
  return texture;
}
