import * as THREE from 'three';
import { getIdFromPath } from '../utils.js';

function createVideoElement(path) {
  const video = document.createElement('video');
  const videoId = getIdFromPath(path);
  const attributes = {
    id: videoId,
    autoplay: true,
    muted: true,
    loop: true,
    src: path,
    type: 'video/mp4',
    crossorigin: 'anonymous',
    playsinline: true,
    'webkit-playsinline': true,
    style: 'display: none',
  };

  Object.keys(attributes).forEach((attr) => {
    video.setAttribute(attr, attributes[attr]);
  });

  video.muted = true;
  video.play();
  return video;
}

/**
 *
 * @param {HTMLElement} video
 * @param {number} rotation
 * @param {number} x
 * @param {number} y
 * @returns
 */
function VideoTexture(video, rotation = -1.57, x = 0.5, y = 0.5) {
  const texture = new THREE.VideoTexture(video);

  texture.rotation = rotation;
  texture.center.set(x, y);
  return texture;
}

function createVideoTextures(paths) {
  return paths.map((path) => VideoTexture(createVideoElement(path)));
}

export const COLOR_VIDEO_PATHS = [
  'assets/anim/h_video.mp4',
  'assets/anim/s_video.mp4',
  'assets/anim/texture_anim_1.mp4',
  'assets/anim/texture_anim_2.mp4',
  'assets/anim/texture_anim_3.mp4',
  'assets/anim/texture_anim_4.mp4',
  'assets/anim/texture_anim_5.mp4',
];
const BLACK_WHITE_VIDEO_PATHS = ['assets/anim/texture_anim_bw_3.mp4', 'assets/anim/texture_anim_bw_4.mp4'];

export const COLOR_VIDEO_TEXTURES = createVideoTextures(COLOR_VIDEO_PATHS);
export const BLACK_WHITE_VIDEO_TEXTURES = createVideoTextures(BLACK_WHITE_VIDEO_PATHS);
