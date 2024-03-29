import * as THREE from 'three';

const COLOR_IMAGES_PATH = 'assets/images/';

const COLOR_IMAGE_FILENAMES = [
  'static_1.png',
  'static_2.png',
  'static_3.png',
  'static_4.png',
  'static_5.png',
  'static_6.png',
  'static_7.png',
  'static_stripe_1.png',
  'static_stripe_2.png',
  'static_stripe_3.png',
  'static_stripe_4.png',
  'static_stripe_5.png',
];

export const COLOR_STATIC_TEXTURES = createStaticTextures(COLOR_IMAGE_FILENAMES);

function createStaticTextures(paths: string[]): THREE.Texture[] {
  return paths.map((path) => createStaticTexture(path));
}

function createStaticTexture(filename: string, rotation = -1.57, x = 0.5, y = 0.5): THREE.Texture {
  const fullPath = `${COLOR_IMAGES_PATH}${filename}`;
  const texture = new THREE.TextureLoader().load(fullPath);

  texture.rotation = rotation;
  texture.center.set(x, y);

  return texture;
}
