import { getRandomItem } from '../utils/maths.js';
import { COLOR_STATIC_TEXTURES } from './static.js';
import { COLOR_VIDEO_TEXTURES } from './video.js';

const COLOR_TEXTURES = [...COLOR_VIDEO_TEXTURES, ...COLOR_STATIC_TEXTURES];

export function getRandomColorTexture() {
  // @ts-expect-error TS(2345): Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
  return getRandomItem(COLOR_TEXTURES);
}
