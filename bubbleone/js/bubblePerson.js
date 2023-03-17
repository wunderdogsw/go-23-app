import * as THREE from 'three';

import Bubble from './Bubble.js';
import { getRandomFloat, getAverage, getObjectX, getObjectY, getRandomInt } from './utils.js';

const BUBBLE_HEAD_SPHERES = 50;

export let BUBBLE_STICK_FIGURE = {
  HEAD: createBubbleHead(),
  BODY: createBubbleBody(),
};

function createBubblesGroup(radius = 0.2, numberOfBubbles = 5) {
  const group = new THREE.Group();
  group.visible = false;

  for (let i = 0; i < numberOfBubbles; i++) {
    const x = i * radius * 2;
    const bubble = Bubble({ x, radius });
    group.add(bubble);
  }

  return group;
}

function createHeadSphere({ radius = 1.2, x = 16, y = 16 }) {
  const sphereGeometry = new THREE.SphereGeometry(radius, x, y);
  const sphereMaterial = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 });
  return new THREE.Mesh(sphereGeometry, sphereMaterial);
}

export function createBubbleHead(radius = 1.2, numSpheres = BUBBLE_HEAD_SPHERES) {
  const group = new THREE.Group();
  const headSphere = createHeadSphere({ radius });

  group.visible = false;

  for (let i = 0; i < numSpheres; i++) {
    const randomRadius = getRandomFloat(0.1, 0.4);

    const bubble = Bubble({ radius: randomRadius });
    const angle1 = getRandomInt(0, 50);
    const angle2 = getRandomInt(0, 50);

    const x = radius * Math.sin(angle1) * Math.cos(angle2);
    const y = radius * Math.sin(angle1) * Math.sin(angle2);
    const z = radius * getRandomFloat(0, 0.5);

    bubble.position.set(x, y, z);
    headSphere.add(bubble);
  }

  group.add(headSphere);
  return group;
}

export function createBubbleBody() {
  const LINES_KEYPOINTS = [
    ['neck', 'stomach'],
    ['left_elbow', 'neck'],
    ['left_wrist', 'left_elbow'],
    ['stomach', 'left_foot_index'],
    ['neck', 'right_elbow'],
    ['right_elbow', 'right_wrist'],
    ['stomach', 'right_foot_index'],
  ];

  const thickCount = document.getElementById('thickCount')?.value || 5;
  const thickBubbles = LINES_KEYPOINTS.map(([startKeypointName, endKeypointName]) => ({
    startKeypointName,
    endKeypointName,
    group: createBubblesGroup(0.3, +thickCount),
  }));

  const mediumCount = document.getElementById('mediumCount')?.value || 8;
  const middleBubbles = LINES_KEYPOINTS.map(([startKeypointName, endKeypointName]) => ({
    startKeypointName,
    endKeypointName,
    group: createBubblesGroup(0.15, +mediumCount),
  }));

  const smallCount = document.getElementById('smallCount')?.value || 15;
  const smallBubbles = LINES_KEYPOINTS.map(([startKeypointName, endKeypointName]) => ({
    startKeypointName,
    endKeypointName,
    group: createBubblesGroup(0.08, +smallCount),
  }));

  return [...thickBubbles, ...middleBubbles, ...smallBubbles];
}

export function hideBubbleStickFigure() {
  // Hiding the head
  drawBubbleHead({ keypoints: [] });
  // Hiding the body
  const { BODY } = BUBBLE_STICK_FIGURE;
  for (let i = 0; i < BODY.length; i++) {
    drawBubbleLine({ ...BODY[i], keypoints: [] });
  }
}

function findKeypointByName({ name, keypoints }) {
  return keypoints.find((keypoint) => keypoint.name === name);
}

function createVectorByKeypoint(keypoint) {
  const objectX = getObjectX(keypoint.x);
  const objectY = getObjectY(keypoint.y);
  return new THREE.Vector3(objectX, objectY, 0);
}

function createVectorByKeypointName({ keypoints, name }) {
  const keypoint = findKeypointByName({ keypoints, name });
  if (!keypoint) {
    return null;
  }

  return createVectorByKeypoint(keypoint);
}

const HUMAN_NECK_LENGTH = 1 / 4;

function drawBubbleHead({ keypoints }) {
  const { HEAD } = BUBBLE_STICK_FIGURE;

  if (!keypoints.length) {
    HEAD.visible = false;
    return;
  }

  const leftOuterEyeVector = createVectorByKeypointName({ keypoints, name: 'left_eye_outer' });
  const rightOuterEyeVector = createVectorByKeypointName({ keypoints, name: 'right_eye_outer' });
  const leftShoulderVector = createVectorByKeypointName({ keypoints, name: 'left_shoulder' });

  if (!(leftOuterEyeVector || rightOuterEyeVector || leftShoulderVector)) {
    HEAD.visible = false;
    return;
  }

  const radiusX = Math.abs(rightOuterEyeVector.x - leftOuterEyeVector.x);
  const radiusY = radiusX * HUMAN_NECK_LENGTH;

  const sphereRadius = HEAD.children[0].geometry.parameters.radius;
  const deltaEarToShoulder = leftOuterEyeVector.y - leftShoulderVector.y;
  const deltaY = deltaEarToShoulder - radiusY - sphereRadius;

  HEAD.position.set(leftOuterEyeVector.x, leftOuterEyeVector.y - deltaY);
  HEAD.visible = true;
}

function drawBubbleLine({ startKeypointName, endKeypointName, keypoints, group }) {
  if (!keypoints.length) {
    group.visible = false;
    return;
  }

  const startVector = createVectorByKeypointName({ keypoints, name: startKeypointName });
  const endVector = createVectorByKeypointName({ keypoints, name: endKeypointName });

  if (!(startVector || endVector)) {
    group.visible = false;
    return;
  }

  const direction = endVector.clone().sub(startVector);

  for (let i = 0; i < group.children.length; i++) {
    const t = i / group.children.length;
    const position = startVector.clone().add(direction.clone().multiplyScalar(t));
    const bubble = group.children[i];
    position.add(bubble.offset);
    bubble.position.copy(position);
  }

  group.visible = true;
}

function createAverageKeypoint({ name, keypoints, startKeypointName, endKeypointName }) {
  const startKeypoint = findKeypointByName({ keypoints, name: startKeypointName });
  const endKeypoint = findKeypointByName({ keypoints, name: endKeypointName });

  const x = getAverage(startKeypoint.x, endKeypoint.x);
  const y = getAverage(startKeypoint.y, endKeypoint.y);
  const z = getAverage(startKeypoint.z, endKeypoint.z);
  const score = getAverage(startKeypoint.score, endKeypoint.score);

  return { name, x, y, z, score };
}

function createExtraKeypoints(keypoints) {
  const neck = createAverageKeypoint({
    keypoints,
    name: 'neck',
    startKeypointName: 'left_shoulder',
    endKeypointName: 'right_shoulder',
  });
  const stomach = createAverageKeypoint({
    keypoints,
    name: 'stomach',
    startKeypointName: 'left_hip',
    endKeypointName: 'right_hip',
  });
  return [neck, stomach];
}

function drawBubbleBody({ keypoints }) {
  const extraKeypoints = createExtraKeypoints(keypoints);
  const allKeypoints = [...keypoints, ...extraKeypoints];
  const { BODY } = BUBBLE_STICK_FIGURE;

  for (let i = 0; i < BODY.length; i++) {
    const { group, startKeypointName, endKeypointName } = BODY[i];
    drawBubbleLine({ startKeypointName, endKeypointName, group, keypoints: allKeypoints });
  }
}

export function drawBubbleStickFigure({ pose }) {
  const { keypoints } = pose;
  drawBubbleHead({ keypoints });
  drawBubbleBody({ keypoints });
}

export function resetBody() {
  BUBBLE_STICK_FIGURE = {
    HEAD: createBubbleHead(),
    BODY: createBubbleBody(),
  };
}

// reference: ChatGPT
function doesBoxIntersectBoxes(box, boxes) {
  for (let i = 0; i < boxes.length; i++) {
    const bubbleBox = boxes[i];
    if (box.intersectsBox(bubbleBox)) {
      return true;
    }
  }

  return false;
}

function createBoundingBoxes(group) {
  const boxes = [];

  for (let i = 0; i < group.children.length; i++) {
    const child = group.children[i];
    const box = new THREE.Box3().setFromObject(child);
    boxes.push(box);
  }

  return boxes;
}

function createHeadBox() {
  const group = BUBBLE_STICK_FIGURE.HEAD.children[0];
  const boxes = createBoundingBoxes(group);

  return { group, boxes };
}

function createBodyBoxes() {
  const bodyBoxes = [];

  for (let i = 0; i < BUBBLE_STICK_FIGURE.BODY.length; i++) {
    const { group } = BUBBLE_STICK_FIGURE.BODY[i];
    const boxes = createBoundingBoxes(group);
    bodyBoxes.push({ group, boxes });
  }

  return bodyBoxes;
}

function createBubbleFigureBoxes() {
  const headBox = createHeadBox();
  const bodyBoxes = createBodyBoxes();

  return [headBox, ...bodyBoxes];
}

function copyTexture(shape, group) {
  const sourceTexture = shape.material.map;

  for (let i = 0; i < group.children.length; i++) {
    const child = group.children[i];
    child.material.map = sourceTexture;
  }
}

export function checkBubbleFigureIntersection(shape) {
  const box = new THREE.Box3().setFromObject(shape);
  const bubbleFigureBoxes = createBubbleFigureBoxes();

  for (let i = 0; i < bubbleFigureBoxes.length; i++) {
    const { group, boxes } = bubbleFigureBoxes[i];
    const doesIntersect = doesBoxIntersectBoxes(box, boxes);

    if (doesIntersect) {
      copyTexture(shape, group);
    }
  }
}
