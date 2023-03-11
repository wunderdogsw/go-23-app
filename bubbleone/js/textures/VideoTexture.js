import * as THREE from 'three';
import { getIdFromPath } from '../utils.js';

export const VIDEO_PATHS = [
  'assets/anim/h_video.mp4',
  'assets/anim/s_video.mp4',
  'assets/anim/texture_anim_1.mp4',
  'assets/anim/texture_anim_2.mp4',
  'assets/anim/texture_anim_3.mp4',
  'assets/anim/texture_anim_4.mp4',
  'assets/anim/texture_anim_5.mp4',
  'assets/anim/texture_anim_bw_3.mp4',
  'assets/anim/texture_anim_bw_4.mp4',
];

export function getAllVideoTextures() {
  return VIDEO_PATHS.map((path) =>
    VideoTexture(document.getElementById(getIdFromPath(path)))
  );
}

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
