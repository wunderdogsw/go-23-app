import * as THREE from 'three';

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

export function visibleBoundingBox() {
  const { width, height } = sizes.scene;

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
  return ((sizes.video.width - videoX) / sizes.video.width - 0.5) * sizes.scene.width;
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

export function getRandomItem(array = []) {
  return array.length ? array[getRandomInt(1, array.length) - 1] : undefined;
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

export function getVectorsRadianAngle(startVector, endVector) {
  // the vector angleTo function doesn't seem to produce the desired result
  const deltaX = endVector.x - startVector.x;
  const deltaY = endVector.y - startVector.y;
  return Math.atan2(deltaY, deltaX);
}

export function getRandomRadianAngle() {
  const degrees = getRandomInt(0, 359);
  return THREE.MathUtils.degToRad(degrees);
}

export function createRandomEuler() {
  const x = getRandomRadianAngle();
  const y = getRandomRadianAngle();
  const z = getRandomRadianAngle();
  return new THREE.Euler(x, y, z);
}

export function disposeMesh(mesh) {
  mesh.material.dispose();
  mesh.geometry.dispose();
}

export function disposeGroup(group) {
  group.traverse((object) => {
    if (object.type !== 'Mesh') {
      return;
    }

    disposeMesh(object);
  });
}

export function createSelectOption(label, value, selectedValue) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label;

  if (value === selectedValue) {
    option.selected = true;
  }

  return option;
}

export function setInputValueByName(name, value) {
  const [element] = document.getElementsByName(name);
  if (!element) {
    console.warn(`Didn't find input name ${name}`);
    return;
  }

  element.value = value;
}

export function convertFormToJson(form) {
  const formData = new FormData(form);
  const entries = formData.entries();
  const json = {};

  for (const [key, value] of entries) {
    const isNumber = isNumeric(value);
    json[key] = isNumber ? parseFloat(value) : value;
  }

  return json;
}

// reference: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
function isNumeric(str) {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
