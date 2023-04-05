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
  return Math.random() * (max - min) + min;
}

export function getRandomItem(array = []) {
  if (!array.length) {
    return undefined;
  }
  const index = getRandomInt(0, array.length - 1);
  return array[index];
}

export function getSum(values, byObjectKey = null) {
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    const value = byObjectKey === null ? values[i] : values[i][byObjectKey];
    sum += value;
  }

  return sum;
}

export function getAverage(values, byObjectKey = null) {
  const sum = getSum(values, byObjectKey);
  return sum / values.length;
}

export function getQueryStringValue(key) {
  return new URLSearchParams(window.location.search).get(key);
}

export function getVectorsRadiansAngle(startVector, endVector) {
  // the vector angleTo function doesn't seem to produce the desired result
  const deltaX = endVector.x - startVector.x;
  const deltaY = endVector.y - startVector.y;
  return Math.atan2(deltaY, deltaX);
}

export function createRandomEuler() {
  const x = getRandomRadiansAngle();
  const y = getRandomRadiansAngle();
  const z = getRandomRadiansAngle();
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

// reference: https://codepen.io/discoverthreejs/pen/VbWLeM
function visibleHeightAtZDepth(camera, depth = 0) {
  const cameraZ = camera.position.z;
  const compensatedDepth = depth < cameraZ ? depth - cameraZ : depth + cameraZ;
  const verticalFOVRadians = (camera.fov * Math.PI) / 180;

  return 2 * Math.tan(verticalFOVRadians / 2) * Math.abs(compensatedDepth);
}

function visibleWidthAtZDepth(camera, visibleHeight) {
  return visibleHeight * camera.aspect;
}

function getRandomRadiansAngle() {
  const degrees = getRandomInt(0, 359);
  return THREE.MathUtils.degToRad(degrees);
}

// reference: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
function isNumeric(str) {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
