import THREE from 'three';

import { getRandomItem } from '../utils/maths';
import { COLOR_STATIC_TEXTURES } from './static';
import { COLOR_VIDEO_TEXTURES } from './video';

const COLOR_TEXTURES = [...COLOR_VIDEO_TEXTURES, ...COLOR_STATIC_TEXTURES];

type GetRandomColorTextureReturnType = THREE.VideoTexture | THREE.Texture;
export function getRandomColorTexture(): GetRandomColorTextureReturnType {
  return getRandomItem(COLOR_TEXTURES) as GetRandomColorTextureReturnType;
}
