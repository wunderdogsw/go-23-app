import * as THREE from 'three';

/**
 *
 * @param {HTMLElement} video
 * @param {number} rotation
 * @param {number} x
 * @param {number} y
 * @returns
 */
export default function VideoTexture(
  video,
  rotation = -1.57,
  x = 0.5,
  y = 0.5
) {
  const texture = new THREE.VideoTexture(video);

  texture.rotation = rotation;
  texture.center.set(x, y);
  return texture;
}
