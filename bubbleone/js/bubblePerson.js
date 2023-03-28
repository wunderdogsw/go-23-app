import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import Bubble from './Bubble.js';
import {
  copyTextureToGroup,
  createGroupBoundingBoxes,
  doesBoxIntersectBoxes,
  getAverage,
  getObjectX,
  getObjectY,
  getParameterValue,
  getVectorsRadianAngle,
  getRandomFloat,
  getRandomInt,
  disposeGroup,
} from './utils.js';
import { createBody } from './physics.js';

const BUBBLE_HEAD_SPHERES = 50;

export const BUBBLE_BODY_MATERIAL = new CANNON.Material('bubbleMaterial');

export let BUBBLE_STICK_FIGURE;

function createBubblesGroup(radius = 0.2, numberOfBubbles = 5, offset = 0) {
  const group = new THREE.Group();
  group.visible = false;

  for (let i = 0; i < numberOfBubbles; i++) {
    const x = i * radius * 2;
    const bubble = Bubble({ x, radius, offset });
    bubble.userData.body = createBody(bubble, 0, BUBBLE_BODY_MATERIAL);
    alignPhysicalBody(bubble);
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
  group.name = 'HEAD';
  const headSphere = createHeadSphere({ radius });

  group.visible = false;

  for (let i = 0; i < numSpheres; i++) {
    const randomRadius = getRandomFloat(0.1, 0.4);

    const bubble = Bubble({ radius: randomRadius, offset: 0 });
    const angle1 = getRandomInt(0, 50);
    const angle2 = getRandomInt(0, 50);

    const x = radius * Math.sin(angle1) * Math.cos(angle2);
    const y = radius * Math.sin(angle1) * Math.sin(angle2);
    const z = radius * getRandomFloat(0, 0.5);

    bubble.position.set(x, y, z);
    bubble.userData.body = createBody(bubble, 0, BUBBLE_BODY_MATERIAL);
    alignPhysicalBody(bubble);

    headSphere.add(bubble);
  }

  group.add(headSphere);
  return group;
}

export function createBubbleBody() {
  const body = new THREE.Group();
  body.name = 'BODY';
  body.add(createBubbleTorso());
  body.add(createLimbs());

  return body;
}

export function createBubbleTorso() {
  const offset = getParameterValue('torsoOffsetPercentage');

  const startKeypointName = 'neck';
  const endKeypointName = 'stomach';

  const thickCount = getParameterValue('torsoThickCount');
  const thickRadius = getParameterValue('torsoThickRadius');
  const thickBubbles = createBubblesGroup(thickRadius, thickCount, offset);
  thickBubbles.userData.startKeypointName = startKeypointName;
  thickBubbles.userData.endKeypointName = endKeypointName;

  const mediumCount = getParameterValue('torsoMediumCount');
  const mediumRadius = getParameterValue('torsoMediumRadius');
  const middleBubbles = createBubblesGroup(mediumRadius, mediumCount, offset);
  middleBubbles.userData.startKeypointName = startKeypointName;
  middleBubbles.userData.endKeypointName = endKeypointName;

  const smallCount = getParameterValue('torsoSmallCount');
  const smallRadius = getParameterValue('torsoSmallRadius');
  const smallBubbles = createBubblesGroup(smallRadius, smallCount, offset);
  smallBubbles.userData.startKeypointName = startKeypointName;
  smallBubbles.userData.endKeypointName = endKeypointName;

  const torso = new THREE.Group();
  torso.name = 'TORSO';
  torso.add(thickBubbles);
  torso.add(middleBubbles);
  torso.add(smallBubbles);

  return torso;
}

export function createLimbs() {
  const LINES_KEYPOINTS = [
    ['left_elbow', 'left_shoulder'],
    ['left_wrist', 'left_elbow'],
    ['stomach', 'left_knee'],
    ['neck', 'right_shoulder'],
    ['right_elbow', 'right_wrist'],
    ['stomach', 'right_knee'],
    ['left_knee', 'left_foot_index'],
    ['right_knee', 'right_foot_index'],
    ['right_shoulder', 'right_elbow'],
    ['left_shoulder', 'neck'],
  ];

  const offset = getParameterValue('limbsOffsetPercentage');

  const thickCount = getParameterValue('limbsThickCount');
  const thickRadius = getParameterValue('limbsThickRadius');
  const thickBubbles = new THREE.Group();

  const mediumCount = getParameterValue('limbsMediumCount');
  const mediumRadius = getParameterValue('limbsMediumRadius');
  const middleBubbles = new THREE.Group();

  const smallCount = getParameterValue('limbsSmallCount');
  const smallRadius = getParameterValue('limbsSmallRadius');
  const smallBubbles = new THREE.Group();

  for (let [startKeypointName, endKeypointName] of LINES_KEYPOINTS) {
    const thick = createBubblesGroup(thickRadius, thickCount, offset);
    thick.userData.startKeypointName = startKeypointName;
    thick.userData.endKeypointName = endKeypointName;
    thickBubbles.add(thick);

    const middle = createBubblesGroup(mediumRadius, mediumCount, offset);
    middle.userData.startKeypointName = startKeypointName;
    middle.userData.endKeypointName = endKeypointName;
    middleBubbles.add(middle);

    const small = createBubblesGroup(smallRadius, smallCount, offset);
    small.userData.startKeypointName = startKeypointName;
    small.userData.endKeypointName = endKeypointName;
    smallBubbles.add(middle);
  }

  const limbs = new THREE.Group();
  limbs.add(thickBubbles);
  limbs.add(middleBubbles);
  limbs.add(smallBubbles);
  limbs.name = 'LIMBS';

  return limbs;
}

function removeBubbleHead() {
  const HEAD = BUBBLE_STICK_FIGURE.getObjectByName('HEAD');
  const headSphere = HEAD.children[0];
  disposeGroup(headSphere);
}

function removeBubbleBody() {
  const BODY = BUBBLE_STICK_FIGURE.getObjectByName('BODY');
  disposeGroup(BODY);
}

function removeBubbleStickFigure() {
  if (!BUBBLE_STICK_FIGURE) {
    return;
  }

  removeBubbleHead();
  removeBubbleBody();
  BUBBLE_STICK_FIGURE = null;
}

export function createBubbleStickFigure() {
  removeBubbleStickFigure();

  BUBBLE_STICK_FIGURE = new THREE.Group();
  BUBBLE_STICK_FIGURE.name = 'FIGURE';
  BUBBLE_STICK_FIGURE.add(createBubbleHead());
  BUBBLE_STICK_FIGURE.add(createBubbleBody());
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

function drawBubbleHead({ keypoints }) {
  const HEAD = BUBBLE_STICK_FIGURE.getObjectByName('HEAD');

  if (!keypoints.length) {
    HEAD.visible = false;
    return;
  }

  const leftOuterEyeVector = createVectorByKeypointName({ keypoints, name: 'left_eye_outer' });
  const rightOuterEyeVector = createVectorByKeypointName({ keypoints, name: 'right_eye_outer' });
  const neckVector = createVectorByKeypointName({ keypoints, name: 'neck' });

  if (!(leftOuterEyeVector && rightOuterEyeVector && neckVector)) {
    HEAD.visible = false;
    return;
  }

  const headGroup = HEAD.children[0];
  const sphereRadius = headGroup.geometry.parameters.radius;

  HEAD.position.set(leftOuterEyeVector.x, neckVector.y + sphereRadius * 2);

  const angle = getVectorsRadianAngle(leftOuterEyeVector, rightOuterEyeVector);
  for (let i = 0; i < headGroup.children.length; i++) {
    const bubble = headGroup.children[i];
    bubble.rotation.z = bubble.userData.rotation.z + angle;
    alignPhysicalBody(bubble);
  }

  HEAD.visible = true;
}

function drawBubbleLine({ keypoints, group }) {
  if (!keypoints.length) {
    group.visible = false;
    return;
  }

  if (!group?.userData?.startKeypointName || !group?.userData?.endKeypointName) {
    return;
  }

  const startVector = createVectorByKeypointName({ keypoints, name: group.userData.startKeypointName });
  const endVector = createVectorByKeypointName({ keypoints, name: group.userData.endKeypointName });

  if (!(startVector && endVector)) {
    group.visible = false;
    return;
  }

  const direction = endVector.clone().sub(startVector);
  const angle = getVectorsRadianAngle(endVector, startVector);

  for (let i = 0; i < group.children.length; i++) {
    const bubble = group.children[i];

    const scalar = i / group.children.length;
    const position = startVector.clone().add(direction.clone().multiplyScalar(scalar));
    position.add(bubble.offset);
    bubble.position.copy(position);

    bubble.rotation.z = bubble.userData.rotation.z + angle;
    alignPhysicalBody(bubble);
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
  const BODY = BUBBLE_STICK_FIGURE.getObjectByName('BODY');

  BODY.traverse((entry) => {
    if (entry.type === 'Group') {
      drawBubbleLine({ group: entry, keypoints });
    }
  });
}

export function drawBubbleStickFigure({ pose }) {
  const { keypoints } = pose;

  const extraKeypoints = createExtraKeypoints(keypoints);
  const allKeypoints = [...keypoints, ...extraKeypoints];

  drawBubbleHead({ keypoints: allKeypoints });
  drawBubbleBody({ keypoints: allKeypoints });
}

function createHeadBox() {
  const group = BUBBLE_STICK_FIGURE.HEAD.children[0];
  const boxes = createGroupBoundingBoxes(group);

  return { group, boxes };
}

function createBodyBoxes() {
  const bodyBoxes = [];

  for (let i = 0; i < BUBBLE_STICK_FIGURE.BODY.length; i++) {
    const { group } = BUBBLE_STICK_FIGURE.BODY[i];
    const boxes = createGroupBoundingBoxes(group);
    bodyBoxes.push({ group, boxes });
  }

  return bodyBoxes;
}

function createBubbleFigureBoxes() {
  const headBox = createHeadBox();
  const bodyBoxes = createBodyBoxes();

  return [headBox, ...bodyBoxes];
}

export function checkBubbleFigureIntersection(shape) {
  const box = new THREE.Box3().setFromObject(shape);
  const bubbleFigureBoxes = createBubbleFigureBoxes();

  for (let i = 0; i < bubbleFigureBoxes.length; i++) {
    const { group, boxes } = bubbleFigureBoxes[i];
    const doesIntersect = doesBoxIntersectBoxes(box, boxes);

    if (doesIntersect) {
      copyTextureToGroup(shape, group);
    }
  }
}

function alignPhysicalBody(entry) {
  const body = entry?.userData?.body;
  if (body) {
    let target = new THREE.Vector3();
    entry.getWorldPosition(target);
    target.z = 0;

    body.position.copy(target);
    body.quaternion.copy(entry.quaternion);
  }
}
