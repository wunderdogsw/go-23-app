import { getRandomItem } from '../utils/maths';
import { COLOR_STATIC_TEXTURES } from './static';
import { COLOR_VIDEO_TEXTURES } from './video';

const COLOR_TEXTURES = [...COLOR_VIDEO_TEXTURES, ...COLOR_STATIC_TEXTURES];

export function getRandomColorTexture() {
  // @ts-expect-error TS(2345): Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
  return getRandomItem(COLOR_TEXTURES);
}
