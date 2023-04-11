import * as THREE from 'three';

const COLOR_VIDEOS_PATH = 'assets/videos/';

export const COLOR_VIDEO_FILENAMES = [
  'h_video.mp4',
  's_video.mp4',
  'texture_anim_1.mp4',
  'texture_anim_2.mp4',
  'texture_anim_3.mp4',
  'texture_anim_4.mp4',
  'texture_anim_5.mp4',
];

export const COLOR_VIDEO_TEXTURES = createVideoTextures(COLOR_VIDEO_FILENAMES);

function createVideoElement(filename) {
  const video = document.createElement('video');
  const src = `${COLOR_VIDEOS_PATH}${filename}`;
  const attributes = {
    id: filename,
    src,
    autoplay: true,
    muted: true,
    loop: true,
    type: 'video/mp4',
    crossorigin: 'anonymous',
    playsinline: true,
    'webkit-playsinline': true,
    style: 'display: none',
  };

  Object.keys(attributes).forEach((attr) => {
    video.setAttribute(attr, attributes[attr]);
  });

  video.muted = true;
  video.play();
  return video;
}

function createVideoTexture(video, rotation = -1.57, x = 0.5, y = 0.5) {
  const texture = new THREE.VideoTexture(video);

  texture.rotation = rotation;
  texture.center.set(x, y);

  return texture;
}

function createVideoTextures(paths) {
  return paths.map((path) => {
    const video = createVideoElement(path);
    return createVideoTexture(video);
  });
}
