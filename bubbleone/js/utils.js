let sizes = {
  video: {
    width: 640,
    height: 480,
  },
  scene: {
    width: null,
    height: null,
  },
};

// reference: https://codepen.io/discoverthreejs/pen/VbWLeM
export function visibleHeightAtZDepth(camera, depth = 0) {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = (camera.fov * Math.PI) / 180;

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
}

export function visibleWidthAtZDepth(camera, visibleHeight) {
  return visibleHeight * camera.aspect;
}

export function visibleCoordinates(camera, depth = 0) {
  const height = visibleHeightAtZDepth(camera, depth);
  const width = visibleWidthAtZDepth(camera, height);

  const left = -width / 2;
  const right = width / 2;
  const top = height / 2;
  const bottom = -height / 2;

  return { left, right, top, bottom };
}

export function setSceneSize(camera) {
  const height = visibleHeightAtZDepth(camera);
  const width = visibleWidthAtZDepth(camera, height);

  sizes.scene = { width, height };
}

export function getSizes() {
  return sizes;
}

export function getObjectX(videoX) {
  // this calculation flips the x coordinate for a mirror effect
  return (
    ((sizes.video.width - videoX) / sizes.video.width - 0.5) * sizes.scene.width
  );
}

export function getObjectY(videoY) {
  return (0.5 - videoY / sizes.video.height) * sizes.scene.height;
}

// lazy source: ChatGPT
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min, max) {
  return parseFloat(Math.random() * (max - min) + min);
}

// lazy source: ChatGPT
export function getAverage(...numbers) {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  return sum / numbers.length;
}

export function getQueryStringValue(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/**
 *
 * @param {string} path
 * @returns string
 */
export const getIdFromPath = (path) => {
  return path.split('/').slice(-1)[0];
};
