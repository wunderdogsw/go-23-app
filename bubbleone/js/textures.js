import { getAllStaticTextures } from './textures/StaticTexture.js';
import { getAllVideoTextures } from './textures/VideoTexture.js';
import { getRandomInt } from './utils.js';

export function getAllTextures() {
  return [...getAllVideoTextures(), ...getAllStaticTextures()];
}

/**
 * @param {(THREE.VideoTexture|THREE.Texture)[]| undefined} textures
 * @returns THREE.VideoTexture|THREE.Texture
 */
export function getRandomTexture(textures) {
  const t = textures !== undefined ? textures : getAllTextures();
  const index = getRandomInt(0, t.length - 1);
  return t[index];
}
