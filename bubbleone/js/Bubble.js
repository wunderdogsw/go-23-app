import Sphere from './shapes/Sphere.js'
import { VIDEO_TEXTURES } from './VideoTexture.js'

export default function Bubble({ radius = 0.4, x = 0, y = 0, z = 0 } = {}) {
  const texture = VIDEO_TEXTURES.S_VIDEO;
  const bubble = Sphere(texture, radius);
  bubble.position.set(x, y, z);

  return bubble;
}
