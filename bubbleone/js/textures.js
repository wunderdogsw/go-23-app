import { STATIC_TEXTURES } from './textures/StaticTexture.js';
import { VIDEO_TEXTURES } from './textures/VideoTexture.js';
import { getRandomInt } from './utils.js';

export const TEXTURES = [...VIDEO_TEXTURES, ...STATIC_TEXTURES];

/**
 * @param {(THREE.VideoTexture|THREE.Texture)[]| undefined} textures
 * @returns THREE.VideoTexture|THREE.Texture
 */
export function getRandomTexture(textures = TEXTURES) {
  const index = getRandomInt(0, textures.length - 1);
  return textures[index];
}
