import { getIdFromPath } from './utils.js';
import { COLOR_VIDEO_PATHS } from './textures/VideoTexture.js';

// adds videos to dom to be used as textures
function addVideoToDom() {
  COLOR_VIDEO_PATHS.forEach((path) => {
    const video = document.createElement('video');
    const videoId = getIdFromPath(path);
    const attributes = {
      id: videoId,
      autoplay: true,
      muted: true,
      loop: true,
      src: path,
      type: 'video/mp4',
      crossorigin: 'anonymous',
      playsinline: true,
      'webkit-playsinline': true,
      style: 'display: none',
    };

    Object.keys(attributes).forEach((attr) => {
      video.setAttribute(attr, attributes[attr]);
    });

    document.getElementsByTagName('body')[0].appendChild(video);

    video.muted = true;
    video.play();
  });
}

addVideoToDom();
