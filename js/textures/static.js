import * as THREE from 'three';

const COLOR_IMAGE_PATHS = [
  'assets/static/static_1.png',
  'assets/static/static_2.png',
  'assets/static/static_3.png',
  'assets/static/static_4.png',
  'assets/static/static_5.png',
  'assets/static/static_6.png',
  'assets/static/static_7.png',
  'assets/static/static_stripe_1.png',
  'assets/static/static_stripe_2.png',
  'assets/static/static_stripe_3.png',
  'assets/static/static_stripe_4.png',
  'assets/static/static_stripe_5.png',
];

const BLACK_WHITE_IMAGE_PATHS = [
  'assets/static/static_bw_1.png',
  'assets/static/static_bw_2.png',
  'assets/static/static_bw_3.png',
  'assets/static/static_bw_5.png',
];

export const COLOR_STATIC_TEXTURES = createStaticTextures(COLOR_IMAGE_PATHS);
export const BLACK_WHITE_STATIC_TEXTURES = createStaticTextures(BLACK_WHITE_IMAGE_PATHS);

function createStaticTextures(paths) {
  return paths.map((path) => createStaticTexture(path));
}

/**
 *
 * @param {string} path
 * @param {number} rotation
 * @param {number} x
 * @param {number} y
 * @returns
 */
function createStaticTexture(path, rotation = -1.57, x = 0.5, y = 0.5) {
  const texture = new THREE.TextureLoader().load(path);

  texture.rotation = rotation;
  texture.center.set(x, y);

  return texture;
}
