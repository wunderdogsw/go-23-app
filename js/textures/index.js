import { COLOR_STATIC_TEXTURES } from './static.js';
import { COLOR_VIDEO_TEXTURES } from './video.js';
import { getRandomItem } from '../utils/maths.js';

export const COLOR_TEXTURES = [...COLOR_VIDEO_TEXTURES, ...COLOR_STATIC_TEXTURES];

export function getRandomColorTexture() {
  return getRandomItem(COLOR_TEXTURES);
}
