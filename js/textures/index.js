import { COLOR_STATIC_TEXTURES } from './static.js';
import { COLOR_VIDEO_TEXTURES } from './video.js';
import { getRandomItem } from '../utils.js';

export const COLOR_TEXTURES = [...COLOR_VIDEO_TEXTURES, ...COLOR_STATIC_TEXTURES];

/**
 * @returns THREE.VideoTexture|THREE.Texture
 */
export function getRandomColorTexture() {
  return getRandomItem(COLOR_TEXTURES);
}