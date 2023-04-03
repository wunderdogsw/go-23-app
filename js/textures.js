import { BLACK_WHITE_STATIC_TEXTURES, COLOR_STATIC_TEXTURES } from './textures/StaticTexture.js';
import { BLACK_WHITE_VIDEO_TEXTURES, COLOR_VIDEO_TEXTURES } from './textures/VideoTexture.js';
import { getRandomItem } from './utils.js';

export const COLOR_TEXTURES = [...COLOR_VIDEO_TEXTURES, ...COLOR_STATIC_TEXTURES];

export const BLACK_WHITE_TEXTURES = [...BLACK_WHITE_VIDEO_TEXTURES, ...BLACK_WHITE_STATIC_TEXTURES];

/**
 * @returns THREE.VideoTexture|THREE.Texture
 */
export function getRandomColorTexture() {
  return getRandomItem(COLOR_TEXTURES);
}

export function getRandomBlackWhiteTexture() {
  return getRandomItem(BLACK_WHITE_TEXTURES);
}
