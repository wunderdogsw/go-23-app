import { getRandomItem } from '../utils/maths';
import { COLOR_STATIC_TEXTURES } from './static';
import { COLOR_VIDEO_TEXTURES } from './video';

const COLOR_TEXTURES = [...COLOR_VIDEO_TEXTURES, ...COLOR_STATIC_TEXTURES];

export function getRandomColorTexture() {
  return getRandomItem(COLOR_TEXTURES);
}
